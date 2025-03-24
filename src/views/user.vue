<template>
    <bar/>
    <!-- <UserInfo/> -->
     <div class="container">
        <div class="upload">
            <h3>上传文件</h3>
            <FileUpload/>
        </div>
        <div class="check">
            <h3>选择文件/文件夹</h3>
            <FlieCheck class="select"@selected-paths="handleSelectedPaths"/>
            <el-button class="custom-download-button" @click="handleDownload">
            <i class="el-icon-download"></i>
                下载选中文件
            </el-button>
        </div>
     </div>
    
    
</template>
<script>
// import UserInfo from '@/components/UserInfo.vue';
import FileUpload from '@/components/FileUpload.vue';
import FlieCheck from '@/components/FileCheck.vue';
import bar from '@/components/Tool_Navigation.vue';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { isJWTExpired } from '@/utils/jwt';
import axios from '@/utils/axios';
import { ref } from 'vue';
export default{
    name:'user',
    components:{
        bar,
        FlieCheck,
        FileUpload,
    },
    setup(){
        const selectedPaths = ref([]); // 存储选中的文件路径
        const router = useRouter();
        // 从 localStorage 中获取 JWT 令牌
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        onBeforeMount(() => {
            // 判断 token 是否存在且有效
            if (isJWTExpired(token)) {
                localStorage.removeItem('token'); // 清除过期令牌
                console.log("Redirecting to login");
                router.push('/login');
            }
        });
        // 监听子组件传递的选中文件路径
        const handleSelectedPaths = (paths) => {
            selectedPaths.value = paths;
            console.log(paths)
        };
        const handleDownload = async () => {
        if (selectedPaths.value.length === 0) {
            alert('请选择至少一个文件进行下载');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const headers = {
            Authorization: `Bearer ${token}`,
            };

            const response = await axios.post(
            'http://202.195.187.9:8000/api/download-file/',
            { file_paths: selectedPaths.value },
            { headers, responseType: 'blob' } // 设置 responseType 为 'blob' 以处理文件下载
            );

            // 创建一个链接元素，用于触发文件下载
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'files.zip'); // 设置下载文件的名称
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading files:', error);
            alert('文件下载失败');
        }
        };
        return {
            handleSelectedPaths,
            handleDownload,
        };
    }
}
</script>
<style>
.container{
    padding-top: 150px;
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.check{
    height: 380px;
    margin: auto;
    flex: 1;
    max-width: 40%;
    border: 1px solid #b8b1b1;
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
}
.upload{
    height: 380px;
    margin: auto;
    padding: 40px;
    flex: 1;
    max-width: 40%;
    border: 1px solid #b8b1b1;
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
}
/* 自定义按钮样式 */
.custom-download-button {
  background-color: #409eff; /* 背景颜色 */
  color: white; /* 文字颜色 */
  border: none; /* 去掉边框 */
  padding: 10px 20px; /* 内边距 */
  font-size: 14px; /* 字体大小 */
  transition: background-color 0.3s ease; /* 过渡效果 */
}

.custom-download-button:hover {
  background-color: #66b1ff; /* 鼠标悬停时的背景颜色 */
}

.custom-download-button:active {
  background-color: #3a8ee6; /* 按钮按下时的背景颜色 */
}

.custom-download-button i {
  margin-right: 8px; /* 图标与文字的间距 */
}
.select{
  border-radius: 5px;
  height: 190px;
  display: flex;
  flex-direction: column;
    overflow-y: auto;
}
</style>