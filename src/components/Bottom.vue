<!-- 最下面的一部分 -->
<template>
    <footer class="footer">
        <div class="footer-inner">
            <span id="progress-icon">
                <i class="fa-solid fa-champagne-glasses" style="font-size: 2vw;"></i>
            </span>
            <span id="progress" style="font-size: 2vw;">done: {{done}}/all: {{all}}</span>
        </div>
    </footer>
</template>

<script>
    import pubsub from 'pubsub-js'
    export default {
        name:'Bottom',

        data() {
            return {
                done:0,
                all:0
            }
        },

        //挂载
        mounted() {
            //订阅消息
            this.pubId = pubsub.subscribe('progress1',(_,progressNum1)=>{
                if(progressNum1[1] == progressNum1[0])
                    document.getElementById("progress").innerHTML="Congratulatios!You've done all tasks!";
                else {
                    this.done=progressNum1[0];
                    this.all=progressNum1[1];
                }
            })
           
        },
        //在组件销毁前取消订阅
        beforeDestroy() {
            pubsub.unsubscribe(this.pubId)
        }
    }
</script>

<style scoped lang="scss">
    /* 整体高度 */
    .footer {
        height: 10vw;
        text-align: center;
        background-color: #ffac74;
        .footer-inner {
            margin: 3vw;
            font-size: 1.5vw;
            color: aliceblue;
        }
    }
</style>