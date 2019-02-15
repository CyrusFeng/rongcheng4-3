import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  chosenSpan: [],
}

const mutations = {
  getChosenSpan(state, arr){
    state.chosenSpan = arr;
  },
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;
