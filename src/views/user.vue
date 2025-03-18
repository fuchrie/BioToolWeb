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
            <FlieCheck/>
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
export default{
    name:'user',
    components:{
        bar,
        FlieCheck,
        FileUpload,
    },
    setup(){
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
</style>