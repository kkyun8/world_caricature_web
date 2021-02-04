export const state = () => ({
  cart: [],
  // default 10
  cartMaxCount: isNaN(Number(process.env.CART_MAX_COUNT))
    ? 10
    : Number(process.env.CART_MAX_COUNT),
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
