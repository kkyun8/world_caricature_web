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
        <nuxt-link to="/artists" class="navbar-item">作家紹介</nuxt-link>
        <nuxt-link to="/order_flow" class="navbar-item">注文の流れ</nuxt-link>
        <nuxt-link to="/products" class="navbar-item">注文する</nuxt-link>
        <nuxt-link to="/order_search" class="navbar-item">注文確認</nuxt-link>
        <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
        <nuxt-link to="/contact" class="navbar-item">Contact</nuxt-link>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </b-navbar-item>
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
  </div>
</template>

<script>
export default {}
</script>
