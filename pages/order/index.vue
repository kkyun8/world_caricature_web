<template>
  <div id="order_create">
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
            <div class="content">
              <h2>オブション</h2>
            </div>
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
                <div class="my-6">
                  <div class="border-bottom-line">
                    <span>作品価格合計</span>
                    <span>{{ productPrice }}円</span>
                  </div>
                  <div class="border-bottom-line">
                    <span>フレーム追加価格</span>
                    <span>{{ totalFlamePrice }}円</span>
                  </div>
                  <div class="border-bottom-line">
                    <span>ラッピング追加価格</span>
                    <span>{{ totalWrappingPrice }}円</span>
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
                  <b-field ref="name-kanzi-field" label="漢字">
                    <b-input
                      v-model="editOrder.nameKanzi"
                      placeholder="田中太郎"
                      required
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field ref="name-furigana-field" label="フリガナ">
                    <b-input
                      v-model="editOrder.nameFurigana"
                      placeholder="タナカタロウ"
                      :pattern="furiganaPattern"
                      :validation-message="validateMsg.nameFurigana"
                      required
                    ></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-message type="is-warning" has-icon>
                    注文情報を通知する
                  </b-message>
                </div>
              </div>
              <div class="columns">
                <div class="column is-3">
                  <b-field ref="email-field" label="メール入力">
                    <b-input
                      v-model="editOrder.email"
                      placeholder="mail@mail.com"
                      type="email"
                      required
                      expanded
                      :disabled="isLogin"
                    ></b-input>
                  </b-field>
                </div>
                <div class="column is-3">
                  <b-field
                    ref="email-confirm-field"
                    :type="{ 'is-danger': emailConfirm !== editOrder.email }"
                    :message="
                      emailConfirm !== editOrder.email
                        ? validateMsg.emailConfirm
                        : ''
                    "
                    label="メール確認"
                  >
                    <b-input
                      v-model="emailConfirm"
                      placeholder="mail@mail.com"
                      expanded
                      :disabled="isLogin"
                    ></b-input>
                  </b-field>
                </div>
                <div v-if="!$auth.loggedIn" class="column is-6">
                  <b-field label="ソーシャルログイン">
                    <b-button
                      expanded
                      type="is-success is-light"
                      @click="authLogin"
                    >
                      ここをクリックしてログインしてください。
                    </b-button>
                  </b-field>
                </div>
                <template v-else>
                  <div class="column is-3">
                    <b-field label="ソーシャル情報">
                      <b-input
                        :value="`${loginUserInfo.type}`"
                        disabled
                      ></b-input>
                    </b-field>
                  </div>
                  <div class="column is-3">
                    <b-field label="ログイン情報削除">
                      <b-button
                        expanded
                        type="is-danger is-light"
                        @click="authLogout"
                        >ログイン情報削除</b-button
                      >
                    </b-field>
                  </div>
                </template>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field ref="cell-phone-number-field" label="電話番号 携帯">
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
                  <b-field ref="postal-code-field" label="郵便番号">
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
                  <b-field ref="address-1-field" label="住所">
                    <b-input
                      v-model="editOrder.address1"
                      placeholder="*郵便番号を入力すると自動入力されます"
                      required
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field ref="address-2-field" label="住所 詳細">
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
                  <b-field ref="comment-field" label="コメント">
                    <textarea
                      v-model="editOrder.comment"
                      class="textarea"
                      placeholder="コメントを入力してください。（任意）"
                    ></textarea>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <TermsOfService
                  :is-term-checked="isTermChecked"
                  @setTermChecked="setTermChecked()"
                />
              </div>
              <div class="columns mt-6">
                <div class="column">
                  <nuxt-link to="/products" class="button is-fullwidth"
                    ><i class="fa fa-backward mr-1" aria-hidden="true"></i
                    >商品一覧にもどる</nuxt-link
                  >
                </div>
                <div class="column">
                  <b-button
                    type="is-primary"
                    expanded
                    :disabled="isNotValidated"
                    @click="createOrder()"
                  >
                    <i class="fa fa-file-import mr-1" aria-hidden="true"></i
                    >注文確認画面に進む
                  </b-button>
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
import TermsOfService from '~/components/TermsOfService'

