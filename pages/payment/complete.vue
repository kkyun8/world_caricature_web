<template>
  <div class="payment-complete">
    <section class="section">
      <div class="container has-text-centered">
        <h2 class="title">注文ありがとうございます！</h2>
        <div class="block"></div>
        <p>
          決済が確認され、注文情報に登録されてるメールにURLを送信しました。
          メールをご確認ください。
        </p>
        <p>
          メールのURLに接続し、<ins>似顔絵に必要な写真を添付してください。</ins>
        </p>
        <p>写真を添付されてない場合、<ins>１ヶ月後返金されます。</ins></p>
      </div>
    </section>
  </div>
</template>

<script>
// import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'only_footer',
  data() {
    return {
      isNoticeModalActive: true,
    }
  },
  // computed: {
  //   ...mapState({
  //     targetOrder: (state) => state.order.targetOrder,
  //   }),
  // },
  // created() {
  //   this.isLoading = true
  //   // TODO: order id
  //   const readOrder = this.readOrder({ id: this.$route.query.id })
  //   this.callApis([readOrder])
  // },
  // beforeDestroy() {
  //   this.setTargetOrder(null)
  // },
  // methods: {
  //   ...mapActions('order', ['readOrder']),
  //   ...mapMutations({
  //     setTargetOrder: 'order/setTargetOrder',
  //   }),
  // },
}
</script>

<style></style>
