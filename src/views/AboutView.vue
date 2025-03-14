<template>
  <bar/>
  <div>
    <img src="" alt="">
    <div class="about">
      <h1>团队成员</h1>
    </div>
    <div>
      <img id ="fkr" src="./../assets/fkr.jpg" alt="">
      <img id ="fkr" src="./../assets/fkr.jpg" alt="">
      <img id ="fkr" src="./../assets/fkr.jpg" alt="">
  </div>
  </div>
</template>
<script>
import bar from '@/components/Home_bar.vue'
export default{
  name:'about',
  components:{
    bar
  }
}
</script>
<style>
#fkr{
  width: 300px;
  margin: 10px;
}
</style>