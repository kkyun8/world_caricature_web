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
      /**
       * REST GET api 共通ロジック
       * @param {*} apis
       */
      readAllApi(apis) {
        Promise.all(apis)
          .catch((err) => (this.apiMessage = err))
          .finally(() => (this.isLoading = false))
      },
      /**
       * cookie reset
       * @param {*} key
       * @param {*} value
       */
      setCookie(key, value = undefined) {
        const getCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith(key))

        if (getCookie) {
          // 削除
          document.cookie = getCookie + ';max-age=0'
        }

        if (value) {
          const addValue = key + '=' + JSON.stringify(value) + '; '
          document.cookie = addValue
        }
      },
    },
  })
}