export default {
  name: 'OrderCreate',
  components: {
    ProductCollapses,
    TermsOfService,
  },
  data() {
    return {
      furiganaPattern: '[ァ-ヶー　]+$',
      validateMsg: {
        nameKanzi: '全角文字で入力してください。',
        nameFurigana: '全角カタカナで入力してください。',
        phone: 'ハイフン（-）なしで半角数字のみ入力してください。',
        postalCode:
          '郵便番号形式ではありません。ハイフン（-）ありで半角数字のみ入力してください。',
        emailConfirm: 'メールアドレスが一致しておりません。',
      },
      fieldNameList: [
        'name-kanzi-field',
        'name-furigana-field',
        'email-field',
        'email-confirm-field',
        'cell-phone-number-field',
        'postal-code-field',
        'address-1-field',
        'address-2-field',
      ],
      editOrder: {},
      emailConfirm: '',
      productOptions: {},
      isTermChecked: false,
      totalFlamePrice: 0,
      totalWrappingPrice: 0,
    }
  },
  computed: {
    ...mapState({
      defaultOrder: (state) => state.order.defaultOrder,
      cart: (state) => state.cart.cart,
      flamePrice: (state) => state.master.flamePrice,
      wrappingPrice: (state) => state.master.wrappingPrice,
    }),
    ...mapGetters({
      productItemInCart: 'products/productItemInCart',
    }),
    isLogin() {
      return this.$auth.loggedIn
    },
    loginUserInfo() {
      if (this.$auth.loggedIn) {
        const { name, sub, email } = this.$auth.$state.user
        const type = sub.split('|')[0]
        return { name, type, email }
      }

      return { name: '', type: '', email: '' }
    },
    cartItems() {
      const result = this.productItemInCart(this.cart).filter((i) => i)
      if (result.length === 0) {
        this.isNoItemAlert()
      }
      return result
    },
    productPrice() {
      const result = this.cartItems.reduce((a, i) => {
        return a + Number(i.price.N)
      }, 0)
      return result
    },
    totalPrice() {
      return this.productPrice + this.totalFlamePrice + this.totalWrappingPrice
    },
    isNotValidated() {
      const checkFmsg = (field) => {
        const result = Array.isArray(field.formattedMessage)
          ? field.formattedMessage.length > 0
          : true
        return result
      }
      // editOrder.lineId
      const inputs =
        !this.editOrder.nameKanzi ||
        !this.editOrder.nameFurigana ||
        !this.editOrder.email ||
        !this.emailConfirm ||
        !this.editOrder.cellPhoneNumber ||
        !this.editOrder.postalCode ||
        !this.editOrder.address1 ||
        !this.editOrder.address2 ||
        !this.isTermChecked
      if (inputs) {
        return true
      }

      const result = this.fieldNameList.some((f) => checkFmsg(this.$refs[f]))

      return result
    },
  },
  watch: {
    editOrder: {
      async handler(newVal) {
        if (newVal.postalCode.length === 8) {
          const url = process.env.POSTAL_CODE_API_URL
          const key = process.env.POSTAL_CODE_API_KEY
          const code = newVal.postalCode.replace('-', '')
          const t = this
          await this.$axios
            .$get(`${url}apikey=${key}&postcode=${code}`)
            .then((res) => {
              t.editOrder.address1 = res.data[0].allAddress
            })
        }
      },
      deep: true,
    },
    productOptions: {
      handler(newVal) {
        const flame = Object.keys(newVal).reduce((a, r) => {
          const result = newVal[r]?.flameSize === 'L' ? this.flamePrice : 0
          return a + result
        }, 0)

        const wrapping = Object.keys(newVal).reduce((a, r) => {
          const result = newVal[r]?.premiumWrapping ? this.wrappingPrice : 0
          return a + result
        }, 0)

        this.totalFlamePrice = flame
        this.totalWrappingPrice = wrapping
      },
      deep: true,
    },
  },
  created() {
    this.editOrder = JSON.parse(JSON.stringify(this.defaultOrder))
    const flameSize = 'M'
    const premiumWrapping = false
    const result = this.cartItems.reduce((a, c) => {
      const { id, title, price } = c
      a[id.S] = {
        title: title.S,
        price: price.N,
        numberOfPeople: c.number_of_people.N,
        flameSize,
        premiumWrapping,
      }
      return a
    }, {})

    Object.keys(result).forEach((r) =>
      this.$set(this.productOptions, r, result[r])
    )
  },
  beforeDestroy() {
    this.editOrder = {}
  },
  mounted() {
    if (this.loginUserInfo.email) {
      this.editOrder.email = this.loginUserInfo.email
      this.emailConfirm = this.loginUserInfo.email
    }
  },
  methods: {
    ...mapMutations({
      setOrder: 'order/setOrder',
    }),
    isNoItemAlert() {
      this.$buefy.dialog.alert({
        message: 'カートに商品がありません。',
        onConfirm: () =>
          this.$router.push({
            path: '/',
          }),
      })
    },
    createOrder() {
      this.editOrder.productOptions = this.productOptions
      this.editOrder.price = this.totalPrice
      this.setOrder(this.editOrder)
      this.$router.push({
        path: '/order/confirm',
      })
    },
    setTermChecked() {
      this.isTermChecked = !this.isTermChecked
    },
    authLogin() {
      this.$auth.loginWith('auth0')
    },
    authLogout() {
      this.editOrder.email = ''
      this.emailConfirm = ''
      this.$auth.logout()
      this.$auth.reset()
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
