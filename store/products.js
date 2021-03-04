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
    // deep copy
    return cart.map((c) => {
      if (state.products.length > 0) {
        return JSON.parse(
          JSON.stringify(state.products.find((p) => p.id.S === c.S))
        )
      }
    })
  },
}

export const actions = {
  async scanProducts({ commit }) {
    const params = {
      TableName: 'products',
    }
    const result = this.$aws_ddb().scan(params).promise()
    await result.then((res) => {
      const products = res.Items.filter((i) => !i.is_delete.BOOL)
      commit('setProducts', products)
    })
    return result
  },
  async getProductItem({ commit }, values) {
    const params = {
      TableName: 'products',
      Key: {
        id: { S: values.id },
      },
    }
    const result = this.$aws_ddb().getItem(params).promise()
    await result.then((res) => {
      commit('setProduct', res.Item)
    })
    return result
  },
  async readProduct({ commit }, params) {
    const result = await this.$axios
      .$get(`/products/${params.id}`)
      .then((res) => {
        commit('setProduct', res)
      })
    return result
  },
}
