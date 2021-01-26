<template>
  <div class="column is-3">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <p class="title is-5">{{ product.title }}</p>
          <p class="subtitle is-6 mt-1">¥{{ product.price }}</p>
        </div>
        <div class="buttons">
          <b-button
            expanded
            icon-left="check"
            @click.stop.prevent="clickSampleDetail()"
            >詳細
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    clickSampleDetail() {
      this.$router.push({
        path: 'product_detail',
        query: { product: this.product },
      })
    },
  },
}
</script>
