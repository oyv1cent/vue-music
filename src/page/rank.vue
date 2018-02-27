<template lang="html">
  <div class="ranklist">
    <vhead></vhead>
    <vtag></vtag>
    <div class="rank-item" v-for="rank in ranks" @click="routerTo(rank.id)">
      <img :src="rank.picUrl" alt="1">
      <h2>{{ rank.topTitle }}</h2>
      <p v-for="song in rank.songList">
        <span>{{ song.songname }}</span> - {{ song.singername }}
      </p>
    </div>
  </div>
</template>

<script>
import Vhead from '@/components/vhead'
import Vtag from '@/components/vtag'
export default {
  name: 'ranklist',
  components: {
    Vhead,
    Vtag,
  },
  data() {
    return {
      ranks: '',
    }
  },
  created: function(){
    this.$store.dispatch('getRankList').then((response) => {
        this.ranks = response.body.data.topList
    })
  },
  methods:{
    routerTo: function(e){
      this.$router.push({ path: '/album/' + e })
    }
  },

}
</script>

<style lang="css">
.ranklist{
  width: 100%;
  background-color: #eee;
  overflow: hidden;
  padding-bottom: 5rem;
}
.rank-item{
  width: 94%;
  height: 7rem;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 1rem;
  overflow: hidden;
}
.rank-item img{
  float: left;
  width: 30%;
  height: 7rem;
  margin-right: 10px;
  border-radius: 1rem;
}
.rank-item h2{
  width: 60%;
  height: 1.1rem;
  text-overflow: ellipsis;
  white-space:nowrap;
  overflow: hidden;
  font-size: 1rem;
  color: #000;
  margin-bottom: .8rem;
  margin-top: .2rem;
}
.rank-item p{
  width: 60%;
  height: .9rem;
  font-size: .8rem;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  margin-top: .5rem;
  white-space:nowrap;
  text-overflow: ellipsis;
}
.rank-item p span{
  color: #000;
}
</style>
