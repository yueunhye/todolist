<template>
  <!-- :title="todo.title" -->
  <ul>
    <TodoItem
      v-for="todo in todos"
      :id="todo.id"
      :key="todo.id"
      :todo="todo" 

      @update-title="todo.title = $event" />
  </ul>
</template>


<script>
import TodoItem from '~/components/TodoItem.vue'

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
  methods: {
    async readTodos() {
      this.$store.dispatch('readTodos')
    }
  }
}
</script>

<style>
</style>
