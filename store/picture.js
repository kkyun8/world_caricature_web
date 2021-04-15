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
  updateOrderPicture({ commit }, values) {
    const params = {
      ExpressionAttributeNames: {
        '#OS': 'order_status',
        '#PO': 'product_options',
        '#HP': 'has_picture',
      },
      ExpressionAttributeValues: {
        ':os': {
          S: values.orderStatus,
        },
        ':po': {
          M: values.productOptions,
        },
        ':hp': {
          BOOL: values.hasPicture,
        },
      },
      Key: {
        order_id: {
          S: values.orderId,
        },
      },
      TableName: 'orders',
      UpdateExpression: 'SET #OS = :os, #PO = :po, #HP = :hp',
    }
    const result = this.$aws_ddb().updateItem(params).promise()
    return result
  },
}
