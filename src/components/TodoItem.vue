<template>
  <li>
    <input
      v-model="todo.done"
      class="check"
      type="checkbox"
      @click="checkMode()" />
    <div class="handle">
      ::
    </div>
    <template v-if="!edit">
      <div class="write">
        <div
          class="todolist"
          :style="todo.done? 'color: gray':''">
          {{ todo.title }}
        </div>
        <div class="time">
          등록일{{ todo.createdAt.slice(0,10) }}
          {{ todo.createdAt.slice(11,16) }}
          수정일{{ todo.updatedAt.slice(11,16) }}
        </div>
      </div>
      <div class="button--click">  
        <button
          @click.stop="onEdit()">
          수정!
        </button>
        <button
          @click="deleteTodo(), deleteTo()">
          삭제!
        </button>
      </div>
    </template>
    <template v-else>
      <!-- stoppropagation -->
      <div class="write">
        <div @click.stop>
          <input 
            ref="titleInput"
            :value="todo.title" 
            @input="inputTitle"
            @keydown.enter="offEdit(),editeMode()"
            @keydown.esc="offEdit()" />
        </div>
      </div>
      <div class="button--click">
        <button 
          @click="offEdit(),editeMode()">
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
    todo: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      edit: false,
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },

  methods: {
  async deleteTodo() {
    this.$store.dispatch('deleteTodo', this.id)
  },
  async checkMode() {
    const res = {
      title: this.todo.title,
      id : this.todo.id,
      done: !this.todo.done,
      order: this.todo.order,
    }
    this.$store.dispatch('editeMode', {
      id: res.id,
      title: res.title,
      done: res.done,
      order: res.order,
    })
  },
  async editeMode() {
    const res = {
      title: this.todo.title,
      id : this.todo.id,
      done: this.todo.done,
      order: this.todo.order,
    }
    this.$store.dispatch('editeMode', {
      id: res.id,
      title: res.title,
      done: res.done,
      order: res.order,

    })
  },
  onEdit() {
    this.edit = true
    this.title = this.todo.title
    window.addEventListener('click',this.offEdit)
    this.$nextTick(()=>{
      this.$refs.titleInput.focus()
    })
  },
  offEdit() {
      this.edit = false
  },
  inputTitle(event) {
      this.$emit('update-title', event.target.value)
  },

  deleteTo() {
      this.$emit('delete-todo', this.todo)
  },
  async clearAll() {
    this.$store.disptch('clearAll', this.id)
  }
}
}
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  width: 70%;
  height: 30px;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    background-color: rgb(225, 215, 215);
  }
  .write {
    display: flex;
    border-bottom: 1px dotted black;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    .todolist {
      width: 60%;
      text-align: center;      
    }
    .time {
      width: 30%;
      text-align: right;
      font-size: 10px;
    }
    input {
      text-align: center;
      width: 400px;
      height: 30px;
      border-radius: 10px;
      font-size: 20px;
      font-weight: 500;
      margin-right: 150px;
    }
  }
  .button--click { 
    display: flex;
    cursor: pointer;
    button {
      color: #fff;
      font-weight: 500;
      width:47px;
      height: 25px;
      font-size: 13px;
      border: transparent;
      border-radius: 10px;
      background: #4e25d4;
      cursor: pointer;
      margin-right: 10px;
    }
  }  
}
</style>
