export const state = () => ({
  isLoading: false,
  apiErrMessage: '',
  apiResultMessage: '',
  cartLocalStorageKey: process.env.CART_LOCAL_STORAGE_KEY,
})
export const mutations = {
  setIsLoading(state, data) {
    state.isLoading = data
  },
  setApiErrMessage(state, data) {
    state.apiErrMessage = data
  },
  setApiResultMessage(state, data) {
    state.apiResultMessage = data
  },
}
