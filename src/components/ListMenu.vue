<!-- 菜单 展示所有的list名字 -->
<template>
    <div class="list-menu-body">
        <div class="list-menu-wrap">
            <!-- 菜单标题 -->
            <div class="list-menu-title">
                <span><i class="fa-solid fa-clipboard-list"></i></span>
                <span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
                <span>LIST MENU</span>
            </div>

            <!-- 菜单内容 -->
            <div class="list-menu-content">
                <div v-for="(title,index) in titles">
                    <span class="title">{{title}}</span>
                    <!-- 跳转 -->
                    <span>
                        <button class="goto-button" v-on:click="hrefChange1(title)">
                            <a v-bind:href="listHref" style="color:#873803; font-size: 1.3vw;"><i class="fa-solid fa-circle-arrow-right"></i></a>
                        </button>
                    </span>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js';
    export default {
        name:'ListMenu',

        data() {
            return {
                titles:[],
                listHref:''
            }
        },

        mounted() {
            this.pubId = pubsub.subscribe('listMenu',(_,lists)=>{
                //先清空
                this.titles=[];
                lists.forEach((list) => {
                    this.titles.push(list.title);
                });
            })
        },
        methods: {
            // 跳转
            hrefChange1(title) {
                this.listHref = '#' + title
            }
        },
    }
</script>

<style>
    /* 整体布局 */
    .list-menu-body {
        position: fixed;
        height: 70%;
        width: 24%;
        background-color: #ffecca;
        .list-menu-wrap {
            margin: 10% 5%;
        }
    }

    /* 具体内容 */
    .list-menu-content {
        .title {
            font-size: 1.3vw;
            margin: 3% 0 3% 0;
        }
        .goto-button {
            background-color: transparent;
            border-style: none;
            width: 4vw;
            
            &:hover {
                border: 2px solid aliceblue;
                border-radius: 10px;
                background-color: rgb(250, 181, 77);
            }
        }
    }

    .list-menu-title {
        font-weight: bold;
        color: #873803;
        font-size: 1.9vw;
        margin: 0 0 6% 0;
    }

</style>