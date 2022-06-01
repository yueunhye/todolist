<template>
  <!-- this생략가능 메소드를 template쪽으로 $ -->
  <input 
    placeholder="입력"
    :value="title" 
    @input="title = $event.target.value"
    @keydown.enter="createTodo" />    
  <button @click="createTodo">
    CREATE
  </button>
  <h1>{{ title }}</h1>
</template>


<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  watch: {
    title(newValue) {
      console.log(newValue)
    }
  },
  methods: {
    async createTodo() {

      if (!this.title.trim()) return
      this.$store.dispatch('createTodo', this.title)
      
    }
  }
}
</script>
