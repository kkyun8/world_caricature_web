import { checkResponse, commentKey, productKey, articleKey } from './common'

export const state = () => ({
  productComments: [],
  artistComments: [],
})

export const mutations = {
  setProductComments(state, data) {
    state.productComments = data
  },
  setArtistComments(state, data) {
    state.artistComments = data
  },
}

export const actions = {
  async queryProductComments({ commit }, values) {
    const { productId } = values
    // TODO: pk ->sk sk-> pk
    const result = await this.$axios
      .$get(`/dynamodb/${productKey}${productId}/begins-with/${commentKey}`)
      .then((res) => {
        if (!checkResponse(res)) return
        commit('setProductComments', res.Items)
      })
    return result
  },
  async queryArtistComments({ commit }, values) {
    const { artistNickname } = values
    const result = await this.$axios
      .$get(
        `/dynamodb/${articleKey}${artistNickname}/begins-with/${commentKey}`
      )
      .then((res) => {
        if (!checkResponse(res)) return
        commit('setArtistComments', res.Items)
      })
    return result
  },
}
