export const state = () => ({
  order: {
    sampleImageId: '',
    orderNumber: '',
    status: 1,
    flameSize: 'M',
    premiumWrapping: false,
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
  },
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
})

export const mutations = {}

export const actions = {}
