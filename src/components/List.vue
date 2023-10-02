<!-- 主体LIST部分 -->
<template>
    <div class="main-body">
        <div class="main-wrap">
            <!-- 具体list的内容 -->
            <div class="content">
                <Item/>
            </div>
            <!-- 新增list框 -->
            <div class="new-list">
                <input type="text" placeholder="新增代办事项">
                <input type="submit" value="submit">
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
    
</style>