<template>
  <div class="order_payment">
    <div class="container">
      <section class="main-content columns mb-6">
        <div v-if="!isActiveKey" class="container column is-10 mb-6">
          無効なURLです。URLを確認してください。
        </div>
        <div v-else class="container column is-10 mb-6">
          <div class="containar is-max-desktop">
            <div class="content"><h2>注文情報確認</h2></div>
            <div class="columns">
              <div class="column is-two-fifths">
                <b-message type="is-info">
                  作家の事情によりますが、基本注文日から１〜２週間の間に発送されます。ご注意ください。
                </b-message>
                <b-datepicker v-model="reserveDates" inline range disabled>
                  <template #header>
                    <div class="content mt-1" style="text-align: center">
                      お届け予定日：{{ reserveDateJp }}
                    </div>
                  </template>
                </b-datepicker>
              </div>
              <div class="column">
                <div class="card mt-6">
                  <div class="card-content">
                    <div v-if="order" class="content">
                      <h3>注文情報</h3>
                      <div class="order-info-row">
                        <div class="border-bottom-line">
                          {{ orderLabelObj['nameKanzi'] }}:{{
                            order.name_kanzi.S
                          }}
                        </div>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['nameFurigana'] }}:{{
                            order.name_furigana.S
                          }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['email'] }}: {{ order.email.S }}
                        </span>
                        <span class="border-bottom-line">
                          {{ orderLabelObj['cellPhoneNumber'] }}:
                          {{ order.cell_phone_number.S }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['postalCode'] }}:{{
                            order.postal_code.S
                          }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['address1'] }}:{{ order.address1.S }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['address2'] }}:{{ order.address2.S }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['comment'] }}:{{ order.comment.S }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns mt-6">
              <div class="column is-three-fifths is-offset-one-fifth">
                <b-message type="is-info">
                  決済は<b>クレジットカードのみです。</b><br />
                  ワルド似顔絵は<a
                    target="_blank"
                    href="https://squareup.com/"
                    class="has-text-weight-bold"
                    >決済システムSquare</a
                  >を利用し、<br />より安全な決済ができます。
                </b-message>
                test number 4111 1111 1111 1111 Expiration date 12/21 CVV 111
                <b-progress
                  type="is-primary"
                  size="is-medium"
                  :max="1000"
                ></b-progress>
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      <div class="columns">
                        <div class="column">
                          <div class="field">
                            <label class="label">カード番号</label>
                            <div class="control has-icons-right">
                              <input id="sq-card-number" class="input" />
                            </div>
                            <p
                              id="payment-errors-credit-card"
                              class="help is-danger"
                            ></p>
                          </div>
                        </div>
                      </div>
                      <div class="columns">
                        <div class="column">
                          <div class="field">
                            <label class="label">有効期限</label>
                            <div class="control has-icons-right">
                              <input id="sq-expiration-date" class="input" />
                            </div>
                            <p
                              id="payment-errors-expiration-date"
                              class="help is-danger"
                            ></p>
                          </div>
                        </div>
                        <div class="column">
                          <label class="label">CVV</label>
                          <div class="control has-icons-right">
                            <input id="sq-cvv" class="input" />
                          </div>
                          <p id="payment-errors-cvv" class="help is-danger"></p>
                        </div>
                      </div>
                      <template v-if="order.price">
                        <b-button
                          id="sq-creditcard"
                          type="is-primary"
                          outlined
                          expanded
                          @click="onGetCardNonce($event)"
                          >¥{{ order.price.N }} 決済</b-button
                        >
                      </template>
                      <span
                        v-for="(ecn, iecn) in paymentErrors.creditCardNumber"
                        :key="`iecn${iecn}`"
                        class="has-text-danger"
                        >{{ ecn }}</span
                      >
                      <span
                        v-for="(ecv, iecv) in paymentErrors.cvv"
                        :key="`iecv${iecv}`"
                        class="has-text-danger"
                        >{{ ecv }}</span
                      >
                      <span
                        v-for="(ped, iped) in paymentErrors.expirationDate"
                        :key="`iped${iped}`"
                        class="has-text-danger"
                        >{{ ped }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <b-notification :closable="false">
      <b-loading
        v-model="isSqPaymentLoading"
        :is-full-page="true"
        :can-cancel="true"
      >
      </b-loading>
    </b-notification>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
moment.locale('ja')

export default {
  layout: 'only_footer',
  data() {
    return {
      reserveDates: [
        moment().add(1, 'week').toDate(),
        moment().add(2, 'week').toDate(),
      ],
      isPaymentLoading: false,
      paymentErrors: {
        creditCardNumber: [],
        cvv: [],
        expirationDate: [],
      },
      isActiveKey: false,
    }
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
      order: (state) => state.order_info.order,
      orderLabelObj: (state) => state.order_info.orderLabelObj,
      orderStatus: (state) => state.order_master.orderStatus,
      orderTypes: (state) => state.order_master.orderTypes,
      isSqPaymentLoading: (state) => state.order_payment.isSqPaymentLoading,
    }),
    ...mapGetters({
      createOrderId: 'order_info/createOrderId',
    }),
    reserveDateJp() {
      if (this.reserveDates[0] === undefined) return ''
      const fDate = moment(this.reserveDates[0])
      const tDate = moment(this.reserveDates[1])
      const f = fDate.format('MMM') + fDate.format('Do')
      const t = tDate.format('MMM') + tDate.format('Do')

      return `${f} ~ ${t}`
    },
  },
  beforeDestroy() {
    this.paymentForm.destroy()
  },
  mounted() {
    const key = this.$route.params.key
    if (!key) {
      return (this.isActiveKey = false)
    }
    const getOrderItemFromUrlKey = this.getOrderItemFromUrlKey(key)
    this.callApis([getOrderItemFromUrlKey])

    getOrderItemFromUrlKey
      .then(() => {
        this.isActiveKey = true
        this.setPaymentForm()
      })
      .catch(() => (this.isActiveKey = false))
  },
  created() {
    this.isLoading = true
    const scanProducts = this.scanProducts()
    const scanOrderItemLabels = this.scanOrderItemLabels()
    this.callApis([scanProducts, scanOrderItemLabels])
  },
  methods: {
    ...mapActions('products', ['scanProducts']),
    ...mapActions('order_info', ['getOrderItemFromUrlKey']),
    ...mapActions('order_master', ['scanOrderItemLabels']),
    ...mapActions('order_payment', ['createPayment']),
    ...mapMutations({
      setOrder: 'order_info/setOrder',
      setIsSqPaymentLoading: 'order_payment/setIsSqPaymentLoading',
    }),
    openLoading() {
      this.isPaymentLoading = true
      setTimeout(() => {
        this.isPaymentLoading = false
      }, 10 * 1000)
    },
    onGetCardNonce(event) {
      event.preventDefault()
      this.paymentForm.requestCardNonce()
    },
    setPaymentForm() {
      const th = this
      // set SqPaymentForm to header
      this.paymentForm = new SqPaymentForm({ // eslint-disable-line
        applicationId: process.env.SQUARE_APPLICATION_ID,
        inputClass: 'sq-input',
        autoBuild: false,
        inputStyles: [
          {
            fontSize: '16px',
            lineHeight: '24px',
            placeholderColor: '#a0a0a0',
            backgroundColor: 'transparent',
          },
        ],
        cardNumber: {
          elementId: 'sq-card-number',
          placeholder: 'カード番号',
        },
        cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV',
        },
        expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY',
        },
        postalCode: false,
        callbacks: {
          cardNonceResponseReceived(errors, nonce, cardData) {
            const t = th

            t.paymentErrors.creditCardNumber = []
            t.paymentErrors.cvv = []
            t.paymentErrors.expirationDate = []
            t.isLoading = true
            const amount = t.order.price.N
            const currency = 'JPY'
            const order = t.order
            // TODO: set english to japanese
            if (errors) {
              t.paymentErrors.creditCardNumber = errors
                .filter((e) => (e.field ? e.field === 'cardNumber' : false))
                .map((e) => e.message)
              t.paymentErrors.cvv = errors
                .filter((e) => (e.field ? e.field === 'cvv' : false))
                .map((e) => e.message)
              t.paymentErrors.expirationDate = errors
                .filter((e) => (e.field ? e.field === 'expirationDate' : false))
                .map((e) => e.message)

              t.isLoading = false
              return
            }
            const createPayment = t.createPayment({
              nonce,
              amount,
              currency,
              order,
            })
            t.callApis([createPayment])
            createPayment
              .then((res) => {
                t.$router.push({
                  path: '/payment/complete',
                })
              })
              // TODO: error
              .catch((err) => console.log(err))
          },
        },
      })
      this.paymentForm.build()
    },
  },
}
</script>

<style>
.order-info-row {
  display: flex;
  flex-direction: row;
}
.border-bottom-line {
  border-bottom: 1px solid #ededed;
  top: 50%;
  position: relative;
  padding: 15px;
  width: 100%;
}
</style>
