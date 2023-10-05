<!-- 用户自定义lists -->
<template>
    <div class="main-body">
        <div class="main-wrap">
             <!-- 输入List的名字 -->
            <div class="new-list" id="new-list" style="background-color: #ffdd9f;">
                <span>&emsp;</span>
                <input type="text" placeholder="回车或点击submit新增List" 
                    id="todo-list-title" class="todo-list-text" 
                    @keyup.enter="addList">
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
                                <!-- 不在编辑 -->
                                <div v-show="!list.isEdit">
                                    <a v-bind:name="list.title"></a>
                                    {{list.title}}
                                    <button id="common-btn" title="DELETE LIST" style="font-size: 2vw; color: aliceblue;" v-on:click="deleteWholeList(list.id)">
                                        <i class="fa-solid fa-calendar-minus"></i>
                                    </button>
                                    <button id="common-btn" title="EDIT" style="font-size: 2vw; color: aliceblue;" v-on:click="isEdit(list)">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <!-- 在编辑 -->
                                <input type="text" id="list-editbox" 
                                    v-show="list.isEdit"
                                    style="background-color: transparent;
                                            border-color: #e4803d;"
                                    @keyup.enter="updateList(list,$event)">
                            </div>
                        </div>
                        
                        <!-- 新增todos -->
                        <div class="new-list" id="new-list">
                            <span>&emsp;</span>
                            <input type="text" placeholder="回车新增todo" 
                                id="todo-list-todo-sb" class="todo-list-text" 
                                @keyup.enter="addTodo(list.id,$event)">
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
        title:'CustomList',
        components: {CustomItem},

        // 这里是设置定时器，想让统计进度的函数每秒执行一次，一直更新进度
        created: function () {
            //这里是定时器
            setInterval(this.timer, 1000);
            if(this.lists == null)
                this.lists = [];
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
            this.pubId2 = pubsub.subscribe('clearDone',(_)=>{
                this.lists.forEach((list) => {
                    list.todos.forEach((todo) => {
                        if(todo.done)
                            this.deleteList(list.id,todo.id);
                    });
                });
            })

            //修改lists的消息
            this.pubId3 = pubsub.subscribe('updateCusList',this.updateTodo)

            //搜索
            this.pubId4 = pubsub.subscribe('searchTodos',this.search)

            //liststitles
            function titleNum() {
                this.lists.forEach((list) => {
                    listsTitles.push(list.title);
                });
            }
        },

        data() {
            return {
                // 用lists数组来存list的信息
                lists:JSON.parse(localStorage.getItem('lists')),
                nextListId:1,

                //完成情况
                done:0,
                all:0,

                //搜索功能中要用到
                allTodos:[],
                propTodos:[],
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
                        id:this.nextListId,
                        // 获取用户输入值
                        isEdit:false,
                        title:document.getElementById("todo-list-title").value,
                        todos:[],
                        nextTodoId:1,
                    });
                    this.nextListId++;
                    // 清空用户输入值
                    document.getElementById("todo-list-title").value="";
                }
            },

            addTodo(id,e) {
                if(e.target.value!=''){
                    this.lists.forEach((list) => {
                    // 找到匹配的list,修改该list的todos
                    if(list.id == id) {
                            // 构造todos的对象
                            list.todos.unshift({
                                id:list.nextTodoId++,
                                title:e.target.value,
                                done:false,
                                doing:false,
                                isEdit:false
                            })
                            document.getElementById("todo-list-todo-sb").value="";
                            return;
                        }
                    });
                }
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
                    });
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
                let progressNum1 = [doneNum,allNum];
                //把这个数组传递给bottom组件
                pubsub.publish('progress1',progressNum1);
            },

            //修改todo
            updateTodo(_,msg) {
                let listId = msg.listId;
                let title = msg.title;
                let todoId = msg.todoId;
                this.lists.forEach((list) => {
                    if(list.id == listId) {
                        list.todos.forEach((todo) => {
                            if(todo.id == todoId) {
                                todo.title = title;
                            }
                        });
                    }
                });
            },
            
            //修改list
            isEdit(list) {
                list.isEdit=true;
            },
            updateList(list,e) {
                list.isEdit = false;
                if(e.target.value!='')
                    list.title = e.target.value;
            },

            //给Menu组件传递数据
            listMenu() {
                pubsub.publish('listMenu',this.lists);
            },

            timer: function () {
                //写成timer()也可
                this.getorderdata();
            },
            getorderdata() {
                //想要定时执行的函数
                this.bottomNum(this.todos);
                this.listMenu();
            },
        
            search(_,value) {
                // 加载所有list里面的todo
                this.lists.forEach((list) => {
                    list.todos.forEach((todo) => {
                        this.allTodos.push(todo);
                    });
                });
                // 若未输入值，则展示所有数据
                if(null === value || undefined === value){
                    this.propTodos = this.allTodos;
                } else {
                    this.propTodos = []; // 结果列表置空
                    let regStr =  '';
                    // 初始化正则表达式
                    for(let i=0; i<value.length; i++){
                        regStr = regStr + '(' + value[i] + ')([\\s]*)'; //跨字匹配
                    }
                    let reg = new RegExp(regStr);
                    for(let i=0; i<this.allTodos.length; i++){
                        let title = this.allTodos[i].title; //按照名字匹配
                        let regMatch = title.match(reg);
                        if(null !== regMatch) {// 将匹配的数据放入结果列表中
                            this.propTodos.push(this.allTodos[i]);
                        }
                    }
                }
                // alltodos清空
                this.allTodos.length = 0;
                // 把筛选出来的propTodos传给列表组件
                pubsub.publish('searchList',this.propTodos);
            },
        
        },
    
        //监视lists有没有改变，本地存储
        watch: {
            lists:{
                handler(value) {
                    localStorage.setItem('lists',JSON.stringify(value));
                },
                deep:true
            }
        }
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
        color: aliceblue;
        font-size: 2vw;
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
                font-size: 1.9vw;
                text-align: center;
                color: coral;
                background-color: #f2deb9;
                border-radius: 20px;
                margin: 1vw 0 1vw 0;
            }
        }
    }

</style>