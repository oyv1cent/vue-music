<template lang="html">
  <div class="search">
    <vhead></vhead>
    <vtag></vtag>
    <div class="search-input">
      <input type="text" placeholder="搜索歌曲、歌单、专辑" v-model="searchText"/>
      <i @click="search"></i>
    </div>
    <div class="search-view">
      <ul>
        <li v-for="(song,index) in data">
          <div class="search-song" @click="playMusic(song.albummid,song.songid,song.songmid)">
            <span :class="{ highlight: index < 1 }">{{ index+1 }}</span>
            <h2>{{ song.songname }}</h2>
            <p>{{ song.singer[0].name }}</p>
          </div>
        </li>
        <li v-if="!searchState"><p class="endsearch">已经没有更多了...</p></li>
      </ul>
    </div>
    <div class="historyS" v-if="searchState">
      <ul @click="searchH">
        <li>周杰伦</li>
        <li>林俊杰</li>
        <li>陈奕迅</li>
        <li>{{historySI0}}</li>
        <li>{{historySI1}}</li>
        <li>{{historySI2}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vhead from '@/components/vhead'
import Vtag from '@/components/vtag'
import store from '../store'

export default {
  name: 'search',
  components:{
    Vhead,
    Vtag,
  },
  data() {
    return {
      data: '',
      searchText: '',
      searchState: true,
      historySI0: '',
      historySI1: '',
      historySI2: '',
      i: 0,
    }
  },
  created(){
    this.historySI0 = localStorage.I0 || 'AGA'
    this.historySI1 = localStorage.I1 || '林宥嘉'
    this.historySI2 = localStorage.I2 || '五月天'
  },
  mounted(){
    const search = document.querySelector('.search')
    const searchInput = document.querySelector('.search-input')
    const searchView = document.querySelector('.search-view')

    search.addEventListener('scroll',()=>{
      if(search.scrollTop > 97){
        searchInput.style.position = "fixed";
        searchInput.style.top = 0;
        searchView.style.marginTop = "87px"
      }else{
        searchInput.style.position = "relative";
        searchView.style.marginTop = "-.8rem"
      }
    })
  },
  methods: {
    search: function(){
      let localStorage = window.localStorage

      this.searchState = false
      localStorage.setItem('I'+this.i,this.searchText)
      if(this.i<3){
        this.i++
      }else{
        this.i = 0
      }
      store.dispatch('searchs',this.searchText).then((res)=>{
        this.data = res.body.data.song.list
      })
    },
    playMusic: function(albummid,songid,songmid){
      /*
        获取歌曲 歌手信息
       */
      store.commit('pause');

      let self = this
      const infoUrl = 'https://music-api-jwzcyzizya.now.sh/api/get/album/qq?id=' + albummid
      this.$http.get(infoUrl).then((response) => {
        for(let i=0;i<response.body.songList.length;i++){
          if(songmid == response.body.songList[i].id){
            self.songname = response.body.songList[i].name
            self.singername = response.body.songList[i].artists[0].name
          }
        }
        /*
          获取歌曲url
         */
        const sUrl = 'https://music-api-jwzcyzizya.now.sh/api/get/song/qq?id='+ songmid
        this.$http.get(sUrl).then((response) => {
          this.songUrl = response.body.url

          let state = false, //是否正在播放歌曲
              musicState = false, //歌单是否拥有歌曲
              current = 0 //目前播放歌曲

          if(this.musicList.length !== 0 && this.currentMusic.length !== 0){
            if(self.currentMusic.songname === this.songname){
              state = true
            }else{
              state = false
            }

            for(let i=0;i<this.musicList.length;i++){
              if(this.musicList[i].songname === this.songname){
                musicState = true
                current = i
                break;
              }else{
                musicState = false
              }
            }
            /*
              歌单没有该音乐，且歌单不是初始化状态
            */
            if(!musicState && this.musicList.length !== 0){
              addmusic()
            }
            /*
              歌单有该音乐，但不是当前播放歌曲
            */
            if(musicState && !state){
              store.commit('currentMusic',current)
              if(!self.playing){
                store.commit('play')
              }
            }
          }else{
            addmusic()
            musicState = true
            state = true
          }

        })
      })



      /*
        歌单添加音乐
        同时播放音乐
        过滤undefined情况
        */
      function addmusic(){
        if(self.songname && self.singername && self.songUrl){
          store.commit('addmusic',{
            albummid: albummid,
            songid: songid,
            songmid: songmid,
            songname: self.songname,
            singername: self.singername,
            songurl: self.songUrl,
          })
          store.commit('currentMusic',self.musicList.length-1)
          if(!self.playing){
            store.commit('play')
          }
        }
      }
    },
    searchH(e){
      this.searchState = false
      this.searchText = e.target.innerHTML
      this.$store.dispatch('searchs',e.target.innerHTML).then((res)=>{
        this.data = res.body.data.song.list
      })
    },
  },
  computed: {
    musicList(){
      return store.state.musicList
    },
    currentMusic(){
      return store.state.currentMusic
    },
    playing(){
      return store.state.playing
    }
  }
}
</script>

<style lang="css">
.search{
  overflow: scroll;
  height: 95vh;
  padding-bottom: 2rem;
}
.search-input{
  width: 100%;
  height: 5rem;
  background-color: #eee;
  overflow: hidden;
  position: relative;
  z-index: 99;
}
.search-input input{
  display: block;
  width: 88%;
  height: 3.8rem;
  margin: 0 auto;
  margin-top: 6px;
  border-radius: 2rem;
  border: 0;
  text-indent: 20px;
  font-size: 18px;
}
.search-input i{
  background: url(../assets/itunes.png) center center;
  background-size: 110%;
  width:4rem;
  height: 4rem;
  position: absolute;
  top: 6px;
  right: 1.2rem;
  border-radius: 3rem;
  overflow: hidden;
  border: 2px solid #31c27c;
}
.search-view{
  margin-top: -.8rem;
}
.search-view ul{
  margin-left: -2.5rem;
}
.search-view ul li{
  width: 90%;
  margin: 0 auto;
  list-style: none;
  border-bottom: 1px solid #ddd;
}
.search-view ul li p{
  text-align: center;
  font-size: 16px;
  color: #888;
}
.search-song{
  height: 5rem;
  overflow: hidden;
}
.highlight{
  color: red;
}
.search-song span{
  width: 14%;
  float: left;
  line-height: 5rem;
  padding: 0 5%;
  text-align: center;
  font-size: 22px;
}
.search-song h2{
  font-size: 18px;
  font-weight: 400;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search-song p{
  display: inline-block;
  font-size: 16px;
  color: #666;
  position: relative;
  top: -1rem;
}
.historyS ul{
  margin-top: 1rem;
}
.historyS ul li{
  display: inline-block;
  text-align: center;
  width: 20%;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  border: 1px solid orange;
  list-style: none;
  margin: 0 5%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  margin-top: 1rem;
  color: orange;
}
.historyS ul li:nth-child(n+4){
  border: 1px solid #31c27c;
  color: #31c27c;
}
.endsearch{
  padding-top: 1rem;
}
</style>
