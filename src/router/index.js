import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import myfilter from '../components/myfilter'
import list from '../components/list'
import detail from '../components/detail'
import details from '../components/details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'myfilter',
      component: myfilter
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/details',
      name: 'details',
      component: details
    }
  ]
})
