<template>
    <div>
      <bar/>
    </div>
    <h1 class="first">基因透镜</h1>
    <p>无需生信背景,也能生信分析</p>
    <div class="nav-container">
      <router-link to="/user" class="nav-link">
        <img src="./../assets/1.png" alt="">
        文件上传与下载</router-link>
      <router-link to="/user" class="nav-link">
        <img src="./../assets/5.png" alt="">数据可视化</router-link>
      <router-link to="/chipseq" class="nav-link">
        <img src="./../assets/6.png" alt="">表观组Chiq-Seq分析</router-link>
      <router-link to="/genomics" class="nav-link">
        <img src="./../assets/2.png" alt="">基因组分析</router-link>
    </div>
</template>

<script>
import bar from '@/components/Tool_Navigation.vue';
export default {
  name: 'ToolView',
  components:{
    bar
  }
}
</script>

<style scoped>
.first{
  padding-top: 70px;
}
.nav-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 60px;
  margin: 0 auto;
  width: 80%;
  height: 75vh;
  padding: 70px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 20px;
  font-weight: 300;
  padding: 40px;
  border-radius: 12px;
  background-color: #e6e6e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.nav-link:hover {
  transform: translateY(-5px);
}
</style>