<template>
  <div>
    <bar/>
  </div>
  <div id="app">
    <h2>ChiP-Seq软件选择</h2>
    <div class="container">
      <!-- 第一列：上传文件 -->
      <div class="column">
        <h3>选择分析文件</h3>
        <upload/>
      </div>
      <!-- 第二列：可选软件 -->
      <div class="column">
        <h3>可选软件</h3>
        <draggable
          :list="availableModules"
          group="modules"
          item-key="id"
          @change="logChange"
          class="drag-area"
        >
          <template #item="{ element }">
            <div class="module-card">
              <div class="module-header">
                <span>{{ element.name }}</span>
              </div>
              <div class="module-description">{{ element.description }}</div>
            </div>
          </template>
        </draggable>
      </div>

      <!-- 第三列：已选择软件 -->
      <div class="column">
        <h3>已选择软件</h3>
        <draggable
          :list="selectedModules"
          group="modules"
          item-key="id"
          @change="logChange"
          :move="checkMove"
          class="drag-area"
        >
          <template #item="{ element }">
            <div class="module-card">
              <div class="module-header">
                <span>{{ element.name }}</span>
              </div>
              <div class="module-description">{{ element.description }}</div>

              <!-- 仅当 hasParams 为 true 时显示参数表单 -->
              <div v-if="element.hasParams">
                <div v-if="element.showParams" class="module-params">
                  <div v-for="param in element.parameters" :key="param.name" class="param-item">
                    <label :for="`${element.id}-${param.name}`">{{ param.label }}</label>

                    <!-- 文本输入框 -->
                    <input
                      v-if="param.type === 'text' || param.type === 'number' || param.type === 'password' || param.type === 'email'"
                      :type="param.type"
                      :id="`${element.id}-${param.name}`"
                      v-model="param.value"
                      :placeholder="param.placeholder"
                    />

                    <!-- 下拉选择框 -->
                    <select
                      v-else-if="param.type === 'select'"
                      :id="`${element.id}-${param.name}`"
                      v-model="param.value"
                    >
                      <option v-for="option in param.options" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>

                    <!-- 单选按钮 -->
                    <div v-else-if="param.type === 'radio'" class="radio-group">
                      <label v-for="option in param.options" :key="option.value">
                        <input
                          type="radio"
                          :name="`${element.id}-${param.name}`"
                          :value="option.value"
                          v-model="param.value"
                        />
                        {{ option.label }}
                      </label>
                    </div>

                    <!-- 复选框 -->
                    <input
                      v-else-if="param.type === 'checkbox'"
                      type="checkbox"
                      :id="`${element.id}-${param.name}`"
                      v-model="param.value"
                    />

                    <!-- 文件上传 -->
                    <input
                      v-else-if="param.type === 'file'"
                      type="file"
                      :id="`${element.id}-${param.name}`"
                      @change="handleFileUpload($event, param)"
                    />
                    
                  </div>
                </div>
                <button @click="toggleParams(element)">
                  {{ element.showParams ? '隐藏参数' : '设置参数' }}
                </button>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    
    <div class="submit">
      <button @click="submitPipeline">提交</button>
    </div>
    
  </div>
</template>

