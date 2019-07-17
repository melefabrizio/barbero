<template>
  <section class="section">
    <div class="container">
      <b-field>
        <b-input v-model="search" placeholder="Search..."
                 type="search"
                 icon="magnify">
        </b-input>
      </b-field>

      <div class="tile is-ancestor " >

        <div class="tile  is-vertical is-4" v-for="episodes in chunkedEpisodes">

          <div class="tile is-parent" v-if="episode != undefined" v-for="episode in episodes" style="flex-grow:0">
            <div class="tile  is-child card"  >
              <div class="item-content ">
                <header class="card-header">
                  <p class="card-header-title">{{episode.title}}</p>
                </header>
                <div class="card-content" v-html="episode.description"></div>
                <footer class="card-footer">
                  <a class="card-footer-item" @click="playTrack" v-bind:data-url="episode.enclosure.url" v-bind:data-title="episode.title">Play</a>
                </footer>
              </div>

            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>
import podcastParse from 'node-podcast-parser'
import Card from '../components/Card'
import chunk from 'chunk'
export default {
  name: 'HomePage',

  components: {
    Card,

  },
  data(){
    return {
      episodes : [],
      search: ""

    }
  },
  methods: {
    playTrack(e){
      console.log(e)
      this.$store.commit('changeTrack',{
        'url': e.target.dataset.url,
        'title': e.target.dataset.title
      })
      //this.$store.commit('setPlaying',true)
      this.$store.commit('setPlaying',true)
    },
    getEpisodes : function(){
      this.$axios.get('https://anchor.fm/s/70f817c/podcast/rss')
        .then(response =>{
          podcastParse(response.data, (err, data) => {
            data.episodes.forEach(function(item, index){
              data.episodes[index].cellWidth = 300
              data.episodes[index].cellHeight=400
            })
            this.episodes = data.episodes
            //return data.episodes
          })
        })
    },
    transpose: function (array) {

      if(array.length == 0)
        return true

      return array[0].map((col, i) => array.map(row => row[i]));
    }



  },
  computed:{
    chunkedEpisodes(){
      let filtered = this.episodes.filter(
        episode => {
          //Strip html from description
          var html = episode.description
          var div = document.createElement("div")
          div.innerHTML = html
          var desc = div.textContent || div.innerText || ""

          if(this.search != "") {
            return episode.title.toLowerCase().includes(this.search.toLowerCase()) ||
              desc.toLowerCase().includes(this.search.toLowerCase())
          }
          else return true
        }
      )

      console.log("filtered")
      console.log(filtered)
      let chunked = chunk(filtered,3)

      console.log("chunked and transposed")
      console.log(this.transpose(chunked))

      return this.transpose(chunked)
    }
  },
  created(){
    this.getEpisodes()
  }
}
</script>
