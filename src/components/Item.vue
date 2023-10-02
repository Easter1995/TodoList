<!-- 每一条LIST -->
<template>
    <ul class="lists-ol">
        <div class="lists-wrap">
            <!-- 具体内容 -->
            <div class="lists-content">
                <li>
                    <input type="checkbox" name="isDone" id="isDone">
                    <label for="isDone">{{event1}}</label>
                </li>
                <li>
                    <input type="checkbox" name="isDone" id="isDone">
                    <label for="isDone">{{event2}}</label>
                </li>
            </div>
        </div>
    </ul>
</template>

<script>
    export default {
        name:'Item',
        data() {
            return {
                event1:'今天要学习',
                event2:'明天要学习'
            }
        }
    }
</script>
    
<style scoped lang="scss">
    /* 无序标签取消原点 */
    ul {
        list-style: none;
    }
    /* 每条list的内容 */
    .lists-content {
        font-size: 1.5vw;
        color: #873803;
    }
    #isDone {
        width: 1.5vw;
        height: 1.5vw;
    }
</style>