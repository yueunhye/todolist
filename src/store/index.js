import {
  createStore
} from 'vuex'
import axios from 'axios'



const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const headers = {
  'Content-Type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'KDT2_YuEunHye'
}

export default createStore({
  // state 데이터니까 함수로, state제외하고는 모두 복수형
  state() {
    return {
      todos: [],

    }
  },
  // state 수정권한이 있음
  mutations: {
    setTodos(state, payload) {
      state.todos = payload
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    }

  },
  actions: {
    //GET
    async readTodos({
      commit
    }) {
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })

      commit('setTodos', res.data)
    },

    //POST
    async createTodo({
      commit
    }, payload) {
      const {
        title,
        order
      } = payload
      const res = await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          title,
          order
        }
      })
      commit('addTodo', res.data)
    },

    //DELETE
    async deleteTodo(context, id) {
      await axios({
        url: `${END_POINT}/${id}`,
        method: 'DELETE',
        headers,
      })
    },

    //PUT
    async editeMode(context, payload) {
      const {
        id,
        title,
        order,
        done,
      } = payload
      await axios({
        url: `${END_POINT}/${id}`,
        method: 'PUT',
        headers,
        data: {
          title,
          order,
          done,
        }
      })
    }
  }
})