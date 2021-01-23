export const state = () => ({
  isSignedIn: false,
})

export const mutations = {
  setSignInState(state, isSignedIn) {
    state.isSignedIn = isSignedIn
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
