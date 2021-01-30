import Vue from 'vue'

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    computed: {
      /**
       * full screen loading
       * @param {*} boolean
       */
      isLoading: {
        // getter
        get() {
          return this.$store.state.common.isLoading
        },
        // setter
        set(newVal) {
          this.$store.commit('common/setIsLoading', newVal)
        },
      },
      /**
       * api result message
       * @param {*} string
       */
      apiMessage: {
        // getter
        get() {
          return this.$store.state.common.apiMessage
        },
        // setter
        set(newVal) {
          if ((newVal?.message | '') !== '') {
            this.$buefy.toast.open({
              message: newVal?.message,
              type: 'is-danger',
            })
          }
          this.$store.commit('common/setApiMessage', newVal)
        },
      },
    },
    methods: {
      readAllApi(apis) {
        Promise.all(apis)
          .catch((err) => (this.apiMessage = err))
          .finally(() => (this.isLoading = false))
      },
    },
  })
}
