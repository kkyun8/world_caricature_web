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
        <nuxt-link to="/order_flow" class="navbar-item">注文の流れ</nuxt-link>
        <nuxt-link to="/artists" class="navbar-item">作家紹介</nuxt-link>
        <nuxt-link to="/products" class="navbar-item"
          >注文する・商品一覧</nuxt-link
        >
        <nuxt-link to="/order_search" class="navbar-item">注文確認</nuxt-link>
        <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
        <nuxt-link to="/contact" class="navbar-item">Contact</nuxt-link>
      </template>

      <template #end>
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
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>ワルド似顔絵</strong>
          <a href="#">Jeremy Thomas</a>. The source code is licensed
          <a href="#">MIT</a>. The website content is licensed
        </p>
      </div>
    </footer>
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
            <div
              v-for="(p, pidx) in cartItem"
              :key="`item-${pidx}`"
              class="box mt-6 mb-6"
            >
              <div>{{ p.title }} {{ p.information }}</div>
              <b-button
                type="is-danger"
                icon-left="delete"
                @click="deleteItemInCart(p.id)"
              >
                削除
              </b-button>
            </div>
          </template>
        </div>
        <footer class="card-footer">
          <a
            class="card-footer-item"
            :disabled="cartCount === 0"
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
export default {
  data() {
    return {
      isCartModalActive: false,
    }
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      cartCookieKey: (state) => state.common.cartCookieKey,
      products: (state) => state.products.products,
    }),
    ...mapGetters({
      cartCount: 'cart/cartCount',
    }),
    cartItem() {
      return this.products.filter((p) => this.cart.includes(p.id))
    },
  },
  created() {
    this.isLoading = true
    const readProductHashTag = this.readProductHashTag()
    const readOrderStatus = this.readOrderStatus()
    const readOrderTypes = this.readOrderTypes()
    const readProductionTime = this.readProductionTime()
    const readProducts = this.readProducts()
    this.readAllApi([
      readProductHashTag,
      readOrderStatus,
      readOrderTypes,
      readProductionTime,
      readProducts,
    ])
  },
  mounted() {
    this.checkCookie()
  },
  methods: {
    ...mapActions('artists', ['readArtist']),
    ...mapActions('products', ['readProducts']),
    ...mapActions('order_master', [
      'readProductHashTag',
      'readOrderStatus',
      'readOrderTypes',
      'readProductionTime',
    ]),
    ...mapMutations({
      setCart: 'cart/setCart',
    }),
    checkCookie() {
      const key = this.cartCookieKey
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(key))
      if (cookie) {
        const cookieCart = JSON.parse(cookie.split('=')[1])
        this.setCart(cookieCart)
      }
    },
    deleteItemInCart(id) {
      const userCart = this.cart.filter((i) => id !== i)
      this.setCart(userCart)
      this.setCookie(this.cartCookieKey, userCart)
    },
    deleteAllItemInCart() {
      this.$buefy.dialog.confirm({
        message: 'カートを空にしますか？',
        onConfirm: () => {
          this.setCart([])
          this.setCookie(this.cartCookieKey)
          this.$buefy.toast.open({
            message: '完了しました。',
            type: 'is-success',
          })
        },
      })
    },
  },
}
</script>
