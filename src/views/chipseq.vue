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
        <upload @selected-files="handleSelectedFiles" />
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
                <span>{{ element.step }}</span>
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
                <span>{{ element.step }}</span>
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
                    <!-- 样本-对照选择 -->
                    <div v-if="element.step === 'macs2'" class="sample-control-selection">
                      <h3>选择样本和对照</h3>
                      <div>
                        <label for="sample">样本文件：</label>
                        <select id="sample" v-model="selectedSample">
                          <option value="">请选择样本文件</option>
                          <option v-for="file in files" :key="file" :value="file">
                            {{ file }}
                          </option>
                        </select>
                      </div>
                      <div>
                        <label for="control">对照文件：</label>
                        <select id="control" v-model="selectedControl">
                          <option value="">请选择对照文件</option>
                          <option v-for="file in files" :key="file" :value="file">
                            {{ file }}
                          </option>
                        </select>
                      </div>
                      <button @click="addSampleControlPair">选择另一组对照关系</button>
                    </div>

                    <!-- 已选择的样本-对照关系 -->
                    <div v-if="element.step === 'macs2'" class="selected-pairs">
                      <h3>已选择的样本-对照关系</h3>
                      <ul>
                        <li v-for="(pair, index) in param.value" :key="index">
                          样本：{{ pair.sample }}，对照：{{ pair.control }}
                        </li>
                      </ul>
                    </div>
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
        step: "FastQC",
        description: "用于高通量测序数据的质量评估。",
        hasParams: false,//是否需要用户指定参数
        isRequired: false,//是否是流程必须
      },
      {
        id: 1,
        step: "fastq-dump",
        description: "将下载的sra数据转化为fastq格式",
        hasParams: true,
        isRequired: false,
        showParams: false,
        parameters:[
        { name: "singleORpaired", label: "测序数据", type: "select", value: "", options: [
            { value: "single", label: "单端测序" },
            { value: "paired", label: "双端测序" },
          ],
        },]
      },
    ]);

    // 已选择软件列表
    const selectedModules = ref([
      
      {
        id:2,
        step:"Fastp",
        description:"处理原始的高通量测序数据",
        hasParams: false,
        isRequired: true,
      },
      {
        id: 3,
        step: "Bowtie2",
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
        step: "markdup",
        description: "用于去除PCR重复。",
        hasParams: false,
        isRequired: true,
      },
      {
        id: 5,
        step: "bamCoverage",
        description: "Bam格式转bigwig格式",
        hasParams: false,
        isRequired: true,

      },
      {
        id: 6,
        step: "macs2",
        description: "peak calling",
        hasParams: true,
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
    // 文件列表
    const files = ref([]);

    // 当前选择的样本和对照
    const selectedSample = ref("");
    const selectedControl = ref("");

    // 处理文件上传
    const handleSelectedFiles = (gotfiles) => {
      files.value = gotfiles;
      // 找到 macs2 模块
      const macs2Module = selectedModules.value.find(module => module.step === 'macs2');
      if (macs2Module) {
        // 找到 fileAssignments 参数
        const fileAssignments = macs2Module.parameters.find(
          param => param.name === 'fileAssignments'
        );
        if (fileAssignments) {
          // 更新 options，填充上传的文件名
          fileAssignments.options = gotfiles.map(file => ({
            value: file,
            label: file,
          }));
          console.log(fileAssignments.options)
          console.log(gotfiles)
        }
      }
    };

    // 添加样本-对照关系
    const addSampleControlPair = () => {
      if (selectedSample.value && selectedControl.value) {
        // 找到 macs2 模块
        const macs2Module = selectedModules.value.find(module => module.step === 'macs2');
        if (macs2Module) {
          // 找到 fileAssignments 参数
          const fileAssignments = macs2Module.parameters.find(
            param => param.name === 'fileAssignments'
          );
          if (fileAssignments) {
            
            // 添加样本-对照关系
            fileAssignments.value.push({
              sample: selectedSample.value,
              control: selectedControl.value,
            });
            // 清空选择框
            selectedSample.value = "";
            selectedControl.value = "";
            console.log(fileAssignments)
          }
        }
      } else {
        alert("请选择样本文件和对照文件！");
      }
    };
    // 切换参数显示
    const toggleParams = (module) => {
      module.showParams = !module.showParams;
    };

    // 提交 pipeline
    const submitPipeline = () => {
      // 定义映射关系
      const stepMapping = {
        "fastq-dump": "sra_to_fastq",
        "FastQC":"quality",
        "Fastp": "trimming",
        "Bowtie2": "alignment",
        "markdup": "markdup",
        "bamCoverage": "bamCoverage",
        "macs2": "peak",
      };
      // 提取步骤名称
      const steps = selectedModules.value
        .map((module) => stepMapping[module.step] || module.step) // 如果找不到映射，则使用原名称
        .join(",");

      // 提取参数
      const parameters = selectedModules.value.reduce((acc, module) => {
        if (module.parameters) {
          acc[module.step] = module.parameters.reduce((paramAcc, param) => {
            paramAcc[param.name] = param.value;
            return paramAcc;
          }, {});
        }
        return acc;
      }, {});

      // 构造请求参数
      const payload = {
        module: "epi", // 这里假设模块名是 "dna"，可以根据实际情况动态设置
        step: steps,
        parameters, // 传递参数
      };
      const token = localStorage.getItem('token');
      // 调用后端 API
      fetch("http://202.195.187.9:8000/api/pipeline/run/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 将令牌添加到请求头中
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("后端响应:", data);
          if (data.success) {
            alert("流水线任务提交成功！");
          } else {
            alert(`提交失败：${data.message}`);
          }
        })
        .catch((error) => {
          console.error("请求失败:", error);
          alert("请求失败，请检查网络连接或后端服务状态。");
        });
        console.log(payload)
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
      files,
      availableModules,
      selectedModules,
      toggleParams,
      submitPipeline,
      logChange,
      checkMove,
      handleSelectedFiles,
      addSampleControlPair,
      selectedSample,
      selectedControl
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