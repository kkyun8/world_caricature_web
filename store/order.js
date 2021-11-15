import moment from 'moment'
import { checkResponse, userKey, orderKey } from './common'

const getQueryItem = (items) => {
  return items.length > 0 ? items[0] : null
}
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
    productOptions: {},
    orderNumber: '',
    status: 1,
    nameKanzi: '',
    nameFurigana: '',
    email: '',
    lineId: '',
    cellPhoneNumber: '',
    postalCode: '',
    address1: '',
    address2: '',
    comment: '',
    isSendEmail: false,
    isSendLine: false,
    urlKey: '',
    hasPicture: false,
    price: 0,
    idempotencyKey: '',
    paymentStatus: 0,
    paymentOrderId: '',
    paymentSourceType: '',
  },
  // TODO: set calc price
  targetOrder: null,
  order: null,
  isActiveUrlKey: null,
})

export const mutations = {
  setTargetOrder(state, data) {
    state.targetOrder = data
  },
  setOrder(state, data) {
    state.order = data
  },
  setIsActiveUrlKey(state, data) {
    state.isActiveUrlKey = data
  },
}

export const getters = {
  // TODO: in lambda
  createOrderId: (state) => () => {
    const createDate = moment().format('YYYYMMDDHHmmss')
    const plusValue = []

    while (plusValue.length < 5) {
      plusValue.push(Math.floor(Math.random() * 10))
    }

    return createDate + plusValue.join('')
  },
}

export const actions = {
  async queryOrderOrderIdEmail({ commit }, values) {
    const { orderId, email } = values
    const result = await this.$axios
      .$get(`/dynamodb/${userKey}${email}/${orderKey}${orderId}`)
      .then((res) => {
        if (!checkResponse(res)) return
        const item = getQueryItem(res.Items)
        commit('setOrder', item)
      })
    return result
  },
  async getOrderItemFromUrlKey({ commit }, key) {
    // TODO: create url key index
    const result = await this.$axios
      .$get(`/dynamodb/url-key-index/${key}`)
      .then((res) => {
        if (!checkResponse(res)) return
        const item = getQueryItem(res.Items)
        commit('setOrder', item)
      })
    return result
  },

  async putOrderItem({ commit }, values) {
    const createAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const {
      orderId,
      orderStatus,
      productOptions,
      orderNumber,
      nameKanzi,
      nameFurigana,
      email,
      lineId,
      cellPhoneNumber,
      postalCode,
      address1,
      address2,
      comment,
      price,
      isSendEmail,
      isSendLine,
      urlKey,
      idempotencyKey,
      paymentStatus,
      paymentOrderId,
      paymentSourceType,
    } = values
    const params = {
      orderId,
      orderStatus,
      productOptions,
      orderNumber,
      nameKanzi,
      nameFurigana,
      email,
      lineId,
      cellPhoneNumber,
      postalCode: postalCode || '',
      address1,
      address2,
      comment,
      price: String(price),
      isSendEmail,
      isSendLine,
      urlKey,
      idempotencyKey,
      paymentStatus: String(paymentStatus),
      paymentOrderId,
      paymentSourceType,
      hasPicture: false,
      isDelete: false,
      createAt,
      updateAt: createAt,
    }
    const result = await this.$axios.$post(
      `/dynamodb/order/${userKey}${email}/${orderKey}${orderId}`,
      params
    )
    return result
  },
  /**
   *
   * @param {*} param0
   * @param {*} params
   * @returns
   */
  async updateOrderItem({ commit }, values) {
    const {
      idempotencyKey,
      paymentOrderId,
      paymentSourceType,
      orderId,
    } = values
    const params = {
      idempotencyKey,
      paymentOrderId,
      paymentSourceType,
    }

    const result = await this.$axios
      .$post(`/dynamodb/order/status/${orderKey}${orderId}`, params)
      .then((res) => {
        commit('setProduct', res.Item)
      })
    return result
  },
}
