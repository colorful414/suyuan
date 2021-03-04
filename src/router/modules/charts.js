/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: '综合图表', noCache: true }
    },
    {
      path: 'echart',
      component: () => import('@/views/charts/echart'),
      name: 'echart',
      meta: { title: '综合图表1', noCache: true }
    },
    {
      path: 'echart2',
      component: () => import('@/views/charts/echart2'),
      name: 'echart2',
      meta: { title: '综合图表2', noCache: true }
    }    
  ]
}

export default chartsRouter
