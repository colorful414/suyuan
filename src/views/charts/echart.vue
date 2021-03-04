<template>
  <div>
      <input type="file" id="inputfile" name="fileContent">
      <svg width="1900" height="1020"></svg>
  </div>
</template>

<script>
import {external_imgs} from './echart_d3/imgs.js';
import {config} from './echart_d3/config.js';
import {getCsv , draw} from './echart_d3/visual.js';
import {external_colors} from './echart_d3/colors.js';
export default {
    // mounted() {
    //   const s = document.createElement('script');
    //   s.type = 'text/javascript';
    //   s.src = 'https://d3js.org/d3.v5.min.js';
    //   document.body.appendChild(s);
    //   console.log(1111);
    // },
}
</script>

<style scoped>
@import 'echart_d3/stylesheet.css';
</style>