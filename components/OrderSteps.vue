<template>
  <div class="order_steps">
    <!-- has momile mode? -->
    <b-steps
      v-model="activeStep"
      :rounded="true"
      :label-position="'bottom'"
      :mobile-mode="'compact'"
    >
      <b-step-item step="1" label="商品選択" :clickable="isStepsClickable">
        <h1 class="title has-text-centered">商品を選択</h1>
        まず商品を選択します。
        ワルド似顔絵では、人数、絵スタイルなどが固定になってます。
      </b-step-item>

      <b-step-item
        step="2"
        label="注文情報記入"
        :clickable="isStepsClickable"
        :type="{ 'is-success': isProfileSuccess }"
      >
        <h1 class="title has-text-centered">注文情報を記入</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item
        step="3"
        :visible="showSocial"
        label="決済"
        :clickable="isStepsClickable"
      >
        <h1 class="title has-text-centered">決済する</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item
        step="4"
        :visible="showSocial"
        label="写真を送る"
        :clickable="isStepsClickable"
      >
        <h1 class="title has-text-centered">写真を送る</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item
        step="5"
        :visible="showSocial"
        label="商品受け取る"
        :clickable="isStepsClickable"
      >
        <h1 class="title has-text-centered">商品を受け取る</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>
    </b-steps>
  </div>
</template>

<script>
export default {
  name: 'OrderSteps',
  data() {
    return {
      activeStep: 1,
    }
  },
}
</script>

<style></style>
