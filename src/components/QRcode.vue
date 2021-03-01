<template>
  <div id="qrCode">
    <div id="code"></div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  props:['txt2'],
  data() {
    return {
      msg: "hello vue",
      code: "20000",
      // txt2:"",
    };
  },

  components: {
    QRCode: QRCode
  },

  methods: {
    useqrcode() {
      var canvas = document.getElementById("canvas");
      
      this.$router.push({name: 'QRcord',params:{suyuanma:this.txt2}})
      
      QRCode.toCanvas(canvas, this.txt2, function(error) {
        if (error) console.error(error);
      });
      console.log(111)
    }
  },

  mounted() {
    this.useqrcode();
  }
};
</script>
<style lang="stylus" scoped>
#qrCode {
  text-align: center;
}
</style>


