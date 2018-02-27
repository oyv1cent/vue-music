<template lang="html">
  <div class="album">
    <vhead></vhead>
    <vtag></vtag>
    <div class="album-bg" :style="{ backgroundImage: imgUrl }">
    </div>
    <div class="album-wrap">
      <img :src="albumImg" alt="loading" />
      <div class="album-info">
        <h1>{{ albumTitle }}</h1>
        <p>
          {{ data.update_time }} 更新
        </p>
      </div>
    </div>
    <div class="rank-total">
      <p>
        排行榜 共{{ data.total_song_num }}首
      </p>
    </div>
    <div class="albums">
      <ul>
        <li
          v-for="(album,index) in albums">
          <div class="album-song" @click="playMusic(album.data.albummid,album.data.songid,album.data.songmid)">
            <span :class="{ highlight: index < 3 }">{{ index+1 }}</span>
            <h2>{{ album.data.songname }}</h2>
            <p v-for="singer in album.data.singer">{{ singer.name }}<i>&nbsp;&nbsp;</i></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vhead from '@/components/vhead'
import Vtag from '@/components/vtag'
import store from '../store'

export default {
  name: 'album',
  components:{
    Vhead,
    Vtag,
  },
  data() {
    return {
      id: '',
      data: '',
      albumImg: '',
      albumTitle: '',
      albums: '',
      imgUrl: '',
      songUrl: '',
      songname: '',
      singername: '',
    }
  },
  created: function(){
    this.id = this.$route.path.substring(7,10)
    store.dispatch('getRankSongs',this.id).then((response) => {
      this.data = response.body
      this.albumImg = this.data.topinfo.pic_album
      this.albumTitle = this.data.topinfo.ListName
      this.albums = this.data.songlist
      this.imgUrl = "url('"+this.albumImg+"')"
    })
  },
  methods: {
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
    }
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
.album-bg{
  width: 100%;
  height: 10rem;
  background: url('../assets/logo.png') center center no-repeat;
  background-size: cover;
  filter: blur(8px);
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.album-wrap{
  width: 100%;
  height: 10rem;
  overflow: hidden;
  background-color: rgba(0,0,0,.7);
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
  z-index: 100;
}
.album-wrap img{
  width: 30%;
  position: absolute;
  top: 2rem;
  left: 6%;
}
.album-wrap h1{
  font-size: 19px;
  font-weight: 500;
  position: absolute;
  top: 2rem;
  left: 40%;
}
.album-wrap p{
  font-weight: 300;
  position: relative;
  top: 6rem;
  left: 40%;
}
.rank-total{
  height: 4rem;
  line-height: 3rem;
  color: #888;
  font-size: 18px;
  margin-top: 5rem;
}
.rank-total p{
  text-indent: 20px;
}
.albums{
  margin-top: -2rem;
  margin-bottom: 3rem;
}
.albums ul{
  margin-left: -2.5rem;
}
.albums ul li{
  width: 90%;
  margin: 0 auto;
  list-style: none;
  border-bottom: 1px solid #ddd;
}
.album-song{
  height: 5rem;
  overflow: hidden;
}
.highlight{
  color: red;
}
.album-song span{
  width: 14%;
  float: left;
  line-height: 5rem;
  padding: 0 5%;
  text-align: center;
  font-size: 22px;
}
.album-song h2{
  font-size: 16px;
  font-weight: 400;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.album-song p{
  display: inline-block;
  font-size: 14px;
  color: #000;
  line-height: 0;
}
</style>
