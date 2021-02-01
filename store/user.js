export const state = () => ({
  isSignedIn: false,
  user: {},
})

export const mutations = {
  setSignInState(state, value) {
    state.isSignedIn = value
  },
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  // async signIn({ commit }){
  //   // ログイン処理
  //   const isSignedIn = await ...
  //   commit('setSignInState', isSignedIn)
  // },
  // signOut({ commit }){
  //   commit('setSignInState', false)
  // }
}
