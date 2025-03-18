<template>
  <bar/>
  <div class="about">
    <h1>🔬基因透镜——你的基因探索透镜！🔬</h1>
        <p>嘿，爱好生信的小伙伴们👋 如果基因世界是一座浩瀚的宇宙，我们该如何快速窥探其中奥秘？🔍 GeneLens 诚意奉上，一款致力于让生信数据分析变得简单又有趣的神器！🚀</p>
        <h2>👀 透过基因透镜，看懂你的基因！</h2>
        <p>你上传，我们分析，你下载，一切 So Easy！GeneLens 让生信分析变成 三步走：</p>
        <ul>
            <li>1️⃣ 上传数据🗂️<br>无论你有 DNA 还是RNA数据，我们都能处理！<br>FastQ? BAM? CSV? 统统安排！</li>
            <li>2️⃣ 选择数据类型 & 分析流程 🛠️<br>基因组分析？转录组分析？表观分析？通通支持！<br>只需点几下，我们的算法小工就会开足马力帮您全速运算！💨💨</li>
            <li>3️⃣ 下载 & 可视化结果 📊<br>分析完成后，你可以直接在“我的” 页面下载所有结果文件📥。<br>无需代码，各种精美的可视化图表一目了然，基因世界尽收眼底！</li>
        </ul>
        <h2>🌟 为什么选择基因透镜？</h2>
        <ul>
            <li>✅ 操作简单：再也不需要 SSH 远程登录服务器，不用再手敲 N 行 Python & R 代码！</li>
            <li>✅ DNA & RNA  多工具支持：无论是基因组变异，还是转录组表达，我们都能搞定！</li>
            <li>✅ 强大可视化：不只是下载文件，在线查看火山图、PCA、热图，让你的数据一秒变故事！</li>
        </ul>
        <h2>🚀 谁适合使用基因透镜？</h2>
        <ul>
            <li>👩‍🔬 生信研究员——免去繁琐的命令行，提升工作效率！</li>
            <li>🧬 生物学家——轻松完成基因数据解读，加速科研成果！</li>
            <li>🎓 学生 & 初学者——友好便捷的界面，帮助学术进步！</li>
            <li>💡 任何对基因数据感兴趣的人！</li>
        </ul>

        <h2>🔗 基因透镜：打开你的基因世界！</h2>
        <p>🔬 快来试试，让基因透镜成为你解析生命密码的最佳透镜！👓✨</p>

        <div class="contact">
            <p>📬 联系我们：LuoXuan_Mys@hotmail.com</p>
        </div>
  </div>
</template>
<script>
import bar from '@/components/Tool_Navigation.vue'
export default{
  name:'about',
  components:{
    bar
  }
}
</script>
<style scoped>
.about {
  padding-top: 70px;
}

h1 {
  text-align: center;
  color: #007BFF;
}

h2 {
  color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  background: #e9ecef;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
}

.contact {
  text-align: center;
  margin-top: 20px;
}

.contact a {
  color: #007BFF;
  text-decoration: none;
}

.contact a:hover {
  text-decoration: underline;
}
</style>