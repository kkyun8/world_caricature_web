const TableName = 'artists'

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
      TableName,
    }
    const result = this.$aws_ddb().scan(params).promise()
    await result.then((res) => {
      const artists = res.Items.filter((i) =>
        i.is_delete ? !i.is_delete.BOOL : true
      )
      commit('setArtists', artists)
    })
  },
  async queryArtistArtistNickname({ commit }, values) {
    const params = {
      ExpressionAttributeValues: {
        ':a': { S: values.artistNickname },
      },
      TableName,
      IndexName: 'nickname-index',
      KeyConditionExpression: 'artist_nickname = :a',
    }

    const result = this.$aws_ddb().query(params).promise()
    await result.then((res) => {
      const item = res.Items.length > 0 ? res.Items[0] : null
      commit('setArtist', item)
    })
    return result
  },
}
