export default{
  addmusic(state,music){
    state.musicList.push({
      albummid: music.albummid,
      songid: music.songid,
      songmid: music.songmid,
      songname: music.songname,
      singername: music.singername,
      songurl: music.songurl,
    })
  },
  currentMusic(state,index){
    state.currentIndex = index
    state.currentMusic = state.musicList[index]
  },
  nextMusic(state){
    if(state.currentIndex < state.musicList.length-1){
      state.currentIndex += 1
    }else if(state.currentIndex == state.musicList.length-1){
      state.currentIndex = 0
    }
    state.currentMusic = state.musicList[state.currentIndex]
  },
  play(state){
    state.playing = true
  },
  pause(state){
    state.playing = false
  },
  updateCurrentTime(state, time){
    state.currentTime = time
  },
  updateDuration(state, time){
    state.duration = time
  },
}
