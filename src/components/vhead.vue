<template lang="html">
  <div class="v-head">
    <h1>
      <img src="../assets/music.png" alt="vue-music"/>
      <i>Vue音乐</i>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'v-head',
}
</script>

<style scoped>
.v-head{
  width: 100%;
  height: 3rem;
  background-color: #31c27c;
  color: #fff;
  line-height: 3rem;
}
.v-head h1{
  width: 100%;
  height: 3rem;
  margin: 0 auto;
  text-align: center;
}
.v-head img{
  vertical-align: middle;
}
.v-head i{
  font-style: normal;
  font-size: 1.3rem;
  font-weight: 300;
}
</style>
