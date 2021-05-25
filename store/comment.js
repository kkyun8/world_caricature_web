const TableName = 'comment'

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
    const params = {
      ExpressionAttributeValues: {
        ':t': { S: 'product' },
        ':pid': { S: values.product_id },
      },
      TableName,
      IndexName: 'product-index',
      KeyConditionExpression: 'comment_type = :t and product_id = :pid',
    }

    const result = this.$aws_ddb().query(params).promise()
    await result.then((res) => {
      commit('setProductComments', res.Items)
    })
    return result
  },
  async queryArtistComments({ commit }, values) {
    const params = {
      ExpressionAttributeValues: {
        ':t': { S: 'artist' },
        ':an': { S: values.artist_nickname },
      },
      TableName,
      IndexName: 'artist-index',
      KeyConditionExpression: 'comment_type = :t and artist_nickname = :aid',
    }

    const result = this.$aws_ddb().query(params).promise()
    await result.then((res) => {
      commit('setArtistComments', res.Items)
    })
    return result
  },
}
