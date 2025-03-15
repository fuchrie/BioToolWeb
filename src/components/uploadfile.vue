<template>
  <div class="file-upload-container">
    <div class="file-upload-box">
      <!-- 文件输入框，支持多文件选择 -->
      <input
        type="file"
        id="file-input"
        @change="handleFileUpload"
        class="file-input"
        multiple
      />
      <!-- 文件选择标签 -->
      <label for="file-input" class="file-label">
        <span v-if="selectedFiles.length === 0" class="text">选择文件</span>
        <span v-else>
          {{ selectedFiles.map(file => file.name).join(', ') }}
        </span>
      </label> 
    </div>
    <!-- 上传按钮 -->
    <button @click="submitFiles" class="upload-button">上传文件</button>
    <!-- 进度条 -->
    <div v-if="uploadProgress !== null" class="progress-bar">
      <div
        class="progress"
        :style="{ width: uploadProgress + '%' }"
      ></div>
    </div>
    <!-- 上传消息 -->
    <div v-if="uploadMessage" class="upload-message">
      {{ uploadMessage }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  emits: ["files-uploaded"], // 定义自定义事件
  setup(props, { emit }) {
    const selectedFiles = ref([]); // 存储多个文件
    const uploadProgress = ref(null); // 上传进度
    const uploadMessage = ref(""); // 上传消息

    // 处理文件选择
    const handleFileUpload = (event) => {
      selectedFiles.value = Array.from(event.target.files); // 将文件列表转换为数组
      emit("files-uploaded", selectedFiles.value); // 传递文件名
      uploadMessage.value = ""; // 清空上传消息
    };

    // 提交文件
    const submitFiles = async () => {
      if (selectedFiles.value.length === 0) {
        uploadMessage.value = "请先选择文件";
        return;
      }

      const formData = new FormData();
      selectedFiles.value.forEach((file) => {
        formData.append("files", file); // 将每个文件添加到 FormData
      });

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 设置请求头
          },
          onUploadProgress: (progressEvent) => {
            // 计算上传进度
            uploadProgress.value = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          },
        });

        uploadMessage.value = "文件上传成功";
        console.log("文件上传成功:", response.data);
      } catch (error) {
        uploadMessage.value = "文件上传失败";
        console.error("文件上传出错:", error);
      } finally {
        setTimeout(() => {
          uploadProgress.value = null; // 重置进度条
          selectedFiles.value = []; // 清空已选文件
        }, 2000);
      }
    };

    return {
      selectedFiles,
      uploadProgress,
      uploadMessage,
      handleFileUpload,
      submitFiles,
    };
  },
};
</script>
<style scoped>
.file-upload-container {
  max-width: 400px;
  height: 420px;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.file-upload-box {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 设置间距 */
}

.file-input {
  display: none; /* 隐藏原生文件输入框 */
}

.file-label {
  flex: 1; /* 占据剩余空间 */
  height: 350px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.file-label:hover {
  border-color: #007bff;
  background-color: #e9f5ff;
}

.upload-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #0056b3;
}

.progress-bar {
  margin-top: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #e9ecef;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.upload-message {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
}
.text{
  display: inline-block;
  vertical-align: middle;
}
</style>