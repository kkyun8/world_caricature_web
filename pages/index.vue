<template>
  <div>
    <!-- Wrapper-->
    <div id="wrapper" class="has-text-centered-mobile">
      <!--Hero-->
      <section id="hero" class="hero is-medium">
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column">
                <h1 class="title">WorldCaricature</h1>
                <h3 class="is-size-4 has-text-grey-light">ワールド似顔絵</h3>
                <p class="has-text-centered-mobile">
                  <strong>カリカチュア（Caricature）</strong
                  >は似顔絵のことを言う言葉です。世界で活躍しているアーティストたちから、
                  ハイクォリティの似顔絵注文ができるサイトです。１００％デジタルであり、思い出になる作品を作るのがワールド似顔絵の目標です。
                </p>
                <hr class="rounded" />
                <div class="is-divider" data-content="   "></div>

                <p class="subtitle is-3" style="margin-top: 20px">
                  ワールド似顔絵でできること
                </p>
                <p class="has-text-centered-mobile">
                  <i
                    class="fa fa-check"
                    aria-hidden="true"
                    style="color: #72ddf7"
                  ></i>
                  日本国内・世界で活躍している優秀なアーティストにオーダーができます。
                </p>
                <p class="has-text-centered-mobile">
                  <i
                    class="fa fa-check"
                    aria-hidden="true"
                    style="color: #72ddf7"
                  ></i>
                  注文・決済がとても簡単です。
                </p>
                <p class="has-text-centered-mobile">
                  <i
                    class="fa fa-check"
                    aria-hidden="true"
                    style="color: #72ddf7"
                  ></i>
                  日本で唯一、１００％デジタル似顔絵サイトです。
                </p>
                <p class="has-text-centered-mobile">
                  <i
                    class="fa fa-check"
                    aria-hidden="true"
                    style="color: #72ddf7"
                  ></i>
                  クォリティーにこたわってます。
                </p>
                <nuxt-link
                  to="/products"
                  class="button is-primary is-size-6 is-rounded mt-4 is-outlined"
                  >商品一覧から注文する</nuxt-link
                >
              </div>

              <div class="column">
                <img src="~/assets/img/undraw_wedding_t1yl.svg" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- USER -->
      <section id="users-feed" class="section">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div class="box">
                <article class="media">
                  <div class="media-left">
                    <!--
                    <figure class="is-64x64" \>
                    </figure>
                    -->
                    <img
                      style="width: 85px; height: 85px"
                      src="~/assets/img/user-person-suit-male-businessman-icon.svg"
                    />
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>ワールド似顔絵代表</strong> <small>@kyun</small>
                        <br />
                        代表、「キォン」と申します！<br />皆さんに優秀なアーティストを紹介させていただきます！
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div class="column">
              <div class="box">
                <article class="media">
                  <div class="media-left">
                    <!--
                    <figure class="is-64x64" \>
                    </figure>
                    -->
                    <img
                      src="~/assets/img/man-user-person-male-profile-avatar-icon.svg"
                    />
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>代表アーティスト</strong> <small>@chi</small>
                        <br />
                        世界で活躍してるアーティスト「チー」と申します！<br />自分のスキルで皆さんに思い出を差し上げたいです！
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" class="sectionf">
        <div class="container">
          <h1 class="title has-text-centered">注文の流れ</h1>
          <hr class="rounded my-6" />
          <div class="columns reverse-row-order">
            <div class="column">
              <h1 class="title">商品を選ぶ</h1>
              <p class="has-text-black paragraph">
                ワルド似顔絵に登録済みの商品は、アーティストが直接登録したものです。<br />商品のサンプルイメージ・タイプを見て完成作のイメージが予想できます。<br />
                <strong
                  >「商品一覧」で自分が主人公になりたい絵を選んでください。</strong
                >商品は複数登録可能です。<br />
                ※完成日はアーティストの都合によりますが、基本写真登録してから２週間後が目安です。
              </p>
            </div>
            <div class="column">
              <img
                src="~/assets/img/features/undraw_shopping_eii3.svg"
                style="width: 70%"
              />
            </div>
          </div>
        </div>

        <br />
        <br />

        <div class="container">
          <div class="columns reverse-row-order">
            <div class="column">
              <img
                src="~/assets/img/features/undraw_stripe_payments_o7aw.svg"
                style="width: 50%"
              />
            </div>
            <div class="column">
              <h1 class="title">注文登録</h1>
              <p class="has-text-black paragraph">
                選んだ商品で注文を登録します。登録はとても簡単です。登録したメール・SNSに決済ページが送信されますので、登録後、メールをご確認ください。
              </p>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="columns reverse-row-order">
            <div class="column">
              <h1 class="title">決済・写真登録</h1>
              <p class="has-text-black paragraph">
                ワルド似顔絵は決済システム<strong> Square(スクエア)</strong
                >を利用しており、安全な決済が可能です。<strong>決済はクレジットカードのみ</strong>です。<br />
                決済完了後、写真登録ページがメールに発送されます。<br />
                写真登録ページでは商品に登録したい写真をアップロードしてください。写真登録が完了したらアーティストが作業に着手します。<br />
                ※完成日はアーティストの都合によりますが、基本写真登録してから２週間後が目安です。<br />
                ※写真はクラウド環境に保存され、基本登録後３ヶ月後自動削除されます。
              </p>
            </div>
            <div class="column">
              <img
                src="~/assets/img/features/undraw_Live_photo_re_4khn.svg"
                style="width: 70%"
              />
            </div>
          </div>
        </div>

        <br />
        <br />

        <div class="container">
          <div class="columns reverse-row-order">
            <div class="column">
              <img
                src="~/assets/img/features/undraw_Gift_box_re_vau4.svg"
                style="width: 50%"
                alt=""
              />
            </div>
            <div class="column">
              <h1 class="title">商品発送・ファイル発送</h1>
              <p class="has-text-black paragraph">
                商品を完成したら、ワルド似顔絵は商品をプリント・ラッピングして発送します。ファイルで提供します。<br />
                ※完成作は登録した３ヶ月後自動削除されますので、削除前にスマートフォンやパソコンに保存してください。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="sample-images">
        <div class="container my-6">
          <h1 class="title has-text-centered">
            サンプルイメージ（クリックすると大きくなります。）
          </h1>
          <hr class="rounded" />
          <b-carousel
            class="p-3"
            :autoplay="false"
            indicator-custom
            :indicator-inside="false"
            :overlay="sampleGallery"
            @click="switchSampleImage(true)"
          >
            <b-carousel-item
              v-for="(si, i) in sampleImages"
              :key="`si-${i}`"
              :style="sampleGallery ? 'overflow-y:auto;' : ''"
            >
              <a class="image">
                <b-image
                  :src="getSampleImageUrl(i)"
                  :ratio="sampleGallery ? '' : '2by1'"
                ></b-image>
              </a>
            </b-carousel-item>
            <span
              v-if="sampleGallery"
              class="modal-close is-large"
              @click="switchSampleImage(false)"
            />
            <template #indicators="props">
              <figure class="al image" :draggable="false">
                <img :draggable="false" :src="getSampleImageUrl(props.i)" />
              </figure>
            </template>
          </b-carousel>
        </div>
      </section>
      <section id="artist-contact" class="my-6">
        <div class="container">
          <h1 class="title has-text-centered my-6">アーティスト募集</h1>
          <div class="columns">
            <div class="column">
              <div class="p-4">
                <div class="is-size-5">
                  WorldCaricatureは優秀なアーティスト様をお待ちしております！<br />
                  気軽くメールしてください！
                </div>
                <div class="has-text-centered m-6">
                  <a
                    class="button is-primary is-size-6 is-rounded is-outlined"
                    href="mailto:info@example.com?subject=「アーティストエントリー」ワールド似顔絵サイトをみました。&amp;body="
                    >エントリーメール作成</a
                  >
                </div>
              </div>
            </div>
            <div class="column">
              <img
                style="width: 500px"
                src="~/assets/img/undraw_interaction_design_odgc.svg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      sampleGallery: false,
      sampleImages: [],
      sampleImagesUrl: '',
    }
  },
  created() {
    this.getSampleImages()
  },
  methods: {
    async getSampleImages() {
      const params = {
        Bucket: this.$aws_bucket(),
        Prefix: 'home/sample-images',
      }
      const listObjectsPromise = await this.$aws_s3()
        .listObjectsV2(params)
        .promise()

      if (listObjectsPromise.Contents.length === 0) return false
      const url = this.$aws_url()
      const sample = listObjectsPromise.Contents.map((c) =>
        c.Size > 0 ? c.Key : undefined
      ).filter((k) => k)

      this.sampleImagesUrl = `${url}/${listObjectsPromise.Name}/`
      this.sampleImages = [...sample]
    },
    getSampleImageUrl(index) {
      const name = this.sampleImages[index]
      return `${this.sampleImagesUrl}${name}`
    },
    switchSampleImage(value) {
      this.sampleGallery = value
      if (value) {
        return document.documentElement.classList.add('is-clipped')
      } else {
        return document.documentElement.classList.remove('is-clipped')
      }
    },
  },
}
</script>
<style>
@media (min-width: 1024px) {
  .hero.hero-main {
    max-height: 680px;
  }

  .hero-main h1 {
    margin-top: 120px;
  }
}

.hero.hero-main {
  background-color: #9dbbf8;
  color: #1b1b1b;
  max-height: 760px;
}

.hero-main .hero-body {
  padding-bottom: 0;
}

.hero-body {
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
}

p.body1 {
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
}

.hero-main h1 {
  margin-bottom: 24px;
}

h1 {
  font-size: 60px;
  font-weight: 800;
  line-height: 64px;
}
</style>
