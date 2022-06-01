<template>
  <li>
    <span v-if="!edit">
      {{ todo.title }}
    </span>
    <input
      v-else
      :value="todo.title" 
      @input="inputTitle" />
    <button
      v-if="!edit"
      @click="onEdit()">
      수정!
    </button>
    <button
      v-else
      @click="offEdit(),editeMode()">
      확인!
    </button>
    <button
      @click="deleteTodo">
      삭제!
    </button>
  </li>
</template>

<script>



export default {
  props: {
    todo: {
      type: Object,
      required: true
    },

    id: {
      type: String,
      default: ''
    }



  },
  data() {
    return {
      edit: false
    }
  },
  
  methods: {
    async deleteTodo() {
      this.$store.dispatch('deleteTodo', this.id)
    },
    
    onEdit() {
      console.log('id', this.todo)
      this.edit = true
    },
    offEdit() {
      this.edit = false
    },
    //바뀐값
    inputTitle(event) {
      this.$emit('update-title', event.target.value)
    },
    async editeMode() {
      //title받아오기
      const ref = {
        title: this.todo.title,
        id : this.todo.id,
        done: this.todo.done,
        order: this.todo.order
      }
      console.log(JSON.stringify(ref))
      console.log('edite', typeof ref, ref)
      // console.log('edite', editeMode())
      this.$store.dispatch('editeMode', this.id, this.title, this.done, this.order)

    }
    ,
  }
}
</script>
