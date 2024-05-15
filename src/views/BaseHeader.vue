<template>
  <el-header class="me-area">
    <el-row class="me-header">
      <el-col :span="4" class="me-header-left">
        <router-link to="/" class="me-title">
          <img alt="" src="/avater_128.ico">
        </router-link>
      </el-col>
      <el-col :span="16">
        <!-- mode="horizontal" 为水平模式-->
        <el-menu :router=true :default-active="activeIndex" active-text-color="#5FB878" mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-sub-menu index="">
            <template #title>分类</template>
            <el-menu-item index="/order">默认排序</el-menu-item>
            <el-menu-item index="/order">按点赞数排序</el-menu-item>
            <el-menu-item index="">按浏览量排序</el-menu-item>
            <el-menu-item index="">按评论数排序</el-menu-item>
            <el-sub-menu index="4-1">
              <template #title>标签筛选</template>
              <el-menu-item v-for="tag in tags"  @click="handleTagClick(tag.id)">{{tag.tagName}}</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="">归档</el-menu-item>
          <el-col :span="4" style="align-content: center">
            <el-input  size="large" placeholder="搜索文章"></el-input>
          </el-col>
          <el-col :span="4" style="align-content: center">
            <el-button type="primary" round ><i class="fa-solid fa-magnifying-glass"></i>搜索</el-button>
          </el-col>
          <el-col :span="4">
            <el-menu-item index="/www"><i class="el-icon-edit"></i>写文章</el-menu-item>
          </el-col>
        </el-menu>

      </el-col>
      <el-col :span="4">
        <el-menu :router=true menu-trigger="click" mode="horizontal">
          <el-menu-item index="/login"><el-button text>登录</el-button></el-menu-item>
          <el-menu-item index="/register"><el-button text>注册</el-button></el-menu-item>
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
const prop = defineProps(['message'])
console.log(prop.message)
getAllTags().then(res => {
  tags.value= res.data.data;
  console.log(tags.value)
})
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
</style>
