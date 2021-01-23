<template>
  <div class="column is-3">
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
        <!-- <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">John Smith</p>
            <p class="subtitle is-6">@johnsmith</p>
          </div>
        </div> 
        data-target="modal" aria-haspopup="true"
        -->

        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
          <a href="#">#responsive</a>
          <br />
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
        <div class="buttons">
          <b-button
            expanded
            icon-left="check"
            @click.stop.prevent="clickSampleDetail()"
            >詳細
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    sample: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    clickSampleDetail() {
      this.$router.push({
        path: 'sample_order_detail',
        query: { sample: this.sample },
      })
    },
  },
}
</script>
