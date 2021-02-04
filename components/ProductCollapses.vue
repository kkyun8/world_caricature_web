<template>
  <section>
    <b-collapse
      v-for="(product, index) in products"
      :key="index"
      class="card"
      animation="slide"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">{{ product.title }}</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">¥{{ product.price }}</div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
export default {
  name: 'ProductCollapes',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: -1,
    }
  },
}
</script>

<style></style>
