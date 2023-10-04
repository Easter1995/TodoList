<!-- 用户自定义lists -->
<template>
    <div class="main-body">
        <div class="main-wrap">
             <!-- 输入List的名字 -->
            <div class="new-list" id="new-list" style="background-color: #ffdd9f;">
                <span>&emsp;</span>
                <input type="text" placeholder="回车或点击submit新增List" id="todo-list-title" class="todo-list-text" @keyup.enter="addList">
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
                        <div class="list-title-band">
                            <!-- list标题 -->
                            <div class="list-title">
                                {{list.title}}
                                <button id="common-btn" 
                                    style="font-size: 2.4vw; color: aliceblue;"
                                    v-on:click="deleteWholeList(list.id)">
                                        <i class="fa-solid fa-calendar-minus"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- 新增todos -->
                        <div class="new-list" id="new-list">
                            <span>&emsp;</span>
                            <input type="text" placeholder="回车新增todo" id="todo-list-todo" class="todo-list-text" @keyup.enter="addTodo(list.id)">
                            <span>&emsp;</span>
                        </div>
                        
                        <!-- todos -->
                        <div class="list-content">
                            <!-- 还没开始的todo -->
                            <div class="content">
                                <div class="List-title">Not Start</div>
                                <div v-for="(todo,index) in list.todos" :key="todo.id">
                                    <ul v-if="!todo.done && !todo.doing">
                                        <CustomItem 
                                        :todo="todo" 
                                        :listId="list.id"
                                        :checkedChange="checkedChange"
                                        :checkedChangeDoing="checkedChangeDoing"
                                        :deleteList="deleteList"></CustomItem>
                                    </ul>
                                </div>
                            </div>
                            
                            <!-- 已经完成的todo -->
                            <div class="content">
                                <div class="List-title">Alredy Done</div>
                                <div v-for="(todo,index) in list.todos" :key="todo.id">
                                    <ul v-if="todo.done">
                                        <CustomItem 
                                        :todo="todo" 
                                        :listId="list.id"
                                        :checkedChange="checkedChange"
                                        :checkedChangeDoing="checkedChangeDoing"
                                        :deleteList="deleteList"></CustomItem>
                                    </ul>
                                </div>
                            </div>
                            
                            <!-- 还在进行的todo -->
                            <div class="content">
                                <div class="List-title">Doing</div>
                                <div v-for="(todo,index) in list.todos" :key="todo.id">
                                    <ul v-if="todo.doing">
                                        <CustomItem 
                                        :todo="todo" 
                                        :listId="list.id"
                                        :checkedChange="checkedChange"
                                        :checkedChangeDoing="checkedChangeDoing"
                                        :deleteList="deleteList"></CustomItem>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
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

        // 这里是设置定时器，想让统计进度的函数每秒执行一次，一直更新进度
        created: function () {
            //这里是定时器
            setInterval(this.timer, 500);
        },

        mounted() {
            // 全选
            this.pubId1 = pubsub.subscribe('selectAll',(_)=>{
                this.lists.forEach((list) => {
                    list.todos.forEach((todo) => {
                        todo.done = true;
                        todo.doing = false;
                    });
                });
            })

            //清空已经完成的
            this.pubId2 = pubsub.subscribe('selectAll',(_)=>{
                this.lists.forEach((list) => {
                    list.todos.forEach((todo) => {
                        this.deleteList(list.id,todo.id);
                    });
                });
            })

            //订阅消息 接收到来自List组件的消息
            this.pubId3 = pubsub.subscribe('progress',(_,progressNum)=>{
                this.done=progressNum[0];
                this.all=progressNum[1];
            })
        },

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

                //List组件的
                done:0,
                all:0,

                //总的
                doneA:0,
                allA:0,
            }
        },

        //在组件销毁前取消订阅
        beforeDestroy() {
            pubsub.unsubscribe(this.pubId)
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
                            id:list.nextTodoId++,
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

            //删除整个list的函数
            deleteWholeList(ListId) {
                if(confirm('Are you sure to delete the whole list?')) {
                    this.lists = this.lists.filter((list) => {
                        return list.id !== ListId;
                    })
                }
            },
        
            //给bottom组件传递数据
            bottomNum(todos) {
                let doneNum = 0;
                let allNum = 0;
                this.lists.forEach((list) => {
                    list.todos.forEach((todo) => {
                        allNum++;
                        if(todo.done) {
                            doneNum++;
                        }
                    });
                });
                this.doneA=doneNum+this.done;
                this.allA=allNum+this.all;
                let progressNum1 = [this.doneA,this.allA];
                //把这个数组传递给bottom组件
                pubsub.publish('progress1',progressNum1);
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

<style>
    /* 总体布局 */
    .new-list {
        text-align: center;
        .todo-list-text {
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

    .content {
        width: 30%;
        margin: 0 2vw 0 2vw;
    }

    .lists-content {
        display: flex;
        flex-direction: column;
    }

    .list-title {
        height: 6vw;
        color: aliceblue;
        font-size: 3vw;
        font-weight: bold;
        text-align: center;
        border: white solid;
        background-color: #ffac74;
    }

    .list-content {
        display: flex;
        flex-direction: row;

        .content {
            width: 30%;
            margin: 0 2vw 0 2vw;
            .List-title {
                font-size: 3vw;
                text-align: center;
                color: coral;
                background-color: #f2deb9;
                height: 7vw;
                border-radius: 20px;
                margin: 2vw 0 2vw 0;
            }
        }
    }

</style>