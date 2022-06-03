<template>
  <!-- :title="todo.title" -->
  <ul>
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


export default {
  components: {
    TodoItem,
    
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  created() {
    this.readTodos()
  },
  methods: {
    async readTodos() {
      this.$store.dispatch('readTodos')

    },
    deleteTodo(todoToDelete) {
      const index = this.todos.findIndex(todo => todo.id === todoToDelete.id)
      this.todos.splice(index, 1)
    },

  }
}
</script>

<style lang="scss" scoped>
ul {
  margin-top: 50px;
  // background-color: gray;
  width: 100%;

}
</style>
