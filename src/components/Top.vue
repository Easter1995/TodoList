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
            <!-- 按键和日期 -->
            <div class="button-wrapper">
                <div class="top-buttons">
                    <!-- 左侧按钮 -->
                    <div class="left-button top-comp" style="float: left;">
                        <button id="menu">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                        <button id="home">
                            <i class="fa-solid fa-house"></i>
                        </button>
                    </div>
                </div>
                <!-- 日期 -->
                <div class="calendar top-comp">
                    <Date></Date>
                </div>
                <div class="top-buttons">
                    <!-- 右侧按钮 -->
                    <div class="right-button top-comp" style="float: right;">
                        <button id="search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <button id="top-new-list">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import Date from './Date'
    export default {
        name:'Top',
        components:{Date}
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
        font-size: 5.5vw;
        font-weight: 800;
        color: aliceblue;
    }

    /* 按键整体的布局 */
    .button-wrapper {
        display: flex;
        width: 100%;
    }
    .top-buttons {
        width: 40%;
        margin-bottom: 1%;
        padding: 0 10px 0 10px;
    }
    
    /* 日期的布局 */
    .calendar {
        width: 40%;
        text-align: center;
        color: aliceblue;
    }
</style>