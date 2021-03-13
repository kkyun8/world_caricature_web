<template>
  <section class="main-content">
    <div class="container is-widescreen">
      <div class="content mt-6">
        <h1>作家一覧</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus,
          nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat
          odio, sollicitudin vel erat vel, interdum mattis neque. Sub works as
          well!
        </p>
        <hr class="rounded" />
      </div>
      <div
        v-for="(aro, agi) in artistsPageItems"
        :key="`agi${agi}`"
        class="columns"
      >
        <div
          v-for="(a, ai) in aro"
          :key="`ai${ai}`"
          class="column is-3"
          @click="openArtistModal(a)"
        >
          <div class="card p-3 mt-3 mb-3 card-hover">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src="https://bulma.io/images/placeholders/1280x960.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p v-if="a.artist_nickname" class="title is-4">
                    {{ a.artist_nickname.S }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      v-model="isArtistModalActive"
      :width="720"
      scroll="keep"
      @close="closeArtistModal()"
    >
      <div class="box">
        <article class="media mb-2">
          <div class="media-left">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
              style="width: 85px; height: 85px"
            />
          </div>
          <div class="media-content">
            <div class="content">
              <strong v-if="artistDetail.artist_nickname">
                {{ artistDetail.artist_nickname.S }}
              </strong>
              <p v-if="artistDetail.service_years">
                経歴年数：役{{ artistDetail.service_years.N }}年
              </p>
              <p v-if="artistDetail.career_info">
                {{ artistDetail.career_info.S }}
              </p>
            </div>
          </div>
        </article>
        <b-button
          type="is-primary"
          expanded
          @click="openArtistProducts(artistDetail.artist_nickname.S)"
          >この作家の商品をみる</b-button
        >
      </div>
    </b-modal>
  </section>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Artists',
  data() {
    return {
      isArtistModalActive: false,
      artistDetail: {},
    }
  },
  computed: {
    ...mapState({
      artists: (state) => state.artists.artists,
    }),
    artistsPageItems() {
      if (this.artists.length === 0) {
        return []
      }
      const list = this.artists.slice()
      list.sort((a, b) => {
        if (!a.updated_at && !b.updated_at) {
          return a.artist_nickname.S < b.artist_nickname.S
        } else {
          if (a.updated_at && b.updated_at) {
            return moment(a.updated_at.S).isBefore(b.updated_at.S) ? -1 : 1
          }
          return a.updated_at.S ? -1 : 1
        }
      })

      const result = list.reduce((a, i, index) => {
        if ((index + 1) % 4 === 0 || index === 0) a.push([])
        const key = Math.ceil((index + 1) / 4) - 1
        a[key].push(i)
        return a
      }, [])
      return result
    },
  },
  created() {
    this.scanArtists()
  },
  methods: {
    ...mapActions('artists', ['scanArtists']),
    openArtistModal(artist) {
      this.isArtistModalActive = true
      this.artistDetail = JSON.parse(JSON.stringify(artist))
    },
    closeArtistModal() {
      this.isArtistModalActive = false
      this.artistDetail = {}
    },
    openArtistProducts(nickname) {
      const artistNickname = nickname
      this.$router.push({ path: 'products', query: { artistNickname } })
    },
  },
}
</script>

<style>
.card-hover:hover {
  border: 1px solid #3e8ed0;
}
</style>
