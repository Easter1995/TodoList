<!-- 主体LIST部分 -->
<template>
    <div class="main-body">
        <div class="main-wrap">
            <!-- 新增list框 -->
            <div class="new-list" id="new-list">
                <span>&emsp;</span>
                <!-- 绑定键盘事件:敲下enter表示调用add函数新增事项 -->
                <input type="text" placeholder="回车或点击submit新增事项" id="todo-list-text" @keyup.enter="add">
                <span>&emsp;</span>
                <input type="submit" value="submit" id="submit" v-on:click="add">
                <span>&emsp;</span>
            </div>
            <!-- 具体list的内容 -->
            <div class="content">
                <ul>
                    <!-- 遍历data里面的todos数组，作为每一项具体的Item -->
                    <!-- 遍历todos里面的元素，给它命名为todoObj -->
                    <!-- 把checkedChange函数传递给Item -->
                    <Item
                        v-for="(todo,index) in todos"
                        :key="todo.id"
                        :todo="todo"
                        :checkedChange="checkedChange"
                        :deleteList="deleteList"
                    ></Item>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item'
    import pubsub from 'pubsub-js'
    export default {
        name:'List',
        components: {Item},

        // 这里是设置定时器，想让统计进度的函数每秒执行一次，一直更新进度
        created: function () {
                    //这里是定时器
                    setInterval(this.timer, 1000);
                },

        mounted() {
            //全选
            this.pubId1 = pubsub.subscribe('selectAll',(_)=>{
                this.todos.forEach((todo) => {
                    todo.done = true
                });
            })

            //清空已经完成的
            this.pubId2 = pubsub.subscribe('clearDone',(_)=>{
                if(confirm('Are you sure to delete all the lists you have done?')){
                    this.todos.forEach((todo) => {
                        if(todo.done)
                            this.deleteList(todo.id);
                    });
                }
            }) 
        },

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

        methods: {
            // 新增事项的函数
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
            },

            //勾选事项和取消勾选的函数
            checkedChange(id) {
                this.todos.forEach((todo) => {
                    if(todo.id == id) {
                        todo.done = !todo.done;//done值取反
                        return;
                    }
                });
            },

            //删除事项的函数
            deleteList(id) {
                this.todos = this.todos.filter((todo) => {
                    return todo.id !== id;
                })
            },
        
            //给bottom组件传递数据
            bottomNum(todos) {
                let doneNum = 0;
                let allNum = todos.length;
                todos.forEach((todo) => {
                    if(todo.done) {
                        doneNum++;
                    }
                });
                let progressNum = [doneNum,allNum];
                //把这个数组传递给bottom组件
                pubsub.publish('progress',progressNum);
            },


            timer: function () {
                //写成timer()也可
                this.getorderdata();
            },
            getorderdata() {
                //想要定时执行的函数
                this.bottomNum(this.todos);
            },
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