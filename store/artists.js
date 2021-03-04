export const state = () => ({
  artists: [],
  artist: {},
})

export const mutations = {
  setArtists(state, data) {
    state.artists = data
  },
  setArtist(state, data) {
    state.artist = data
  },
}

export const actions = {
  async scanArtists({ commit }) {
    const params = {
      TableName: 'artists',
    }
    const result = this.$aws_ddb().scan(params).promise()
    await result.then((res) => {
      const artists = res.Items.filter((i) => !i.is_delete.BOOL)
      commit('setArtists', artists)
    })
  },
  // TODO: cors policy error
  async getArtistItem({ commit }, values) {
    const params = {
      TableName: 'artists',
      Key: {
        artist_nickname: { S: values.artistNickname },
      },
    }
    const result = this.$aws_ddb().getItem(params).promise()
    await result.then((res) => {
      commit('setArtist', res.Item)
    })
    return result
  },
}
