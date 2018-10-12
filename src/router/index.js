import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import Setting from '@/components/Setting'
import ShopOwner from '@/components/ShopOwner'

Vue.use(Router)

export default new Router({
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
      children: [{
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
