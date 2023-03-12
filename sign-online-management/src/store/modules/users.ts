import http from '@/utils/http';
import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '../index'

export interface UsersState {
}

const state: UsersState = {
};

const mutations: MutationTree<UsersState> = {
};
const actions: ActionTree<UsersState, State> = {
  login(){
    return http.post('users/login', {
        "email": "huangrong@imooc.com",
        "pass": "huangrong"
    })
  }
};
const getters: GetterTree<UsersState, State> = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}