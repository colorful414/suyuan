const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_url = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  // List.push(Mock.mock({
  //   id: '',
  //   image_url,
  //   suyuanma:'',
  //   items: [{
  //     name: '',
  //     variable: '',
  //  }]
  // }))
  List.push(Mock.mock({
    id: '@increment',
    liuchengid: '@increment',
    timestamp: +Mock.Random.date('T'),
    timebozhong: +Mock.Random.date('T'),
    timecaizhai: +Mock.Random.date('T'),
    timepenyao: +Mock.Random.date('T'),
    timeshifei: +Mock.Random.date('T'),
    timeruku: +Mock.Random.date('T'),
    timebaozhuang: +Mock.Random.date('T'),
    timefahuo: +Mock.Random.date('T'),
    timezhongzhi: +Mock.Random.date('T'),
    productname: '@first',
    productrukulocation:'@first',
    productbozhonglocation:'@first',
    productbaozhuanglocation:'@first',
    productfahuolocation:'@first',
    producer: '@first',
    caizhainum: '@integer(300, 5000)',
    bozhongnum: '@integer(1, 100)',
    shifeinum: '@integer(1, 10)',
    dingdaninum: '@integer(1000, 9999)',
    'penyaores|1': ['好', '不好'],
    'liuchengtype|1': ['检验入库', '种植管理','加工包装','物流管理'],
    'liuchengname|1': ['入库流程', '播种流程','施肥流程','采摘流程','病害记录','包装流程','物流流程'],
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['已发售', '未发售'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(0, 5000)',
    image_url,
    suyuanma:'@increment',
    platforms: ['a-platform'],
    items: [{
      value: '',
      'value|1': ['入库流程', '播种流程','施肥流程','采摘流程','病害记录','包装流程','物流流程'],
   }]
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { producer, type, productname, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (producer && item.producer.indexOf(producer) < 0) return false
        if (type && item.type !== type) return false
        if (productname && item.productname.indexOf(productname) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

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
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
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

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

