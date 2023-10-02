<!-- 主体LIST部分 -->
<template>
    <div class="main-body">
        <div class="main-wrap">
            <!-- 具体list的内容 -->
            <div class="content">
                <Item/>
            </div>
            <!-- 新增list框 -->
            <div class="new-list" id="new-list">
                <span>&emsp;</span>
                <input type="text" placeholder="新增代办事项" id="text">
                <span>&emsp;</span>
                <input type="submit" value="submit" id="submit">
                <span>&emsp;</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item'
    export default {
        name:'List',
        components: {Item},
    }
</script>

<style scoped lang="scss">
    /* 整体布局 */
    .main-body {
        padding: 10px;
        background-color: rgb(255, 243, 227);
    }

    /* 内容 */
    .main-wrap {
        display: flex;
        flex-direction: column;
    }
    /* 新增事项 */
    .new-list {
        text-align: center;
        #text {
            padding: 8px;
            width: 100%;
            background-color: transparent;
            border: 2px solid rgb(250, 181, 77);
        }
        #submit {
            background-color: transparent;
            border: 2px solid rgb(250, 181, 77);
            &:hover {
                background-color: rgb(250, 181, 77);
            }
        }
    }
</style>