<script setup>
import BaseFooter from "@/views/BaseFooter.vue";
import BaseHeader from "@/views/BaseHeader.vue";
import {ref} from "vue";
const baseFooter = ref(BaseFooter);
const baseHeader = ref(BaseHeader);
const article_list = ref([]);
const article_list_all = ref([]);
</script>
<template>
  <div id="home">
    <el-container>
      <base-header :article_list="article_list" :article_list_all="article_list_all"/>
      <router-view :article_list="article_list" :article_list_all="article_list_all"/>
      <base-footer/>
    </el-container>
  </div>
</template>

<style>
.me-container{
  margin: 100px auto 140px;
}
</style>
