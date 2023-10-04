<!-- 返回顶部组件 -->
<template>
    <div class="back-to-top">
        <button v-on:click="topFunction" id="myBtn" title="BACK TO TOP">
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
            }
        },
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