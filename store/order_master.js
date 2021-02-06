export const state = () => ({
  productHashTags: [],
  orderStatus: [],
  orderTypes: [],
  setProductionTimes: [],
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
  async readProductHashTag({ commit }) {
    // TODO: mock url
    const result = await this.$axios.$get('/product_hash_tags').then((res) => {
      commit('setProductHashTags', res)
    })
    return result
  },
  async readOrderStatus({ commit }) {
    // TODO: mock url
    const result = await this.$axios.$get('/order_status').then((res) => {
      commit('setOrderStatus', res)
    })
    return result
  },
  async readOrderTypes({ commit }) {
    // TODO: mock url
    const result = await this.$axios.$get('/order_types').then((res) => {
      commit('setOrderTypes', res)
    })
    return result
  },
  async readProductionTimes({ commit }) {
    // TODO: mock url
    const result = await this.$axios.$get('/production_times').then((res) => {
      commit('setProductionTimes', res)
    })
    return result
  },
}
