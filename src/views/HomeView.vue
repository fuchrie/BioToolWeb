<template>
  <bar/>
  <div class="home">
    <HelloWorld msg="欢迎使用基因透镜生信分析网站"/>
  </div>
  <div class="container">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import bar from '@/components/Home_bar.vue';
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Login,
    bar,
  }
}
</script>
<style>
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
.home{
  padding-top: 70px;
}
</style>