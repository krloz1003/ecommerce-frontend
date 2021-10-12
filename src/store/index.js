import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoping: JSON.parse(localStorage.getItem('products')) || [],
    token: localStorage.getItem('access_token') || null,
    role: localStorage.getItem('role') || null
  },
  getters:{
    shopingCount: state => state.shoping.length,
    shopingAmount: state => state.shoping.reduce((sum, prev) => sum + prev.amount, 0),
    shopingTotal: state => state.shoping.reduce((sum, prev) => sum + prev.total, 0)
  },
  mutations: {
    INSERT_SHOPING(state, data) {
      state.shoping.push(data)
      localStorage.setItem('products', JSON.stringify(state.shoping))
    },
    SET_SHOPING(state, data){
      state.shoping = data;
    },
    DECREMENT_AMOUNT(state, data){
      let row = (state.shoping.find(row => row.id == data.id))
      console.log(row)
    },
    HANDLE_TOKEN(state, data){
      state.token = data;
    },
    HANDLE_ROLE(state, data){
      state.role = data;
    }    

  },
  actions: {
    async insertShoping({state, commit}, payload){      
      let row = (state.shoping.find(row => row.id == payload.id))
      payload['amount'] = 1;
      payload['total']  = payload['amount'] * payload['price'];
      if(!row) commit('INSERT_SHOPING', payload)      
    },
    async removeShoping({state, commit}, payload){
      let rows = state.shoping.filter((row) => row.id != payload.id)
      commit('SET_SHOPING', rows)      
    },  
    async increment ({commit}, payload){
      commit('SET_SHOPING', []);
      let index = payload.rows.findIndex(i => i.id === payload.id);
      payload.rows[index]['amount'] = (payload.rows[index]['amount'] >= 100)? payload.rows[index]['amount'] : payload.rows[index]['amount'] + 1
      payload.rows[index]['total']  = payload.rows[index]['amount'] * payload.rows[index]['price']
      
      localStorage.setItem('products', JSON.stringify(payload.rows))
      commit('SET_SHOPING', payload.rows);
    },
    async decrement ({ commit }, payload){
      commit('SET_SHOPING', []);
      let index = payload.rows.findIndex(i => i.id === payload.id);      
      payload.rows[index]['amount'] = (payload.rows[index]['amount'] <= 1)? 1 : payload.rows[index]['amount'] - 1
      payload.rows[index]['total']  = payload.rows[index]['amount'] * payload.rows[index]['price']
      
      localStorage.setItem('products', JSON.stringify(payload.rows))
      commit('SET_SHOPING', payload.rows);
    },
    async getToken({commit}, payload){
      const token = payload.data.access_token
      const role = payload.data.role
      localStorage.setItem('access_token', token)
      localStorage.setItem('role', role)
      commit('HANDLE_TOKEN', token);
      commit('HANDLE_ROLE', role);
    },
    async destroyToken({commit}){
      localStorage.setItem('access_token', '')
      localStorage.setItem('role', '')
      commit('HANDLE_TOKEN', '');
      commit('HANDLE_ROLE', '');
    }    

  },
  modules: {
  }
})
