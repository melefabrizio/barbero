<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Free" icon="github-circle">
        Open source on
        <a href="https://github.com/buefy/buefy">
          GitHub
        </a>
        <button v-on:click="playTrack" data-url="/barbero-papi.mp3"> Play </button>
      </card>

    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card
  },
  methods: {
    playTrack(e){
      this.$store.commit('changeTrack',e.target.dataset.url)
      //this.$store.commit('play')
    }
  }
}
</script>
