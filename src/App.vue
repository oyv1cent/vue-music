<template>
  <div id="app">
    <router-view id="rview"/>
    <div class="play">
      <div class="play-content">
        <img :src="imgUrl || '/static/logo.png'" alt="load" data-url="/static/logo.png" id="playerImg" :class="[i ? 'ani-rotate' : '']"  @click="routerTo(currentMusic.albummid,currentMusic.songmid,currentMusic.songid)">
        <h6>{{songname || 'vue-music'}}</h6>
        <p>{{singername || 'oyv1cent'}}</p>
          <i v-if="this.i" class="fa fa-pause-circle-o" @click="pause"></i>
          <i v-if="!this.i" class="fa fa-play-circle-o" @click="play"></i>
        <i class="fa fa-list" id="list" @click="showShell"></i>
      </div>
      <audio :src="musicUrl"
             id="audio"
             ref="player"
             @timeupdate="updateTime"
             @ended="nextMusic"
             autoplay></audio>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
import {mapMutations, mapState, mapGetters} from 'vuex'
import { Actionsheet } from 'mint-ui';

export default {
  name: 'app',
  data(){
    return {
      i: false, //管理图标
      sheetVisible: false,
      actions: [],
    }
  },
  components:{
    Actionsheet,
  },
  created(){
    if(this.playing)
      this.i = true
    else
      this.i = false
  },
  mounted(){
    let self = this
    if(self.musicList !== 0 && self.musicList.length > 0){
      self.$nextTick().then(function(){
        for(let i=0;i<self.musicList.length;i++){
          self.actions.push({name:self.musicList[i].songname,method:self.changMusic,id:i})
        }
      })
    }
  },
  methods:{
    play(){
      //有歌曲才可播放
      if(document.getElementById('audio').src){
        this.$store.commit('play')
      }
    },
    pause(){
      this.$store.commit('pause')
    },
    showShell(){
      if(this.musicList){
        this.sheetVisible = true;
      }
    },
    changMusic(item,index){
      this.$store.commit('currentMusic',index)
      if(!this.playing){
        this.$store.commit('play')
      }
    },
    routerTo: function(){
      if(this.currentMusic.length !== 0){
        this.$router.push({ path: '/cd'})
      }
    },
    updateTime: function(){
      this.$store.commit('updateCurrentTime', parseInt(document.getElementById('audio').currentTime))
      this.$store.commit('updateDuration', parseInt(document.getElementById('audio').duration))
    },
    nextMusic: function(){
      this.$store.commit('nextMusic')
    }
  },
  watch: {
    musicList(e){
      var musicArray = {name:e[e.length-1].songname,method:this.changMusic}
      let self = this
      function jd(){
        for(let i = 0;i<= self.actions.length;i++){
          if(self.actions[i] == undefined){
            self.actions.push(musicArray)
            return true
          }else{
            return false
          }
        }
      }
      if(!jd()){
        let state
        for(let i=0;i<self.actions.length;i++){
          if(self.actions[i].name === musicArray.name){
            state = true
          }else{
            state = false
          }
        }
        if(!state){
          self.actions.push(musicArray)
        }
      }
    },
    playing(e){
      // 有歌曲情况下才可播放
      if(!e && this.currentMusic.length !== 0){
        document.getElementById('audio').pause()
        this.i = false
      }else{
        this.i = true
        setTimeout(function(){
          document.getElementById('audio').play()
        },60)
      }
    }
  },
  computed: {
    ...mapGetters([
      'imgUrl',
      'musicUrl',
      'singername',
      'songname',
    ]),
    ...mapState({
      playing(){
        return this.$store.state.playing
      },
      currentMusic(){
        return this.$store.state.currentMusic
      },
      musicList(){
        return this.$store.state.musicList
      }
    })

  }
}
</script>

<style>
@media (max-width:320px){
  html{
    font-size: 14px
  }
}
@media (min-width:321px) and (max-width:413px){
  html{
    font-size: 16px
  }
}
@media (min-width:414px){
  html{
    font-size: 18px
  }
}
#rview{
  height: 93vh;
  overflow-y: scroll;
}
.play{
  width: 100vw;
  height: 3rem;
  overflow: hidden;
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  box-shadow: 0 0 0 #fff,-3px -3px 10px #ddd;
}
.play-content{
  height: 3rem;
  position: relative;
  overflow: hidden;
  z-index: 999;
}
.play-content img{
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6vw;
  position: absolute;
  top: .2rem;
  left: .5rem;
  border: 1px solid #31c27c;
}
.ani-rotate{
  animation: ani 20s linear infinite;
}
@keyframes ani {
  from{transform: rotate(0deg);}
  to{transform: rotate(360deg);}
}
.play-content h6{
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  top: -1.4rem;
  left: 4rem;
  font-size: .8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
}
.play-content p{
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  top: .9rem;
  left: 4rem;
  font-size: .8rem;
  text-overflow: ellipsis;
  white-space:nowrap;
}
.play-content i{
  float: right;
  font-size: 2rem;
  position: relative;
  top: -31px;
  right: 60px;
  color: #13c27c;
}
#list{
  font-size: 1.5rem;
  top: -26px ;
  right: -10px;
}
.actionShell{
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
}
.actionWrap{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: .6;
  z-index: 999;
}
.actionList{
  z-index: 1000;
  position: absolute;
  bottom: 0;
  overflow: hidden;
}
.actionList ul{
  -webkit-margin-before: 0em;
  -webkit-margin-after: 0em;
  overflow: hidden;
  -webkit-padding-start: 0;
}
.actionList ul li{
  list-style: none;
  width: 100vw;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  border-bottom: 1px solid #888;
  font-size: 26px;
  color: #333;
  background-color: #fff;
}
.actionList ul li:last-child{
  border-bottom: 0px solid #888;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
