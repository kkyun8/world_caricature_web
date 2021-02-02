export const state = () => ({
  isLoading: false,
  apiMessage: '',
  // TODO: env set
  cartCookieKey: 'worldcaricature_web_cart',
})
export const mutations = {
  setIsLoading(state, data) {
    state.isLoading = data
  },
  setApiMessage(state, data) {
    state.apiMessage = data
  },
}
