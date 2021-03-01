<template>
 <div>
   
  <el-input v-model="txt"></el-input>
  <el-button @click='search'>生成</el-button>
   
 </div>
</template>
<script>
import QRcode from '@/components/QRcode.vue'
export default {
components: {
  QRcode
},
data() {
 return {
   isShow:"false",
   txt:"",
   txt2:"",
 }
},
methods:{
  search(){
    this.$router.push({name: 'QRcord',params:{suyuanma:this.txt}})
    isShow:"true",
    this.txt2 = this.txt
  }
}
}
</script>
