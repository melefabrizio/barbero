<template>
    <div :id="id" class="item"
         :style="{
      'width': '100%',
      'max-width': width,
      'height': height

    }">
      <div class="item-content item-lg">
        <slot></slot>
        <!--div class="card-content" v-html="description"></div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="playTrack" v-bind:data-url="url">Play</a>
        </footer-->
      </div>
    </div>
</template>

<script>
export default {
  props: {
    width:{
      type:String,
      default:'300px'
    },
    height:{
      type:String,
      default:'400px'
    },
    id :{
      type:[Number, String],
      required:true
    }
  },
  methods: {
    playTrack (e) {
      console.log(e)
      this.$store.commit('changeTrack', e.target.dataset.url)
      //this.$store.commit('setPlaying',true)
      this.$store.commit('play')
    },
  }
}
</script>
