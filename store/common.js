export const articleKey = '@ARTICLE@'
export const fqaKey = '@FQA@'
export const noticeKey = '@NOTICE@'
export const labelKey = '@LABEL@'
export const orderKey = '@ORDER@'
export const userKey = '@USER@'
export const orderStatesKey = '@ORDERSTATUS@'
export const orderTypesKey = '@ORDERTYPES@'
export const productionTimesKey = '@PRODUCTIONTIMES@'
export const productKey = '@PRODUCT@'
export const artistsKey = '@ARTIST@'
export const profileKey = '@PROFILE@'
export const commentKey = '@COMMENT@'
export const checkResponse = (res) => {
  return res.Items || res.Item
}

export const state = () => ({
  isLoading: false,
  apiErrMessage: '',
  apiResultMessage: '',
  cartLocalStorageKey: process.env.CART_LOCAL_STORAGE_KEY,
})
export const mutations = {
  setIsLoading(state, data) {
    state.isLoading = data
  },
  setApiErrMessage(state, data) {
    state.apiErrMessage = data
  },
  setApiResultMessage(state, data) {
    state.apiResultMessage = data
  },
}
