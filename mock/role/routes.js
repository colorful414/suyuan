// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
]

const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/member',
    component: 'layout/Layout',
    children: [
      {
        path: '/member',
        component: '@/views/member/index',
        name: 'Member',
        meta: { title: '员工管理', icon: 'lock',noCache: true},       
      }
    ]
  },

  {
    path: '/process',
    component: 'layout/Layout',
    children: [
      {
        path: '/index',
        component: '@/views/process/index',
        name: 'Process',
        meta: { title: '流程管理', icon: 'theme',noCache: true },
      }
    ]
  },
  {
    path: '/ruku',
    component: 'layout/Layout',
    redirect:'/ruku/index',
    alwaysShow: true,
    meta: {
      title: '检验入库',
      icon: 'table'
    },
    children: [
      {
        path: '/ruku',
        name:'ruku',
        component: '@/views/ruku/index',
        meta: { title: '入库记录' ,icon: 'table',noCache: true }
      }
    ]
  },

  {
    path: '/zhongzhi',
    component: 'layout/Layout',
    meta: { title: '种植管理' ,icon: 'table'},
    redirect: '/zhongzhi/bozhong/index',
    children: [
      {
        path: '/bozhong',
        component: '@/views/zhongzhi/bozhong/index',
        name: 'bozhong',
        meta: { title: '播种记录' ,icon: 'table',noCache: true }
      },
      {
        path: '/caizhai',
        component: '@/views/zhongzhi/caizhai/index',
        name: 'caizhai',
        meta: { title: '采摘记录' ,icon: 'table',noCache: true },
      },
      {
        path: '/binghai',
        component: '@/views/zhongzhi/binghai/index',
        name: 'binghai',
        meta: { title: '病害虫记录' ,icon: 'table',noCache: true }
      },
      {
        path: '/shifei',
        component: '@/views/zhongzhi/shifei/index',
        name: 'shifei',
        meta: { title: '施肥记录' ,icon: 'table',noCache: true }
      },
    ]
  },
  
  {
    path: '/jiagong',
    component: 'layout/Layout',
    redirect:'/jiagong/index',
    alwaysShow: true,
    meta: {
      title: '加工包装',
      icon: 'table'
    },
    children: [
      {
        path: '/jiagong',
        name:'jiagong',
        component: '@/views/jiagong/inde',
        meta: { title: '包装记录' ,icon: 'table',noCache: true }
      }
    ]
  },
  {
    path: '/wuliu',
    redirect:'/wuliu/index',
    component: 'layout/Layout',
    alwaysShow: true,
    meta: {
      title: '物流管理',
      icon: 'table'
    },
    children:[
      {
        path: '/wuliu',
        name:'wuliu',
        component: '@/views/wuliu/index',
        meta: { title: '物流记录' ,icon: 'table',noCache: true }
      }
    ]
  },

  {
    path: '/test',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: '@/views/test/index',
        name: 'Test',
        meta: { title: '测试', icon: 'theme',noCache: true }
      },
      {
        path: 'index2',
        component: '@/views/test/index2',
        name: 'Test2',
        meta: { title: '测试2', icon: 'theme',noCache: true }
      }
    ]
  },

  {
    path: '/theme',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: '@/views/theme/index',
        name: 'Theme',
        meta: { title: '主题', icon: 'theme',noCache: true }
      }
    ]
  },



  {
    path: 'external-link',
    component: 'layout/Layout',
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: '外部链接', icon: 'link',noCache: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
