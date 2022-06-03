npm i axios

https://zesty-taiyaki-63c4dd.netlify.app/





<template>
  <li>
    <template v-if="!edit">
      <span>
        {{ todo.title }}
      </span>
      <button
        @click.stop="onEdit()">
        수정!
      </button>
      <button
        @click="deleteTodo(), deleteTo()">
        삭제!
      </button>
    </template>
    <template v-else>
      <div @click.stop>
        <input
          ref="titleInput"
          :value="todo.title" 
          @input="updateTitle()" 
          @keydown.enter="offEdit(),editeMode(),updateTitle()"
          @keydown.esc="offEdit()" />
        <button
          @click="offEdit(),editeMode(),updateTitle()">
          확인!
        </button>
        <button @click="offEdit()">
          취소
        </button>
      </div>
    </template>
  </li>
</template>

<script>



export default {
  props: {
    todos: {
      type: Object
    },
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
      edit: false,
      title: ''
    }
  },
  methods: {
    async deleteTodo() {
      this.$store.dispatch('deleteTodo', this.id)
    },

    onEdit() {
      console.log('id', this.todo)
      this.edit = true
      this.title = this.todo.title
      window.addEventListener('click',this.offEdit)
      this.$nextTick(()=>{
        this.$refs.titleInput.focus()
      })
      
    },
    offEdit() {
      this.edit = false
      window.removeEventListener('click', this.offEdit)
    },
    //바뀐값
    updateTitle(event) {
      this.$emit('update-title', event.target.value)
    },
    deleteTo() {
      this.$emit('delete-todo', this.todo)
    },


    async editeMode() {
      //title받아오기
      const res = {
        title: this.todo.title,
        id : this.todo.id,
        done: this.todo.done,
        order: this.todo.order
      }
      console.log('edite', typeof res, res)

      this.$store.dispatch('editeMode', {
        id: res.id,
        title: res.title,
        done: res.done,
        order: res.order
      })

    }
    ,
  }
}
</script>
