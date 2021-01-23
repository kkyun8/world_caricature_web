<template>
  <div class="order_steps">
    <!-- has momile mode? -->
    <b-steps
      v-model="activeStep"
      :rounded="true"
      :label-position="'bottom'"
      :mobile-mode="true"
    >
      <b-step-item step="1" label="Account" :clickable="isStepsClickable">
        <h1 class="title has-text-centered">Account</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item
        step="2"
        label="Profile"
        :clickable="isStepsClickable"
        :type="{ 'is-success': isProfileSuccess }"
      >
        <h1 class="title has-text-centered">Profile</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item
        step="3"
        :visible="showSocial"
        label="Social"
        :clickable="isStepsClickable"
      >
        <h1 class="title has-text-centered">Social</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item
        :step="showSocial ? '4' : '3'"
        label="Finish"
        :clickable="isStepsClickable"
        disabled
      >
        <h1 class="title has-text-centered">Finish</h1>
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
