<!-- 在大标题之下展示今天的日期 -->
<template>
    <div class="date">
        <!-- 图标 -->
        <span class="date-icon">
            <button style="width: 20%;color: aliceblue;" id="common-btn">
                <i class="fa-solid fa-calendar-days"></i>
            </button>
        </span>
        <!-- 日期内容 -->
        <span class="date-content">
            今天是10月2日
        </span>
    </div>
</template>

<script>
export default {
    name:'Date'
}
</script>

<style>
    .date {
        font-size: 1.4vw;
    }
</style>