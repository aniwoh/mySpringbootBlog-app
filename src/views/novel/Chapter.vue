<template>
    <div class="container">
        <div class="main-content" ref="contentContainer">
            <div class="chapter-title" v-if="currentChapter" ref="paragraph--1">
                {{ currentChapter.title}}
            </div>
            <div class="chapter-tool" :style="{fontSize:`${sizeFont}px`}">
                <span>字号：</span>
                <el-icon @click="sizeFont--" class="font-resize"><RemoveFilled /></el-icon>
                <span>{{ sizeFont }}</span>
                <el-icon @click="sizeFont++" class="font-resize"><CirclePlusFilled /></el-icon>

            </div>
            <div class="chapter-content" ref="paragraphContainer">
                <div v-if="currentChapterContent" :style="{fontSize:`${sizeFont}px`}">
                    <p
                        v-for="(paragraph, index) in currentChapterContent.split('\n')"
                        :key="index"
                        :ref="'paragraph-' + index"
                    >
                        {{ paragraph }}
                    </p>
                    <div class="chapter-content-bar">
                        <el-select-v2
                            v-model="currentChapter.id"
                            :options="options"
                            placeholder="Please select"
                            size="large"
                            style="width: 240px"
                            @change="onSelectChange"
                        />
                        <div @click="preChapter" class="tool-button">
                            <el-icon><ArrowLeft /></el-icon>
                        </div>
                        <div @click="nextChapter" class="tool-button">
                            <el-icon><ArrowRight /></el-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getChapter, getChapterList, getChapterProcessing} from "@/api/novel.js";
