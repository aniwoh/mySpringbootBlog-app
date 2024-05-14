<template>
  <div id="index">
    <el-container>
      <el-main>
        <div id="post-list"></div>
      </el-main>
    </el-container>

  </div>
</template>
<script>
import service from "@/utils/request/index.js";
let article_list = []
service.get(`/article/list`)
    .then(response => {
      console.log(response)
      article_list = response;
      reloadArticleCard()
    })
    .catch(error => {
      console.log(error);
    });
function reloadArticleCard(){
  console.log(article_list)
  const mainContainer =document.getElementById("post-list")
  function createArticleCard(article) {
    const card = document.createElement("a");
    card.className = "post-card";
    card.href = "/post?id=" + article.id
    const imgDiv = document.createElement("div");
    imgDiv.className = "post-card-img";
    imgDiv.id = "post-" + article.id;
    // 设置图片样式或内容，根据需要自行添
    const textDiv = document.createElement("div");
    textDiv.className = "post-card-text";
    let addHtml= "<h2>" + article.title + "</h2><p>" +
        "<span style='float: left;'>" + article.author + " " + article.created_at + "</span>" +
        "<span style='float: right;'>"
    if (article.tags__name!= null){
      article.tags__name.forEach(function(tag) {
        addHtml += "<span class='tag'>#" + tag + "</span>";
      });
    }
    addHtml+= "<i class='fa-solid fa-heart'></i> " + "       "+article.thumbs_up+"       " +
        "<i class='fa-solid fa-eye'></i> " + "       "+article.view_count+"       " +
        "<i class='fa-solid fa-comment'></i> " + "       "+article.comment_count+"       "+"</span></p>";
    textDiv.innerHTML=addHtml;
    card.appendChild(imgDiv);
    card.appendChild(textDiv)
    return card;
  }
  article_list.forEach(article => {
    const articleCard = createArticleCard(article);
    mainContainer.appendChild(articleCard);
  });
}
</script>

<style>
</style>
