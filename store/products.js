const TableName = 'products'

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
  productTags(state) {
    const tags = state.products.reduce((a, r) => {
      r.order_type.L.forEach((o) => a.add(o.S))
      a.add(r.title.S)
      a.add(r.number_of_people.N)
      a.add(r.price.N)
      a.add(r.production_time.S)
      a.add(r.information.S)
      a.add(r.artist_comment.S)
      a.add(r.artist_nickname.S)
      return a
    }, new Set())

    return Array.from(tags)
  },
}

export const actions = {
  async scanProducts({ commit }) {
    const params = {
      TableName,
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
      TableName,
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
