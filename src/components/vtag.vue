<template lang="html">
  <div class="vtag">
    <nav>
      <li @click="changeState" :class="{ on: currentUrl == '/app/recommend'}">
        <router-link :to="{ path:'/app/recommend' }">推荐</router-link>
      </li>
      <li @click="changeState" :class="{ on: currentUrl == '/app/rank' }">
        <router-link :to="{ path:'/app/rank' }" :class="{ on: currentUrl == '2' }" >排行榜</router-link>
      </li>
      <li @click="changeState" :class="{ on: currentUrl == '/app/search' }">
        <router-link :to="{ path:'/app/search' }" :class="{ on: currentUrl == '3' }" >搜索</router-link>
      </li>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'vtag',
  data() {
    return {
      currentUrl: '/app/recommend',
    }
  },
  methods: {
    changeState: function(e){
      this.currentUrl = this.$route.path
    }
  },
  created: function(){
    this.currentUrl = this.$route.path
  },
  watch: {
    $route: function(){
      this.currentUrl = this.$route.path
    }
  }
}
</script>

<style lang="css" scoped>
.vtag{
  width: 100vw;
  height: 3rem;
  background-color: #fff;
  margin-bottom: .15rem;
}
.vtag nav li{
  display: inline-block;
  width: 32.2vw;
  height: 3rem;
  list-style: none;
  text-align: center;
  line-height: 3rem;
}
.vtag nav li a{
  color: #666;
  font-size: 1.4rem;
  text-decoration: none;
}
.on{
    border-bottom: 2px solid #31c27c;
}
.on a{
    color: #31c27c !important;
}
</style>
