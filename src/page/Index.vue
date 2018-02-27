<template>
<div class="index">
  <vhead></vhead>
  <vtag></vtag>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="swipe in swipes" :key="swipe.id" class="swiper"><a :href="swipe.linkUrl"><img :src="swipe.picUrl"></a></mt-swipe-item>
  </mt-swipe>

  <div class="hot-song">
    <h2>热门歌单</h2>
    <ul class="hot-wrap">
      <li class="hot-item" v-for="song in songList">
          <div class="hot-media">
            <img :src="song.picUrl" alt="hi">
            <div class="song-count">
              <i class="fa fa-music"> {{ song.accessnum }}</i>
            </div>
            <i class="fa fa-play-circle-o"></i>
          </div>
          <div class="hot-info">
            <h3>{{ song.songListDesc }}</h3>
            <h4>{{ song.songListAuthor }}</h4>
          </div>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import Vhead from '@/components/vhead'
import Vtag from '@/components/vtag'

export default {
  name: 'index',
  data() {
    return {
      data: '',
      swipes: [],
      songList: '',
    }
  },
  components:{
    Swipe: Swipe,
    SwipeItem: SwipeItem,
    Vhead: Vhead,
    Vtag: Vtag,
  },
  created: function(){
    this.$store.dispatch('getHome').then((res) => {
      this.data = res.body.data;
      this.swipes = this.data.slider
      this.songList = this.data.songList
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe{
  background: #ddd;
  width: 100%;
  height: 9.2rem;
}
.swiper a{
  display: inline-block;
}
.swiper a img{
  width: 100%;
}
.hot-song{
  width: 100%;
  margin-top: -1.25rem;
  background-color: #eee;
  color: #333;
  overflow: hidden;
  padding-bottom: 4rem;
}
.hot-song h2{
  height: 3rem;
  line-height: 3rem;
  padding-left: 2vw;
  font-weight: 400;
}
.hot-wrap{
  width: 98%;
  margin-top: -1rem;
}
.hot-song ul li{
  display: inline-block;
  height: 15rem;
  list-style: none;
  background-color: #fff;
  margin-bottom: 1rem;
}
.hot-song ul li:nth-child(2n+1){
  margin-left: -30px;
  margin-right: .3rem;
}
.hot-song ul li a{
  text-decoration: none;
}
.hot-item{
  float: left;
  width: 48%;
  height: 14rem;
  margin: 0 auto;
}
.hot-media{
  position: relative;
}
.song-count i{
  position: absolute;
  left: 8px;
  bottom: 20px !important;
  color: #fff !important;
  font-size: 1em !important;
}
.hot-media img{
  width: 100%;
  height: 12rem;
}
.hot-media i{
  position: absolute;
  right: 8px;
  bottom: 12px;
  color: #eee;
  font-size: 2.5em;
}
.hot-info{
  margin-top: -1rem;
  padding-left: 3vw;
  overflow: hidden;
}
.hot-info h3{
  color: #444;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hot-info h4{
  margin-top: -12px;
  color: #444;
  font-size: 1rem;
  height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style>
.mint-swipe-indicator{
  opacity: .5;
}

</style>
