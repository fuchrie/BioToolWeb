<template>
    <div class="container">
      <regist/>
    </div>
</template>

<script>
import regist from '@/components/regist.vue'
export default {
  name: 'Register',
  components:{
    regist
  }
}
</script>

<style scoped>
.container {
  height: 600px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
</style>