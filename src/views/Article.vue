<script setup>
import {ref, onMounted, computed, watch} from 'vue';
import { useRoute } from 'vue-router';
import {getArticleById} from "@/api/article.js";
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it'
import 'highlight.js/scss/default.scss'
import 'highlight.js/scss/atom-one-dark.scss'
import {formatDate} from "@/utils/dateFilter.js";

// 获取路由
const route = useRoute();
const articleId = ref(route.params.id);
const article = ref({});

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // 此处判断是否有添加代码语言
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str,{language:lang}).value
      } catch (__) {}
    }
    // 未添加代码语言，此处与上面同理
    return  md.utils.escapeHtml(str)
  }
});

let renderedMarkdown = ''
const fetchMarkdown = async () => {
  try {
    getArticleById(articleId.value)
        .then(response=>{
          let date = formatDate(new Date(response.data.data.createDate))
          response.data.data.createDate = date
          article.value=response.data.data;
          document.title=response.data.data.title;
        })
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

onMounted(() => {
  fetchMarkdown();
});

watch(()=>article.value,(newValue,oldValue)=>{
  renderedMarkdown = computed(() => {
    console.log(article.value)
    const markdownTitle = document.querySelector('.markdown-title');
    const markdownAuthor = document.querySelector('.markdown-author');
    markdownTitle.innerText = article.value.title;
    markdownAuthor.innerText = `${article.value.viewCounts}浏览     |    ${article.value.createDate}    |    ${article.value.author}`;
    return md.render(article.value.body); // 将 Markdown 转换为 HTML
  });
})


</script>
<template>
  <el-main>
    <div class="main_content">
      <div class="markdown-main">
        <div class="markdown-title">
          <!-- 这里是标题的输出位置，通过js输出 -->
        </div>
        <div class="markdown-author">
          <!-- 这里是作者、时间、浏览量的输出位置，通过js输出 -->
        </div>
        <div class="markdown-content">
          <!-- 这里是markdown内容的输出位置，通过js输出 -->
          <div v-if="article" v-html="renderedMarkdown"></div>
                <p v-else>加载中...</p>
        </div>
        </div>
      </div>
  </el-main>

</template>
<style>
.el-main {
  margin-bottom: 20px;
  margin-top: 20px;
}

.main_content {
  width: 70%;
  height: 100%;
  /* border: red solid; */
  margin-left:15%;
}

.markdown-title {
  width: 100%;
  text-align: center;
  font-size: 40px;
}

.markdown-author {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: gray;
}
.markdown-main {
  overflow: auto;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: rgba(230, 235, 240, 0.7);
  margin-bottom: 20px;
}

.markdown-content {
  margin: 0 auto;
  font-family: "Microsoft YaHei", arial, sans-serif;
  line-height: 1.8;
  /*显示一个边框，调试时使用*/
  /* border-style: solid;
  border-color: #ffcdcd; */
  border-width: 1px;
  word-wrap: break-word;

}

* {
  /* 表示点击或触摸元素时不显示高亮颜色,用于移动设备优化 */
  -webkit-tap-highlight-color: transparent;
}

@media screen and (min-width: 768px) {
  .markdown-content {
    width: 90%;
    margin: 10px auto;
  }
}
/* 标题的css */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.2em;
  margin-bottom: 0.6em;
  color: inherit;
  font-weight: 400;
  font-family: inherit;
  line-height: 1.35;
}

.markdown-content h1,
.markdown-content h2 {
  margin-top: unset;
  border-bottom: 1px solid rgba(0,0,0,.25);
}

.markdown-content h1::before,
.markdown-content h2::before {
  content: '# ';
  color: #3681f6;

}

.markdown-content h1{
  display: block;
  font-size: 2em;
  margin: 0.67em 0;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.markdown-content h2{
  display: block;
  font-size: 1.8em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6{
  margin-top: unset;
}

.markdown-content h3{
  display: block;
  font-size: 1.6em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

/* 链接的css */
.markdown-content a {
  background-color: transparent;
  color: #3681f6;
  position: relative;
  display: inline-block;
  overflow: hidden;
  text-decoration: none;
  vertical-align: top;
  outline: 0;
}

.markdown-content a:hover {
  text-decoration: none;
  color: #ff6600;
}

/* 代码及代码块的css */
.markdown-content code:not(pre code) {
  padding: 2px 6px;
  color: #c7254e;
  background-color: #f7f7f9;
  border-radius: 2px;
}

.markdown-content code,
.markdown-content pre {
  border-radius: 3px;
  font-family: Consolas, Monaco, Andale Mono, monospace;
  padding: 20px;
}

.markdown-content pre {
  color: #abb2bf;
  position: relative;
  background: #21252b;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 24px;
  max-width: 100%;
  padding-top: 30px;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 20%);
  overflow-x: auto;
  border: 1px solid rgba(0,0,0,.12);
  font-size: 1em;
}

/* 代码块左上角的三个点 */
.markdown-content pre:before {
  content: " ";
  position: absolute;
  border-radius: 50%;
  background: #fc625d;
  margin-top: -18px;
  width: 12px;
  height: 12px;
  left: 12px;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  z-index: 2;
}

.markdown-content pre > code {
  border: 0;
  display: inline;
  max-width: initial;
  padding: 0;
  margin: 0;
  overflow: initial;
  line-height: inherit;
  font-size: .85em;
  white-space: pre;
  background: 0 0;
}

/* 图片和视频的css */
.markdown-content img,
.markdown-content video{
  max-width: 100%;
}

.markdown-content img{
  border-style: none;
}

/* 引用的css，对于markdown中的'>' */
.markdown-content blockquote {
  margin: 1em;
  padding-left: 1em;
  font-weight: 400;
  border-left: 4px solid rgba(0,0,0,.12);
}

.markdown-content blockquote p {
  color: #666;
}

/* cite好像是引用文本，暂时没遇到，遇到再说 */
.markdown-content blockquote cite {
  font-size: 14px;
  line-height: 20px;
  color: #bfbfbf;
}

.markdown-content blockquote cite:before {
  content: '\2014 \00A0';
}

/* 分割线 */
.markdown-content hr {
  text-align: left;
  color: #999;
  height: 2px;
  padding: 0;
  margin: 16px 0;
  background-color: #e7e7e7;
  border: 0 none;
}

/* 列表 */
.markdown-content table{
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  border-spacing: 0;
  border: 1px solid rgba(0,0,0,.12);
  border-bottom: none;
  border-collapse: separate;
  -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

.markdown-content table tr:hover {
  background: #d1d1d1;
  transition: all 0.1s ease-in-out;
}

.markdown-content table td,
.markdown-content .table th {
  position: relative;
  box-sizing: border-box;
  padding: 12px 28px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid rgba(0,0,0,.12);
  -webkit-box-sizing: border-box;
}

.markdown-content table th {
  background-color: #dce9f9;
  border-top: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
  padding: 5px;
}

.markdown-content table td:first-child,
.markdown-content table th:first-child {
  padding-right: 0;
  padding-left: 24px;
}

.markdown-content table th:first-child {
  -moz-border-radius: 6px 0 0 0;
  -webkit-border-radius: 6px 0 0 0;
  border-radius: 6px 0 0 0;
}

.markdown-content table th:last-child {
  -moz-border-radius: 0 6px 0 0;
  -webkit-border-radius: 0 6px 0 0;
  border-radius: 0 6px 0 0;
}

.markdown-content table th:only-child {
  -moz-border-radius: 6px 6px 0 0;
  -webkit-border-radius: 6px 6px 0 0;
  border-radius: 6px 6px 0 0;
}

.markdown-content table tr:last-child td:first-child {
  -moz-border-radius: 0 0 0 6px;
  -webkit-border-radius: 0 0 0 6px;
  border-radius: 0 0 0 6px;
}

.markdown-content table tr:last-child td:last-child {
  -moz-border-radius: 0 0 6px 0;
  -webkit-border-radius: 0 0 6px 0;
  border-radius: 0 0 6px 0;
}

/* 有序列表和无序列表的css，暂时没遇到过，再说╮(╯▽╰)╭  */
.markdown-content ul,
.markdown-content ol {
  padding: 0;
  padding-left: 24px;
  margin: 0 0 0 5px;
  list-style: circle !important;
}

.markdown-content li {
  line-height: 24px;
  list-style: circle !important;
}

.markdown-content p,
.markdown-content ul,
.markdown-content ol {
  font-size: 16px;
  line-height: 24px;
}

.markdown-content ol ol,
.markdown-content ul ol {
  list-style-type: lower-roman;
}

/* 下面这一坨我也不知道有什么用，等知道时再改 */
.markdown-content aside {
  display: block;
  float: right;
  width: 390px;
}

.markdown-content dl {
  padding: 0;
}

.markdown-content dl dt {
  padding: 10px 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
}

.markdown-content dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

.markdown-content dd {
  margin-left: 0;
}
</style>
