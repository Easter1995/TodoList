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
            
            <div class="lists">
                <!-- 还没有做的项目 -->
                <div class="content">
                    <div class="List-title">Not Start</div>
                    <ul>
                        <!-- 遍历data里面的todos数组，作为每一项具体的Item -->
                        <!-- 遍历todos里面的元素，给它命名为todoObj -->
                        <!-- 把checkedChange函数传递给Item -->
                        <Item v-for="(todo,index) in notDoneLists" 
                            :key="todo.id" 
                            :todo="todo" 
                            :checkedChange="checkedChange"
                            :checkedChangeDoing="checkedChangeDoing"
                            :deleteList="deleteList"></Item>
                    </ul>
                </div>
                
                <!-- 已经做完的项目 -->
                <div class="content">
                    <div class="List-title">Alredy Done</div>
                    <ul>
                        <!-- 遍历data里面的todos数组，作为每一项具体的Item -->
                        <!-- 遍历todos里面的元素，给它命名为todoObj -->
                        <!-- 把checkedChange函数传递给Item -->
                        <Item v-for="(todo,index) in doneLists" 
                            :key="todo.id" :todo="todo" 
                            :checkedChange="checkedChange"
                            :checkedChangeDoing="checkedChangeDoing"
                            :deleteList="deleteList"></Item>
                    </ul>
                </div>

                <!-- 正在完成的项目 -->
                <div class="content">
                    <div class="List-title">Doing</div>
                    <ul>
                        <!-- 遍历data里面的todos数组，作为每一项具体的Item -->
                        <!-- 遍历todos里面的元素，给它命名为todoObj -->
                        <!-- 把checkedChange函数传递给Item -->
                        <Item v-for="(todo,index) in doingLists" 
                            :key="todo.id" :todo="todo" 
                            :checkedChange="checkedChange"
                            :checkedChangeDoing="checkedChangeDoing"
                            :deleteList="deleteList"></Item>
                    </ul>
                </div>
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

        computed: {
            //通过计算过滤掉列表中不需要显示的项目
            notDoneLists:function() {
                return this.todos.filter(function(todo) {
                    return (!todo.done)&&(!todo.doing);//返回done和doing是false的项
                })
            },
            doneLists:function() {
                return this.todos.filter(function(todo) {
                    return todo.done&&(!todo.doing);
                })
            },
            doingLists:function() {
                return this.todos.filter(function(todo) {
                    return (todo.doing)&&(!todo.done);
                })
            }
        },

        // 这里是设置定时器，想让统计进度的函数每秒执行一次，一直更新进度
        created: function () {
                    //这里是定时器
                    setInterval(this.timer, 500);
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

            //修改todolist的内容
            //this.$bus.$on('updateTodo',this.update);
        },

        data() {
            return {
                // 把全部数据用todos数组来保存，todos数组的元素是对象0
                todos:[
                    {id:1,title:'好好学习',done:false,doing:false,isEdit:false},
                    {id:2,title:'天天向上',done:true,doing:false,isEdit:false}
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
                        done:false,
                        doing:false,
                        isEdit:false,
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
                        if(todo.done)
                            todo.doing = false;
                        return;
                    }
                });
            },

            //勾选doing和取消doing的函数
            checkedChangeDoing(id) {
                this.todos.forEach((todo) => {
                    if(todo.id == id) {
                        todo.doing = !todo.doing;//doing值取反
                        if(todo.doing)
                            todo.done = false;
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

            //编辑事项的函数
            update(id,title) {
                this.todos.forEach((todo) => {
                    if(todo.id == id) {
                        todo.title = title;
                    }
                });
            },

            //给CustomList组件传递数据
            //修改后
            bottomNum(todos) {
                let doneNum = 0;
                let allNum = todos.length;
                this.todos.forEach((todo) => {
                    if(todo.done)
                        doneNum++;
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
    .lists {
        display: flex;
        flex-direction: row;
    }


    .content {
        width: 30%;
        margin: 0 2vw 0 2vw;
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

    /* list分类的标题 */
    .List-title {
        font-size: 3vw;
        text-align: center;
        color: coral;
        background-color: #f2deb9;
        height: 7vw;
        border-radius: 20px;
        margin: 2vw 0 2vw 0;
    }
</style>