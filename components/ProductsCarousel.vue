<template>
  <section>
    <b-carousel
      :indicator="true"
      :indicator-background="false"
      :indicator-inside="true"
      :indicator-mode="'hover'"
      :indicator-position="'is-bottom'"
      :indicator-style="'is-dots'"
    >
      <b-carousel-item v-for="(img, i) in images" :key="i">
        <b-image :src="img" ratio="3by1"></b-image>
      </b-carousel-item>
    </b-carousel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    }
  },
  created() {
    this.getImages()
  },
  methods: {
    async getImages() {
      const Prefix = 'products/carousel'
      const params = {
        Bucket: this.$aws_bucket(),
        Prefix,
      }
      const listObjectsPromise = await this.$aws_s3()
        .listObjectsV2(params)
        .promise()

      if (listObjectsPromise.Contents.length === 0) return false
      const url = this.$aws_url()
      const i = listObjectsPromise.Contents.map((c) =>
        c.Size > 0 ? c.Key : undefined
      )
        .filter((k) => k)
        .map((c) => `${url}/${listObjectsPromise.Name}/${c}`)
      this.images = [...i]
    },
  },
}
</script>
