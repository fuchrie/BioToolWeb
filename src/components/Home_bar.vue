<template>
    <nav class="navigation">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavigationBar"
  }
  </script>
  
  <style scoped>
  .navigation {
    height: 30px;
    background-color: #2c3e50; /* 导航栏背景颜色 */
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .nav-list {
    list-style: none; /* 移除默认的列表符号 */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    gap: 20px; /* 列表项之间的间距 */
  }
  
  .nav-item {
    margin: 0;
    display: flex;
    align-items: center;
  }
  
  .nav-link {

    text-decoration: none;
    color: #ecf0f1; /* 默认文字颜色 */
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .nav-link:hover {
    background-color: #3498db; /* 鼠标悬停时背景颜色 */
    color: white; /* 鼠标悬停时文字颜色 */
  }
  
  /* 激活样式 */
  .nav-link.router-link-active,
  .nav-link.router-link-exact-active {
    background-color: #3498db; /* 激活时背景颜色 */
    color: white; /* 激活时文字颜色 */
    font-weight: bold; /* 激活时加粗文字 */
  }
  </style>