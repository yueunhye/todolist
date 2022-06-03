<template>
  <!-- this생략가능 메소드를 template쪽으로 $ -->
  <section>
    <input 
      placeholder="'할일을 입력해주세요' '할일을 입력해주세요' '할일을 입력해주세요' '할일을 입력해주세요'"
      :value="title" 
      @input="title = $event.target.value"
      @keyup.enter="createTodo()" />    
    <button
      
      @click="createTodo()">
      CREATE
    </button>
    <!-- <h1>{{ title }}</h1> -->
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
        // order: this.order
        })
      console.log('order',this.order, typeof this.order)
      this.title = ''
    },
  

  }
}
</script>


<style lang="scss" scoped>
  section {
    // background-color: red;
    text-align: center;
    width: 70%;
    margin: auto;
    input {
      width: 500px;
      height: 50px;
    }
    button {
      border-radius: 15px;
      margin-left: 10px;
      height: 50px;
      width: 100px;
      cursor: pointer;
    }
  }
</style>
