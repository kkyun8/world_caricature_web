import { checkResponse, artistsKey, profileKey } from './common'

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
  async queryArtists({ commit }) {
    const result = await this.$axios
      .$get(`/dynamodb/${artistsKey}/begins-with/${profileKey}`)
      .then((res) => {
        if (!checkResponse(res)) return
        const artists = res.Items.filter((i) =>
          i.isDelete ? !i.isDelete.BOOL : true
        )
        commit('setArtists', artists)
      })
    return result
  },
  async queryArtistArtistNickname({ commit }, values) {
    const { artistNickname } = values
    const result = await this.$axios
      .$get(
        `/dynamodb/${artistsKey}${artistNickname}/begins-with/${profileKey}`
      )
      .then((res) => {
        if (!checkResponse(res)) return
        const item = res.Items.length > 0 ? res.Items[0] : null
        commit('setArtist', item)
      })
    return result
  },
}
