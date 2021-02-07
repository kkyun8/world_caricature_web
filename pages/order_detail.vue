<template>
  <div id="order_detail">
    <div class="container">
      <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">商品選択</a></li>
          <li class="is-active">
            <a href="#" aria-current="page">注文詳細</a>
          </li>
        </ul>
      </nav>
      <section class="main-content columns mb-6">
        <div class="container column is-10 mb-6">
          <div class="containar is-max-desktop">
            <div class="content"><h2>オブション</h2></div>
            <div class="columns">
              <!-- TODO:  オブション説明イメージ表示、 -->
              <div class="column">
                <b-image
                  src="https://picsum.photos/id/1062/1600/900"
                  srcset="https://picsum.photos/id/1062/400/225 400w, https://picsum.photos/id/1062/800/450 800w, https://picsum.photos/id/1062/1600/900 1600w"
                  ratio="16by9"
                ></b-image>
              </div>
              <div class="columns">
                <div class="column is-full">
                  <product-collapses
                    :cart-items="cartItems"
                    :product-options="productOptions"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="container is-max-desktop">
            <div class="columns">
              <div
                class="column is-three-fifths is-offset-one-fifth has-text-centered mb-6"
              >
                <div class="mt-6 mb-6">
                  <div class="border-bottom-line">
                    <span>作品価格合計</span>
                    <span>{{ productPrice }}円</span>
                  </div>
                  <div class="border-bottom-line">
                    <span>フレーム追加価格</span>
                    <span>{{ flamePrice }}円</span>
                  </div>
                  <div class="border-bottom-line">
                    <span>ラッピング追加価格</span>
                    <span>{{ wrappingPrice }}円</span>
                  </div>
                  <div class="border-bottom-line">
                    <span>支払い金額</span>
                    <span>{{ totalPrice }}円</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <h2>注文者情報</h2>
              <div class="columns">
                <div class="column">
                  <b-field label="漢字">
                    <b-input
                      v-model="editOrder.nameKanzi"
                      placeholder="田中太郎"
                      required
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="フリガナ">
                    <b-input
                      v-model="editOrder.nameFurigana"
                      placeholder="タナカタロウ"
                      required
                    ></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-message type="is-info" has-icon>
                    注文が完了されたら、注文情報や運送情報を確認できるアカウントを決めてください。
                  </b-message>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-radio-button
                    v-model="editOrder.isSendEmail"
                    :native-value="true"
                    type="is-primary is-light is-outlined"
                  >
                    <b-icon icon="email"></b-icon>
                    <span>メールでやりとり</span>
                  </b-radio-button>
                </div>
                <div class="column">
                  <b-radio-button
                    v-model="editOrder.isSendEmail"
                    :native-value="false"
                    type="is-success is-light is-outlined"
                  >
                    <b-icon icon="chat"></b-icon>
                    <span>ラインアカウントでやりとり</span>
                  </b-radio-button>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field label="連絡方法 メール">
                    <b-input
                      v-model="editOrder.email"
                      placeholder="mail@mail.com"
                      type="email"
                      :disabled="!editOrder.isSendEmail"
                      :required="editOrder.isSendEmail"
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="連絡方法 ライン">
                    <!-- v-model="editOrder.lineId"-->
                    <b-button
                      expanded
                      type="primary"
                      :disabled="editOrder.isSendEmail"
                      :required="!editOrder.isSendEmail"
                      ><i class="fab fa-line fa-2x" style="color: #00b900"></i
                    ></b-button>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field label="電話番号 携帯">
                    <b-input
                      v-model="editOrder.cellPhoneNumber"
                      placeholder="09012345678"
                      :validation-message="validateMsg.phone"
                      pattern="[0-9]*"
                      minlength="10"
                      maxlength="11"
                      required
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="郵便番号">
                    <b-input
                      v-model="editOrder.postalCode"
                      placeholder="123-4567"
                      :validation-message="validateMsg.postalCode"
                      pattern="\d{3}-\d{4}"
                      minlength="8"
                      maxlength="8"
                      required
                    ></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field label="住所">
                    <b-input
                      v-model="editOrder.address1"
                      placeholder="東京都豊島区"
                      required
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="住所 詳細">
                    <b-input
                      v-model="editOrder.address2"
                      placeholder="1-2-3 101号"
                      required
                    ></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field label="コメント">
                    <textarea
                      v-model="editOrder.comment"
                      class="textarea"
                      placeholder="コメントを入力してください。（任意）"
                    ></textarea>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <nuxt-link to="/products" class="button is-fullwidth"
                    ><i class="fa fa-backward mr-1" aria-hidden="true"></i
                    >サンプルオーダーにもどる</nuxt-link
                  >
                </div>
                <div class="column">
                  <div
                    class="button is-fullwidth is-primary"
                    @click="createOrderPayment()"
                  >
                    <i class="fa fa-credit-card mr-1" aria-hidden="true"></i
                    >支払いする
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import ProductCollapses from '~/components/ProductCollapses'

export default {
  name: 'OrderDetail',
  components: {
    ProductCollapses,
  },
  data() {
    return {
      validateMsg: {
        phone: 'ハイフン（-）なしで半角数字のみ入力してください。',
        postalCode: '郵便番号形式ではありません。',
      },
      editOrder: {},
      productOptions: {},
    }
  },
  computed: {
    ...mapState({
      defaultOrder: (state) => state.order_info.defaultOrder,
      cart: (state) => state.cart.cart,
    }),
    ...mapGetters({
      productItemInCart: 'products/productItemInCart',
    }),
    cartItems() {
      const result = this.productItemInCart(this.cart).filter((i) => i)
      return result
    },
    productPrice() {
      const result = this.cartItems.reduce((a, i) => {
        return a + i.price
      }, 0)
      return result
    },
    // TODO:
    // flameSize L + ¥1500
    flamePrice() {
      const options = this.productOptions
      const result = this.cartItems.reduce((a, i) => {
        const flame = options[i.id]?.flameSize === 'L' ? 1500 : 0
        return a + flame
      }, 0)
      return result
    },
    // TODO:
    // wrapping  + ¥1000
    wrappingPrice() {
      const options = this.productOptions
      const result = this.cartItems.reduce((a, i) => {
        const wrapping = options[i.id]?.premiumWrapping ? 1000 : 0
        return a + wrapping
      }, 0)
      return result
    },
    totalPrice() {
      return this.productPrice + this.flamePrice + this.wrappingPrice
    },
  },
  created() {
    this.editOrder = JSON.parse(JSON.stringify(this.defaultOrder))
    const flameSize = 'M'
    const premiumWrapping = false
    const result = this.cartItems.reduce((a, c) => {
      const { id } = c
      a[id] = {
        flameSize,
        premiumWrapping,
      }
      return a
    }, {})
    this.productOptions = result
  },
  beforeDestroy() {
    this.editOrder = {}
  },
  methods: {
    ...mapMutations({
      setOrder: 'order_info/setOrder',
    }),
    createOrderPayment() {
      // TODO: alert & cart delete
      this.setOrder(this.editOrder)
      this.$router.push({
        path: 'order_payment',
      })
    },
  },
}
</script>

<style>
.border-bottom-line {
  border-bottom: 1px solid #ededed;
  top: 50%;
  position: relative;
  padding: 15px;
}
</style>
