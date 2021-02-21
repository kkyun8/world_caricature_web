export const state = () => ({
  orderLabelObj: {
    orderNumber: '注文番号',
    status: '状態',
    flameSize: 'フレームサイズ',
    premiumWrapping: 'プレミアムラッピング',
    nameKanzi: '名前（漢字）',
    nameFurigana: '名前（フリガナ）',
    email: 'メール',
    lineId: 'ラインID',
    cellPhoneNumber: '電話番号',
    postalCode: '〒',
    address1: '住所1',
    address2: '住所2',
    comment: 'コメント',
    isSendEmail: 'やりとり方法',
  },
  defaultOrder: {
    productOptions: [],
    orderNumber: '',
    status: 1,
    nameKanzi: '',
    nameFurigana: '',
    email: '',
    lineId: '',
    cellPhoneNumber: '',
    postalCode: null,
    address1: '',
    address2: '',
    comment: '',
    isSendEmail: false,
    isSendLine: false,
    pictureUrlKey: '',
    hasPictures: false,
    // TODO: set calc price
    price: 10001,
    idempotencyKey: '',
    paymentStatus: 0,
    paymentOrderId: '',
    paymentSourceType: '',
  },
  // TODO: set calc price
  targetOrder: null,
  order: {},
  isActivePictureAddFormKey: null,
})

export const mutations = {
  setTargetOrder(state, data) {
    state.targetOrder = data
  },
  setOrder(state, data) {
    state.order = data
  },
  setIsActivePictureUrlKey(state, data) {
    state.isActivePictureAddFormKey = data
  },
}

export const actions = {
  async readOrder({ commit }, { params }) {
    // TODO: mock url
    // set param
    const result = await this.$axios.$get('/orders/1').then((res) => {
      commit('setTargetOrder', res)
    })
    return result
  },
  async createOrder({ commit, state }) {
    // TODO: mock url
    const result = await this.$axios.$post('/orders', state.order)
    return result
  },
  async readOrderPictureUrlKey({ commit }, { params }) {
    // TODO: mock url
    const result = await this.$axios.$get('/orders', { params })
    // TODO: set param
    commit('setIsActivePictureUrlKey', true)
    // commit('setTargetOrder', res)
    return result
  },
  async updateOrder({ commit }, { params }) {
    // TODO: mock url
    const result = await this.$axios.$put('/orders', { params })
    return result
  },
}
