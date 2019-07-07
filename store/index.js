export const state = () => ({
  playing:false,
  stopped:true,
  audio: null
})

export const mutations = {
  changeTrack(state, newTrack) {
    state.audio = newTrack

  },
  stop(state){
    state.stopped = true
    state.playing = false
  },
  play(state){
    state.playing = true
    state.stopped = false
  },
  pause(state){
    state.playing = false
    state.stopped = false;
  },

  setPlaying(state, playing){
    state.playing = playing
    state.stopped = false
  }
}
