<!-- 返回顶部组件 -->
<template>
    <div class="back-to-top">
        <button v-on:click="scollTop" id="myBtn" title="BACK TO TOP">
            <i class="fa-solid fa-circle-up"></i>
        </button>
    </div>
</template>

<script>

    window.onscroll = function() {scrollFunction()};
 
    function scrollFunction() {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }

    export default {
        name:'BackToTop',
        methods: {
            // 点击按钮，返回顶部
            topFunction() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
            // 返回顶部
            scollTop() {
                //  设置一个定时器
                const upRoll = setInterval(() => {
                    const top = document.documentElement.scrollTop // 每次获取页面被卷去的部分
                    const speed = Math.ceil(top / 10) // 每次滚动多少 （步长值）
                    if (document.documentElement.scrollTop > 0) {
                        document.documentElement.scrollTop -= speed // 不在顶部 每次滚动到的位置
                    } else {
                        clearInterval(upRoll) // 回到顶部清除定时器
                    }
                }, 20)
            }
        }
    }
</script>

<style>
    #myBtn {
        font-size: 2vw;
        display: none;
        position: fixed;
        bottom: 2vw;
        right: 2.5vw;
        z-index: 99;
        border: none;
        outline: none;
        background-color: #ffac74;
        color: aliceblue;
        cursor: pointer;
        padding: 15px;
        border-radius: 10px;
    }

    #myBtn:hover {
        background-color: #b25000;
    }   
</style>