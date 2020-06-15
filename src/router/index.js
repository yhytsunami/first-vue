import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld1 from '@/components/HelloWorld1'
import User from '@/components/Tree'
import Honey from '@/components/Honey'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tree',
      name: 'Tree',
      component: User
    },
    {
      path: '/h1',
      name: 'HelloWorld1',
      component: HelloWorld1
    },{
      path: '/honey',
      name : 'Honey',
      component : Honey
    }
  ]
})
