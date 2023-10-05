<!-- 自定义Item -->
<template>
    <div class="lists-wrap">
        <!-- 具体内容 -->
        <div class="lists-content">
            <li>
                <!-- 使用todo对象的数据 -->
                <!-- 勾选框 -->
                <div class="checkbox">
                    <!-- 勾选已经完成 -->
                    <div class="isDone">
                        <input type="checkbox" 
                            title="DONE"
                            name="isDone" 
                            id="isDone" 
                            :checked="todo.done" 
                            v-on:click="checkedChange(listId,todo.id)">
                    </div>

                    <!-- 勾选正在完成 -->
                    <div class="isDone" style="margin-top: 20%;">
                        <input type="checkbox" 
                            title="DOING"
                            name="isDoing" 
                            id="isDoing" 
                            :checked="todo.doing" 
                            v-on:click="checkedChangeDoing(listId,todo.id)">
                    </div>
                </div>

                <!-- 内容 -->
                <div class="listText" style="width: 70%;">
                    <a v-bind:name="todo.title"></a>
                    <!-- 不在编辑状态时显示todo.title -->
                    <span id="list-text" v-show="!todo.isEdit">{{todo.title}}</span>
                    <!-- 在编辑状态时显示输入框 -->
                    <input type="text" id="list-editbox" 
                        v-show="todo.isEdit"
                        style="background-color: transparent;
                                border-color: #e4803d;
                                width: 100%;"
                        @keyup.enter="edit(listId,todo,$event)">
                </div>

                <div class="list-buttons" style="width: 30%;">
                    <!-- 删除键样式 -->
                    <button 
                        title="DELETE"
                        id="common-btn" 
                        style="
                            color: #873803;
                            font-size: 1.5vw;"
                            v-on:click="deleteConfirm(listId,todo.id)"
                            >
                        <i class="fa-solid fa-calendar-xmark"></i>
                    </button>

                    <!-- 编辑键样式 -->
                    <button
                        title="EDIT"
                        id="common-btn" 
                        style="
                            color: #873803;
                            font-size: 1.5vw;"
                        v-on:click="listEdit(listId,todo)">
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
        name:'CustomItem',
        props:['todo','listId','checkedChange','deleteList','checkedChangeDoing'],

        methods: {
            // 用户确认删除list
            deleteConfirm(listId,todoId) {
                if(confirm('Are you sure to delete this list?')) {
                    this.deleteList(listId,todoId);
                }
            },
            // 编辑
            listEdit(listId,todo) {
                todo.isEdit = true;
            },
            //修改todo的内容
            edit(listId,todo,e) {
                // 将状态改回去
                todo.isEdit = false;
                //包装对象
                const msg = {
                    todoId:todo.id,
                    title:e.target.value,
                    listId:listId
                }
                //发布消息
                pubsub.publish('updateCusList',msg);
            }
        }
    }
</script>

<style>
    .lists-content {
        font-size: 1vw;
        color: #873803;
    }

</style>