<script>
import bar from '@/components/Tool_Navigation.vue';
import draggable from "vuedraggable";
import { ref } from "vue";
import upload from '@/components/FileCheck.vue';
export default {
  name: 'apparent',
  components:{
    bar,
    draggable,
    upload,
  },
  setup() {
    // 可选软件列表
    const availableModules = ref([
      
      {
        id: 1,
        name: "FastQC",
        description: "用于高通量测序数据的质量评估。",
        hasParams: false,//是否需要用户指定参数
        isRequired: false,//是否是流程必须
      },
    ]);

    // 已选择软件列表
    const selectedModules = ref([
      {
        id: 1,
        name: "fastq-dump",
        description: "将下载的sra数据转化为fastq格式",
        hasParams: true,
        isRequired: true,
        showParams: false,
        parameters:[
        { name: "singleORpaired", label: "测序数据", type: "select", value: "", options: [
            { value: "single", label: "单端测序" },
            { value: "paired", label: "双端测序" },
          ],
        },]
      },
      {
        id:2,
        name:"Fastp",
        description:"处理原始的高通量测序数据",
        hasParams: false,
        isRequired: true,
      },
      {
        id: 3,
        name: "Bowtie2",
        description: "用于将测序数据比对到参考基因组。",
        hasParams: true,
        isRequired: true,
        showParams: false,
        parameters: [
          { name: "singleORpaired", label: "测序数据", type: "select", value: "", options: [
            { value: "single", label: "单端测序" },
            { value: "paired", label: "双端测序" },
          ], },

        ],
      },
      {
        id: 4,
        name: "markdup",
        description: "用于去除PCR重复。",
        hasParams: false,
        isRequired: true,
      },
      {
        id: 5,
        name: "bamCoverage",
        description: "Bam格式转bigwig格式",
        hasParams: true,
        isRequired: true,
        showParams: false,
        parameters: [
          { name: "binSize", label: "bin的大小", type: "number", value: "", placeholder: "bin的大小" },
          { name: "normalizeUsing", label: "指定归一化方法，例：RPKM、RPM、BED", type: "text", value: "", placeholder: "指定归一化方法，例：RPKM、RPM、BED" },
        ],
      },
      {
        id: 6,
        name: "macs2",
        description: "peak calling",
        hasParams: false,
        isRequired: true,
        showParams: false,
        parameters: [
          {
            name: "fileAssignments",
            label: "文件分配",
            type: "nested",
            value: [], // 动态填充上传的文件名和选择
            options: [], // 动态填充上传的文件名
          },
        ],
      },
    ]);
    const handleFilesUploaded = (files) => {
      const fileOptions = files.map((file) => ({
        value: file.name,
        label: file.name,
      }));

      // 更新 macs2 模块的 parameters
      const macs2Module = selectedModules.value.find(
        (module) => module.name === "macs2"
      );
      if (macs2Module) {
        const fileAssignments = files.map((file) => ({
          fileName: file.name,
          role: "", // 样本或对照
          controlFile: "", // 对应的对照文件
        }));
        macs2Module.parameters[0].value = fileAssignments;
        macs2Module.parameters[0].options = fileOptions;
      }
    };
    // 切换参数显示
    const toggleParams = (module) => {
      module.showParams = !module.showParams;
    };

    // 提交 pipeline
    const submitPipeline = () => {
      const pipeline = selectedModules.value.map((module) => ({
        moduleName: module.name,
        parameters: module.parameters.reduce((acc, param) => {
          acc[param.name] = param.value;
          return acc;
        }, {}),
      }));
      console.log("提交的 pipeline:", pipeline);
      // 这里可以调用 API 将 pipeline 发送到后端
    };

    // 监听拖动事件
    const logChange = (event) => {
      console.log("拖动事件:", event);
    };

    const checkMove = (event) => {
      const { draggedContext, relatedContext } = event;
      const draggedElement = draggedContext.element;
      const isDraggingToLeft = relatedContext.list === availableModules.value;

      // 如果是必选模块且试图拖动到左侧，则禁止拖动
      if (draggedElement.isRequired && isDraggingToLeft) {
        return false;
      }
      return true;
    };

    return {
      availableModules,
      selectedModules,
      toggleParams,
      submitPipeline,
      logChange,
      checkMove,
      handleFilesUploaded,
    };
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  padding-top: 20px;
}

.container {
  display: flex;
  gap: 20px;
  height: 400px;
}

.column {
  flex: 1;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.column h3 {
  margin: 0 0 10px 0;
}

.drag-area {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.module-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: move;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.module-description {
  font-size: 12px;
  color: #666;
}

.module-params {
  margin-top: 10px;
}

.param-item {
  margin-bottom: 10px;
}

.param-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.param-item input {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.submit{
  text-align: right;
  margin: 10px;
}
</style>