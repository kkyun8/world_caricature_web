export const state = () => ({
  isSqPaymentLoading: false,
})

export const mutations = {
  setIsSqPaymentLoading(state, value) {
    state.isSqPaymentLoading = value
  },
}
export const actions = {
  async createPayment({ commit }, params) {
    const result = await this.$axios.$post('/process-payment', params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return result
  },
}
