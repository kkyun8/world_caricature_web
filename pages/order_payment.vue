<template>
  <div class="order_payment">
    <div class="container">
      <section class="main-content columns mb-6">
        <div class="container column is-10 mb-6">
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
                <product-collapses :products="cartItems" />
                <!-- TODO: -->
                <div class="card mt-6">
                  <div class="card-content">
                    <div class="content">
                      <h3>注文情報</h3>
                      <div class="order-info-row">
                        <div class="border-bottom-line">
                          {{ orderLabelObj['nameKanzi'] }}:{{ order.nameKanzi }}
                        </div>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['nameFurigana'] }}:{{
                            order.nameFurigana
                          }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['isSendEmail'] }}:
                          <template v-if="order.isSendEmail">
                            {{ orderLabelObj['email'] }} {{ order.email }}<br />
                          </template>
                          <template v-else>
                            {{ orderLabelObj['lineId'] }} {{ order.lineId }}
                          </template>
                        </span>
                        <span class="border-bottom-line">
                          {{ orderLabelObj['cellPhoneNumber'] }}:
                          {{ order.cellPhoneNumber }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['postalCode'] }}:{{
                            order.postalCode
                          }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['address1'] }}:{{ order.address1 }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['address2'] }}:{{ order.address2 }}
                        </span>
                      </div>
                      <div class="order-info-row">
                        <span class="border-bottom-line">
                          {{ orderLabelObj['comment'] }}:{{ order.comment }}
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

                      <b-button
                        id="sq-creditcard"
                        type="is-primary"
                        outlined
                        expanded
                        @click="onGetCardNonce($event)"
                        >¥{{ order.price }} 決済</b-button
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
import ProductCollapses from '~/components/ProductCollapses'
moment.locale('ja')

export default {
  name: 'OrderPayment',
  components: {
    ProductCollapses,
  },
  data() {
    return {
      reserveDates: [
        moment().add(1, 'week').toDate(),
        moment().add(2, 'week').toDate(),
      ],
      isPaymentLoading: false,
      paymentErrors: {
        CreditCardNumber: [],
        Cvv: [],
        ExpirationDate: [],
      },
    }
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      order: (state) => state.order_info.order,
      orderLabelObj: (state) => state.order_info.orderLabelObj,
      isSqPaymentLoading: (state) => state.order_payment.isSqPaymentLoading,
    }),
    // TODO: order.productIds, not cart
    ...mapGetters({
      productItemInCart: 'products/productItemInCart',
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
    cartItems() {
      const result = this.productItemInCart(this.cart)
      return result
    },
  },
  mounted() {
    this.setPaymentForm()
  },
  beforeDestroy() {
    this.paymentForm.destroy()
  },
  methods: {
    ...mapActions('order_info', ['putOrderItem']),
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
          async cardNonceResponseReceived(errors, nonce, cardData) {
            const t = th
            t.isLoading = true
            const amount = t.order.price
            const currency = 'JPY'
            const order = t.order
            // card error
            // TODO: set english to japanese
            if (errors) {
              errors.forEach(function (error) {
                console.error('  ' + error.message)
              })
              t.isLoading = false
              return
            }

            await fetch('/process-payment', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nonce,
                amount,
                currency,
                order,
              }),
            })
              .catch((err) => {
                console.log(err)
              })
              .then((response) => {
                if (!response.ok) {
                  return response
                    .text()
                    .then((errorInfo) => Promise.reject(errorInfo))
                }
                return response.text()
              })
              .then((data) => {
                console.log(data)
                // TODO:
                // add order and payment result
                const values = JSON.parse(JSON.stringify(t.order))
                values.orderId = t.createOrderId()
                values.orderStatus = '決済済み'

                const putOrderItem = t.putOrderItem(values)
                t.callApis([putOrderItem])
                putOrderItem.then(() => {
                  t.$router.push({
                    path: 'payment_complete',
                    query: { id: values.orderId },
                  })
                })
              })
              .catch((err) => {
                console.log(err)
              })
              .finally(() => {
                t.isLoading = false
              })
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
