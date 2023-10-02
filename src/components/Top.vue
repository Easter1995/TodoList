<!-- 最上面的导航栏 -->
<template>
    <header class="header">
        <div class="top-wrap">
            <div class="title">
                <a href="/">
                    <div class="top-title">TODO LIST</div>
                </a>
            </div>
            <div class="top-buttons">
                <button id="menu">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <button id="home">
                    <i class="fa-solid fa-house"></i>
                </button>
                <button id="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <button id="new-list">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name:'Top'
    }
</script>

<style scoped lang="scss">

</style>