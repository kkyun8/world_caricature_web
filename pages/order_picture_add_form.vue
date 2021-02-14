<template>
  <div class="container is-fullhd">
    <section v-if="isActivePictureUrlKey">
      <div class="content box mt-6 mb-6">
        <h2>写真アップロードフォーム</h2>
        <b-message type="is-info">
          <p>写真アップロードで顔認証を行います。…</p>
          <p>
            注文情報は確定されてます。住所などが間違ってる場合ラインまたはメールでご連絡ください。
          </p>
        </b-message>
        <h4>注文情報</h4>
        <div class="columns">
          <div class="column">
            <b-field label="名前（漢字）">
              <b-input disabled></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="名前（フリガナ）">
              <b-input disabled></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-field label="住所">
              <b-input disabled></b-input>
            </b-field>
          </div>
        </div>
        <!-- TODO: order info{{ targetOrder }} -->
        <div class="has-text-centered">
          <b-field>
            <b-upload id="fileUpload" v-model="dropFiles" multiple drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"> </b-icon>
                  </p>
                  <p>
                    ここをクリックして写真ファイルをアップロードしてください。
                  </p>
                  <p>写真ファイルは一人２枚までです。</p>
                  <p>
                    注文に必要な人数は<strong>{{ maxFileLength }}名</strong
                    >なので、
                    <strong>総{{ maxFileLength * 2 }}枚</strong
                    >アップロードしてください。
                  </p>
                </div>
              </section>
            </b-upload>
          </b-field>
          <!-- TODO: 
          顔チェックして写真に１人以上存在する場合、人を選ぶ。
          選んだ人数が注文に足りない場合、エラーメッセージを出力
          認証はバックエンドでやりとり
          -->
          <div class="columns is-mobile">
            <div class="column is-three-fifths is-offset-one-quarter">
              <div class="tags">
                <span
                  v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary"
                >
                  {{ file.name }}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)"
                  ></button>
                </span>
              </div>
            </div>
          </div>
          <b-button
            type="is-primary"
            outlined
            :loading="isCheckUploadImagesLoading || isImageUploadLoading"
            @click="checkUploadImages"
            >添付写真をチェック</b-button
          >
        </div>
      </div>
    </section>
    <div v-else>無効なKeyです。トップ画面に移動します。</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'OrderPictureAddForm',
  layout: 'only_footer',
  data() {
    return {
      dropFiles: [],
      isImageUploadLoading: false,
      faceDetectionNet: null,
      faceDetectionOptions: null,
      isCheckUploadImagesLoading: false,
    }
  },
  computed: {
    ...mapState({
      isActivePictureUrlKey: (state) => state.order_info.isActivePictureUrlKey,
      targetOrder: (state) => state.order_info.targetOrder,
    }),
    maxFileLength() {
      // TODO: return this.targetOrder.productOptions
      return 2
    },
  },
  created() {
    // check key
    const readOrderPictureUrlKey = this.readOrderPictureUrlKey({
      key: this.$route.query.key,
    })
    this.readAllApi([readOrderPictureUrlKey])
  },

  methods: {
    ...mapActions('order_info', ['readOrderPictureUrlKey', 'readOrder']),
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    async checkUploadImages() {
      this.isCheckUploadImagesLoading = true
      const formdata = new FormData()

      for (const file of this.dropFiles) {
        if (!/\.(jpe?g|png|gif)$/i.test(file.name))
          // TODO: file check
          return alert('not image file')
        formdata.append('files', file)
      }

      await fetch('/face-api', {
        method: 'POST',
        body: formdata,
      })
        // TODO: 正常終了後遷移
        .then(() =>
          this.$router.push({
            path: 'order_picture_add_complete',
          })
        )
        .finally(() => {
          this.isCheckUploadImagesLoading = false
        })
    },
  },
}
</script>

<style></style>
