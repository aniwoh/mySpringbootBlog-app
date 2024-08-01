<script setup>
import BaseFooter from "@/views/BaseFooter.vue";
import BaseHeader from "@/views/BaseHeader.vue";
import {onMounted, ref,onBeforeUnmount} from "vue";
const baseFooter = ref(BaseFooter);
const baseHeader = ref(BaseHeader);
const article_list = ref([]);
const article_list_all = ref([]);
const picMap = ref({});
const isHeaderHidden = ref(false);
let lastScrollY = 0;
onMounted(()=>
window.addEventListener('scroll',handleScroll))

onBeforeUnmount(()=>
    window.removeEventListener('scroll', handleScroll)
)

const handleScroll=()=>{
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    isHeaderHidden.value = true;
  } else {
    isHeaderHidden.value = false;
  }
  lastScrollY = currentScrollY;
}
</script>
<template>
  <div id="home">
    <el-container>
      <base-header :article_list="article_list" :article_list_all="article_list_all" :isHidden="isHeaderHidden"/>
      <router-view :article_list="article_list" :article_list_all="article_list_all" :picMap="picMap"/>
      <base-footer/>
    </el-container>
  </div>
</template>

<style>
.me-container{
  margin: 100px auto 140px;
}

</style>
