<template>
  <div class="container">
    <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        <li><a href="#">商品選択</a></li>
        <li class="is-active">
          <a href="#" aria-current="page">注文詳細</a>
        </li>
      </ul>
    </nav>
    <div class="containar is-max-desktop">
      <div class="content">
        <section v-if="order">
          <div class="columns">
            <div class="column">
              <b-field label="注文者名（漢字）">
                <b-input v-model="order.nameKanzi" disabled></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="注文者名（フリガナ）">
                <b-input v-model="order.nameFurigana" disabled></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="メールアドレス">
                <b-input v-model="order.email" disabled></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="電話番号">
                <b-input v-model="order.cellPhoneNumber" disabled></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="郵便番号">
                <b-input v-model="order.postalCode" disabled></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="お届け先">
                <b-input v-model="order.address1" disabled></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="郵便番号">
                <b-input v-model="order.address2" disabled></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="郵便番号">
                <b-input
                  v-model="order.address2"
                  type="textarea"
                  disabled
                ></b-input>
              </b-field>
              {{ order.comment }}
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="商品情報">
                <b-input
                  v-for="(op, opidx) in orderProducts"
                  :key="`opidx-${opidx}`"
                  :value="op"
                  disabled
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="支払い金額">
                <b-input v-model="order.price" disabled></b-input>
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <nuxt-link to="/order_create" class="button is-fullwidth"
                ><i class="fa fa-backward mr-1" aria-hidden="true"></i
                >注文情報を修正する</nuxt-link
              >
            </div>
            <div class="column">
              <b-button type="is-primary" expanded @click="orderConfirm"
                >注文を確定する</b-button
              >
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      order: (state) => state.order.order,
      orderStatus: (state) => state.master.orderStatus,
      products: (state) => state.products.products,
      cartLocalStorageKey: (state) => state.common.cartLocalStorageKey,
    }),
    ...mapGetters({
      createOrderId: 'order/createOrderId',
    }),
    orderProducts() {
      if (!this.order || !this.products) {
        return []
      }

      return Object.keys(this.order.productOptions).map((k) => {
        const product = this.products.find((p) => p.id.S === k)

        const value = Object.assign(product, this.order.productOptions[k])
        const title = value.title
        const flameSize = value.flameSize
        const premiumWrapping = value.premiumWrapping ? 'あり' : 'なし'

        return `タイトル：${title} フレームサイズ：${flameSize} ラッピング：${premiumWrapping}`
      })
    },
  },
  methods: {
    ...mapActions('order', ['putOrderItem']),
    ...mapMutations({
      setCart: 'cart/setCart',
    }),
    orderConfirm() {
      const t = this
      this.$buefy.dialog.confirm({
        message:
          '注文を確定しますか？確定後、メールに決済URLを送信いたします。',
        onConfirm: async () => {
          const values = JSON.parse(JSON.stringify(t.order))
          values.orderId = t.createOrderId()

          const options = Object.entries(values.productOptions).reduce(
            (a, o) => {
              const [k, v] = o
              const value = {
                M: {
                  title: { S: v.title },
                  numberOfPeople: { N: v.numberOfPeople },
                  flameSize: { S: v.flameSize },
                  premiumWrapping: { BOOL: v.premiumWrapping },
                },
              }
              a[k] = value
              return a
            },
            {}
          )
          values.productOptions = options

          const status = t.orderStatus.find((o) => o.labelId.N === '1')
          values.orderStatus = status.label.S

          const keyDate = new Date().getTime().toString()

          const random = []
          while (random.length < 20) {
            random.push(Math.floor(Math.random() * 10))
          }

          values.urlKey = keyDate + random.join('')

          const putOrderItem = t.putOrderItem(values)
          t.callApis([putOrderItem])

          await putOrderItem.then(() => {
            t.setCart([])
            t.setLocalStorage(t.cartLocalStorageKey)
            t.$router.push({
              path: '/order/complete',
            })
          })
        },
      })
    },
  },
}
</script>

<style></style>
