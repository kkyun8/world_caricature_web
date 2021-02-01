<template>
  <div id="order_detail">
    <div class="container">
      <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">商品選択</a></li>
          <li class="is-active">
            <a href="#" aria-current="page">注文詳細</a>
          </li>
        </ul>
      </nav>
      <section class="main-content columns mb-6">
        <div class="container column is-10 mb-6">
          <div class="containar is-max-desktop">
            <div class="content"><h2>オブション</h2></div>
            <div class="columns">
              <div class="column">
                <b-image
                  src="https://picsum.photos/id/1062/1600/900"
                  srcset="https://picsum.photos/id/1062/400/225 400w, https://picsum.photos/id/1062/800/450 800w, https://picsum.photos/id/1062/1600/900 1600w"
                  ratio="16by9"
                ></b-image>
              </div>
              <div class="column">
                <b-field label="フレームサイズ">
                  <b-select
                    v-model="order.flameSize"
                    placeholder="フレームサイズ"
                    expanded
                  >
                    <!-- TODO: フレームサイズ -->
                    <option value="M">M (??? x ???)</option>
                    <option value="L">L (??? x ???)</option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-image
                  src="https://picsum.photos/id/1062/1600/900"
                  srcset="https://picsum.photos/id/1062/400/225 400w, https://picsum.photos/id/1062/800/450 800w, https://picsum.photos/id/1062/1600/900 1600w"
                  ratio="16by9"
                ></b-image>
              </div>
              <div class="column">
                <b-field label="プレミアムラッピングの有無">
                  <b-select
                    v-model="order.premiumWrapping"
                    placeholder="フレームサイズ"
                    expanded
                  >
                    <option :value="true">ラッピングする</option>
                    <option :value="false">しない</option>
                  </b-select>
                </b-field>
              </div>
            </div>
          </div>
          <div class="container is-max-desktop">
            <div class="columns">
              <div class="column">
                <div class="card">
                  <div class="card-content">
                    <div class="content has-text-centered">
                      <b-image
                        src="https://picsum.photos/id/1062/1600/900"
                        srcset="https://picsum.photos/id/1062/400/225 400w, https://picsum.photos/id/1062/800/450 800w, https://picsum.photos/id/1062/1600/900 1600w"
                        ratio="16by9"
                      ></b-image>
                    </div>
                  </div>
                  <footer class="card-footer">
                    <div class="card-footer-item"></div>
                  </footer>
                </div>
              </div>
              <!-- TODO: 金額計算ロジック -->
              <div class="column" style="margin: auto">
                <div class="border-bottom-line">
                  <span>作品価格</span>
                  <span>¥00000</span>
                </div>
                <div class="border-bottom-line">
                  <span>フレーム</span>
                  <span>¥00000</span>
                </div>
                <div class="border-bottom-line">
                  <span>支払い金額</span>
                  <span>¥00000</span>
                </div>
              </div>
            </div>
            <div class="content"><h2>注文者情報</h2></div>
            <div class="columns">
              <div class="column">
                <b-field label="漢字">
                  <b-input
                    v-model="order.nameKanzi"
                    placeholder="田中太郎"
                    required
                  ></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="フリガナ">
                  <b-input
                    v-model="order.nameFurigana"
                    placeholder="タナカタロウ"
                    required
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-message type="is-info" has-icon>
                  注文が完了されたら、注文情報や運送情報を確認できるアカウントを決めてください。
                </b-message>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-radio-button
                  v-model="order.isSendEmail"
                  :native-value="true"
                  type="is-primary is-light is-outlined"
                >
                  <b-icon icon="email"></b-icon>
                  <span>メールでやりとり</span>
                </b-radio-button>
              </div>
              <div class="column">
                <b-radio-button
                  v-model="order.isSendEmail"
                  :native-value="false"
                  type="is-success is-light is-outlined"
                >
                  <b-icon icon="chat"></b-icon>
                  <span>ラインアカウントでやりとり</span>
                </b-radio-button>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="連絡方法 メール">
                  <b-input
                    v-model="order.email"
                    placeholder="mail@mail.com"
                    type="email"
                    :disabled="!order.isSendEmail"
                    :required="order.isSendEmail"
                  ></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="連絡方法 ライン">
                  <!-- v-model="order.lineId"-->
                  <b-button
                    expanded
                    type="primary"
                    :disabled="order.isSendEmail"
                    :required="!order.isSendEmail"
                    ><i class="fab fa-line fa-2x" style="color: #00b900"></i
                  ></b-button>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="電話番号 携帯">
                  <b-input
                    v-model="order.cellPhoneNumber"
                    placeholder="09012345678"
                    :validation-message="validateMsg.phone"
                    pattern="[0-9]*"
                    minlength="10"
                    maxlength="11"
                    required
                  ></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="郵便番号">
                  <b-input
                    v-model="order.postalCode"
                    placeholder="123-4567"
                    :validation-message="validateMsg.postalCode"
                    pattern="\d{3}-\d{4}"
                    minlength="8"
                    maxlength="8"
                    required
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="住所">
                  <b-input
                    v-model="order.address1"
                    placeholder="東京都豊島区"
                    required
                  ></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="住所 詳細">
                  <b-input
                    v-model="order.address2"
                    placeholder="1-2-3 101号"
                    required
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="コメント">
                  <textarea
                    v-model="order.comment"
                    class="textarea"
                    placeholder="コメントを入力してください。（任意）"
                  ></textarea>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <nuxt-link to="/products" class="button is-fullwidth"
                  ><i class="fa fa-backward mr-1" aria-hidden="true"></i
                  >サンプルオーダーにもどる</nuxt-link
                >
              </div>
              <div class="column">
                <nuxt-link
                  to="/order_payment"
                  class="button is-fullwidth is-primary"
                  ><i class="fa fa-credit-card mr-1" aria-hidden="true"></i
                  >支払いする
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OrderDetail',
  data() {
    return {
      validateMsg: {
        phone: 'ハイフン（-）なしで半角数字のみ入力してください。',
        postalCode: '郵便番号形式ではありません。',
      },
    }
  },
  computed: {
    ...mapState({
      order: (state) => state.order_info.order,
    }),
  },
  methods: {},
}
</script>

<style>
.border-bottom-line {
  border-bottom: 1px solid #ededed;
  top: 50%;
  position: relative;
  padding: 15px;
}
</style>
