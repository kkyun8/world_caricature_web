<template>
  <div class="column">
    <h3 class="has-text-centered m-2"><strong>ご利用規約</strong></h3>
    <textarea
      class="textarea has-fixed-size"
      :value="terms"
      disabled
    ></textarea>
    <div class="has-text-centered mt-1">
      <label class="checkbox" :class="{ 'has-text-danger': !isTermChecked }">
        <input
          type="checkbox"
          :checked="isTermChecked"
          @click="clickTermCheckBox"
        />
        同意する
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTermChecked: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      terms: '',
    }
  },
  methods: {
    clickTermCheckBox() {
      this.$emit('setTermChecked')
    },
  },
}
</script>

<style></style>
