<template lang="html">
  <div class="cd">
    <div class="music-bg" :style="{ backgroundImage: 'url('+imgUrl+')' }">
    </div>
    <div class="music">
      <div class="music-wrap">
        <img :src="imgUrl" alt="music" />
        <div class="music-info">
          <h1>{{ songname }}</h1>
          <p ref="singerp">
            {{ singername }}
          </p>
        </div>
      </div>
    </div>
    <div class="lyric">
      <lyric :songid="currentMusic.songid" :currentTime="currentTime"></lyric>
    </div>
    <div class="timeline" :style="{width: currentWidth}">
    </div>
    <div class="songTime">
      {{ songTime }}
    </div>
    <div class="currentTimes">
      {{ currentTimes }}
    </div>
    <div class="controlBar">
      <div class="music-control"  @click="toggle">
        <i v-if="playing" class="fa fa-pause-circle-o"></i>
        <i v-if="!playing" class="fa fa-play-circle-o"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Lyric from '@/components/Lyric'
import {mapMutations, mapState, mapGetters} from 'vuex'

export default {
  name: 'cd',
  data() {
    return {
      currentTimes: '',
      currentWidth: '',
      songTime: '',
    }
  },
  components: {
    Lyric
  },
  methods: {
    toggle: function(){
      if(!this.playing){
        this.$store.commit('play')
      }else{
        this.$store.commit('pause')
      }
    },
  },
  watch:{
    currentTime: function(){
      this.currentWidth = (this.currentTime/this.duration)*100+'%'
      this.songTime = Math.floor(this.duration/60)+"."+filter(this.duration%60)
      this.currentTimes = Math.floor(parseInt(this.currentTime)/60)+"."+filter(this.currentTime%60)
      function filter(val){
        if(val < 10){
          return '0'+val
        }else{
          return val
        }
      }
    },
  },
  computed:{
    ...mapGetters([
      'imgUrl',
      'singername',
      'songname',
    ]),
    ...mapState({
      currentMusic: function(){
        return this.$store.state.currentMusic
      },
      currentTime: function(){
        return this.$store.state.currentTime
      },
      duration: function(){
        return this.$store.state.duration
      },
      playing: function(){
        return this.$store.state.playing
      }
    })
  }
}
</script>

<style lang="css">
.cd{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.music-bg{
  width: 100%;
  height: 100vh;
  background: url('../assets/logo.png') center center no-repeat;
  background-size: cover;
  filter: blur(30px);
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.music-wrap{
  width: 100%;
  height: 5.5rem;
  overflow: hidden;
  background-color: rgba(255,255,255,.3);
  position: fixed;
  top: 0;
  left: 0;
  color: #000;
  z-index: 100;
}
.music-wrap img{
  width: 4rem;
  position: absolute;
  top: .9rem;
  left: 6%;
}
.music-wrap h1{
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: .3rem;
  left: 35%;
}
.music-wrap p{
  font-weight: 500;
  position: relative;
  top: 2.4rem;
  left: 36%;
}
.hh{
  position: relative;
  top: 10rem;
  z-index: 999;
}
.lyric{
  width: 100%;
  position: fixed;
  top: 12rem;
  min-height: 35px;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  z-index: 100;
  text-align: center;
}
.lyric p{
  color: #fff;
  font-size: 18px;
  font-weight: 400;
}
button{
  position: relative;
  top: 12rem;
  z-index: 1000;
}
#audio{
  visibility: hidden;
}
.timeline{
  height: 5px;
  background-color: #31c27c;
  position: fixed;
  bottom: 4rem;
  z-index: 100;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  transition: width .3s;
}
.songTime{
  display: inline-block;
  position: fixed;
  right: 6px;
  bottom: 4.3rem;
  z-index: 100;
  color: #fff;
}
.currentTimes{
  display: inline-block;
  position: fixed;
  left: 6px;
  bottom: 4.3rem;
  z-index: 100;
  color: #fff;
}
.controlBar{
  width: 100%;
  height: 4rem;
  background-color: #efefef;
  position: fixed;
  bottom: 0;
  z-index: 99;
}
.music-control{
  text-align: center;
  height: 0;
}
.music-control i{
  display: inline-block;
  font-size: 3.5rem;
  margin-top: 3px;
  color: #31c27c;
  opacity: .9;
}
</style>
