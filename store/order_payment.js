export const state = () => ({
  isSqPaymentLoading: false,
})

export const mutations = {
  setIsSqPaymentLoading(state, value) {
    state.isSqPaymentLoading = value
  },
}
