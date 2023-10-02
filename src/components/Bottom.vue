<!-- 最下面的一部分 -->
<template>
    <footer class="footer">
        <div class="footer-inner">
            <span class="select-all">
                <span id="select-all-icon">
                    <i class="fa-solid fa-champagne-glasses"></i>
                </span>
                <span id="select-all-button">
                    <input type="checkbox" name="select-all-button" id="select-all-button">
                </span>
            </span>
            <span class="progress">
                progress:done{{isDone}}/all{{allEvents}}
            </span>
        </div>
    </footer>
</template>

<script>
    export default {
        name:'Bottom'
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