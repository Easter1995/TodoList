<!-- 最上面的导航栏 -->
<template>
    <header class="header">
        <div class="top-wrap">
            <!-- 大标题 -->
            <div class="title-wrapper">
                <div class="title isLink">
                    <a href="/">
                        <div class="top-title">TODO LIST</div>
                    </a>
                </div>
            </div>
            <!-- 按键 -->
            <div class="button-wrapper">
                <div class="top-buttons">
                    <!-- 左侧按钮 -->
                    <div class="left-button top-comp" style="float: left;">
                        <button id="selectAll" title="SELECT ALL" v-on:click="selectAll">
                            <i class="fa-solid fa-clipboard-check"></i>
                        </button>
                        <button id="clearDone" title="DELETE ALL DoneLists" v-on:click="clearDone">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>

                <!-- 输入框 只有在isSearch为真时显示 -->
                <div class="search-box">
                    <input type="text" name="search-box" id="search-box"
                        v-show="this.isSearch"
                        placeholder="输入要查找的内容"
                        style="background-color: transparent;font-size: 2vw;"
                        @keyup.enter="searchValue($event)">
                </div>
                
                <div class="top-buttons">
                    <!-- 右侧按钮 -->
                    <div class="right-button top-comp" style="float: right;">
                        <!-- 在屏幕尺寸小于800时显示菜单按钮 -->
                        <button v-if="screenWidth < 800" id="menu" title="MENU" style="width: 50%;"
                                v-on:click="showMenu">
                            <i class="fa-solid fa-bars"></i>
                        </button>

                        <!-- 在屏幕尺寸大于等于800时不显示菜单按钮 -->
                        <button  id="search" title="SEARCH" style="width: 50%;" v-on:click="search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="division-line" style="background-color: aliceblue; width: 100%;"></div>
            <!-- 搜索框 -->
            <div class="search-lists-wrapper" v-show="this.isSearch" style="width: 100%;">
                <!-- 搜索框的抬头，是一个叉叉，点一下搜索框就关闭 -->
                <div class="search-band" style="background-color:bisque">
                    <button id="search-cancel" class="cancel-btn" title="CLOSE" v-on:click="searchCancel">
                        <i class="fa-solid fa-rectangle-xmark"></i>
                    </button>
                </div>
                <!-- 搜索框的列表部分 -->
                <div>
                    <!-- 列表组件 -->
                    <SearchList/>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import pubsub from 'pubsub-js'
    import SearchList from './SearchList'
    

    export default {
        name:'Top',
        components:{SearchList},
        data() {
            return {
                isSearch:false,
                inputValue:'',//输入框的默认值
                screenWidth: document.body.clientWidth,//屏幕大小
                timer: false,
            }
        },

        mounted() {
            // 监听screenWidth，改变data的screenWidth
            window.addEventListener('resize', () => {
                const screenWidths = document.body.clientWidth;
                this.screenWidth = screenWidths;
            })
        },

        watch: {
            /*监听页面*/
            screenWidth(val) {
                // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
                if (!this.timer) {
                    // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                    this.screenWidth = val;
                    this.timer = true;
                    setTimeout(() => {
                        let screenWidth = this.screenWidth;
                        // if (screenWidth < 800) {
                        //     console.log(screenWidth);
                        if (screenWidth >= 800) {
                            pubsub.publish('showMenu',this.screenWidth);
                        }
                        this.timer = false;
                    }, 600);
                }
            },
        },

        methods: {
            //显示菜单
            showMenu() {
                pubsub.publish('showMenu',this.screenWidth);
            },

            //搜索
            search() {
                this.isSearch = true;
            },
            searchCancel() {
                this.isSearch = false;
                pubsub.publish('searchCancel','')
            },
            //把搜索的内容传给List组件
            searchValue(e) {
                pubsub.publish('searchTodos',e.target.value);
                document.getElementById('search-box').value = '';
            },

            //全选按钮
            selectAll() {
                pubsub.publish('selectAll');
            },

            //清空已经做完的事项按钮
            clearDone() {
                if(confirm('Are you sure to delete all lists you have done?'))
                    pubsub.publish('clearDone');
            }

        },
    }
</script>

<style scoped lang="scss">
    /* 开头整体的布局 */
    .top-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        background-color: #ffac74;
    }
    /* 大标题整体的布局 */
    .title-wrapper {
        display: flex;
        padding: 1vw 0;
        width: 100%;
        justify-content: space-around;
    }
    /* 大标题的样式 */
    .top-title {
        font-size: 2.5vw;
        font-weight: 800;
        color: aliceblue;
    }

    /* 按键整体的布局 */
    .button-wrapper {
        display: flex;
        width: 100%;
    }
    .top-buttons {
        width: 100%;
        margin-bottom: 1%;
        padding: 0 10px 0 10px;
    }
    
    /* 日期的布局 */
    .calendar {
        width: 40%;
        text-align: center;
        color: aliceblue;
    }
    
    .cancel-btn {
        background-color: transparent;
        border-style: none;
        font-size: 2vw;
        color: #873803;
        margin: 0 93%;
        &:hover{
            border: 2px solid aliceblue;
            background-color: rgb(250, 181, 77);
        }
    }
</style>