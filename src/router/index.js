import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Rank from '@/page/rank'
import Search from '@/page/search'
import Album from '@/page/album'
import Cd from '@/page/cd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/app/recommend',
    },
    {
      path: '/app/recommend',
      name: 'recommend',
      component: Index,
    },
    {
      path: '/app/rank',
      name: 'rank',
      component: Rank,
    },
    {
      path: '/app/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/album/:id',
      name: 'album',
      component: Album,
    },
    {
      path: '/cd',
      name: 'cd',
      component: Cd,
    }
  ]
})
