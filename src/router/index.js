import Vue from 'vue'
import Router from 'vue-router'
import Content from '../components/Content'
import Home from '../components/Home'
import Archives from '../components/Archives'
import Test from '../components/Test'
import System from '../components/System'
import QuanZong from '../components/QuanZong'
import Permission from '../components/Permission'
import OrdinaryPermission from '../components/OrdinaryPermission'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:Home
    },
    {
      path:"/templetManage",
      component:Content
    },
    {
      path:"/archivesManage",
      component:Archives
    },
    {
      path:"/systemManage",
      component:System,
      children:[
        {
          path:"quanZong",
          component:QuanZong,
        },
        {
          path:"permission",
          component:Permission,
        },
        {
          path:"OrdinaryPermission",
          component:OrdinaryPermission,
        }
      ]
    }

  ]
})
