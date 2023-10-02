<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <Top/>
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
  import Top from './components/Top'

  export default {
    name: 'App',
    components:{Bottom,List,Top}
  }
</script>

<style>
</style>
