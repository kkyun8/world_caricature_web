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
        <div v-for="(a, ai) in aro" :key="`ai${ai}`" class="column is-3">
          <div class="card">
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
                  <p class="title is-4">{{ a.artist_nickname.S }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Artists',
  computed: {
    ...mapState({
      artists: (state) => state.artists.artists,
    }),
    artistsPageItems() {
      return this.artists.reduce((a, i, index) => {
        if ((index + 1) % 4 === 0 || index === 0) a.push([])
        const key = Math.ceil((index + 1) / 4) - 1
        a[key].push(i)
        return a
      }, [])
    },
  },
  created() {
    this.scanArtists()
  },
  methods: {
    ...mapActions('artists', ['scanArtists']),
  },
}
</script>

<style></style>
