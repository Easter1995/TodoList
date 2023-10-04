<!-- 每一条LIST -->
<template>
    <div class="lists-wrap">
        <!-- 具体内容 -->
        <div class="lists-content">
            <li>
                <!-- 使用todo对象的数据 -->
                <!-- 勾选框 -->
                <div class="checkbox" style="width: 10%;">
                    <!-- 勾选已经完成 -->
                    <div class="isDone">
                        <input type="checkbox" 
                            name="isDone" 
                            id="isDone" 
                            :checked="todo.done" 
                            v-on:click="checkedChange(todo.id)">
                    </div>

                    <!-- 勾选正在完成 -->
                    <div class="isDone" style="margin-top: 20%;">
                        <input type="checkbox" 
                            name="isDoing" 
                            id="isDoing" 
                            :checked="todo.doing" 
                            v-on:click="checkedChangeDoing(todo.id)">
                    </div>
                </div>

                <!-- 内容 -->
                <div class="listText" style="width: 70%;">
                    <!-- 不在编辑状态时显示todo.title -->
                    <span id="list-text" v-show="!todo.isEdit">{{todo.title}}</span>
                    <!-- 在编辑状态时显示输入框 -->
                    <input type="text" id="list-editbox" 
                        v-show="todo.isEdit"
                        style="background-color: transparent;
                                border-color: #e4803d;"
                        @keyup.enter="edit(todo,$event)">
                </div>

                <div class="list-buttons">
                    <!-- 删除键样式 -->
                    <button 
                        id="common-btn" 
                        style="
                            color: #873803;
                            font-size: 1.5vw;"
                            v-on:click="deleteConfirm(todo.id)"
                            >
                        <i class="fa-solid fa-calendar-xmark"></i>
                    </button>

                    <!-- 编辑键样式 -->
                    <button
                        id="common-btn" 
                        style="
                            color: #873803;
                            font-size: 1.5vw;"
                        v-on:click="listEdit(todo)"
                            >
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'

    export default {
        name:'Item',
        // 声明接收todo对象数据
        // 声明接收checkedChange函数 通过传递函数将子组件的数据传递给父组件
        // 声明接收删除事项的函数deleteList
        props:['todo','checkedChange','deleteList','checkedChangeDoing'],
        methods: {
            // 用户确认删除list
            deleteConfirm(id) {
                if(confirm('Are you sure to delete this list?')) {
                    this.deleteList(id);
                }
            },
            // 编辑
            listEdit(todo) {
                todo.isEdit = true;
            },
            // edit(todo,e) {
            //     //将状态改回去
            //     todo.isEdit = false;
            //     //将用户的改动转递给List
            //     this.$bus.$emit('updateTodo',todo.id,e.target.value);
            // }
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
    #isDone,#isDoing {
        width: 1.5vw;
        height: 1.5vw;
    }
    #todo-title {
        width: 85%;
    }
    /* 按键布局 */
    .list-buttons {
        display: flex;
        flex-direction: column;
    }
</style>