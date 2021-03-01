<template>
<div :data="list" v-loading="listLoading">
<van-divider
:style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
>溯源码：{{list.suyuanma}}</van-divider>
<van-card
  :desc="'产品简介：'+list.title"
  :title="'产品名：'+list.productname"
  :thumb="list.image_url"
/>
<van-cell-group>
  <van-cell title="产商" :value="list.producer" />
  <van-cell title="销量" :value="list.pageviews" />
</van-cell-group>

<van-steps direction="vertical" :active="14">
  <van-step>
    <h3>播种时间</h3>
    <p>{{list.timebozhong | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
  </van-step>
  <van-step>
    <h3>播种量(kg)</h3>
    <p>{{list.bozhongnum}}</p>
  </van-step>
  <van-step>
    <h3>播种地点</h3>
    <p>{{list.productbozhonglocation}}</p>
  </van-step>
  <van-step>
    <h3>施肥时间</h3>
    <p>{{list.timeshifei | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
  </van-step>
  <van-step>
    <h3>施肥次数</h3>
    <p>{{list.shifeinum}}</p>
  </van-step>
  <van-step>
    <h3>喷药时间</h3>
    <p>{{list.timepenyao | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
  </van-step>
  <van-step>
    <h3>喷药效果</h3>
    <p>{{list.penyaores}}</p>
  </van-step>
  <van-step>
    <h3>采摘时间</h3>
    <p>{{list.timecaizhai | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
  </van-step>
  <van-step>
    <h3>采摘数量</h3>
    <p>{{list.caizhainum}}</p>
  </van-step>
  <van-step>
    <h3>入库时间</h3>
    <p>{{list.timeruku | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
  </van-step>
  <van-step>
    <h3>入库地点</h3>
    <p>{{list.productrukulocation}}</p>
  </van-step>
  <van-step>
    <h3>发货时间</h3>
    <p>{{list.timefahuo | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
  </van-step>
  <van-step>
    <h3>发货地点</h3>
    <p>{{list.productfahuolocation}}</p>
  </van-step>
  <van-step>
    <h3>订单号</h3>
    <p>{{list.dingdaninum}}</p>
  </van-step>
  <van-step>
    <h3>发售时间</h3>
    <p>{{list.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
  </van-step>
</van-steps>
</div>
</template>

<script>
import { fetchArticle} from '@/api/article'
import { parseTime } from '@/utils'
export default {
    data(){
        return{
          list: null,
          listLoading: true,
          bozhong: false,
          shifei: false,
          penyao: false,
          caizhai: false,
          ruku: false,
          fahuo: false,
          // listQuery:{
          //   suyuanma: undefined,
          //   productname:'',
          //   productrukulocation:'',
          //   timeruku: new Date(),
          //   title: '',
          //   image_url:'',
          // },
        }
    },
    created(){
      // this.getList()
      const id = this.$route.params.suyuanma
      this.fetchData(id)
    },
    methods:{
    fetchData(id) {
      this.listLoading = true
      fetchArticle(id).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }).catch(
      setTimeout(() => {
        this.listLoading = false
      }, 3000)
      )
    },  
    showbozhong() {
      this.bozhong = true;
    },
    showshifei() {
      this.shifei = true;
    },  
    showpenyao() {
      this.penyao = true;
    },  
    showcaizhai() {
      this.caizhai = true;
    },  
    showruku() {
      this.ruku = true;
    }, 
    showfahuo() {
      this.fahuo = true;
    },
    }
}
</script>

<style>

</style>