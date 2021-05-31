<template>
  <div class="py-6">
    <div v-for="(c, ipc) in productComments" :key="`pc-${ipc}`" class="columns">
      <div class="column mb-4">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <!-- <img TODO: order img /> -->
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ c.name.S }}</strong
                  >様
                  <br />
                  {{ c.comment.S }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductComment',
  computed: {
    ...mapState({
      productComments: (state) => state.comment.productComments,
    }),
  },
}
</script>

<style></style>
