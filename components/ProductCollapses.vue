<template>
  <section>
    <b-collapse
      v-for="(product, index) in cartItems"
      :key="index"
      class="card"
      animation="slide"
      :open="isOpenValues[index] == index"
      style="margin-top: 1rem"
      @open="isOpenValues[index] = index"
    >
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p v-if="product" class="card-header-title">{{ product.title.S }}</p>
          <!-- TODO: メッセージデザイン -->
          <p class="card-header-title">
            クリックして詳細情報を設定してください。
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">
          <!-- TODO: 詳細情報デザイン -->
          値段：{{ product.price.N }}円 作業人数：{{
            product.numberOfPeople.N
          }}名
          <template v-if="productOptions[product.id.S]">
            <b-field>
              <b-select
                v-model="productOptions[product.id.S].flameSize"
                placeholder="フレームサイズ"
              >
                <option :value="'M'">M</option>
                <option :value="'L'">L</option>
              </b-select>
            </b-field>
            <b-field>
              <b-select
                v-model="productOptions[product.id.S].premiumWrapping"
                placeholder="プレミアムラッピングの有無"
              >
                <option :value="true">あり</option>
                <option :value="false">なし</option>
              </b-select>
            </b-field>
          </template>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
export default {
  name: 'ProductCollapes',
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    productOptions: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isOpenValues() {
      return this.cartItems.map((i, index) => -1)
    },
  },
  // watch: {
  //   productOptions: {
  //     handler(newVal) {
  //       console.log(newVal)
  //     },
  //     deep: true,
  //   },
  // },
}
</script>

<style></style>
