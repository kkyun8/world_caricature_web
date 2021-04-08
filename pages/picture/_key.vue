<template>
  <div class="container is-fullhd">
    <section v-if="order">
      <div class="content box my-6">
        <h2>写真アップロードフォーム</h2>
        <b-message type="is-info">
          <p>写真アップロードで顔認証を行います。…</p>
          <p>
            注文情報は確定されてます。住所などが間違ってる場合ラインまたはメールでご連絡ください。
          </p>
          <p>
            <strong
              >アップロードされた写真はクラウド環境に３ヶ月間保存され、３ヶ月後には自動削除されます。</strong
            >
          </p>
        </b-message>
        <h4>注文情報</h4>
        <template v-if="order">
          <div class="columns">
            <div class="column">
              <b-field label="名前（漢字）">
                <b-input v-model="order.name_kanzi.S" disabled></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="名前（フリガナ）">
                <b-input v-model="order.name_furigana.S" disabled></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="住所">
                <b-input
                  :value="`${order.address1.S} ${order.address2.S}`"
                  disabled
                ></b-input>
              </b-field>
            </div>
          </div>
        </template>
        <!-- TODO: order info{{ order }} -->
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
                    注文に必要な人数は<strong
                      >{{ totalNumberOfPeople }}名</strong
                    >なので、
                    <strong>総{{ maxFileLength }}ファイル</strong
                    >アップロード可能です。
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
            >添付写真から顔取得</b-button
          >
          <!-- TODO: best img size? -->
          <div v-if="uploadedFiles.length > 0" class="box m-3">
            <p class="is-size-4">アップロード写真から顔を選択してください。</p>
            <div
              v-for="(o, oidx) in order.product_options.M"
              :key="`po-${oidx}`"
              class="box"
            >
              作品名：{{ o.M.title.S }} 人数：{{ o.M.number_of_people.N }}名
              サイズ：{{ o.M.flame_size.N }} プレミアムラッピング有無：<template
                v-if="o.M.premium_wrapping.BOOL"
                >あり</template
              ><template v-else>なし</template>
              <b-button @click="openProductImgModal(oidx)"
                >この商品に描いて欲しい顔選択</b-button
              >
              <div class="columns">
                <template v-for="(pi, pidx) in productImgs[o.id]">
                  <div :key="`pi-${o.id}-${pidx}`" class="column">
                    <img
                      class="aws-images"
                      :src="pi"
                      width="100"
                      height="150"
                    />
                    <font-awesome-icon
                      icon="times-circle"
                      class="image-close"
                      @click="deleteProductImg(pi, o.id)"
                    />
                  </div>
                </template>
              </div>
            </div>

            <b-button
              type="is-primary"
              outlined
              :loading="isCheckUploadImagesLoading || isImageUploadLoading"
              @click="updatePicture"
              >写真を登録する</b-button
            >※写真登録後、払い戻しはできません。
            <div class="columns is-mobile">
              <template v-for="uf in uploadedFiles">
                <template v-if="uf.indexOf('origin') > 0">
                  <div :key="`uf-${uf}`" class="column">
                    <img
                      class="aws-images"
                      :src="uf"
                      width="250"
                      height="200"
                    />
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
      <b-modal v-model="isProductImgAddModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <template v-for="uf in uploadedFiles">
              <template v-if="uf.indexOf('face') > 0">
                <div :key="uf" class="column is-4">
                  <div
                    :class="{
                      'disabled-aws-images': isIncludesProductImgs(uf),
                    }"
                    @click.stop="addProductImg(uf)"
                  >
                    <img
                      class="aws-images"
                      :src="uf"
                      width="100"
                      height="150"
                    />
                    <font-awesome-icon
                      v-if="isIncludesProductImgs(uf)"
                      icon="times-circle"
                      class="image-close"
                      @click.stop="deleteProductImg(uf, 0)"
                    />
                  </div>
                </div>
              </template>
            </template>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="closeProductImgModal">
              閉じる
            </a>
          </footer>
        </div>
      </b-modal>
    </section>
    <div v-else>無効なKeyです。トップ画面に移動します。</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'OrderPictureAddForm',
  layout: 'only_footer',
  data() {
    return {
      dropFiles: [],
      uploadedFiles: [],
      faceFiles: [],
      isImageUploadLoading: false,
      faceDetectionNet: null,
      faceDetectionOptions: null,
      isCheckUploadImagesLoading: false,
      isProductImgAddModalActive: false,
      productImgs: {},
      productImgModalTargetId: 0,
    }
  },
  computed: {
    ...mapState({
      isActiveUrlKey: (state) => state.order.isActiveUrlKey,
      order: (state) => state.order.order,
      orderStatus: (state) => state.master.orderStatus,
    }),
    orderId() {
      if (this.order) {
        this.setIsActiveUrlKey(true)
        return this.order.order_id.S
      }
      return ''
    },
    totalNumberOfPeople() {
      if (!this.order) {
        return 0
      }

      const result = Object.values(this.order.product_options.M).reduce(
        (a, p) => {
          a = a + parseInt(p.M.number_of_people.N)
          return a
        },
        0
      )
      return result
    },
    maxFileLength() {
      return this.totalNumberOfPeople * 2
    },
  },
  watch: {
    isActiveUrlKey(newVal) {
      // indexに自動遷移
      if (newVal != null && !newVal && !this.order) {
        setTimeout(() => {
          this.$router.push({
            path: '/',
          })
        }, 3000)
      }
    },
    order(newVal) {
      if (newVal) {
        this.productImgs = Object.keys(newVal.product_options.M).reduce(
          (a, p) => {
            a[p] = []
            return a
          },
          {}
        )
      }
    },
  },
  beforeDestroy() {
    this.setOrder(null)
  },
  async created() {
    this.isLoading = true
    // check key
    const getOrderItemFromUrlKey = this.getOrderItemFromUrlKey(
      this.$route.params.key
    )
    this.callApis([getOrderItemFromUrlKey])

    await getOrderItemFromUrlKey.then(() => {
      const scanOrderItemLabels = this.scanOrderItemLabels()
      this.callApis([scanOrderItemLabels])
    })
  },
  methods: {
    ...mapActions('order', ['getOrderItemFromUrlKey', 'readOrder']),
    ...mapActions('picture', ['uploadImages', 'updateOrderPicture']),
    ...mapActions('master', ['scanOrderItemLabels']),
    ...mapMutations({
      setOrder: 'order/setOrder',
      setIsActiveUrlKey: 'order/setIsActiveUrlKey',
    }),
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    openProductImgModal(productId) {
      this.productImgModalTargetId = productId
      this.isProductImgAddModalActive = true
    },
    closeProductImgModal() {
      this.productImgModalTargetId = 0
      this.isProductImgAddModalActive = false
    },
    addProductImg(url) {
      if (
        this.productImgModalTargetId !== 0 &&
        !this.isIncludesProductImgs(url, this.productImgModalTargetId)
      ) {
        this.productImgs[this.productImgModalTargetId].push(url)
      }
    },
    deleteProductImg(url, productId) {
      const targetId =
        productId === 0 ? this.productImgModalTargetId : productId
      return this.productImgs[targetId].splice(url, 1)
    },
    isIncludesProductImgs(url) {
      if (this.productImgModalTargetId === 0) return
      return this.productImgs[this.productImgModalTargetId].includes(url)
    },
    async checkUploadImages() {
      this.isCheckUploadImagesLoading = true
      const body = new FormData()
      for (const file of this.dropFiles) {
        if (!/\.(jpe?g|png|gif)$/i.test(file.name))
          // TODO: file check
          return alert('not image file')
        body.append('files', file)
      }
      const orderId = this.order.order_id.S
      body.append('orderId', orderId)

      const uploadImages = this.uploadImages(body)
      await uploadImages
        .then((res) => {
          console.log(res)
          this.getOrderObjects()
        })
        .finally(() => {
          this.isCheckUploadImagesLoading = false
        })
    },
    async getOrderObjects() {
      this.uploadedFiles = []
      const params = {
        Bucket: this.$aws_bucket(),
        Prefix: this.orderId,
      }
      const listObjectsPromise = await this.$aws_s3()
        .listObjectsV2(params)
        .promise()

      if (listObjectsPromise.Contents.length === 0) return false
      const url = this.$aws_url()

      this.uploadedFiles = listObjectsPromise.Contents.map(
        (c) => `${url}/${listObjectsPromise.Name}/${c.Key}`
      )
    },
    async updatePicture() {
      const status = this.orderStatus.find((o) => o.label_id.N === '3')
      const productOptions = this.order.product_options.M

      Object.entries(this.productImgs).forEach((i) => {
        const [key, value] = i
        productOptions[key].M.image_urls = { SS: value }
      })

      const values = {
        orderId: this.orderId,
        orderStatus: status.label.S,
        productOptions,
      }
      this.isLoading = true
      const updateOrderPicture = this.updateOrderPicture(values)

      this.callApis([updateOrderPicture])
      await updateOrderPicture.then(() => {
        this.$router.push({
          path: '/picture/complete',
        })
      })
    },
  },
}
</script>

<style>
.aws-face-div {
  /* float: left; */
  margin: auto;
}
.aws-face-images {
  border: 1px solid black;
}
.disabled-aws-images {
  opacity: 0.5;
}
.image-close {
  color: blue;
}
</style>
