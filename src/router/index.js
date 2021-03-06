import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import Setting from '@/components/Setting'
import User from '@/components/User'
import Goods from '@/components/Goods'
import Login from '@/components/Login'
import Forbidden from '@/components/error/403'
import NotFound from '@/components/error/404'
import InternalServerError from '@/components/error/500'
import SkuAttributeName from '@/components/SkuAttributeName'
import SkuAttributeValue from '@/components/SkuAttributeValue'
import Category from '@/components/Category'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      redirect: '/admin/order',
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
        path: 'user',
        name: 'User',
        component: User,
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: Category,
        meta: {
          title: '类目管理'
        }
      },
      {
        path: 'order',
        name: 'Order',
        component: Order,
        meta: {
          title: '订单管理'
        }
      },
      {
        path: 'sku/attributeName',
        name: 'AttributeName',
        component: SkuAttributeName,
        meta: {
          title: 'SKU管理'
        }
      },
      {
        path: 'sku/attributeValue',
        name: 'AttributeValue',
        component: SkuAttributeValue,
        meta: {
          title: 'SKU管理'
        }
      }
      ]
    },
    {
      path: '/error',
      name: 'Error',
      redirect: '/error/404',
      component: Admin,
      children: [
        {
          path: '403',
          name: 'Forbidden',
          component: Forbidden,
          meta: {
            title: '暂无权限访问'
          }
        },
        {
          path: '404',
          name: 'NotFound',
          component: NotFound,
          meta: {
            title: '页面找不到'
          }
        },
        {
          path: '500',
          name: 'InternalServerError',
          component: InternalServerError,
          meta: {
            title: '服务器出错'
          }
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }

  ]
})
