<template>
  <li>
    <input
      
      v-model="todo.done"
      class="check"
      type="checkbox"
      @click="checkMode()" />
    
    <template v-if="!edit">
      <div class="write">
        <span>
          {{ todo.title }}
        <!-- 등록시간: {{ todo.createdAt }} -->
        </span>
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
        <div class="button--click">
          <button 
            @click="offEdit(),editeMode()">
            확인!
          </button>
          <button @click="offEdit()">
            취소
          </button>
        </div>
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
    }
  },

  data() {
    return {
      edit: false,

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
        order: this.todo.order
      }
      console.log('checkMode', typeof res, res.done)

      this.$store.dispatch('editeMode', {
        id: res.id,
        title: res.title,
        done: res.done,
        order: res.order
      })
    },

    async editeMode() {
      //title받아오기
      const res = {
        title: this.todo.title,
        id : this.todo.id,
        done: this.todo.done,
        order: this.todo.order
      }
      this.$store.dispatch('editeMode', {
        id: res.id,
        title: res.title,
        done: res.done,
        order: res.order
      })
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
  },

    //바뀐값
    inputTitle(event) {
      this.$emit('update-title', event.target.value)
  },

    deleteTo() {
      this.$emit('delete-todo', this.todo)
  },
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
  margin: 0 auto;
  .check {
    background-color: red;
  }
  .write {
    display: flex;

    input {
      // margin: auto;
      text-align: center;
      width: 400px;
      height: 30px;
      border-radius: 10px;
      font-size: 20px;
      font-weight: 500;
      margin-right: 150px;
      
    }
  }
  span {}
  .button--click {
    
    display: flex;
    height: 30px;

    cursor: pointer;
    button {
      font-weight: 900;
      font-size: 15px;
      border: transparent;
      background-color: #fff;
      cursor: pointer;
      padding-right: 10px;
    }
  }  
}
</style>
