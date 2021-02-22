// import Mock from 'mockjs'
const Mock = require('mockjs')
const data = Mock.mock({
  'items|100': [
    {
      memberid: '@increment',
      username: '@name',
      'type|1': ['企业负责人', '种植员', '检验员','加工包装员','物流负责人','分销商'],
      pageviews: '@integer(300, 5000)',
      firmid:'@integer(10000, 99999)',
      remark: '@title(5, 10)',
    }
  ]
})

module.exports = [
  {
    url: '/vue-element-admin/member/list',
    type: 'get',
    response: config => {
      const { type, username, page = 1, limit = 20, sort } = config.query

      let mockList = data.items.filter(item => {
        if (type && item.type !== type) return false
        if (username && item.username.indexOf(username) < 0) return false
        return true
      })
      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/member/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const memeber of data.items) {
        if (memeber.id === +id) {
          return {
            code: 20000,
            data: memeber
          }
        }
      }
    }
  },
  {
    url: '/vue-element-admin/member/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/member/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/member/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },
]