import {ArrowLeft, ArrowRight, CirclePlusFilled, List, RemoveFilled} from "@element-plus/icons-vue";
export default {
    components: {RemoveFilled, CirclePlusFilled, List, ArrowLeft, ArrowRight},
    props: {
        id: String
    },
    created() {
        this.novelId = this.$route.params.id; // 从路由参数获取小说 ID
        this.loadChaptersAndProgress()
        this.initWebSocket();
    },
    mounted() {
        // 监听滚动事件
        this.$refs.contentContainer.addEventListener("scroll", this.handleScroll);
        this.sizeFont = localStorage.getItem("sizeFont") || 18;
    },
    beforeRouteLeave(to, from, next) {
        this.closeWebSocket();
        next();
    },
    beforeDestroy() {
        // if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
        //     this.socket.close();
        //     console.log("WebSocket closed on destroy");
        // }
        this.$refs.contentContainer.removeEventListener("scroll", this.handleScroll);
    },
    watch:{
        sizeFont(newVal,oldVal){
            localStorage.setItem("sizeFont", newVal);
        },
        'currentChapter.title'(newVal,oldVal){
            document.title = newVal;
        }
    },
    data(){
        return{
            novelId: "", // 小说 ID
            chapters: [], // 章节列表
            currentChapterContent: "", // 当前章节内容
            currentChapter:null,
            currentProgress: {
                id:null,
                novelId: "",
                chapterId: "",
                paragraphIndex: 0,
            },
            socket: null, // WebSocket 实例
            debounceTimer: null, // 防抖计时器
            options:[],
            wsURL: import.meta.env.VITE_BASE_WS+'/readingProgress',
            sizeFont: 18
        }
    },
    methods:{
        // 加载章节列表和阅读进度
        async loadChaptersAndProgress(){
            try{
                const response = await getChapterProcessing(this.novelId);
                const response1 = await getChapterList(this.novelId);
                this.chapters = response1.data.data
                this.options=[]
                this.chapters.forEach(item=>{
                    this.options.push({
                        value:item.id,
                        label:item.title
                    })
                })
                const progress = response.data.data
                this.currentProgress.novelId=this.novelId
                if (progress){
                    this.currentProgress.id = progress.id
                    this.currentProgress.chapterId = progress.chapterId
                    this.currentProgress.paragraphIndex = progress.paragraphIndex
                    await this.loadChapter(progress.chapterId, progress.paragraphIndex);
                }else {
                    await this.loadChapter(this.chapters[0].id, -1); // 默认跳转到第一章
                }
            } catch (error) {
                console.error("Error loading chapters or progress:", error);
            }
        },
        // 加载章节内容
        async loadChapter(chapterId, paragraphIndex) {
            try {
                const response = await getChapter(chapterId);
                this.currentChapterContent = response.data.data.content;
                this.currentChapter  =response.data.data
                this.currentProgress.chapterId = chapterId;
                this.currentProgress.paragraphIndex = paragraphIndex;
                localStorage.setItem("currentProgress", JSON.stringify(this.currentProgress));
                await this.$nextTick(() => {
                    this.scrollToParagraph(paragraphIndex)
                })
            } catch (error) {
                console.error("Error loading chapter content:", error);
            }
        },
        scrollToParagraph(index) {
            const target = this.$refs[`paragraph-${index}`];
            if (Array.isArray(target)) {
                // 如果是数组，取第一个元素
                target[0]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            } else if (target) {
                // 如果是单一元素
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            } else {
                console.warn(`No valid target found for index: ${index}`);
            }
        },
        // 监听滚动事件
        handleScroll() {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }
            this.debounceTimer = setTimeout(this.updateProgress, 500); // 防抖：滚动停止 500ms 后更新进度
        },
        // 更新阅读进度
        updateProgress() {
            const paragraphs = this.$refs.paragraphContainer.querySelectorAll("p");
            // 找到第一个完全可见的段落
            let visibleParagraphIndex = 0
            for (const [index, paragraph] of paragraphs.entries()) {
                const rect = paragraph.getBoundingClientRect(); // 段落相对视口的位置
                if (rect.top>0){
                    visibleParagraphIndex = index;
                    break
                }
            }

            this.currentProgress.paragraphIndex = visibleParagraphIndex;
            localStorage.setItem("currentProgress", JSON.stringify(this.currentProgress));

            // 同步到服务器
            if (!this.socket || this.socket.readyState !== WebSocket.OPEN){
                this.initWebSocket();
                return
            }
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify(this.currentProgress));
            }
        },
        // 初始化 WebSocket
        initWebSocket() {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                console.log("WebSocket connection already exists");
                return;
            }

            this.socket = new WebSocket(this.wsURL);

            this.socket.onopen = () => {
                console.log("WebSocket connected");
            };

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("Received progress:", data.id);

                // 根据服务器推送更新进度
                this.currentProgress.id = data.id
                localStorage.setItem("currentProgress", JSON.stringify(this.currentProgress));
            };

            this.socket.onclose = () => {
                console.log("WebSocket disconnected");
            };

            this.socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
        },
        closeWebSocket() {
            if (this.socket) {
                this.socket.close();
                this.socket = null;
                console.log("WebSocket manually closed");
            }
        },

        preChapter(){
            const index = this.chapters.find(item=>item.id===this.currentChapter.id).index
            if (index===0){
                return
            }
            const chapter = this.chapters.find(item=>item.index===index-1)
            this.loadChapter(chapter.id,-1)
        },
        nextChapter(){
            const index = this.chapters.find(item=>item.id===this.currentChapter.id).index
            const chapter = this.chapters.find(item=>item.index===index+1)
            this.loadChapter(chapter.id,-1)
        },
        onSelectChange(value){
            this.loadChapter(value,-1)
        },

    }
}
</script>
<style scoped lang="scss">
.container{
    height: 100vh;
    font-family: 'Noto Serif SC', serif!important;
    background: #e9e3d6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .main-content{
        width: 510px;
        height: 100%;
        background: #f8f3e9;
        padding: 0 65px;
        text-align: left;
        margin: 0 auto;
        border: 1px solid #d8d8d8;
        overflow-y: auto;
        .chapter-title{
            font-size: 24px;
            //margin-bottom: 57px;
            font-family: PingFangSC-Regular,HelveticaNeue-Light,Helvetica Neue Light,Microsoft YaHei,sans-serif;
        }
        .chapter-tool{
            margin: 5px;
            height: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            .font-resize{
                cursor: pointer;
            }
        }
        .chapter-content{
            font-size: 18px;
            font-family: "Microsoft YaHei", PingFangSC-Regular, HelveticaNeue-Light, "Helvetica Neue Light", sans-serif;
            line-height: 1.8;
            .chapter-content-bar{
                height: 64px;
                display: flex;
                margin-left: auto;
                justify-content: right;
                gap: 20px;
                .tool-button{
                    background: #ffffff;
                    cursor: pointer;
                    border: 1px solid rgba(0,0,0,.1);
                    height: 42px;
                    width: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
;
}
@media screen and (max-width: 776px) {
    .main-content{
        width: 100% !important;
        padding: 0 15px !important;
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