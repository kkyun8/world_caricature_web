export const state = () => ({
  productHashTag: [],
  orderStatus: [],
  orderTypes: [],
  productionTime: [],
})

export const mutations = {
  setProductHashTag(state, data) {
    state.productHashTag = [...data]
  },
  setOrderStatus(state, data) {
    state.orderStatus = [...data]
  },
  setOrderTypes(state, data) {
    state.orderTypes = [...data]
  },
  setProductionTime(state, data) {
    state.productionTime = [...data]
  },
}

export const actions = {
  async readProductHashTag({ commit }) {
    // TODO: mock url
    const result = await this.$axios.$get('/product_hash_tag').then((res) => {
      commit('setProductHashTag', res)
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
  async readProductionTime({ commit }) {
    // TODO: mock url
    const result = await this.$axios.$get('/production_time').then((res) => {
      commit('setProductionTime', res)
    })
    return result
  },
}
