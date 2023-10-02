<template>
  <div id="root">
    <!-- 全局 -->
    <div class="todo-container">
      <!-- 菜单部分 -->
      <div class="todo-menu">
        <ListMenu/>
      </div>
      <!-- list部分 -->
      <div class="todo-list-wrap">
        <Top/>
        <div id="division-line"></div>
        <List/>
        <Bottom/>
      </div>
    </div>
  </div>
</template>

<script>
  import Bottom from './components/Bottom'
  import Date from './components/Date'
  import List from './components/List'
  import ListMenu from './components/ListMenu'
  import Top from './components/Top'

  export default {
    name: 'App',
    components:{Bottom,List,Top,ListMenu}
  }
</script>

<style>
  /* 全局布局 */
  .todo-container {
    display: flex;
    flex-direction: row;
    .todo-menu {
      width: 35%;
    }
    .todo-list-wrap {
      width: 60%;
      margin-right: 17%;
    }
  }
  /* menu的占位 */
</style>
