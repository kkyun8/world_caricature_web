const TableName = 'fqa'

export const state = () => ({
  fqa: [],
})

export const mutations = {
  setFqa(state, data) {
    state.fqa = data
  },
}

export const actions = {
  async scanFqa({ commit }) {
    const params = {
      TableName,
    }
    const result = this.$aws_ddb().scan(params).promise()
    await result.then((res) => {
      commit('setFqa', res.Items)
    })
    return result
  },
}
