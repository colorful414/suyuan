<template>
<div>
<van-card
  num="2"
  price="2.00"
  desc="描述信息"
  title="商品标题"
  :thumb="img_url"
/>
<van-row type="flex" justify="space-around">
  <van-col span="6">span: 6</van-col>
  <van-col span="6">span: 6</van-col>
</van-row>
</div>
</template>

<script>
export default {
    data(){
        return{
            img_url:''
        }
    }
}
</script>

<style>

</style>