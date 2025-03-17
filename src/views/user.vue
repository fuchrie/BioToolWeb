<template>
    <bar/>
    <!-- <UserInfo/> -->
    <div class="upload">
        <FileUpload/>
    </div>
    <!-- <FlieCheck/> -->
</template>
<script>
// import UserInfo from '@/components/UserInfo.vue';
import FileUpload from '@/components/FileUpload.vue';
// import FlieCheck from '@/components/FileCheck.vue';
import bar from '@/components/Tool_Navigation.vue';
export default{
    name:'user',
    components:{
        bar,
        
        FileUpload,

    }
}
</script>
<style>
.upload{
    margin: 20px;
    padding: 40px;
}
</style>