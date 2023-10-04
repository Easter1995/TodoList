<!-- 用户自定义lists -->
<template>
    <div class="main-wrap">
        <!-- 输入List的名字 -->
        <div class="input-list-name">
            <input type="text" placeholder="回车新增List" id="todo-list-title" @keyup.enter="addList">
            <span>&emsp;</span>
            <input type="submit" value="submit" id="submit" v-on:click="addList">
            <span>&emsp;</span>
        </div>

        <!-- 具体的每一条list -->
        <!-- 遍历data里面的lists数组 -->
        <div class="lists">
            <div class="lists-content">
                <!-- 先根据list.id遍历list -->
                <ul v-for="(list,index) in lists"
                    :key="list.id">
                    <!-- list标题 -->
                    <div class="list-title">{{list.title}}</div>
                    <!-- 新增todos -->
                    <input type="text" placeholder="回车新增todo" id="todo-list-todo" @keyup.enter="addTodo(list.id)">
                    
                    <!-- todos -->
                    <div class="list-content">
                        <ul v-for="(todo,index) in list.todos" :key="todo.id">
                            <CustomItem 
                                :todo="todo" 
                                :listId="list.id"
                                :checkedChange="checkedChange"
                                :checkedChangeDoing="checkedChangeDoing"
                                :deleteList="deleteList"></CustomItem>
                        </ul>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomItem from './CustomItem'
    import pubsub from 'pubsub-js'

    export default {
        name:'CustomList',
        components: {CustomItem},

        data() {
            return {
                // 用lists数组来存list的信息
                lists:[
                    //每个list都是一个对象，包含title、id、todos
                    {
                        id:1,
                        title:"国庆旅游计划",
                        todos:[
                            {id:1,title:'天安门一日游',done:false,doing:false,isEdit:false},
                            {id:2,title:'雍和宫一日游',done:true,doing:false,isEdit:false},
                        ],
                        nextTodoId:3
                    },
                    {
                        id:2,
                        title:"端午旅游计划",
                        todos:[
                            {id:1,title:'朝天门一日游',done:false,doing:false,isEdit:false},
                            {id:2,title:'江北一日游',done:true,doing:false,isEdit:false},
                        ],
                        nextTodoId:3
                    }
                ],
                nextListId:3,
            }
        },

        methods: {
            // 新增List的函数
            addList(event) {
                if (document.getElementById("todo-list-title").value!='') {
                    //构造对象
                    this.lists.unshift({
                        id:this.nextListId++,
                        // 获取用户输入值
                        title:document.getElementById("todo-list-title").value,
                        todos:[],
                        nextTodoId:1,
                    });
                    // 清空用户输入值
                    document.getElementById("todo-list-title").value="";
                }
            },

            addTodo(id) {
                this.lists.forEach((list) => {
                    // 找到匹配的list,修改该list的todos
                    if(list.id == id) {
                        // 构造todos的对象
                        list.todos.unshift({
                            id:this.nextTodoId++,
                            title:document.getElementById("todo-list-todo").value,
                            done:false,
                            doing:false,
                            isEdit:false
                        })
                        document.getElementById("todo-list-todo").value='';
                        return;
                    }
                });
            },

            //勾选事项和取消勾选的函数
            checkedChange(ListId,todoId) {
                // 先根据ListId找到相应的List
                this.lists.forEach((list) => {
                    if(list.id == ListId) {
                        //再根据todoId找到相应的todo
                        list.todos.forEach((todo) => {
                            if(todo.id == todoId) {
                                todo.done = !todo.done;
                                if(todo.done) {
                                    todo.doing =false;
                                }
                                return;
                            }
                        });
                    }
                });
            },

            //勾选doing和取消doing的函数
            checkedChangeDoing(ListId,todoId) {
                // 先根据ListId找到相应的List
                this.lists.forEach((list) => {
                    if(list.id == ListId) {
                        //再根据todoId找到相应的todo
                        list.todos.forEach((todo) => {
                            if(todo.id == todoId) {
                                todo.doing = !todo.doing;
                                if(todo.doing) {
                                    todo.done =false;
                                }
                                return;
                            }
                        });
                    }
                });
            },

            //删除事项的函数
            deleteList(ListId,todoId) {
                this.lists.forEach((list) => {
                    if(list.id == ListId) {
                        list.todos = list.todos.filter((todo) => {
                            return todo.id !== todoId;
                        })
                    }
                });
            },


        },
    }
</script>

<style>

</style>