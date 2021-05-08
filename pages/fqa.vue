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
                  {{ f.title }}
                </h3>
                <p>
                  {{ f.text }}
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
export default {
  name: 'Fqa',
  data() {
    return {
      // TODO: mock
      fqa: [
        {
          title: "Why shouldn't I just store my data on a Hooli Box?",
          text:
            "That's just the thing - if you store your data in a single place, like Gavin Belsons' poorly-made server box, your data will very susceptible to hacking. Whereas on PiperNet, your data is safe with many copies to back it up from.",
        },
        {
          title: 'What makes PiperNet so safe?',
          text:
            'Access to the public network is granted within a day, but moving all your data and integrating your existing software depends on how big your company is. Startups can expect to be fully online within a week, enterprises can take up to a month due to large reliance on legacy systems and huge datasets.',
        },
      ],
    }
  },
  created() {},
  methods: {},
}
</script>
