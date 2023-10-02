<!-- 主体LIST部分 -->
<template>
    <div class="main-body">
        <div class="main-wrap">
            <!-- 具体list的内容 -->
            <div class="content">
                <ul>
                    <!-- 遍历data里面的todos数组，作为每一项具体的Item -->
                    <!-- 遍历todos里面的元素，给它命名为todoObj -->
                    <Item
                        v-for="(todo,index) in todos"
                        :key="todo.id"
                        :todo="todo"
                    ></Item>
                </ul>
            </div>
            <!-- 新增list框 -->
            <div class="new-list" id="new-list">
                <span>&emsp;</span>
                <!-- 绑定键盘事件:敲下enter表示调用add函数新增事项 -->
                <input type="text" placeholder="回车或点击submit新增事项" id="todo-list-text" @keyup.enter="add">
                <span>&emsp;</span>
                <input type="submit" value="submit" id="submit" v-on:click="add">
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
        data() {
            return {
                // 把全部数据用todos数组来保存，todos数组的元素是对象0
                todos:[
                    {id:1,title:'好好学习',done:true},
                    {id:2,title:'天天向上',done:false}
                ],
                // 下一个id
                nextTodoId:3
            }
        },
        // 新增事项的函数
        methods: {
            add(event) {
                // 在todos数组的头部插入数据
                if (document.getElementById("todo-list-text").value!='') {
                    this.todos.unshift({
                        id:this.nextTodoId++,
                        // 获取用户输入值
                        title:document.getElementById("todo-list-text").value,
                        done:false
                    });
                    // 清空用户输入值
                    document.getElementById("todo-list-text").value="";
                }
            }
        },
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
        #todo-list-text {
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