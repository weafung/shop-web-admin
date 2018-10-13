import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import Setting from '@/components/Setting'
import ShopOwner from '@/components/ShopOwner'
import Goods from '@/components/Goods'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      redirect: '/admin/goods',
      children: [{
        path: 'goods',
        name: 'Goods',
        component: Goods,
        meta: {
          title: '商品管理'
        }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting,
        meta: {
          title: '系统设置'
        }
      },
      {
        path: 'shopOwner',
        name: 'ShopOwner',
        component: ShopOwner,
        meta: {
          title: '店主管理'
        }
      }
      ]
    }

  ]
})
