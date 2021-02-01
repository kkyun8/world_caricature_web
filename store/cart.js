export const state = () => ({
  cart: [],
})

export const mutations = {
  setCart(state, data) {
    state.cart = data
  },
}

export const getters = {
  cartCount(state) {
    return state.cart.length
  },
}
