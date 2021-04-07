export const state = () => ({
  productHashTags: [],
  orderStatus: [],
  orderTypes: [],
  productionTimes: [],
})

export const mutations = {
  setProductHashTags(state, data) {
    state.productHashTags = [...data]
  },
  setOrderStatus(state, data) {
    state.orderStatus = [...data]
  },
  setOrderTypes(state, data) {
    state.orderTypes = [...data]
  },
  setProductionTimes(state, data) {
    state.productionTimes = [...data]
  },
}

export const actions = {
  async scanOrderItemLabels({ commit }) {
    const params = {
      TableName: 'order_item_labels',
    }
    const result = this.$aws_ddb().scan(params).promise()
    await result.then((res) => {
      const orderStatus = res.Items.filter(
        (i) => i.item_id.S === 'order_status'
      )
      const orderTypes = res.Items.filter((i) => i.item_id.S === 'order_types')
      const productionTimes = res.Items.filter(
        (i) => i.item_id.S === 'production_times'
      )

      commit('setOrderStatus', orderStatus)
      commit('setOrderTypes', orderTypes)
      commit('setProductionTimes', productionTimes)
    })
    return result
  },
  // TODO: scanHashTags
}
