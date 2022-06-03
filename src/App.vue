<template>
  <header>
    <h1>ToDoList</h1>
    <CreateTodo />
    <TodoList />
  </header>
</template>

<script>
import CreateTodo from '~/components/CreateTodo.vue'
import TodoList from '~/components/TodoList.vue'


export default {
  components: {
    CreateTodo,
    TodoList,
  }
}
</script>

<style lang="scss" scoped>
  header {
    width: 1200px;
    position:relative;
    margin:0 auto;
    // background-color: lightblue;
    height: 700px;
    
    h1 {
      
      text-align: center;
      color: rgb(69, 42, 174);
      -webkit-text-stroke: 1px #2EE59D;
    }
  }
</style>
