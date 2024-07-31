<template>
  <el-header class="me-area" :class="{'header-hidden': isHidden}">
    <el-row class="me-header" :gutter="20">
      <el-col :span="4" class="me-header-left">
        <router-link to="/" class="me-title">
          <img alt="" src="/avater_128.ico">
        </router-link>
      </el-col>
      <el-col :span="14">
        <!-- mode="horizontal" 为水平模式-->
        <el-menu :router=true :default-active="activeIndex" active-text-color="#5FB878" mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-sub-menu index="">
            <template #title>分类</template>
            <el-menu-item index="" @click="handleTagClick(-1)">默认排序</el-menu-item>
            <el-menu-item index="" @click="handleTagClick(-2)">按点赞数排序</el-menu-item>
            <el-menu-item index="" @click="handleTagClick(-3)">按浏览量排序</el-menu-item>
            <el-menu-item index="" @click="handleTagClick(-4)">按评论数排序</el-menu-item>
            <el-sub-menu index="4-1">
              <template #title>标签筛选</template>
              <el-menu-item v-for="tag in tags"  @click="handleTagClick(tag.id)">{{tag.tagName}}</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="">归档</el-menu-item>
          <el-col :span="4" style="padding: 10px">
            <el-input  size="large" placeholder="搜索文章" v-model="keywords"></el-input>
          </el-col>
          <el-col :span="4" style="padding: 10px">
            <el-button type="primary" round @click="search"><i class="fa-solid fa-magnifying-glass"></i>搜索</el-button>
          </el-col>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-menu :router=true menu-trigger="click" mode="horizontal">
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/register">注册</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup>
import { ref  } from 'vue'
import {getAllTags} from "@/api/article.js";
const activeIndex = ref('/')
const keywords = ref('')
const tags = ref([])
const prop = defineProps(['article_list','article_list_all','isHidden'])
getAllTags().then(res => {
  tags.value= res.data.data;
})
const handleTagClick = (id)=>{
  console.log(id)
    if (id===-1){
      prop.article_list.value = prop.article_list_all.value
      prop.article_list.value.sort((a,b)=> a.id - b.id)
    } else if(id === -2){
      prop.article_list.value.sort((a,b)=> b.thumbsUpCounts - a.thumbsUpCounts)
    } else if(id===-3){
      prop.article_list.value.sort((a,b)=> b.viewCounts - a.viewCounts)
    } else if(id===-4){
      prop.article_list.value.sort((a,b)=> b.commentCounts - a.commentCounts)
    } else if(id>=0){
      prop.article_list.value = prop.article_list_all.value
      const me_key = tags.value.find(element=> element.id===id)
      const me_tagName = me_key ? me_key.tagName : null;
      if (me_tagName==null) return null;
      prop.article_list.value =prop.article_list.value.filter(item => item.tagNames && item.tagNames.includes(me_tagName));
    }
}
const search = ()=>{
  prop.article_list.value=prop.article_list_all.value  //搜索前先重置
  prop.article_list.value= prop.article_list.value.filter(item =>
      item.title.toLowerCase().includes(keywords.value.toLowerCase())
  );
}
</script>

<style>
.el-header{
  opacity: 0.9;
  position: fixed;
  width: 100%;
  z-index: 1024;
}

.me-header-left {
  margin-top: 10px;
}

.me-title {
  margin-top: 10px;
  font-size: 24px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}

.el-header {
  transition: transform 0.3s ease-in-out;
}
.header-hidden {
  transform: translateY(-100%);
}
</style>
