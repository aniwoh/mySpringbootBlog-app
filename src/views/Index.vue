<template>
  <el-main>
    <div id="post-list">
      <router-link :to="{path:`/article/${article.id}`}" v-for="article in prop.article_list.value" class="post-card" :key="article.id">
        <div class="post-card-img" :id="'post-card-img-'+article.id" :style="{ backgroundImage: `url(${prop.picMap[article.id] || '/default.png'})` }">
          <div class="post-card-text">
            <div style="margin: 10px">
              <h2>{{ article.title }}</h2>
              <p>
                <span style="float: left;">{{ article.author }} {{ formatDate(article.createDate) }}</span>
                <span style="float: right;">
                  <span v-for="tag in article.tagNames" class="tag">  #{{ tag }}</span>
                  <i class="fa-solid fa-heart"></i> {{ article.thumbsUpCounts }}
                  <i class="fa-solid fa-eye"></i> {{ article.viewCounts }}
                  <i class="fa-solid fa-comment"></i> {{ article.commentCounts }}
                </span>
              </p>
            </div>
          </div>
        </div>

      </router-link>
    </div>
  </el-main>
</template>
<script setup>
import {getAllArticle} from "@/api/article.js";
import {onMounted, computed, ref, watch} from "vue";
import axios from "axios";
import {formatDate} from "@/utils/dateFilter.js";

const prop=defineProps(['article_list','article_list_all','picMap'])

onMounted(()=>{
  if(prop.article_list.value===null || prop.article_list.value===undefined){
    getAllArticle()
        .then(response => {
            let data = response.data.data;
            data.forEach((item) => {
              item.createDate = new Date(item.createDate);
            });
            prop.article_list_all.value = data;
            prop.article_list.value = data;
            prop.article_list.value.sort((a,b)=> b.createDate - a.createDate)
            document.title='aniwoh的blog'
          })
        .catch(error => {
          console.log(error);
          })
    }
}
);
const refresh_photo=()=>{
  prop.article_list.value.forEach((article) =>{
    axios.get('/randomPic')
        .then(response => {
          prop.picMap[article.id] = response.data.imgurl;
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
  margin-bottom: 20px;
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
  border-radius: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  color: #fff;
  background: rgba(0,0,0,.4);
}
</style>
