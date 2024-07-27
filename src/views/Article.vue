<script setup>
import {ref, onMounted, defineComponent, computed} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import {getArticleById} from "@/api/article.js";

// 获取路由
const route = useRoute();
const articleId = ref(route.params.id);
const article = ref({});
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt();
const fetchMarkdown = async () => {
  try {
    getArticleById(articleId.value)
        .then(response=>{
          article.value=response.data.data;
          console.log('111111111'+article.value.body)
        })
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};
const renderedMarkdown = computed(() => {
  return md.render('# test'); // 将 Markdown 转换为 HTML
});
onMounted(() => {
  fetchMarkdown();
});


</script>
<template>
  <div>
    <h1>Markdown 渲染示例</h1>
    <div v-if="article" v-html="renderedMarkdown"></div>
    <p v-else>加载中...</p>
  </div>
</template>