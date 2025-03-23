<template>
    <div class="directory-tree">
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :load="loadNode"
      lazy
      node-key="path"
      show-checkbox
      @check-change="handleCheckChange"
      @node-click="handleNodeClick"
      
    >
      <template #default="{ node, data }">
        <span>
          <i :class="data.type === 'directory' ? 'el-icon-folder' : 'el-icon-document'"></i>
          {{ node.label }}
        </span>
        <el-pagination
          v-if="data.type === 'directory' && data.total > 10"
          small
          layout="prev, pager, next"
          :total="data.total"
          :page-size="10"
          :current-page="data.page"
          @current-change="(newPage) => handlePageChange(node, newPage)"
        />
      </template>
    </el-tree>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import axios from '@/utils/axios';
export default{
    name:'filecheck',
    emits: ['selected-files'],
    setup(props, { emit }){
        const treeData =ref([]);
        const tree = ref(null); // 定义 tree 引用
        const defaultProps = ref({
            label: 'name', // 使用 name 字段作为节点标签
            isLeaf: (data) => data.type === 'file', // 文件是叶子节点
        });
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        onMounted(async () => {
          try {
            const response = await loadNodeRoot(); // 假设您定义了一个 loadNodeRoot 函数来加载根节点
            treeData.value = [{ label: 'Root', path: '', children: response.data.children || [] }];
          } catch (error) {
            console.error('Error loading root node:', error);
          }
        });
        const loadNodeRoot = async () => {
          const path = node.level === 0 ? '' : node.data.path;
          const response = await axios.get('http://202.195.187.9:8000/api/list-directory/', {
            headers,
          });
          return response;
        };
        const loadNode = async (node, resolve) => {
          try {
              let response;
              const path = node.level === 0 ? '' : node.data.path; // 根节点使用默认路径 '/'
              response = await axios.get('http://202.195.187.9:8000/api/list-directory/', {
                  headers,
                  params: { path }, // 传递路径参数
              });
              resolve(response.data.children || []);
          } catch (error) {
              console.error('Error loading node:', error);
              resolve([]); // 返回空数组，避免页面崩溃
          }
        };
        const handleNodeClick = (data) => {
            console.log('Clicked node:', data);
        };
        const handleCheckChange = () => {
          if (tree.value) {
            const selectedNodes = tree.value.getCheckedNodes(); // 通过 tree.value 访问方法
            const selectedFiles = selectedNodes
              .filter((node) => node.type === 'file')
              .map((node) => node.name);
            emit('selected-files', selectedFiles); // 将选中的文件名传递给父组件
            
          }
        };
        return{
            treeData,
            defaultProps,
            loadNode,
            handleNodeClick,
            handleCheckChange,
            tree,
        }
    }
}
</script>
<style scoped>
.directory-tree {
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.custom-tree {
  --el-tree-node-hover-bg-color: #f0f7ff;
  --el-tree-text-color: #2c3e50;
  --el-tree-expand-icon-color: #909399;
}

:deep(.el-tree-node__content) {
  height: 40px;
  transition: all 0.3s;
  margin: 2px 0;
}

:deep(.el-tree-node__content) i[class^="el-icon"] {
  font-size: 18px;
  margin-right: 8px;
  vertical-align: middle;
}

:deep(.el-icon-folder) {
  color: #409eff;
}

:deep(.el-icon-document) {
  color: #909399;
}

:deep(.el-tree-node:focus > .el-tree-node__content),
:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: #e6f7ff !important;
  border-radius: 4px;
}

:deep(.el-tree-node__children) {
  position: relative;
  padding-left: 16px;
}

:deep(.el-tree-node__children::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 100%;
  background: #e0e0e0;
}

:deep(.el-tree-node__loading-icon) {
  animation: spin 1s linear infinite;
  color: #409eff;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .directory-tree {
    padding: 10px;
  }
  
  :deep(.el-tree-node__content) {
    height: 36px;
  }
  
  :deep(.el-tree-node__content) i[class^="el-icon"] {
    font-size: 16px;
  }
}
</style>