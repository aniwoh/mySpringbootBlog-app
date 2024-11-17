<template>
    <div class="container">
        <div class="me-bookshelf-header">
            <span>阅读</span>
        </div>
        <div class="me-bookshelf-main">
            <div class="me-bookshelf-bookCard" v-for="item in novelList" :key="item.id" @click="onNovelClick(item.id)">
                <div class="bookCard-img">
                    <img src="@/assets/defaultCover.png" alt class="cover">
                </div>
                <div class="bookCard-info">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="info">
                        {{ item.author? item.author:"---" }} | 共{{item.chapterCount}}章 | {{item.updateDate}}

                    </div>
                    <div class="chapter-info">
                        已读：{{item.processChapter? item.processChapter.title:"未开始"}}
                    </div>
                    <div class="chapter-info">
                        最新：{{item.lastChapter.title}}
                    </div>
                </div>

            </div>
            <div class="me-bookshelf-bookCard-add" @click="dialogVisible=true">
                <el-icon class="add-icon"><Plus /></el-icon>
            </div>

        </div>
        <el-dialog v-model="dialogVisible" title="添加书籍" @close="handleDialogClose">
            <el-upload
                drag
                action="/api/novel/upload"
                :auto-upload="false"
                :limit="1"
                :on-change="handleChange"
                :file-list="fileList"
                multiple
                ref="uploadRef"
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload>
            <el-button
                type="primary"
                style="margin-top: 10px"
                @click="handleUpload"
                :disabled="fileList.length === 0"
            >
                点击上传
            </el-button>
        </el-dialog>
    </div>
</template>
<script>
import {CirclePlus, Plus, UploadFilled} from "@element-plus/icons-vue";
import {ref} from "vue";
import {getAllNovel} from "@/api/novel.js";

export default {
    components:{
        UploadFilled,
        Plus,CirclePlus
    },
    data(){
        return{
            dialogVisible:false,
            fileList: [], // 存储当前上传的文件
            novelList:[],
        }
    },
    mounted() {
        this.listAllNovels();
    },
    methods:{
        handleChange(file,fileList){
            if (fileList.length > 1) {
                // 替换为新文件
                fileList.splice(0, fileList.length - 1);
            }
            this.fileList = [...fileList]; // 更新文件列表
        },
        handleUpload() {
            this.$refs.uploadRef.submit(); // 调用 submit 方法上传文件
        },
        handleDialogClose() {
            this.fileList = [];
            if (this.$refs.uploadRef) {
                this.$refs.uploadRef.clearFiles(); // 清空上传组件的文件
            }
        },
        listAllNovels(){
            this.novelList = []
            getAllNovel().then(res=>{
                this.novelList=res.data.data
                this.novelList.forEach(item=>{
                    item.updateDate = new Date(item.updateDate).toLocaleDateString('en-CA')
                    }
                )
                console.log(this.novelList)
                }

            )

        },
      onNovelClick(id){
            this.$router.push({name:'chapter', params:{id}})
      }
    }
}
</script>

<style scoped lang="scss">
.container{
    height: 100vh !important;
    //font-family: 'Noto Serif SC', serif!important;
    background: #F5F7FA;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .me-bookshelf-header{
        height: 50px;
        background: #E6E8EB;
        border-bottom: 1px solid #E4E7ED;
        display: flex;
        align-items: center;
        padding-left: 20px;
        span{
            font-weight: bolder;
            font-size: 1.2em;
        }
    }
    .me-bookshelf-main{
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fill, 360px); /* 每列宽度固定为 100px，自动填充 */
        grid-auto-rows: 180px;  /* 行高固定为 100px */
        gap: 10px;              /* 设置间距 */
        padding: 10px;
        overflow-y: auto;
        .me-bookshelf-bookCard{
            padding:24px;
            display: flex;
            cursor: pointer;
            &:hover{
                background: rgba(0,0,0,.1);
            }
            .bookCard-img{
                .cover{
                    width: 96px;
                    height: 134px;
                }
            }
            .bookCard-info{
                margin-left:20px;
                justify-content:space-around;
                flex: 1;
                display: flex;
                flex-direction: column;
                font-family: Avenir,Helvetica,Arial,sans-serif;
                .title{
                    width: fit-content;
                    font-size: 16px;
                    font-weight: bolder;
                    color: #33373d;
                }
                .info{
                    font-size:12px;
                    font-weight: 600;
                    color: #6b6b6b;

                }
                .chapter-info{
                    color: #969ba3;
                    font-size: 13px;
                    word-wrap:break-word;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    text-align:left;
                    -webkit-line-clamp:1

                }
            }
        }
        .me-bookshelf-bookCard-add {
            padding: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,.1);
            &:hover{
                background: rgba(0,0,0,.2);
            }
            .add-icon{
                color: #969ba3;
                font-size: 65px;
            }
        }
    }
}

// 滚动条
:deep(::-webkit-scrollbar)  {
    background-color: transparent;
    width: 12px;
    height: 12px;
}

:deep(::-webkit-scrollbar-thumb)  {
    background-color: #cccccc;
    border-radius: 8px;
    background-clip: content-box;
    border: 2px solid transparent;
}

:deep(::-webkit-scrollbar-corner)  {
    background-color: unset;
}
</style>