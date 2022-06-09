<template>
  <ul ref="todoList">
    <TodoItem
      v-for="todo in todos"
      :id="todo.id"
      :key="todo.id"
      :todo="todo" 
      @update-title="todo.title = $event" 
      @delete-todo="deleteTodo" />
  </ul>
</template>


<script>
import TodoItem from '~/components/TodoItem.vue'
import Sortable from 'https://cdn.skypack.dev/sortablejs'

export default {
  components: {
    TodoItem
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  created() {
    this.readTodos()
  },
  mounted() {
    this.initSortable()
  },
  methods: {
    async readTodos() {
      this.$store.dispatch('readTodos')

    },
    deleteTodo(todoToDelete) {
      const index = this.todos.findIndex(todo => todo.id === todoToDelete.id)
      //배열삭제
      this.todos.splice(index, 1)
    },
    initSortable() {
      new Sortable(this.$refs.todoList, {
        handle: 'li .handle', 
        delay: 50, 
        animation: 0,
        forceFallback: true,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  margin-top: 50px;
  width: 100%;
}
</style>
