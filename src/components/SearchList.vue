<!-- 搜索框列表组件 -->
<template>
    <div class="main-body" style="background-color: bisque; font-size: 1.3vw;">
        <div class="main-wrap">
            <!-- 列表 遍历propTodos -->
            <div class="todo-lists" v-for="(todo,index) in propTodos" :key="todo.title">
                <div class="content" style="width: 100%;">
                    <!-- 标题 -->
                    <div class="todo-title" style="font-weight: bold; color: #873803;">
                        {{todo.title}}
                    </div>
                    <!-- 完成情况和跳转按钮 -->
                    <div>
                        <span>progress: </span>
                        <span v-if="!todo.done && !todo.doing">not start yet</span>
                        <span v-if="todo.done && !todo.doing">done</span>
                        <span v-if="!todo.done && todo.doing">doing</span>
                        <!-- 跳转 -->
                        <button class="to-the-todo" title="GO TO" v-on:click="hrefChange(todo.title)">
                            <a v-bind:href="todoHref"><i style="color: #873803;" class="fa-solid fa-calendar-day"></i></a>
                        </button>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'

    export default {
        name:'SearchList',
        data() {
            return {
                propTodos:[],
                todoHref:'',
            }
        },
        mounted() {
            this.pubId1 = pubsub.subscribe('searchList',(_,propTodos)=>{
                // 将传过来的信息装进这个组件的data
                this.propTodos = propTodos;
            })

            this.pubId2 = pubsub.subscribe('searchCancel',(_)=>{
                // 将数组清空
                this.propTodos.length = 0;
            })
        },
        methods: {
            // 跳转
            hrefChange(title) {
                this.todoHref = '#' + title;
            }
        },
    }
</script>

<style>
    .to-the-todo {
        background-color: transparent;
        border-style: none;
        font-size: 2vw;
        color: #873803;
        
        &:hover{
            border: 2px solid aliceblue;
            background-color: rgb(250, 181, 77);
        }
    }
</style>