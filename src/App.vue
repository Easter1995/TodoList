<template>
  <div id="root">
    <!-- 全局 -->
    <div class="todo-container">
      <!-- menu部分 -->
      <div class="todo-list-menu"> 
        <ListMenu v-show="isShowMenu"></ListMenu>
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
  import pubsub from 'pubsub-js';

  export default {
    name: 'App',
    components:{Bottom,Top,CustomList,BackToTop,ListMenu},
    data() {
      return {
        isShowMenu:true,
      }
    },
    mounted() {
      this.pubId = pubsub.subscribe('showMenu',(_,width)=>{
        if(width<800)
          this.isShowMenu = !(this.isShowMenu);
        else{
          this.isShowMenu = true;
        }
      })
    },
  }
</script>

<style>
  /* 全局布局 */
  .todo-container {
    
    height: 100%;
    @media screen and (max-width: 799px){
      width: 100%;
      .todo-list-wrap {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }
    }
    @media screen and (min-width: 800px){
      margin: 0 7%;
      display: flex;
      flex-direction: row;
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
    
    
  }
  /* menu的占位 */
  @media screen and (min-width: 800px){
    .todo-list-menu {
      width: 30%;
      margin: 0 4% 0 0;
    }
  }
  
</style>
