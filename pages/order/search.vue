<template>
  <div id="order_search">
    <div class="container">
      <section class="main-content columns mb-6">
        <div class="container column is-10 mb-6">
          <div class="containar is-max-desktop">
            <div class="columns mt-6">
              <div class="column is-three-fifths is-offset-one-fifth">
                <b-message v-if="!isSearch" type="is-warning">
                  注文番号またはメールアドレスを入力してください。
                </b-message>
                <div ref="form" class="card">
                  <div class="card-content">
                    <b-field ref="order-id-field" label="注文番号">
                      <b-input
                        v-model="orderId"
                        placeholder="注文番号を入力してください。"
                        required
                      ></b-input>
                    </b-field>
                    <b-field ref="email-field" label="メールアドレス">
                      <b-input
                        v-model="email"
                        placeholder="メールアドレスを入力してください。"
                        type="email"
                        required
                      ></b-input>
                    </b-field>
                    <div class="mt-5">
                      <b-button
                        type="is-primary"
                        outlined
                        expanded
                        :disabled="isNotValidated"
                        @click.stop.prevent="search"
                        >検索</b-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="order" class="columns">
              <div class="column">
                <div class="card">
                  <header class="card-header">
                    <span class="card-header-title"
                      >注文番号：{{ order.order_id.S }}</span
                    >
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <section>
                        <div class="box">
                          <article class="media">
                            <div class="media-left">
                              <figure class="image is-64x64">
                                <img
                                  src="https://bulma.io/images/placeholders/128x128.png"
                                  alt="Image"
                                />
                              </figure>
                            </div>
                            <div class="media-content">
                              <div class="content">
                                <p>
                                  <strong>John Smith</strong>
                                  <small>@johnsmith</small> <small>31m</small>
                                  <br />
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Aenean efficitur sit amet
                                  massa fringilla egestas. Nullam condimentum
                                  luctus turpis.
                                </p>
                              </div>
                            </div>
                          </article>
                        </div>
                        <b-field horizontal label="名前">
                          <b-input
                            :value="order.name_kanzi.S"
                            disabled
                            expanded
                          ></b-input>
                          <b-input
                            :value="order.name_furigana.S"
                            disabled
                            expanded
                          ></b-input>
                        </b-field>
                        <b-field horizontal label="住所">
                          <b-input
                            :value="order.address1.S"
                            disabled
                            expanded
                          ></b-input>
                          <b-input
                            :value="order.address2.S"
                            disabled
                            expanded
                          ></b-input>
                        </b-field>
                        <b-field horizontal label="連絡先情報">
                          <b-input
                            :value="order.email.S"
                            disabled
                            expanded
                          ></b-input>
                          <b-input
                            :value="order.cell_phone_number.S"
                            disabled
                            expanded
                          ></b-input>
                        </b-field>
                        <b-field horizontal label="コメント">
                          <b-input
                            type="textarea"
                            :value="order.comment.S"
                            disabled
                          ></b-input>
                        </b-field>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'OrderSearch',
  data() {
    return {
      orderId: '',
      email: '',
      isSearch: false,
      product: null,
    }
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order,
      orderStatus: (state) => state.master.orderStatus,
      orderTypes: (state) => state.master.orderTypes,
      productionTimes: (state) => state.master.productionTimes,
    }),
    isNotValidated() {
      const checkFmsg = (field) => {
        const result = Array.isArray(field.formattedMessage)
          ? field.formattedMessage.length > 0
          : true
        return result
      }
      const inputs = !this.orderId || !this.email
      if (inputs) {
        return true
      }
      const orderIdField = checkFmsg(this.$refs['order-id-field'])
      const emailField = checkFmsg(this.$refs['email-field'])

      return orderIdField || emailField
    },
  },
  beforeDestroy() {
    this.setTargetOrder(null)
  },
  methods: {
    ...mapActions('order', ['queryOrderOrderIdEmail']),
    ...mapMutations({
      setTargetOrder: 'order/setTargetOrder',
    }),
    search() {
      if (this.isNotValidated) {
        return
      }
      this.isLoading = true
      const queryOrderOrderIdEmail = this.queryOrderOrderIdEmail({
        orderId: this.orderId,
        email: this.email,
      })
      this.callApis([queryOrderOrderIdEmail])
      queryOrderOrderIdEmail.then(() => {
        if (!this.order) {
          this.apiResultMessage = '注文情報が存在しません。'
        }
      })
    },
  },
}
</script>

<style></style>
