<script setup>
import BaseFooter from "@/views/BaseFooter.vue";
import {ref} from "vue";
import BaseHeader from "@/views/BaseHeader.vue";
const baseFooter = ref(BaseFooter);
const baseHeader = ref(BaseHeader);
</script>
<template>
  <div id="home">
    <el-container>
      <base-header></base-header>
      <router-view class="me-container"/>
      <base-footer></base-footer>
    </el-container>
  </div>
</template>

<style>
.me-container{
  margin: 100px auto 140px;
}
</style>
