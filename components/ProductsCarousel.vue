<template>
  <section>
    <b-carousel
      :indicator="indicator"
      :indicator-background="indicatorBackground"
      :indicator-inside="indicatorInside"
      :indicator-mode="indicatorMode"
      :indicator-position="indicatorPosition"
      :indicator-style="indicatorStyle"
    >
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section :class="`hero is-medium is-${carousel.color}`">
          <div class="hero-body has-text-centered">
            <h1 class="title">{{ carousel.title }}</h1>
          </div>
        </section>
      </b-carousel-item>
    </b-carousel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      indicator: true,
      indicatorBackground: false,
      indicatorInside: true,
      indicatorMode: 'hover',
      indicatorPosition: 'is-bottom',
      indicatorStyle: 'is-dots',
      carousels: [
        { title: 'Slide 1', color: 'info' },
        { title: 'Slide 2', color: 'success' },
        { title: 'Slide 3', color: 'warning' },
        { title: 'Slide 4', color: 'danger' },
      ],
    }
  },
}
</script>
