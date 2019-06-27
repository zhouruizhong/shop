import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'

// 声明使用插件
Vue.use(Router);

export default new Router({
  // 所有路由
  routes: [
    {
      path: '/msite',
      name: 'Msite',
      component: Msite
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },{
      path: '/',
      name: 'init',
      redirect: Msite
    }
  ]
})
