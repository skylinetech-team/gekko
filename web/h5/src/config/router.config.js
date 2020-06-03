// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'Home' },
    redirect: '/live-gekkos',
    children: [
      {
        path: '/gekko',
        name: 'gekko',
        redirect: '/live-gekkos',
        component: RouteView,
        meta: { title: 'Live Gekkos', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/live-gekkos',
            name: 'LiveGekkos',
            hideChildrenInMenu: true,
            component: () => import('@/components/gekko/list'),
            meta: { title: 'Live Gekkos', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/live-gekkos/new',
            hideChildrenInMenu: true,
            component: () => import('@/components/gekko/new')
          },
          {
            path: '/live-gekkos/:id',
            hideChildrenInMenu: true,
            component: () => import('@/components/gekko/singleGekko')
          }
        ]
      },

      // forms
      {
        path: '/backtest',
        redirect: '/backtest/index',
        component: PageView,
        meta: { title: 'Backtest', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/backtest/index',
            hideChildrenInMenu: true,
            name: 'Index',
            component: () => import('@/components/backtester/backtester'),
            meta: { title: 'Backtest', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      {
        path: '/data',
        name: 'localData',
        component: PageView,
        redirect: '/data/index',
        meta: { title: 'Local Data', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/data/index',
            name: 'localDataIndex',
            hideChildrenInMenu: true,
            component: () => import('@/components/data/data'),
            meta: { title: 'Local Data', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/data/importer',
            name: 'importer',
            component: () => import('@/components/data/import/importer'),
            hideChildrenInMenu: true
          },
          {
            path: '/data/importer/import/:id',
            name: 'importerDetail',
            component: () => import('@/components/data/import/single'),
            hideChildrenInMenu: true
          }
        ]
      },
      // list
      {
        path: '/config',
        name: 'config',
        component: PageView,
        redirect: '/config/index',
        meta: { title: 'Config', icon: 'setting', permission: ['table'] },
        children: [
          {
            path: '/config/index',
            name: 'ConfigIndex',
            hideChildrenInMenu: true,
            component: () => import('@/components/config/config'),
            meta: { title: 'Config', keepAlive: true, permission: ['table'] }
          }
        ]
      },
      {
        path: 'https://gekko.wizb.it/docs/introduction/about_gekko.html',
        name: 'Documentation',
        meta: { title: 'Documentation(gekko)', icon: 'bulb', target: '_blank' }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
