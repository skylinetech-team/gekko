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
        meta: { title: 'Live Tradebot', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/live-gekkos',
            name: 'LiveGekkos',
            hideChildrenInMenu: true,
            component: () => import('@/components/gekko/list'),
            meta: { title: 'Live Tradebot', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },

      // forms
      {
        path: '/backtest',
        name: 'backtest',
        redirect: '/backtest/index',
        component: RouteView,
        meta: { title: 'Backtest', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/backtest/index',
            hideChildrenInMenu: true,
            name: 'BackIndex',
            component: () => import('@/components/backtester/backtester'),
            meta: { title: 'Backtest', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      {
        path: '/data',
        name: 'localData',
        component: RouteView,
        redirect: '/data/index',
        meta: { title: 'Local Data', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/data/index',
            name: 'localDataIndex',
            hideChildrenInMenu: true,
            component: () => import('@/components/data/data'),
            meta: { title: 'Local Data', keepAlive: true, permission: ['table'] }
          }
        ]
      },
      // list
      {
        path: '/config',
        name: 'config',
        component: RouteView,
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
      }
      // ,
      // {
      //   path: 'https://gekko.wizb.it/docs/introduction/about_gekko.html',
      //   name: 'Documentation',
      //   meta: { title: 'Documentation', icon: 'bulb', target: '_blank' }
      // }
    ]
  },
  {
    path: '*', redirect: '/', hidden: true
  },
  {
    path: '/hiddenview',
    name: 'index',
    component: BasicLayout,
    hidden: true,
    children: [
      {
        path: '/live-gekkos/new',
        meta: { title: 'New Live Tradebot', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/components/gekko/new')
      },
      {
        path: '/live-gekkos/:id',
        meta: { title: 'Live Tradebot Detail', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/components/gekko/singleGekko')
      },
      {
        path: '/data/importer',
        name: 'importer',
        meta: { title: 'Importer', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/components/data/import/importer')
      },
      {
        path: '/data/importer/import/:id',
        name: 'importerDetail',
        meta: { title: 'Importer Detail', keepAlive: true, permission: ['dashboard'] },
        component: () => import('@/components/data/import/single')
      }
    ]
  }
]

export const asyncRouterMap2 = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'main' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: 'Main', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'Main page', keepAlive: false, permission: ['dashboard'] }
          }
          // // 外部链接
          // {
          //   path: 'https://www.baidu.com/',
          //   name: 'Monitor',
          //   meta: { title: '监控页（外部）', target: '_blank' }
          // },
          // {
          //   path: '/dashboard/workplace',
          //   name: 'Workplace',
          //   component: () => import('@/views/dashboard/Workplace'),
          //   meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
          // },
          // {
          //   path: '/dashboard/test-work',
          //   name: 'TestWork',
          //   component: () => import('@/views/dashboard/TestWork'),
          //   meta: { title: '测试功能', keepAlive: true, permission: ['dashboard'] }
          // }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        meta: { title: 'Cap', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: 'large-cap', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: 'mid-cap', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: 'small-cap', keepAlive: true, permission: ['form'] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/table-list',
        meta: { title: 'Digital asset', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: 'Digital asset', keepAlive: true, permission: ['table'] }
          }
          // {
          //   path: '/list/basic-list',
          //   name: 'BasicList',
          //   component: () => import('@/views/list/StandardList'),
          //   meta: { title: '标准列表', keepAlive: true, permission: ['table'] }
          // },
          // {
          //   path: '/list/card',
          //   name: 'CardList',
          //   component: () => import('@/views/list/CardList'),
          //   meta: { title: '卡片列表', keepAlive: true, permission: ['table'] }
          // },
          // {
          //   path: '/list/search',
          //   name: 'SearchList',
          //   component: () => import('@/views/list/search/SearchLayout'),
          //   redirect: '/list/search/article',
          //   meta: { title: '搜索列表', keepAlive: true, permission: ['table'] },
          //   children: [
          //     {
          //       path: '/list/search/article',
          //       name: 'SearchArticles',
          //       component: () => import('@/views/list/search/Article'),
          //       meta: { title: '搜索列表（文章）', permission: ['table'] }
          //     },
          //     {
          //       path: '/list/search/project',
          //       name: 'SearchProjects',
          //       component: () => import('@/views/list/search/Projects'),
          //       meta: { title: '搜索列表（项目）', permission: ['table'] }
          //     },
          //     {
          //       path: '/list/search/application',
          //       name: 'SearchApplications',
          //       component: () => import('@/views/list/search/Applications'),
          //       meta: { title: '搜索列表（应用）', permission: ['table'] }
          //     }
          //   ]
          // }
        ]
      }
      // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: '详情页', icon: 'profile', permission: ['profile'] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic/Index'),
      //       meta: { title: '基础详情页', permission: ['profile'] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: '高级详情页', permission: ['profile'] }
      //     }
      //   ]
      // },

      // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: PageView,
      //   redirect: '/result/success',
      //   meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import('@/views/result/Success'),
      //       meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import('@/views/result/Error'),
      //       meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      //     }
      //   ]
      // },

      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import('@/views/exception/403'),
      //       meta: { title: '403', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import('@/views/exception/404'),
      //       meta: { title: '404', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import('@/views/exception/500'),
      //       meta: { title: '500', permission: ['exception'] }
      //     }
      //   ]
      // },

      // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center/Index'),
      //       meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
      //       redirect: '/account/settings/base',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('@/views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: { title: '安全设置', keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: '个性化设置', keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: '账户绑定', keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: { title: '新消息通知', keepAlive: true, permission: ['user'] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // other
      // {
      //   path: '/other',
      //   name: 'otherPage',
      //   component: PageView,
      //   meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
      //   redirect: '/other/icon-selector',
      //   children: [
      //     {
      //       path: '/other/icon-selector',
      //       name: 'TestIconSelect',
      //       component: () => import('@/views/other/IconSelectorView'),
      //       meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
      //     },
      //     {
      //       path: '/other/list',
      //       component: RouteView,
      //       meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
      //       redirect: '/other/list/tree-list',
      //       children: [
      //         {
      //           path: '/other/list/tree-list',
      //           name: 'TreeList',
      //           component: () => import('@/views/other/TreeList'),
      //           meta: { title: '树目录表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/edit-table',
      //           name: 'EditList',
      //           component: () => import('@/views/other/TableInnerEditList'),
      //           meta: { title: '内联编辑表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/user-list',
      //           name: 'UserList',
      //           component: () => import('@/views/other/UserList'),
      //           meta: { title: '用户列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/role-list',
      //           name: 'RoleList',
      //           component: () => import('@/views/other/RoleList'),
      //           meta: { title: '角色列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/system-role',
      //           name: 'SystemRole',
      //           component: () => import('@/views/role/RoleList'),
      //           meta: { title: '角色列表2', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/permission-list',
      //           name: 'PermissionList',
      //           component: () => import('@/views/other/PermissionList'),
      //           meta: { title: '权限列表', keepAlive: true }
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '*', redirect: '/', hidden: true
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
