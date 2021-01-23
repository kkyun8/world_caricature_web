<template>
  <div id="order_search">
    <div class="container">
      <section class="main-content columns mb-6">
        <div class="container column is-10 mb-6">
          <div class="containar is-max-desktop">
            <div class="columns mt-6">
              <div class="column is-three-fifths is-offset-one-fifth">
                <b-field label="注文番号">
                  <b-input
                    v-model="orderNumber"
                    placeholder="注文番号を入力してください。"
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="card">
                  <header class="card-header">
                    <span class="card-header-title">注文番号：</span>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <div>注文者情報</div>
                      <div>商品情報</div>
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
export default {
  name: 'OrderSearch',
  data() {
    return {
      orderNumber: '',
    }
  },
}
</script>

<style></style>
