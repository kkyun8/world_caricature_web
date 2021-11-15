import { articleKey, fqaKey, noticeKey } from './common'

export const state = () => ({
  fqa: [],
})

export const mutations = {
  setFqa(state, data) {
    state.fqa = data
  },
}

export const actions = {
  async queryFqa({ commit }) {
    const result = await this.$axios
      .$get(`/dynamodb/${articleKey}/begins-with/${fqaKey}`)
      .then((res) => commit('setFqa', res.body.Items))
    return result
  },
  async queryNotice({ commit }) {
    // TODO: pagination
    const result = await this.$axios
      .$get(`/dynamodb/${articleKey}/begins-with/${noticeKey}`)
      .then((res) => commit('setFqa', res.body.Items))
    return result
  },
}
