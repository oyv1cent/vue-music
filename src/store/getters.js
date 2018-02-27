export default{
  imgUrl: state => {
    if(typeof state.currentMusic.albummid === 'undefined')
      return false
    else
      return "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+state.currentMusic.albummid+".jpg"
  },
  musicUrl: state => {
    if(state.currentMusic.songurl === 'undefined')
      return false
    else
      return state.currentMusic.songurl
  },
  singername: state =>{
    if(state.currentMusic.singername === 'undefined')
      return false
    else
      return state.currentMusic.singername
  },
  songname: state =>{
    if(state.currentMusic.songname === 'undefined')
      return false
    else
      return state.currentMusic.songname
  },
}
