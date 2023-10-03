<!-- 每一条LIST -->
<template>
    <div class="lists-wrap">
        <!-- 具体内容 -->
        <div class="lists-content">
            <li>
                <!-- 使用todo对象的数据 -->
                <!-- 勾选框 -->
                <input type="checkbox" 
                    name="isDone" 
                    id="isDone" 
                    :checked="todo.done" 
                    v-on:click="checkedChange(todo.id)">
                <!-- 勾选框后面的文字 -->
                <label for="isDone" id="todo-title">{{todo.title}}</label>
                <!-- 删除键样式 -->
                <button 
                    id="common-btn" 
                    style="
                        color: #873803;
                        width: 10%;
                        font-size: 1.5vw;"
                        v-on:click="deleteConfirm(todo.id)"
                        >
                    <i class="fa-solid fa-calendar-xmark"></i>
                </button>
            </li>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Item',
        // 声明接收todo对象数据
        // 声明接收checkedChange函数 通过传递函数将子组件的数据传递给父组件
        // 声明接收删除事项的函数deleteList
        props:['todo','checkedChange','deleteList'],
        methods: {
            // 用户确认删除list
            deleteConfirm(id) {
                if(confirm('Are you sure to delete this list?')) {
                    this.deleteList(id);
                }
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
    #todo-title {
        width: 85%;
    }
</style>