import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
// import processRouter from './modules/process'
/**
 *注意：子菜单仅在路由children.length> = 1时出现
 *详细信息请参见：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 *隐藏：如果设置为true，则为true，则项目不会显示在边栏中（默认为false）
 * alwaysShow：如果设置为true，则将始终显示根菜单
 *如果未设置alwaysShow，则当项具有多个子路线时，
 *它将变为嵌套模式，否则不显示根菜单
 * redirect：noRedirect如果设置了noRedirect将不会在面包屑中重定向
 *名称：“ router-name”（路由器名称），该名称由<keep-alive>使用（必须设置！！！）
 * meta：{
    角色：['admin'，'editor']控制页面角色（您可以设置多个角色）
    title：标题显示在侧边栏和面包屑中的名称（推荐集）
    图标：'svg-name'/'el-icon-x'图标显示在侧栏中
    noCache：如果设置为true，则不缓存页面（默认为false）
    affix：true如果设置为true，标签将粘贴在tags-view中
    面包屑：如果设置为false，则该项将隐藏在面包屑中（默认值为true）
    activeMenu：如果设置了路径，则为“ / example / list”，边栏将突出显示您设置的路径
  }
*/

/**
 * constantRoutes
 *没有权限要求的基本页面
 *可以访问所有角色
*/
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/QRcord',
    name: 'QRcord',
    component: () => import('@/views/table/QRcord')
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '溯源后台管理系统', icon: 'dashboard', affix: true }
      }
    ]
  },


]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roleName
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限',
      icon: 'lock',
      roleName: ['企业负责人', 'editor','other'] // you can set roleName in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roleName: ['admin'] // or you can only set roleName in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
          // if do not set roleName, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roleName: ['admin']
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: '/member',
        component: () => import('@/views/member/index'),
        name: 'Member',
        meta: { title: '员工管理', icon: 'lock',roleName: ['other']},       
      }
    ]
  },
  
  chartsRouter,
  tableRouter,
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: '错误页面',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/process',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/process/index'),
        name: 'Process',
        meta: { title: '流程管理', icon: 'theme',roleName: ['other'] },
      }
    ]
  },

  {
    path: '/ruku',
    component: Layout,
    redirect:'/ruku/index',
    alwaysShow: true,
    meta: {
      title: '检验入库',
      icon: 'table',
      roleName: ['Inspectors']
    },
    children: [
      {
        path: '/ruku',
        name:'ruku',
        component: () => import('@/views/ruku/index'),
        meta: { title: '入库记录' ,icon: 'table'}
      }
    ]
  },
  {
    path: '/zhongzhi',
    component: Layout,
    meta: { title: '种植管理' ,icon: 'table',roleName: ['Grower']},
    redirect: '/zhongzhi/bozhong/index',
    children: [
      {
        path: '/bozhong',
        component: () => import('@/views/zhongzhi/bozhong/index'),
        name: 'bozhong',
        meta: { title: '播种记录' ,icon: 'table'}
      },
      {
        path: '/caizhai',
        component: () => import('@/views/zhongzhi/caizhai/index'),
        name: 'caizhai',
        meta: { title: '采摘记录' ,icon: 'table'},
      },
      {
        path: '/binghai',
        component: () => import('@/views/zhongzhi/binghai/index'),
        name: 'binghai',
        meta: { title: '病害虫记录' ,icon: 'table'}
      },
      {
        path: '/shifei',
        component: () => import('@/views/zhongzhi/shifei/index'),
        name: 'shifei',
        meta: { title: '施肥记录' ,icon: 'table'}
      },
    ]
  },
  {
    path: '/jiagong',
    component: Layout,
    redirect:'/jiagong/index',
    alwaysShow: true,
    meta: {
      title: '加工包装',
      icon: 'table',
      roleName: ['Packer']
    },
    children: [
      {
        path: '/jiagong',
        name:'jiagong',
        component: () => import('@/views/jiagong/index'),
        meta: { title: '包装记录' ,icon: 'table'}
      }
    ]
  },
  {
    path: '/wuliu',
    redirect:'/wuliu/index',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '物流管理',
      icon: 'table',
      roleName: ['wuliu'],
    },
    children:[
      {
        path: '/wuliu',
        name:'wuliu',
        component: () => import('@/views/wuliu/index'),
        meta: { title: '物流记录' ,icon: 'table'}
      }
    ]
  },

  {
    path: '/test',
    component: Layout,
    meta: {
      title: '测试',
      icon: 'table'
      ,roleName: ['other']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/index'),
        name: 'Test',
        meta: { title: '测试', icon: 'theme' }
      },
      {
        path: 'index2',
        component: () => import('@/views/test/index2'),
        name: 'Test2',
        meta: { title: '测试2', icon: 'theme' }
      }
    ]
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: '主题', icon: 'theme' }
      }
    ]
  },



  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
