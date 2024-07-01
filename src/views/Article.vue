<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import {getArticleById} from "@/api/article.js";

// 获取路由
const route = useRoute();
const articleId = ref(route.query.id);
const article = ref();

getArticleById(articleId)
    .then(response=>{
      article.value=response;
    })
console.log(article)
</script>
<template>
</template>