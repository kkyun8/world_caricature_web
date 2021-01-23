<template>
  <div id="sample_order">
    <sample-image-carousel />
    <div class="container">
      <section class="main-content columns">
        <div class="container column is-10">
          <div id="search_form" class="mt-6 mb-6">
            <b-message type="is-warning">
              作家のスケジュール状況によりますが、商品が届くのは注文完了された日から２週間後です。
            </b-message>
            <b-field label="キーワードを入力してください。">
              <b-taginput
                v-model="tags"
                :data="filteredTags"
                autocomplete
                field="user.first_name"
                icon="label"
                placeholder="キーワード"
                @typing="getFilteredTags"
              >
                <template v-slot="props">
                  <strong>{{ props.option.id }}</strong
                  >: {{ props.option.user.first_name }}
                </template>
                <template #empty> There are no items </template>
              </b-taginput>
            </b-field>
          </div>
          <div class="tabs">
            <ul>
              <li
                :class="{ 'is-active': activeTab === 'おすすめ順' }"
                @click.stop.prevent="clickTab('おすすめ順')"
              >
                <a>おすすめ順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === '人気順' }"
                @click.stop.prevent="clickTab('人気順')"
              >
                <a>人気順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === '価格安い順' }"
                @click.stop.prevent="clickTab('価格安い順')"
              >
                <a>価格安い順</a>
              </li>
              <li
                :class="{ 'is-active': activeTab === '価格高い順' }"
                @click.stop.prevent="clickTab('価格高い順')"
              >
                <a>価格高い順</a>
              </li>
            </ul>
          </div>
          <div class="columns">
            <image-card :title="'title'" :sample="sampleImage" />
            <image-card :title="'title'" :sample="sampleImage" />
            <image-card :title="'title'" :sample="sampleImage" />
            <image-card :title="'title'" :sample="sampleImage" />
          </div>
          <div class="columns">
            <image-card :title="'title'" :sample="sampleImage" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import SampleImageCarousel from '~/components/SampleImageCarousel'
import ImageCard from '~/components/ImageCard'

export default {
  name: 'SampleOrder',
  components: {
    SampleImageCarousel,
    ImageCard,
  },
  data() {
    return {
      filteredTags: [],
      isSelectOnly: false,
      tags: [],
      activeTab: 'おすすめ順',
      isModalActive: false,
      sampleImage: {},
      // TODO: DB
      tagMockData: [
        {
          id: 1,
          user: {
            first_name: 'Jesse',
            last_name: 'Simmons',
          },
          date: '2016/10/15 13:43:27',
          gender: 'Male',
        },
        {
          id: 4,
          user: {
            first_name: 'Clarence',
            last_name: 'Flores',
          },
          date: '2016/04/10 10:28:46',
          gender: 'Male',
        },
      ],
    }
  },
  methods: {
    clickTab(type) {
      this.activeTab = type
    },
    getFilteredTags(text) {
      this.filteredTags = this.tagMockData.filter((option) => {
        return option.user.first_name
          .toString()
          .toLowerCase()
          .includes(text.toLowerCase())
      })
    },
    openModal(image) {
      this.isModalActive = true
    },
    closeModal() {
      this.isModalActive = false
    },
  },
}
</script>
