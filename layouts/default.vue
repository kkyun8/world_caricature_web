<template>
  <div>
    <b-navbar class="container">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="World Caricature"
          />
        </b-navbar-item>
      </template>
      <template #start>
        <nuxt-link :to="{ path: '/#features' }" class="navbar-item"
          >注文の流れ</nuxt-link
        >
        <nuxt-link to="/artists" class="navbar-item">作家紹介</nuxt-link>
        <nuxt-link to="/products" class="navbar-item"
          >商品一覧から注文する</nuxt-link
        >
        <nuxt-link to="/order/search" class="navbar-item">注文確認</nuxt-link>
        <nuxt-link :to="{ path: '/#artist-contact' }" class="navbar-item"
          >アーティスト募集</nuxt-link
        >

        <nuxt-link to="/fqa" class="navbar-item">よくある質問</nuxt-link>
      </template>

      <template #end>
        <!-- TODO: login icon
          <div class="navbar-item">
          <font-awesome-layers full-width class="fa-2x has-text-primary">
            <font-awesome-icon icon="sign-in-alt" class="is-primary" />
          </font-awesome-layers>
        </div> -->
        <div class="navbar-item">
          <font-awesome-layers
            full-width
            class="fa-2x has-text-primary"
            @click="isCartModalActive = true"
          >
            <font-awesome-icon icon="shopping-cart" class="is-primary" />
            <font-awesome-layers-text
              counter
              :value="cartCount"
              position="top-right"
              style="right: -10px"
              class="fa-lg"
            />
          </font-awesome-layers>
        </div>
      </template>
    </b-navbar>
    <nuxt />
    <Footer />
    <b-loading
      v-model="isLoading"
      :is-full-page="false"
      :can-cancel="false"
    ></b-loading>
    <b-modal v-model="isCartModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <template v-if="cart.length === 0">
            カートに商品がありません。
          </template>
          <template v-else>
            <b-button
              label="チェックを全て外す"
              type="is-warning"
              icon-left="close"
              class="field"
              @click="checkedCartItems = []"
            />
            <b-button
              label="チェック商品を削除"
              type="is-error"
              icon-left="delete"
              class="field"
              :disabled="checkedCartItems.length === 0"
              @click="deleteItemInCart()"
            />
            <b-table
              :data="cartItems"
              :striped="true"
              :mobile-cards="true"
              :checkbox-position="'left'"
              :checked-rows.sync="checkedCartItems"
              checkable
            >
              <b-table-column v-slot="props" field="no" label="No">
                {{ props.row.no }}
              </b-table-column>
              <b-table-column v-slot="props" field="title" label="タイトル">
                {{ props.row.title.S }}
              </b-table-column>
              <b-table-column
                v-slot="props"
                field="number_of_people"
                label="人数"
              >
                {{ props.row.number_of_people.N }}名
              </b-table-column>
              <b-table-column v-slot="props" field="price" label="値段">
                {{ props.row.price.N }}円
              </b-table-column>
              <template>
                <div class="has-text-right">
                  <strong>決済金額：{{ totalPrice }}円</strong>
                </div>
              </template>
            </b-table>
          </template>
        </div>
        <footer class="card-footer">
          <a
            class="card-footer-item is-pr"
            :class="{ 'has-text-grey-lighter': cartCount === 0 }"
            @click="createOrder()"
            >注文作成</a
          >
          <a
            class="card-footer-item"
            :class="{ 'has-text-grey-lighter': cartCount === 0 }"
            @click="deleteAllItemInCart()"
            >カートクリア</a
          >
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Footer from '~/components/layouts/Footer'
export default {
  components: {
    Footer,
  },
  data() {
    return {
      isCartModalActive: false,
      checkedCartItems: [],
    }
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      cartLocalStorageKey: (state) => state.common.cartLocalStorageKey,
      products: (state) => state.products.products,
    }),
    ...mapGetters({
      cartCount: 'cart/cartCount',
      productItemInCart: 'products/productItemInCart',
    }),
    cartItems() {
      let result = this.productItemInCart(this.cart)

      if (result) {
        result = result.map((i, index) => {
          if (i) {
            i.no = index + 1
            return i
          }
        })
      }

      return result
    },
    totalPrice() {
      let price = 0
      if (this.cartItems) {
        price = this.cartItems.reduce((a, i) => {
          if (i) {
            a = a + parseInt(i.price.N, 10)
            return a
          }
        }, 0)
      }
      return price
    },
  },
  created() {
    this.isLoading = true
    const scanProducts = this.scanProducts()
    const scanOrderItemLabels = this.scanOrderItemLabels()
    this.callApis([scanProducts, scanOrderItemLabels])
  },
  mounted() {
    this.checkLocalStorage()
  },
  methods: {
    ...mapActions('products', ['scanProducts']),
    ...mapActions('order_master', ['scanOrderItemLabels']),
    ...mapMutations({
      setCart: 'cart/setCart',
    }),
    checkLocalStorage() {
      const key = this.cartLocalStorageKey
      const storage = localStorage
      const value = storage.getItem(key)
      if (value) {
        const items = JSON.parse(value)
        this.setCart(items)
      }
    },
    deleteItemInCart() {
      const checkNos = this.checkedCartItems.map((i) => i.no - 1)
      this.checkedCartItems = []

      const userCart = this.cart.filter((i, index) => !checkNos.includes(index))
      this.setCart(userCart)
      this.setLocalStorage(this.cartLocalStorageKey, userCart)
    },
    deleteAllItemInCart() {
      if (this.cartCount === 0) return
      this.$buefy.dialog.confirm({
        message: 'カートを空にしますか？',
        onConfirm: () => {
          this.setCart([])
          this.setLocalStorage(this.cartLocalStorageKey)
          this.$buefy.toast.open({
            message: '完了しました。',
            type: 'is-success',
          })
        },
      })
    },
    createOrder() {
      if (this.cartCount === 0) return
      this.$router.push({
        path: '/order',
      })
      this.isCartModalActive = false
    },
  },
}
</script>
