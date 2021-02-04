export const state = () => ({
  isLoading: false,
  apiMessage: '',
  cartLocalStorageKey: process.env.CART_LOCAL_STORAGE_KEY,
})
export const mutations = {
  setIsLoading(state, data) {
    state.isLoading = data
  },
  setApiMessage(state, data) {
    state.apiMessage = data
  },
}
