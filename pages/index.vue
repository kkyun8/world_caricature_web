<template>
  <div class="container">
    <section class="section">
      <div class="columns is-mobile">
        index
        <nuxt-link to="/order_detail" class="button">注文詳細</nuxt-link>
        <nuxt-link to="/order_payment" class="button">注文決済</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Index',
}
</script>
