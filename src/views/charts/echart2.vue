<template>
<div>
    <div class="filter-container">
      <el-input v-model="listQuery.productname" placeholder="产品名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" style="margin-left: 80px;" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div id="map" :data="list" v-loading="listLoading"></div>
</div>
</template>

<script>
import { fetchList} from '@/api/article'
import waves from '@/directive/waves'
export default {
//   filters: {
//     typeFilter(type) {
//       return calendarTypeKeyValue[type]
//     }
//   },
directives: { waves },
    data (){
        return{
            list: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                suyuanma: undefined,
                productname:'',
                productrukulocation:'',
                // pageviews:'',
                },
            productname2:'大白菜',
            // pageviews2:'',
        }
    },
    methods:{
    handleFilter() {
      // this.listQuery.page = 1
      this.getList()
      this.search()
      // console.log(this.productname2);
    },
    search(){
      var that = this;
      console.log(that.productname2+that.pageviews2);
    that.$nextTick(() => {       
    that.productname2 = that.listQuery.productname
    // that.pageviews2 = that.listQuery.pageviews
      var mapName = "china";
      var data = [
        { name: "北京", value: Math.floor(Math.random() * 200) },
        { name: "天津", value: Math.floor(Math.random() * 200) },
        { name: "河北", value: Math.floor(Math.random() * 200) },
        { name: "山西", value: Math.floor(Math.random() * 200) },
        { name: "内蒙古", value: Math.floor(Math.random() * 200) },
        { name: "辽宁", value: Math.floor(Math.random() * 200) },
        { name: "吉林", value: Math.floor(Math.random() * 200) },
        { name: "黑龙江", value: Math.floor(Math.random() * 200) },
        { name: "上海", value: Math.floor(Math.random() * 200) },
        { name: "江苏", value: Math.floor(Math.random() * 200) },
        { name: "浙江", value: Math.floor(Math.random() * 200) },
        { name: "安徽", value: Math.floor(Math.random() * 200) },
        { name: "福建", value: Math.floor(Math.random() * 200) },
        { name: "江西", value: Math.floor(Math.random() * 200) },
        { name: "山东", value: Math.floor(Math.random() * 200) },
        { name: "河南", value: Math.floor(Math.random() * 200) },
        { name: "湖北", value: Math.floor(Math.random() * 200) },
        { name: "湖南", value: Math.floor(Math.random() * 200) },
        { name: "重庆", value: Math.floor(Math.random() * 200) },
        { name: "四川", value: Math.floor(Math.random() * 200) },
        { name: "贵州", value: Math.floor(Math.random() * 200) },
        { name: "云南", value: Math.floor(Math.random() * 200) },
        { name: "西藏", value: Math.floor(Math.random() * 200) },
        { name: "陕西", value: Math.floor(Math.random() * 200) },
        { name: "甘肃", value: Math.floor(Math.random() * 200) },
        { name: "青海", value: Math.floor(Math.random() * 200) },
        { name: "宁夏", value: Math.floor(Math.random() * 200) },
        { name: "新疆", value: Math.floor(Math.random() * 200) },
        { name: "广东", value: Math.floor(Math.random() * 200) },
        { name: "广西", value: Math.floor(Math.random() * 200) },
        { name: "海南", value: Math.floor(Math.random() * 200) }
      ];
      var geoCoordMap = {};
      var toolTipData = [
        {
          name: "新疆",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "北京",
          value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "天津",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "河北",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "山西",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "内蒙古",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "辽宁",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "吉林",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "黑龙江",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "上海",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "江苏",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "浙江",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "安徽",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "福建",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "江西",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "山东",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "河南",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "湖北",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "湖南",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "重庆",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "四川",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "贵州",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "云南",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "西藏",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "陕西",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "甘肃",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "青海",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "宁夏",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "广东",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "广西",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        },
        {
          name: "海南",
        value: [{ name: "产品名" , value: that.productname2 == ''? "大白菜": that.productname2} , { name: "销量", value: Math.floor(Math.random() * 200) }]
        }
      ];

      /*获取地图数据*/
      let myChart = this.$echarts.init(document.getElementById("map"));
      // myChart.showLoading();
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      // myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
    //   console.log(data);
    //   console.log(toolTipData);
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              var toolTiphtml = "";
              for (var i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ":<br>";
                  for (var j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ":" +
                      toolTipData[i].value[j].value +
                      "<br>";
                  }
                }
              }
            //   console.log(toolTiphtml);
              // console.log(convertData(data))
              return toolTiphtml;
            } else {
              var toolTiphtml = "";
              for (var i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ":<br>";
                  for (var j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ":" +
                      toolTipData[i].value[j].value +
                      "<br>";
                  }
                }
              }
            //   console.log(toolTiphtml);
              // console.log(convertData(data))
              return toolTiphtml;
            }
          }
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['credit_pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
          show: true,
          min: 0,
          max: 200,
          left: 0,
          bottom: 200,
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            color: ["#00467F", "#A5CC82"] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          }
        },
        /*工具按钮组*/
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {
                    readOnly: false
                },
                restore: {},
                saveAsImage: {}
            }
        },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#031525",
              borderColor: "#3B5077"
            },
            emphasis: {
              areaColor: "#2B91B7"
            }
          }
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#05C3F9"
              }
            }
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: false,
            data: data
          },
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin", //气泡
            symbolSize: function(val) {
              var a = (maxSize4Pin - minSize4Pin) / (max - min);
              var b = minSize4Pin - a * min;
              b = maxSize4Pin - a * max;
              return a * val[2] + b;
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#F62157" //标志颜色
              }
            },
            zlevel: 6,
            data: convertData(data)
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value;
                })
                .slice(0, 5)
            ),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow"
              }
            },
            zlevel: 1
          },

        ]
      };
      myChart.setOption(option);
    });
    },
        getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
            this.list = response.data.items
            // console.log(this.listQuery.productname);
            // this.total = response.data.total
            // Just to simulate the time of the request
            setTimeout(() => {
            this.listLoading = false
            }, 1.5 * 1000)
        }).catch(
        setTimeout(() => {
            this.listLoading = false
        }, 3000)
        )
        },
    },
  created() {
    this.getList()
    
  },
  mounted() {
    // console.log(this.listQuery.productname+this.listQuery.pageviews+11);
    let _this = this
    _this.search()
  }
}
</script>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 600px;
  }
</style>