export const state = () => ({
  products: [],
  product: {
    id: 0,
    title: '',
    order_type: [0],
    number_of_people: 0,
    price: 0,
    production_time: 0,
    information: '',
    artist_id: 0,
    artist_comment: '',
    delflg: false,
    created_at: '',
    updated_at: '',
  },
})

export const mutations = {
  setProducts(state, data) {
    state.products = data
  },
  setProduct(state, data) {
    state.product = data
  },
}

export const actions = {
  async readProducts({ commit }) {
    const returnArr = []
    const result = await this.$axios.$get('/products').then((res) => {
      let array = []
      for (const value in res) {
        const num = Number(value) + 1
        if (num % 4 === 0 || num === res.length) {
          array.push(res[value])
          returnArr.push(array)
          array = []
        } else {
          array.push(res[value])
        }
      }
      commit('setProducts', returnArr)
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
