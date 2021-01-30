export const state = () => ({
  isLoading: false,
  apiMessage: '',
})
export const mutations = {
  setIsLoading(state, data) {
    state.isLoading = data
  },
  setApiMessage(state, data) {
    state.apiMessage = data
  },
}
