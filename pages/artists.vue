<template>
  <div id="artists">artists</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Artists',
  computed: {
    ...mapState({
      artists: (state) => state.artists.artists,
    }),
  },
}
</script>

<style></style>
