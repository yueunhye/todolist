<template>
<button :value="id" @click="deleteTodo" >삭제!</button>
</template>

<script>
export default {
  props:{
  id: {
      type: String,
      default: ''
      }
    },
  methods: {
      async deleteTodo() {
        console.log(this.id)
        this.$store.dispatch('deleteTodo', this.id)
      }
    }
}
</script>