import { checkResponse, productKey } from './common'

export const state = () => ({
  products: [],
  product: {},
})

export const mutations = {
  setProducts(state, data) {
    state.products = data
  },
  setProduct(state, data) {
    state.product = data
  },
}

export const getters = {
  productItemInCart: (state) => (cart) => {
    // deep copy TODO:
    return cart.map((c) => {
      if (state.products.length > 0) {
        return JSON.parse(
          JSON.stringify(state.products.find((p) => p.id.S === c.S))
        )
      }
    })
  },
  productTags(state) {
    const tags = state.products.reduce((a, r) => {
      r.orderType.SS.forEach((o) => a.add(o))
      a.add(r.title.S)
      a.add(r.numberOfPeople.N)
      a.add(r.price.N)
      a.add(r.productionTime.S)
      a.add(r.information.S)
      a.add(r.artistComment.S)
      a.add(r.artistNickname.S)
      return a
    }, new Set())

    return Array.from(tags)
  },
}

export const actions = {
  async queryProducts({ commit }) {
    // TODO: pagination
    const result = await this.$axios
      .$get(`/dynamodb/pk-index/${productKey}`)
      .then((res) => {
        if (!checkResponse(res)) return
        const products = res.Items.filter((i) => !i.isDelete?.BOOL)
        commit('setProducts', products)
      })
    return result
  },
  async getProductItem({ commit }, values) {
    const { pk, sk } = values
    const result = await this.$axios
      .$get(`/dynamodb/${pk}/${sk}`)
      .then((res) => {
        if (!checkResponse(res)) return
        commit('setProduct', res.Item)
      })
    return result
  },
}
