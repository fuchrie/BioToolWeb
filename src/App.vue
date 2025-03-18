<template>
  <router-view/>
</template>
<script>
import { onMounted } from 'vue';
import { isJWTExpired } from '@/utils/jwt';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();

        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            if (token && isJWTExpired(token)) {
                localStorage.removeItem('token');
                router.push('/login');
            }
        };

        onMounted(() => {
            // 每隔 5 分钟检查一次
            setInterval(checkTokenExpiration, 5 * 60 * 1000);
        });

        return {};
    },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
