<template>
  <div class="container">
    <div class="article-index">
      <div class="index-title">
        <span>
          最新文章
        </span>
      </div>
      <div class="article-list">
        <!--  v-for 遍历的文章列表-->
        <div class="article-card" v-for="item in articleList" @click="onArticleClick" :key="item.id">
          <div class="article-card-title">
            {{item.title}}
          </div>
          <div class="article-card-info">
            <span>
              {{item.createDate}}
            </span>
            <span>
              <i class="fa-solid fa-heart"></i> {{item.thumbsUpCounts}}
            </span>
            <span>
              <i class="fa-solid fa-eye"></i> {{item.viewCounts}}
            </span>
            <span>
              <i class="fa-solid fa-comment"></i> {{item.commentCounts}}
            </span>
          </div>
          <div class="article-card-summary">
            一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述一些内容的描述
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
import router from "@/utils/Route/index.js";
import {getAllArticle} from "@/api/article.js";
import moment from "moment";
export default {
  data() {
    return {
      articleList:[],

    }
  },
  mounted(){
    this.getArticleList()
  },
  methods: {
    getArticleList(){
      this.articleList=[]
      getAllArticle().then(res=>{
          let data = res.data.data;
          data.forEach((item) => {
            item.createDate = moment(new Date(item.createDate)).format('YYYY-MM-DD');
          });
          data.sort((a,b)=> b.createDate - a.createDate)
        console.log(data)
        this.articleList=data
      })
    },
    onArticleClick(){
      router.push("/article/66b32dc011c3b84813523be9")
    }
  }
}
</script>
<style scoped lang='scss'>
$scrollbarColor: #cccccc;
$hoverColor:#ededed;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,body{
  height: 100%;
  color: #444;
}

.container{
  height: 100vh !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Serif SC', serif!important;
  background: #fafafa;
  .article-index{
    width: 50%;
    height: 100%;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    padding: 20px 20px 0 20px;
    display: flex;
    flex-direction: column;
    background: #ffffff;

    .index-title{
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 22px;
    }
    .article-list{
      flex: 1;
      overflow-y: auto;
      gap: 10px;
      display: flex;
      flex-direction: column;
      .article-card{
        &:hover{
          background: $hoverColor;
          cursor: pointer;
        }
        width: 100%;
        height: 190px;
        border-radius: 10px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        border: 1px solid #cccccc;
        display: flex;
        flex-direction: column;
        padding: 20px;
        .article-card-title{
          font-weight: bolder;
          color: #333 !important;
          font-size: 1.2em;
          font-family: 'Noto Serif SC',serif;
        }
        .article-card-info{
          display: flex;
          flex-direction: row;
          gap: 10px;
          color: #999;
        }
        .article-card-summary{
          flex: 1;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 1.05em;
          font-family: 'Noto Serif SC', serif!important;
        }
      }
    }
  }
}
// 滚动条
::v-deep ::-webkit-scrollbar {
  background-color: transparent;
  width: 12px;
  height: 12px;
}

::v-deep ::-webkit-scrollbar-thumb {
  background-color: $scrollbarColor;
  border-radius: 8px;
  background-clip: content-box;
  border: 2px solid transparent;
}

::v-deep ::-webkit-scrollbar-corner {
  background-color: unset;
}
</style>