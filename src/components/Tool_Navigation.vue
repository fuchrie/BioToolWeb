<template>
    <div>
      <nav class="navigation-bar">
        <ul class="nav-list">
          <li class="nav-item">
            <div class="bartext">
              <router-link to="/" class="nav-link1">首页</router-link>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown-container" @mouseout="hide_childbar('epigenomics')" @mouseover="show_childbar('epigenomics')">
              <p class="bartext">表观组分析</p>
              <div v-show="flags.epigenomics" class="dropdown-content">
                <router-link to="/chipseq" class="nav-link2">chipseq</router-link>
              </div>
            </div>
          </li>
          <li>
            <div class="dropdown-container" @mouseout="hide_childbar('genomics')" @mouseover="show_childbar('genomics')">
              <p class="bartext">基因组分析</p>
              <div v-show="flags.genomics" class="dropdown-content">
                <router-link to="/chipseq" class="nav-link2">chipseq</router-link>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="bartext">
              <router-link to="/about" class="nav-link1">关于我们</router-link>
            </div>
          </li>
          <li class="nav-item user-item">
            <div class="bartext">
              <router-link to="/user" class="nav-link1">用户</router-link>
            </div>
          </li>
          
        </ul>
      </nav>
    </div>
</template>
  
  <script>
  import {ref} from "vue";
  export default {
    name: "ToolNavigationBar",
    setup(){
      const flags = ref({
        epigenomics: false, // 表观组分析
        genomics: false,   // 基因组分析
      });
      function show_childbar(key){
        flags.value[key]=true
      }
      function hide_childbar(key){
        flags.value[key]=false
      }
      return{
        flags,
        show_childbar,
        hide_childbar
      }
    }
  }
  </script>
  
  <style scoped>
  .user-item {
    margin-left: auto; /* 将用户项推到最右侧 */
  }
  .navigation-bar {
    position: fixed; /* 固定定位 */
    top: 0; /* 固定在顶部 */
    left: 0; /* 从左侧开始 */
    width: 100%; /* 宽度占满整个视口 */
    height: 30px;
    background-color: #2c3e50; /* 导航栏背景颜色 */
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* 确保导航栏在最上层 */
  }
  
  .nav-list {
    list-style: none; /* 移除默认的列表符号 */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center
  }

  .nav-link1 {
    text-decoration: none;
    color: #ecf0f1;
    font-size: 16px;
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .nav-link2 {
    text-decoration: none;
    color: #007bff;
    font-size: 16px;
    /* margin: 0 10px; */
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .nav-link2:hover {
    background-color: #007bff;
    color: #ecf0f1;
  }
  
  .separator {
    color: #6c757d;
    margin: 0 10px;
  }

  .dropdown-container {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    /* margin-top: 10px; */
    left: 0;
    background-color: white;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000; 
  }
  .bartext{
    color: #ecf0f1;
    margin: 0 10px;
    padding: 5px 0px;
    font-weight: bold;
  }
  </style>
  