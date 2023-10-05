<template>
  <div id="root">
    <!-- 全局 -->
    <div class="todo-container" style="margin: 0 7%;">
      <!-- menu部分 -->
      <div class="todo-list-menu"> 
        <ListMenu/>
      </div>
      <!-- list部分 -->
      <div class="todo-list-wrap">
        <Top/>
        <div id="division-line"></div>
        <CustomList/>
        <div id="division-line"></div>
        <Bottom/>
        <BackToTop/>
      </div>
    </div>
  </div>
</template>

<script>
  import Bottom from './components/Bottom'
  import CustomList from './components/CustomList'
  import Top from './components/Top'
  import BackToTop from './components/BackToTop'
  import ListMenu from './components/ListMenu'

  export default {
    name: 'App',
    components:{Bottom,Top,CustomList,BackToTop,ListMenu}
  }
</script>

<style>
  /* 全局布局 */
  .todo-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    .todo-menu {
      width: 35%;
    }
    .todo-list-wrap {
      display: flex;
      flex-direction: column;
      width: 66%;
      height: 100%;
    }
  }
  /* menu的占位 */
  .todo-list-menu {
    width: 30%;
    margin: 0 4% 0 0;
  }
</style>
