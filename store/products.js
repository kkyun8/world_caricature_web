export const state = () => ({
  products: [],
  product: {},
})

export const mutations = {
  setProducts(state, result) {
    state.products = result
  },
}

export const actions = {
  async fetchProducts({ commit }) {
    const returnArr = []
    await this.$axios
      .$get('/products')
      .then((res) => {
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
      .catch((err) => console.log(err))
  },
}
