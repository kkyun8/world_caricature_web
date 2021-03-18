<template>
  <section class="main-content columns m-6">
    <div class="container column is-10" style="height: 5rem">
      <b-loading :active="true" :is-full-page="false">
        <b-icon
          pack="fas"
          icon="sync-alt"
          size="is-large"
          custom-class="fa-spin"
        >
        </b-icon>
      </b-loading>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'only_footer',
}
</script>

<style></style>
