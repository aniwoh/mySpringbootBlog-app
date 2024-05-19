<template>
  <el-main>
    <div id="post-list">
      <a v-for="article in prop.article_list.value" class="post-card">
        <div class="post-card-img" :id="'post-card-img-'+article.id"></div>
        <div class="post-card-text">
          <h2>{{ article.title }}</h2>
          <p>
            <span style="float: left;">{{ article.author }} {{ article.createDate }}</span>
            <span style="float: right;">
              <span v-for="tag in article.tagNames" class="tag">  #{{ tag }}</span>
              <i class="fa-solid fa-heart"></i> {{ article.thumbsUpCounts }}
              <i class="fa-solid fa-eye"></i> {{ article.viewCounts }}
              <i class="fa-solid fa-comment"></i> {{ article.commentCounts }}
            </span>
          </p>
        </div>
      </a>
    </div>
  </el-main>
</template>
<script setup>
import {getAllArticle} from "@/api/article.js";
import {onMounted, ref, watch} from "vue";
import axios from "axios";
const prop=defineProps(['article_list','article_list_all'])
onMounted(()=>
getAllArticle()
    .then(response => {
      let data = response.data.data;
      data.forEach((item) => {
        item.createDate = new Date(item.createDate).toLocaleDateString();
        if (item.tagNames) {
          item.tagNames = item.tagNames.split(',');
        }
      });
      prop.article_list_all.value = data;
      prop.article_list.value = data;
    })
    .catch(error => {
          console.log(error);
    })
);
const refresh_photo=()=>{
  prop.article_list.value.forEach((article) =>{
    axios.get('https://t.mwm.moe/pc',{responseType: 'blob'})
        .then(response => {
          let reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = function () {
            document.querySelector('#post-card-img-'+article.id).style.backgroundImage = `url(${reader.result})`;
          }
        })
  })
}

watch(()=>prop.article_list.value,(newValue,oldValue)=>{
  refresh_photo()
})
</script>

<style>
.el-main {
  margin-bottom: 20px;
  margin-top: 20px;
}

#post-list {
  width: 70%;
  left: 20%;
  display: flex;
  margin-left: 15%;
  justify-content: center;
  flex-direction: column;
}

.post-card{
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 350px;
  padding: 20px;
  text-decoration: none;
}

.post-card-img {
  border-radius: 10px;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/default.png');
  background-size: cover;
}

.post-card-text {
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  color: #fff;
  background: rgba(0,0,0,.2);
}
</style>
