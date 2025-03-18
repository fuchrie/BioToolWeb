<template>
    <div class="upload-container">
        <el-upload
            ref="uploadRef"
            class="upload-demo"
            drag
            action="http://202.195.187.9:8000/api/upload/"
            multiple
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :auto-upload="false"
            >
            <el-icon class="icon"><upload-filled /></el-icon>
            <div>
                拖动或 <em>点击上传</em>
            </div>
        </el-upload>
        <el-button class="submitbutton" type="primary" @click="submitUpload">上传文件</el-button>
    </div>
</template>
<script>
import { ref } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
export default{
    name:'fileupload',
    components: {
        UploadFilled
    },
    setup(){
        const fileList = ref([]);
        // 从 localStorage 中获取 JWT 令牌
        const token = localStorage.getItem("token");
        const headers = ref({
            Authorization: `Bearer ${token}`,  // 将令牌附加到请求头
        });
        const handleRemove = (file, fileList) => {
            console.log(file, fileList);
        };

        const handlePreview = (file) => {
            console.log(file);
        };

        const beforeUpload = (file) => {
            const isLt10GB = file.size / (1024 * 1024 * 1024) < 10;
            if (!isLt10GB) {
                ElMessage.error('大小不能超过10GB!');
                return false; // 阻止上传
            }
            return true; // 允许上传
        };
        const uploadRef = ref(null);
        const submitUpload = () => {
        if (uploadRef.value) {
            uploadRef.value.submit(); // 调用 el-upload 的 submit 方法
        }
        };
        return {
            fileList,
            handleRemove,
            handlePreview,
            beforeUpload,
            headers,
            submitUpload,
            uploadRef,
        };
    }
}
</script>
<style scoped>
.upload-container {
  position: relative; /* 设置容器为相对定位 */
  width: 100%;
  max-width: 600px; /* 限制最大宽度 */
  margin: 0 auto; /* 居中 */
}
.upload-demo {
  padding: 20px; 
  background-color: #ffffff; 
  border-radius: 8px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  transition: box-shadow 0.3s ease; 
}

.upload-demo:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); 
}

.icon {
  font-size: 24px;
  margin-bottom: 10px;
}
.submitbutton{
  position: absolute;
  top: 110%;
  left: 42%;
}
</style>