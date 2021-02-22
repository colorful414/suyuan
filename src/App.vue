<template>
  <div id="app">
    <router-view />
    <BackToTop></BackToTop>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop/index'
export default {
  name: 'App',
  components: {
    BackToTop
  },
}
</script>
