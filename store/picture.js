import { orderKey } from './common'

export const state = () => ({
  isSqPaymentLoading: false,
})

export const mutations = {
  setIsSqPaymentLoading(state, value) {
    state.isSqPaymentLoading = value
  },
}
export const actions = {
  async uploadImages({ commit }, params) {
    const result = await this.$axios.$post('/face-api', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return result
  },
  updateOrderPicture({ commit }, params) {
    const result = this.$axios.$post(
      `/dynamodb/${orderKey}${params.orderId}`,
      params
    )
    return result
  },
}
