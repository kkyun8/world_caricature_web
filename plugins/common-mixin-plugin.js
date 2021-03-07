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
      apiErrMessage: {
        // getter
        get() {
          return this.$store.state.common.apiErrMessage
        },
        // setter
        set(newVal) {
          if ((newVal?.message | '') !== '') {
            this.$buefy.toast.open({
              message: newVal?.message,
              type: 'is-danger',
            })
          }
          this.$store.commit('common/setApiErrMessage', newVal)
        },
      },
      apiResultMessage: {
        // getter
        get() {
          return this.$store.state.common.apiResultMessage
        },
        // setter
        set(newVal) {
          if (newVal) {
            this.$buefy.notification.open({
              duration: 5000,
              message: newVal,
              position: 'is-top',
              type: 'is-info',
            })
          }
          this.$store.commit('common/setApiResultMessage', newVal)
        },
      },
    },
    methods: {
      /**
       * REST GET api 共通ロジック
       * @param {*} apis
       */
      callApis(apis) {
        Promise.all(apis)
          .catch((err) => {
            console.log(err)
            this.apiErrMessage = err
          })
          .finally(() => (this.isLoading = false))
      },
      /**
       *
       * @param {*} key
       * @param {*} value
       */
      setLocalStorage(key, value = undefined) {
        const storage = localStorage
        if (value) {
          storage.setItem(key, JSON.stringify(value))
        } else {
          storage.removeItem(key)
        }
      },
    },
  })
}
