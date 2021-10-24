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
            </div>
            <div class="column">
              <h1>{{ product.title.S }}</h1>
              <div v-if="product.information" class="m-4">
                {{ product.information.S }}
              </div>
              <div class="m-4">
                人数：{{ product.numberOfPeople.N }}名
                <br />
                タイプ：{{ orderTypeName }}
                <br />
                {{ product.price.N }}円
                <br />
                <template v-if="product.productionTime.S">
                  作業時間：
                  {{ product.productionTime.S }}
                </template>
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
          <div class="box my-6">
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
                    <template v-if="Object.keys(artist).length > 0">
                      <strong>担当作家：{{ artist.artistNickname.S }}</strong>
                      <br />
                      <small v-if="artist.serviceYears"
                        >経歴：役{{ artist.serviceYears.N }}年
                        <template v-if="artist.careerData">{{
                          artist.careerData.S
                        }}</template>
                        <br />
                      </small>
                      <br />
                    </template>
                  </p>
                  <template v-if="product.artistComment">
                    作家からのコメント：<br />
                    <p>{{ product.artistComment.S }}</p>
                    <br />
                  </template>
                </div>
              </div>
            </article>
          </div>
          <b-tabs position="is-centered" expanded class="my-6">
            <b-tab-item label="商品詳細" icon="google-photos">
              <!-- TODO: size url -->
              <template v-if="product.productDetailImageUrl">
                {{ product.productDetailImageUrl.S }}
              </template>
            </b-tab-item>
            <b-tab-item label="クチコミ" icon="library-music">
              <product-comment />
            </b-tab-item>
            <b-tab-item
              label="返品・払い戻しについて"
              icon="video"
            ></b-tab-item>
          </b-tabs>
          <div class="columns mt-6">
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
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ProductComment from '~/components/ProductComment'
export default {
  name: 'ProductDetail',
  components: {
    ProductComment,
  },
  computed: {
    ...mapState({
      artist: (state) => state.artists.artist,
      product: (state) => state.products.product,
      cart: (state) => state.cart.cart,
      cartMaxCount: (state) => state.cart.cartMaxCount,
      cartLocalStorageKey: (state) => state.common.cartLocalStorageKey,
      productComments: (state) => state.comment.productComments,
    }),
    orderTypeName() {
      if (!this.product.id) return ''
      const result = this.product.orderType.SS.join('、')
      return result
    },
  },
  watch: {
    product(newVal) {
      if (newVal?.artistNickname.S) {
        const queryArtistArtistNickname = this.queryArtistArtistNickname({
          artistNickname: newVal.artistNickname.S,
        })
        this.callApis([queryArtistArtistNickname])
      }
    },
  },
  created() {
    this.isLoading = true
    const getProductItem = this.getProductItem({ id: this.$route.params.id })
    const queryProductComments = this.queryProductComments({
      productId: this.$route.params.id,
    })

    this.callApis([getProductItem, queryProductComments])
  },
  methods: {
    ...mapActions('artists', ['queryArtistArtistNickname']),
    ...mapActions('artists', ['queryArtistArtistNickname']),
    ...mapActions('products', ['getProductItem']),
    ...mapActions('comment', ['queryProductComments']),
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
