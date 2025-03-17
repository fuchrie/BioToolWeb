<template>
    <div class="login-container">
      <form class="login-form" @submit.prevent="submitForm">
        <h2>用户登录</h2>
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="请输入用户名"
            required/>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="请输入密码"
            required
          />
        </div>
        <button type="submit" class="submit-btn" >Login</button>
        <router-link to="/regist">
            <button type="submit" class="submit-btn">Regist</button>
        </router-link>
      </form>
    </div>
</template>
  
<script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import querystring from "querystring"
  export default {
    name: "Login",
    setup() {
      const router = useRouter(); // 获取路由实例
      const formData = ref({
        username: "", // 绑定用户名
        password: "", // 绑定密码
      });

      const submitForm = async () => {
        try {

          // 发送 POST 请求到服务器
          const response = await axios.post("http://202.195.187.9:8000/api/login/",formData.value);
          // 处理服务器响应
          if (response.data.success) {
            alert("登录成功！");
            router.push("/tool"); // 跳转到工具页面
          } else {
            alert("登录失败：" + response.data.message);
          }
        } catch (error) {
          console.error("请求失败：", error);
          alert("请求失败，请检查网络或服务器状态。");
        }
      };

      return {
        formData,
        submitForm,
      };
    },
  }
</script>
  
<style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  /* 登录容器 */
  .login-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 350px;
  }
  
  /* 登录表单 */
  .login-form {
    flex-direction: column;
    margin: 0px;
  }
  
  .login-form h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  /* 表单组 */
  .form-group {
    margin-bottom: 15px;
    
  }
  
  .form-group label {
    width: 340px;
    padding: 5px;
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  
  .form-group input {
    width: 330px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .form-group input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  /* 提交按钮 */
  .submit-btn {
    width: 165px;
    margin: 5px;
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
</style>