<template>
  <div class="payment-complete">
    payment-complete

    <b-modal
      v-model="isNoticeModalActive"
      has-modal-card
      aria-modal
      :width="640"
    >
      <div class="card">
        <div class="card-content">
          まだ注文が完了しておりません！<br />
          メールまたはラインで顔写真を送信しましょう！
        </div>
      </div>
      <!-- <template #default="props">
        <modal-form v-bind="formProps" @close="props.close"></modal-form>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PaymentComplete',
  data() {
    return {
      isNoticeModalActive: true,
    }
  },
  computed: {
    ...mapState({
      targetOrder: (state) => state.order_info.targetOrder,
    }),
  },
  created() {
    this.isLoading = true
    // TODO: order id
    const readOrder = this.readOrder({ id: this.$route.query.id })
    this.readAllApi([readOrder])
  },
  beforeDestroy() {
    this.setTargetOrder(null)
  },
  methods: {
    ...mapActions('order_info', ['readOrder']),
    ...mapMutations({
      setTargetOrder: 'order_info/setTargetOrder',
    }),
  },
}
</script>

<style></style>
