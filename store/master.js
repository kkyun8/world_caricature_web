import {
  checkResponse,
  labelKey,
  orderStatesKey,
  orderTypesKey,
  productionTimesKey,
} from './common'

export const state = () => ({
  productHashTags: [],
  orderStatus: [],
  orderTypes: [],
  productionTimes: [],
  // TODO: get dynamodb
  flamePrice: 1500,
  wrappingPrice: 1000,
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
  async queryLabels({ commit }) {
    const result = await this.$axios
      .$get(`/dynamodb/pk-index/${labelKey}`)
      .then((res) => {
        if (!checkResponse(res)) return
        const orderStatus = res.Items.filter((i) =>
          i.SK.S.includes(orderStatesKey)
        )
        const orderTypes = res.Items.filter((i) =>
          i.SK.S.includes(orderTypesKey)
        )

        const productionTimes = res.Items.filter((i) =>
          i.SK.S.includes(productionTimesKey)
        )

        commit('setOrderStatus', orderStatus)
        commit('setOrderTypes', orderTypes)
        commit('setProductionTimes', productionTimes)
      })
    return result
  },
  // TODO: scanHashTags
}
