<template>
  <div class="order_flow">
    <section class="main-content columns mt-6">
      <div class="container column is-10">
        <order-steps />
      </div>
    </section>
  </div>
</template>

<script>
import OrderSteps from '~/components/OrderSteps.vue'

export default {
  name: 'OrderFlow',
  components: { OrderSteps },
}
</script>

<style></style>
