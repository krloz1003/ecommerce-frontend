import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoping:[],
    token: localStorage.getItem('access_token') || null
  },
  getters:{
    shopingCount: state => state.shoping.length,
    shopingAmount: state => state.shoping.reduce((sum, prev) => sum + prev.amount, 0),
    shopingTotal: state => state.shoping.reduce((sum, prev) => sum + prev.total, 0)
  },
  mutations: {
    INSERT_SHOPING(state, data) {
      state.shoping.push(data)
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
    }
  },
  actions: {
    async insertShoping({state, commit}, payload){      
      let row = (state.shoping.find(row => row.id == payload.id))
      payload['amount'] = 1;
      payload['total']  = payload['amount'] * payload['price'];
      if(!row) commit('INSERT_SHOPING', payload)      
    },
    async increment ({commit}, payload){
      commit('SET_SHOPING', []);
      let index = payload.rows.findIndex(i => i.id === payload.id);
      payload.rows[index]['amount'] = (payload.rows[index]['amount'] >= 100)? payload.rows[index]['amount'] : payload.rows[index]['amount'] + 1
      payload.rows[index]['total']  = payload.rows[index]['amount'] * payload.rows[index]['price']
      commit('SET_SHOPING', payload.rows);
    },
    async decrement ({ commit }, payload){
      commit('SET_SHOPING', []);
      let index = payload.rows.findIndex(i => i.id === payload.id);      
      payload.rows[index]['amount'] = (payload.rows[index]['amount'] <= 1)? 1 : payload.rows[index]['amount'] - 1
      payload.rows[index]['total']  = payload.rows[index]['amount'] * payload.rows[index]['price']
      commit('SET_SHOPING', payload.rows);
    },
    async getToken({commit}, payload){
      const token = payload.data.access_token
      localStorage.setItem('access_token', token)
      commit('HANDLE_TOKEN', token);
    }
  },
  modules: {
  }
})
