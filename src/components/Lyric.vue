<template>
  <div id="lyric">
    <p class="lyric-item" v-for="v in currentLyric">{{v}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Lyric',
    props: ['currentTime', 'songid'],
    data () {
      return {
        lyric: null
      }
    },
    components: {},
    methods: {},
    created:function(){
      let a = 10.112
      this.$store.dispatch('getLyric',this.songid)
        .then((responce) => {
          this.lyric = new Buffer(responce.body.lyric, 'base64').toString()
            this.lyric = this.lyric.split('[')
            .slice(5)
            .map(str => {
              let t = str.split(']')
              return {[t[0]]: t[1]}
            })
            .reduce((a, b) => {
              return {...a, ...b}
            })
        })
    },
    mounted:function(){
    },
    computed: {
      currentLyric: function () {
        if (this.lyric !== null) {
          let that = this
          let pastLyric = []
          let i = 0
          Object.keys(this.lyric).forEach(function (key) {
            if (key.split(':')
                .reduce((a, b) =>
                parseInt(a) * 60 * 100 + b
                  .split('.')
                  .reduce((a, b) =>
                  parseInt(a) * 100 + parseInt(b))) - 120 <= that.currentTimeStamp) {
              if (that.lyric[key] !== '\n') pastLyric.push(that.lyric[key])
            } else if (i <= 1 && that.lyric[key] !== '\n') {
              pastLyric.push(that.lyric[key])
              i++
            }
          })
          return pastLyric.slice(pastLyric.length - 5, pastLyric.length - 1)
        }
      },
      currentTimeStamp: function () {
        let t = parseFloat(this.currentTime).toFixed(2)
        return t*100
      }
    },
  }
</script>

<style scoped>
  #lyric {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    flex-grow: 1;
  }

  .lyric-item {
    text-align: center;
    color: #31c27c;
    opacity: .8;
    transition: color 1s;
    font-size: 20px;
  }
  .lyric-item:first-child {
    font-size: 16px;
    color: #eee;
    opacity: .6;
  }
  .lyric-item:nth-child(2){
    font-size: 16px;
    color: #eee;
    opacity: .6;
  }
  .lyric-item:last-child {
    font-size: 16px;
    color: #eee;
    opacity: .6;
  }
</style>
