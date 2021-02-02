<template>
  <div id="product">
    <products-carousel />
    <div class="container">
      <section class="main-content columns">
        <div class="container column is-10 mb-6">
          <div id="search_form" class="mt-6 mb-6">
            <b-message type="is-warning">
              作家のスケジュール状況によりますが、商品が届くのは注文完了された日から２週間後です。
            </b-message>
            <b-field label="キーワードを入力してください。">
              <b-taginput
                v-model="tags"
                :data="filteredTags"
                autocomplete
                field="user.first_name"
                icon="label"
                placeholder="キーワード"
                @typing="getFilteredTags"
              >
                <template v-slot="props">
                  <strong>{{ props.option.id }}</strong
                  >: {{ props.option.user.first_name }}
                </template>
                <template #empty> There are no items </template>
              </b-taginput>
            </b-field>
          </div>
          <div class="tabs">
            <ul>
              <li
                :class="{ 'is-active': activeTab === 'おすすめ順' }"
                @click.stop.prevent="clickTab('おすすめ順')"
              >
                <a>おすすめ順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === '人気順' }"
                @click.stop.prevent="clickTab('人気順')"
              >
                <a>人気順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === '価格安い順' }"
                @click.stop.prevent="clickTab('価格安い順')"
              >
                <a>価格安い順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === '価格高い順' }"
                @click.stop.prevent="clickTab('価格高い順')"
              >
                <a>価格高い順</a>
              </li>
            </ul>
          </div>
          <div
            v-for="(pro, pgi) in productPageArr"
            :key="`pgi${pgi}`"
            class="columns"
          >
            <template v-for="(p, pi) in pro">
              <image-card :key="`pgi${pgi}p${pi}`" :product="p" />
            </template>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ProductsCarousel from '~/components/ProductsCarousel'
import ImageCard from '~/components/ImageCard'

export default {
  name: 'Products',
  components: {
    ProductsCarousel,
    ImageCard,
  },
  data() {
    return {
      filteredTags: [],
      isSelectOnly: false,
      tags: [],
      activeTab: 'おすすめ順',
      isModalActive: false,
    }
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    ...mapGetters({
      productPageArr: 'products/productPageArr',
    }),
  },
  methods: {
    clickTab(type) {
      this.activeTab = type
    },
    getFilteredTags(text) {
      this.filteredTags = this.tagMockData.filter((option) => {
        return option.user.first_name
          .toString()
          .toLowerCase()
          .includes(text.toLowerCase())
      })
    },
    openModal(image) {
      this.isModalActive = true
    },
    closeModal() {
      this.isModalActive = false
    },
  },
}
</script>
