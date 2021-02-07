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
                  <footer class="card-footer">
                    <div class="card-footer-item">
                      <nuxt-link
                        to="/order_detail"
                        class="button is-fullwidth is-primary"
                        ><i class="fa fa-backward mr-1" aria-hidden="true"></i
                        >注文情報を修正する</nuxt-link
                      >
                    </div>
                  </footer>
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
                        >決済</b-button
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
import { mapState, mapMutations, mapGetters } from 'vuex'
// import { Client, Environment } from 'square'
import Axios from 'axios'
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
    // TODO: bug moment.js add 2 weeks
    // const result = new Date()
    // result.setDate(result.getDate() + 2)
    // const result1 = new Date()
    // this.reserveDates[0] = result1
    // this.reserveDates[1] = result
    this.setPaymentForm()
  },
  methods: {
    ...mapMutations({
      setIsSqPaymentLoading: 'order_payment/setIsSqPaymentLoading',
    }),
    openLoading() {
      this.isPaymentLoading = true
      setTimeout(() => {
        this.isPaymentLoading = false
      }, 10 * 1000)
    },
    onGetCardNonce(event) {
      // document.getElementById('order').value = JSON.stringify(this.order)
      event.preventDefault()
      this.paymentForm.requestCardNonce()
    },
    setPaymentForm() {
      const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0
          const v = c === 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        })
      }

      // const client = new Client({
      //   environment: Environment.Sandbox,
      //   accessToken: process.env.SQUARE_ACCESS_TOKEN,
      // })

      // SqPaymentFormはhtml headからセットしてるのでeslintエラーになってしまうのでdisable
      this.paymentForm = new SqPaymentForm({ // eslint-disable-line
        applicationId: process.env.SQUARE_APPLICATION_ID,
        inputClass: 'sq-input',
        autoBuild: false,
        // Customize the CSS for SqPaymentForm iframe elements
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
            // error message google transter
            const paymentErrors = {
              CreditCardNumber: [],
              Cvv: [],
              ExpirationDate: [],
            }
            if (errors) {
              errors.forEach((error) => {
                const c = error.message
                if (c.includes('Credit card number')) {
                  paymentErrors.CreditCardNumber.push(c)
                } else if (c.includes('CVV')) {
                  paymentErrors.Cvv.push(c)
                } else if (c.includes('Expiration date')) {
                  paymentErrors.ExpirationDate.push(c)
                } else {
                }
              })

              // focus
              document.getElementById(
                'payment-errors-credit-card'
              ).innerHTML = paymentErrors.CreditCardNumber.join(' ')

              document.getElementById(
                'payment-errors-cvv'
              ).innerHTML = paymentErrors.Cvv.join(' ')

              document.getElementById(
                'payment-errors-expiration-date'
              ).innerHTML = paymentErrors.ExpirationDate.join(' ')
            } else {
              // focus
              document.getElementById('payment-errors-credit-card').innerHTML =
                ''
              document.getElementById('payment-errors-cvv').innerHTML = ''
              document.getElementById(
                'payment-errors-expiration-date'
              ).innerHTML = ''

              const money = {
                amount: 200,
                currency: 'USD',
              }

              const body = {
                sourceId: nonce,
                idempotencyKey: uuidv4(),
                amountMoney: money,
                autocomplete: true,
              }
              const token = process.env.SQUARE_ACCESS_TOKEN
              const payment = Axios.create({
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer' + token,
                  'Access-Control-Allow-Origin': '*',
                },
              })
              await payment
                .post('https://connect.squareupsandbox.com/v2/payments', {
                  body,
                })
                .then((req) => {
                  console.log(req)
                })
                .catch((err) => {
                  console.log(err)
                })

              // payment
              // try {
              //   const result = await client.paymentsApi.createPayment(body)
              //   console.log(result)
              //   // Get more response info...
              //   // const { statusCode, headers } = httpResponse;
              // } catch (error) {
              //   console.log(error)
              //   // const { statusCode, headers } = error;
              // }
            }
          },
        },
      })
      this.paymentForm.build()
      // this.showPaymentFormFlg = false
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
