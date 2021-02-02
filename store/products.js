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

export const getters = {
  productPageArr(state) {
    const values = [...state.products]

    return values.reduce((a, i, index, array) => {
      if ((index + 1) % 4 === 0 || index === 0) a.push([])
      const key = Math.ceil((index + 1) / 4) - 1
      a[key].push(i)
      return a
    }, [])
  },
}

export const actions = {
  async readProducts({ commit }) {
    const result = await this.$axios.$get('/products').then((res) => {
      commit('setProducts', res)
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
