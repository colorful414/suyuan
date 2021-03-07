<template>
  <div>
    <el-button type="success" icon="el-icon-video-camera-solid" @click="goShow" v-if='isDis' round>开始</el-button>
    <div v-if="isShow">
  <iframe src="/jqueryDynamicRanking/index.html" frameborder="0" style="width:1320px;height:650px;" id="iframeBox"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShow:false,
      isDis:true,
    }
  },
  methods:{
    goShow(){
      this.isShow = true;
      this.isDis = false;
    }
  }

}
</script>

<style scoped>
#iframeBox{
  border: 1px solid red;
}
.el-button{
  margin: 0 auto;
}
</style>