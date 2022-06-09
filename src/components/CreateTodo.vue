<template>
  <section>
    <input 
      placeholder=" 할일을 적어주세요 "
      :value="title" 
      @input="title = $event.target.value"
      @keyup.enter="createTodo()" />    
    <button @click="createTodo()">
      CREATE
    </button>
  </section>
</template>


<script>
export default {
  data() {
    return {
      title: '',
      order: []
    }
  },

  methods: {

    async createTodo() {
      if (!this.title.trim()) return
      
      this.$store.dispatch('createTodo', {
        title: this.title,
        order: ++this.order
        })
      this.clearInput()
    },
    clearInput() {
      this.title = ''
    }

  }
}
</script>


<style lang="scss" scoped>
  section {

    text-align: center;
    width: 70%;
    margin: auto;
    input {
      width: 500px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      outline: none;
      border-radius: 5px;
      
    }
    button {
      color: #fff;
      border-radius: 12px;
      margin-left: 10px;
      height: 50px;
      width: 100px;
      cursor: pointer;
      background: #370dc2;
    }
  }
</style>
