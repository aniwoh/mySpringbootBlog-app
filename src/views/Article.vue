<script setup>
import { ref } from 'vue'
import { getAllArticleService } from '@/api/article.js'
import LoginVue from '@/views/Login.vue'
const articleList = ref([])
const getAllArticle=async function(){
  let data = await  getAllArticleService();
  articleList.value = data;
}
getAllArticle();
</script>
<template>
    <div>
      <div class="post" v-for="(article,index) in articleList">
          <a href="{{ article.id }}" class="post-card">
              <div class="post-card-img" id="post-{{article.id}}"></div>
              <div class="post-card-text">
                  <h2>{{ article.title }}</h2>
                  <p>{{ article.author }}     {{ article.createDate }}</p>
              </div>
          </a>
      </div>
    </div>
  </template>