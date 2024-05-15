<script setup>
import BaseFooter from "@/views/BaseFooter.vue";
import BaseHeader from "@/views/BaseHeader.vue";
import {ref} from "vue";
const baseFooter = ref(BaseFooter);
const baseHeader = ref(BaseHeader);
const msg = ref("Hello, Vue 3.0");
</script>
<template>
  <div id="home">
    <el-container>
      <base-header :message="msg"/>
      <router-view :message="msg"/>
      <base-footer/>
    </el-container>
  </div>
</template>

<style>
.me-container{
  margin: 100px auto 140px;
}
</style>
