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
  async readArtists({ commit }) {
    const result = await this.$axios.$get('/artists').then((res) => {
      commit('setArtists', res)
    })
    return result
  },
  async readArtist({ commit }, params) {
    const result = await this.$axios
      .$get(`/artists/${params.id}`)
      .then((res) => {
        commit('setArtist', res)
      })
    return result
  },
}
