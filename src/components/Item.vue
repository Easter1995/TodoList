<!-- 每一条LIST -->
<template>
    <ul class="lists-ol">
        <li>
            <div class="lists-wrap">
                <!-- 具体内容 -->
                <div class="lists-content">
                    <input type="checkbox" name="isDone" id="isDone">
                    <label for="isDone">{{event}}</label>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name:'Item',
        data() {
            return {
                event:'今天要学习'
            }
        }
    }
</script>
    
<style scoped lang="scss">
    ul {
        list-style: none;
    }
</style>