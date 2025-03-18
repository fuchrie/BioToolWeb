<template>
    <div class="container">
        <login/>
    </div>
    
</template>
<script>
import login from '@/components/login.vue';
export default{
    name:'login_view',
    components:{
        login,
    }
}
</script>
<style>
.container {
  padding-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>