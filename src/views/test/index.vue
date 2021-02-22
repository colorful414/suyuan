<template>
 <div>
   <QRcode :url='url'/>
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
   url:'https://www.bilibili.com/'
 }
}
}
</script>
