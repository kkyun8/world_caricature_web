import crypto from 'crypto'
import moment from 'moment'

const TableName = 'orders'
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

export const getters = {
  createOrderId: (state) => () => {
    const createDate = moment().format('YYYYMMDDHHmmss')
    const code = crypto.randomBytes(5).toString('base64').substring(0, 5)
    return createDate + code
  },
}

export const actions = {
  async queryOrderOrderIdEmail({ commit }, values) {
    const params = {
      ExpressionAttributeValues: {
        ':o': { S: values.orderId },
        ':e': { S: values.email },
      },
      TableName,
      IndexName: 'order-id-email-index',
      KeyConditionExpression: 'order_id = :o and email = :e',
    }

    const result = this.$aws_ddb().query(params).promise()
    await result.then((res) => {
      const item = getQueryItem(res.Items)
      commit('setOrder', item)
    })
    return result
  },
  // TODO: payment picture options
  async getOrderItemFromUrlKey({ commit }, key) {
    const params = {
      ExpressionAttributeValues: {
        ':k': { S: key },
      },
      TableName,
      IndexName: 'url-key-index',
      KeyConditionExpression: 'url_key = :k',
    }

    const result = this.$aws_ddb().query(params).promise()
    await result.then((res) => {
      const item = getQueryItem(res.Items)
      commit('setOrder', item)
    })
    return result
  },

  async putOrderItem({ commit }, values) {
    const createAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const params = {
      TableName,
      Item: {
        order_id: { S: values.orderId },
        order_status: { S: values.orderStatus },
        product_options: { M: values.productOptions },
        order_number: { S: values.orderNumber },
        name_kanzi: { S: values.nameKanzi },
        name_furigana: { S: values.nameFurigana },
        email: { S: values.email },
        line_id: { S: values.lineId },
        cell_phone_number: { S: values.cellPhoneNumber },
        postal_code: { S: values.postalCode || '' },
        address1: { S: values.address1 },
        address2: { S: values.address2 },
        comment: { S: values.comment },
        price: { N: String(values.price) },
        is_send_email: { BOOL: values.isSendEmail },
        is_send_line: { BOOL: values.isSendLine },
        url_key: { S: values.urlKey },
        idempotency_key: { S: values.idempotencyKey },
        payment_status: { S: String(values.paymentStatus) },
        payment_order_id: { S: values.paymentOrderId },
        payment_source_type: { S: values.paymentSourceType },
        has_picture: { BOOL: false },
        is_delete: { BOOL: false },
        create_at: { S: createAt },
        update_at: { S: createAt },
      },
    }
    const result = this.$aws_ddb().putItem(params).promise()
    await result.then((res) => {
      console.log(res)
    })
    return result
  },
  /**
   *
   * @param {*} param0
   * @param {*} params
   * @returns
   */
  // TODO:
  async updateOrderItem({ commit }, values) {
    const params = {
      ExpressionAttributeNames: {
        '#OS': 'order_status',
        // TODO:
        // '#IK': 'idempotency_key',
        // '#POI': 'payment_order_id',
        // '#PST': 'payment_source_type',
      },
      ExpressionAttributeValues: {
        ':os': {
          S: 'values.update_order_status',
        },
      },
      Key: {
        order_id: {
          S: values.order_id.S,
        },
      },
      TableName,
      // UpdateExpression: 'SET #OS = :os, #IK = :ik, #POI = :poi, #PST = :pst',
    }
    const result = this.$aws_ddb().updateItem(params).promise()
    await result.then((res) => {
      commit('setProduct', res.Item)
    })
    return result
  },
  async updateOrder({ commit }, { params }) {
    // TODO: mock url
    const result = await this.$axios.$put('/orders', { params })
    return result
  },
}
