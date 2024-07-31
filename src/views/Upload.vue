<script setup>
import axios from 'axios';
import matter from 'gray-matter';
import {ref} from 'vue';
import { UploadFilled } from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

let articleDataMap = new Map();
const fileList = ref([]);
// 处理文件选择变化
const handleChange = (file, fileList) => {
  // 调用文件解析函数
  parseFile(file.raw);
};

// 处理文件删除
const handleRemove = (file, fileList) => {
  articleDataMap.delete(file.raw.uid); // 同步删除解析好的结果
};
// 文件解析函数
const parseFile = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    const frontmatter = matter(content)
    const articleData = {
      title: frontmatter.data.title,
      author: frontmatter.data.author,
      body: frontmatter.content,
      createDate: frontmatter.data.createDate,
      tagNames: frontmatter.data.tagNames || []
    };
    articleDataMap.set(file.uid,articleData)
  };
  reader.readAsText(file);
};

// 手动提交上传
const submitUpload = () => {
  if (articleDataMap.size === 0) {
      ElMessage.error('请先选择文件');
      return;
    }
  console.log(articleDataMap)
  articleDataMap.forEach(function(value,key){
    const response = axios.put('/api/article/upload',value);
    console.log(response)
  })
};
</script>

<template>
  <el-upload
      ref="upload"
      class="upload-demo"
      drag
      multiple
      v-model:file-list="fileList"
      :auto-upload="false"
      :on-change="handleChange"
      :on-remove="handleRemove"
      list-type="text"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <el-button type="success" @click="submitUpload">上传到服务器</el-button>
</template>

<style scoped>

</style>