<template>
  <div id="product">
    <products-carousel />
    <div class="container">
      <section class="main-content columns">
        <div class="container column is-11 mb-6">
          <div id="search_form" class="mt-6 mb-6">
            <b-message type="is-warning">
              作家のスケジュール状況によりますが、商品が届くのは注文完了された日から２週間後です。
            </b-message>
            <b-field label="キーワードを入力してください。">
              <b-taginput
                v-model="seletedTags"
                :data="filteredTags"
                autocomplete
                field="hash"
                icon="label"
                placeholder="キーワード"
                maxtags="10"
                @typing="getFilteredTags"
              >
                <template v-slot="props">
                  {{ props.option.hash }}
                </template>
                <template #empty> There are no items </template>
              </b-taginput>
            </b-field>
          </div>
          <div class="tabs">
            <ul>
              <li
                :class="{ 'is-active': activeTab === 'recommend' }"
                @click.stop.prevent="clickTab('recommend')"
              >
                <a>おすすめ順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === 'popularity' }"
                @click.stop.prevent="clickTab('popularity')"
              >
                <a>人気順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === 'inexpensive' }"
                @click.stop.prevent="clickTab('inexpensive')"
              >
                <a>価格安い順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === 'expensive' }"
                @click.stop.prevent="clickTab('expensive')"
              >
                <a>価格高い順</a>
              </li>
            </ul>
          </div>
          <div
            v-for="(pro, pgi) in productPageItems"
            :key="`pgi${pgi}`"
            class="columns"
          >
            <template v-for="(p, pi) in pro">
              <product-image-card :key="`pgi${pgi}p${pi}`" :product="p" />
            </template>
          </div>

          <div class="mt-6">
            <b-pagination
              v-model="current"
              :total="total"
              :rounded="true"
              :per-page="perPage"
              order="is-centered"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
            </b-pagination>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ProductsCarousel from '~/components/ProductsCarousel'
import ProductImageCard from '~/components/ProductImageCard'

export default {
  name: 'Products',
  components: {
    ProductsCarousel,
    ProductImageCard,
  },
  data() {
    return {
      isSelectOnly: false,
      seletedTags: [],
      filteredTags: [],
      tags: [],
      activeTab: 'recommend',
      current: 1,
      perPage: 12,
    }
  },
  computed: {
    ...mapState({
      productHashTags: (state) => state.order_master.productHashTags,
      orderTypes: (state) => state.order_master.orderTypes,
      productionTimes: (state) => state.order_master.productionTimes,
      products: (state) => state.products.products,
    }),
    ...mapGetters('products', ['productTags']),
    total() {
      return this.products.length
    },
    productPageItems() {
      const sortType = this.activeTab

      const c = this.current
      const start = c === 1 ? 0 : (c - 1) * this.perPage
      const end = c * this.perPage

      const values = [...this.products]

      let result = values
        .sort((a, b) => {
          if (!a.sort || !b.sort) {
            return a.sort ? -1 : 1
          }

          if (sortType === 'expensive') {
            return b.price - a.price
          } else if (sortType === 'inexpensive') {
            return a.price - b.price
          } else if (a.sort.M[sortType] && b.sort.M[sortType]) {
            return a.sort.M[sortType] - b.sort.M[sortType]
          } else {
            if (a.sort.M[sortType]) {
              return -1
            }
            if (b.sort.M[sortType]) {
              return 1
            }
          }
        })
        .filter((e, i) => start < i + 1 && i + 1 <= end)

      if (this.seletedTags.length > 0) {
        const hashs = this.seletedTags.map((t) => t.hash)
        result = result.filter((i) => {
          return hashs.some((h) => {
            return (
              i.title.S.includes(h) ||
              i.information.S.includes(h) ||
              i.order_type.SS.includes(h) ||
              i.production_time.S.includes(h) ||
              i.artist_nickname?.S.includes(h)
            )
          })
        })
      }

      result = result.reduce((a, i, index, array) => {
        if ((index + 1) % 4 === 0 || index === 0) a.push([])
        const key = Math.ceil((index + 1) / 4) - 1
        a[key].push(i)
        return a
      }, [])

      return result
    },
    productTagsHash() {
      return this.productTags.map((t) => {
        return { hash: t }
      })
    },
  },
  created() {
    this.$route.query.artistNickname &&
      this.seletedTags.push({ hash: this.$route.query.artistNickname })
  },
  methods: {
    clickTab(type) {
      this.activeTab = type
    },
    getFilteredTags(text) {
      this.filteredTags = this.productTagsHash.filter((tag) => {
        if (tag.hash) {
          return tag.hash.toString().toLowerCase().includes(text.toLowerCase())
        }
        return false
      })
    },
  },
}
</script>
