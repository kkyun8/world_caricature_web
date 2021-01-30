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
                    <b-field label="注文番号">
                      <b-input
                        v-model="orderNumber"
                        placeholder="注文番号を入力してください。"
                      ></b-input>
                    </b-field>
                    <b-field label="メールアドレス">
                      <b-input
                        v-model="email"
                        placeholder="メールアドレスを入力してください。"
                        type="email"
                      ></b-input>
                    </b-field>
                    <div class="mt-5">
                      <b-button
                        type="is-primary"
                        outlined
                        expanded
                        @click.stop.prevent="search"
                        >検索</b-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-for="(t, ti) in targetOrder"
              :key="`t-${ti}`"
              class="columns"
            >
              <div class="column">
                <div class="card">
                  <header class="card-header">
                    <span class="card-header-title"
                      >注文番号：{{ t.orderNumber }}</span
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
                            :value="t.nameKanzi"
                            disabled
                            expanded
                          ></b-input>
                          <b-input
                            :value="t.nameFurigana"
                            disabled
                            expanded
                          ></b-input>
                        </b-field>
                        <b-field horizontal label="住所">
                          <b-input
                            :value="t.address1"
                            disabled
                            expanded
                          ></b-input>
                          <b-input
                            :value="t.address2"
                            disabled
                            expanded
                          ></b-input>
                        </b-field>
                        <b-field horizontal label="連絡先情報">
                          <b-input :value="t.email" disabled expanded></b-input>
                          <b-input
                            :value="t.cellPhoneNumber"
                            disabled
                            expanded
                          ></b-input>
                        </b-field>
                        <b-field horizontal label="コメント">
                          <b-input
                            type="textarea"
                            :value="t.comment"
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'OrderSearch',
  data() {
    return {
      orderNumber: '',
      email: '',
      isSearch: false,
      product: null,
    }
  },
  computed: {
    ...mapState({
      targetOrder: (state) => state.order_info.targetOrder,
      orderStatus: (state) => state.order_master.orderStatus,
      orderTypes: (state) => state.order_master.orderTypes,
      productionTime: (state) => state.order_master.productionTime,
    }),
  },
  destroyed() {
    this.setTargetOrder(null)
  },
  created() {
    this.isLoading = true
    const getProductHashTag = this.getProductHashTag()
    const getOrderStatus = this.getOrderStatus()
    const getOrderTypes = this.getOrderTypes()
    const getProductionTime = this.getProductionTime()
    this.readAllApi([
      getProductHashTag,
      getOrderStatus,
      getOrderTypes,
      getProductionTime,
    ])
  },
  methods: {
    ...mapActions('order_info', ['searchOrder', 'setTargetOrder']),
    ...mapActions('order_master', [
      'getProductHashTag',
      'getOrderStatus',
      'getOrderTypes',
      'getProductionTime',
    ]),
    search() {
      if (!this.orderNumber && !this.email) {
      }
      this.isLoading = true
      const searchOrder = this.searchOrder({
        orderNumber: this.orderNumber,
        email: this.email,
      })
      this.readAllApi([searchOrder])
    },
  },
}
</script>

<style></style>
