<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button
          class="delete"
          aria-label="close"
          @click.stop.prevent="clickCancle()"
        ></button>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click.stop.prevent="clickSave()">
          Save changes
        </button>
        <button class="button" @click.stop.prevent="clickCancle()">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    // sample: {
    //   type: Object,
    // },
  },
  methods: {
    clickSave() {
      const data = 'data'
      this.$router.push({ path: 'order_detail', query: { data } })
      this.$emit('closeModal')
    },
    clickCancle() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style></style>
