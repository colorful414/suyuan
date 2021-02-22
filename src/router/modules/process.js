/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const processRouter = {
  path: '/process',
  component: Layout,
  redirect: '/process/menu1/menu1-1',
  name: 'process',
  meta: {
    title: '流程管理',
    icon: 'table'
  },
  children: [
    {
      path: 'ruku',
      name: 'ruku',
      component: () => import('@/views/process/ruku/index'),
      meta: { title: '入库记录' , icon: 'table' }
    },
    {
      path: 'zhongzhi',
      component: () => import('@/views/process/zhongzhi/index'), // Parent router-view
      name: 'zhongzhi',
      meta: { title: '种植管理' , icon: 'table'},
      redirect: '/process/zhongzhi/bozhong/index',
      children: [
        {
          path: 'bozhong',
          component: () => import('@/views/process/zhongzhi/bozhong/index'),
          name: 'bozhong',
          meta: { title: '播种记录' ,icon: 'table'}
        },
        {
          path: 'caizhai',
          component: () => import('@/views/process/zhongzhi/caizhai/index'),
          name: 'caizhai',
          redirect: '/process/zhongzhi/caizhai/index',
          meta: { title: '采摘记录' ,icon: 'table'},
        },
        {
          path: 'binghai',
          component: () => import('@/views/process/zhongzhi/binghai/index'),
          name: 'binghai',
          meta: { title: '病害虫记录' ,icon: 'table'}
        },
        {
          path: 'shifei',
          component: () => import('@/views/process/zhongzhi/shifei/index'),
          name: 'shifei',
          meta: { title: '施肥记录' ,icon: 'table'}
        },
      ]
    },
    {
      path: 'jiagong',
      name: 'jiagong',
      component: () => import('@/views/process/jiagong/index'),
      meta: { title: '包装记录' ,icon: 'table'}
    },
    {
      path: 'wuliu',
      name: 'wuliu',
      component: () => import('@/views/process/wuliu/index'),
      meta: { title: '物流记录' ,icon: 'table'}
    }
  ]
}

export default processRouter
