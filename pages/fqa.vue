<template>
  <section class="section">
    <div class="container py-4">
      <h2 class="title has-text-centered mb-6">よくある質問</h2>
      <div class="mb-6">
        <div v-for="(f, i) in fqa" :key="i" class="card block">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <font-awesome-icon
                  icon="question-circle"
                  class="is-primary fa-2x"
                />
              </div>
              <div class="media-content">
                <h3 class="title is-4">
                  {{ f.title.S }}
                </h3>
                <p>
                  {{ f.text.S }}
                </p>
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
  name: 'Fqa',
  computed: {
    ...mapState({
      fqa: (state) => state.fqa.fqa,
    }),
  },
  created() {
    this.isLoading = true
    const scanFqa = this.scanFqa()
    this.callApis([scanFqa])
  },
  methods: {
    ...mapActions('fqa', ['scanFqa']),
  },
}
</script>
