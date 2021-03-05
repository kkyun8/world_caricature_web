<template>
  <div id="product_detail">
    <section class="main-content columns mt-6">
      <div class="container column is-10">
        <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/products" class="navbar-item">商品一覧</nuxt-link>
            </li>
            <li class="is-active">
              <a href="#" aria-current="page">商品詳細</a>
            </li>
          </ul>
        </nav>
        <div v-if="product.id" class="content">
          <div class="columns">
            <div class="column">
              <article class="media">
                <figure class="image is-128x128">
                  <img
                    src="https://bulma.io/images/placeholders/128x128.png"
                    alt="Image"
                  />
                </figure>
              </article>
              <div class="box mt-6 mb-6">
                <article class="media">
                  <div class="media-left">
                    <figure class="image is-128x128">
                      <img
                        src="https://bulma.io/images/placeholders/128x128.png"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <template v-if="artist.artist_nickname">
                          <strong>担当作家：{{ artist.name.S }}</strong>
                          <br />
                          <small
                            >経歴：役{{ artist.service_years.N }}年
                            {{ artist.career_data.S }}
                            <br />
                          </small>
                          <br />
                        </template>

                        作家からのコメント：{{ product.artist_comment.S }}
                        <br />
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div class="column">
              <h1>{{ product.title.S }}</h1>
              <div class="m-4">
                {{ product.information.S }}
              </div>
              <div class="m-4">
                人数：{{ product.number_of_people.N }}名
                <br />
                タイプ：{{ orderTypeName }}
                <br />
                {{ product.price.N }}円
                <br />
                作業時間：
                {{ product.production_time.S }}
              </div>
              <div class="columns">
                <div class="column">
                  <b-button
                    type="is-primary is-light"
                    icon-pack="fas"
                    icon-left="cart-plus"
                    expanded
                    @click="pushCart"
                    >カートに追加</b-button
                  >
                </div>
                <div class="column">
                  <nuxt-link to="/products"
                    ><b-button
                      type="is-warning is-light"
                      icon-pack="fas"
                      icon-left="list-alt"
                      expanded
                      >一覧に戻る</b-button
                    ></nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
          <b-tabs position="is-centered" expanded>
            <b-tab-item label="商品詳細" icon="google-photos">
              {{ product.product_detail_image_url.S }}
            </b-tab-item>
            <b-tab-item label="レビュー" icon="library-music"></b-tab-item>
            <b-tab-item
              label="返品・払い戻しについて"
              icon="video"
            ></b-tab-item>
          </b-tabs>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ProductDetail',

  computed: {
    ...mapState({
      artist: (state) => state.artists.artist,
      product: (state) => state.products.product,
      cart: (state) => state.cart.cart,
      cartMaxCount: (state) => state.cart.cartMaxCount,
      cartLocalStorageKey: (state) => state.common.cartLocalStorageKey,
    }),
    orderTypeName() {
      if (!this.product.id) return ''
      const result = this.product.order_type.NS.join(' ')
      return result
    },
  },
  watch: {
    product(newVal) {
      if (newVal?.artist_nickname.S) {
        const getArtistItem = this.getArtistItem({
          artistNickname: newVal.artist_nickname.S,
        })
        this.callApis([getArtistItem])
      }
    },
  },
  created() {
    this.isLoading = true
    const getProductItem = this.getProductItem({ id: this.$route.query.id })
    this.callApis([getProductItem])
  },
  methods: {
    ...mapActions('artists', ['getArtistItem']),
    ...mapActions('products', ['getProductItem']),
    ...mapMutations({
      setCart: 'cart/setCart',
    }),
    pushCart() {
      if (this.cartMaxCount <= this.cart.length) {
        const msg = `カートの最大商品数（${this.cartMaxCount}個）以上セットできません。<br />分割注文してください。`
        return this.$buefy.dialog.alert(msg)
      }
      const userCart = [...this.cart]
      userCart.push(this.product.id)
      this.setCart(userCart)

      this.setLocalStorage(this.cartLocalStorageKey, userCart)

      this.$buefy.notification.open({
        duration: 5000,
        message: 'カートに追加されました。',
        position: 'is-top',
        type: 'is-success',
      })
    },
  },
}
</script>

<style></style>
