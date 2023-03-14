import http from '@/utils/http';
import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '../index'

interface Infos {
  [index: string]: unknown
}

export interface UsersState {
  token: string;
  infos: Infos;
}

const state: UsersState = {
  token: '',
  infos: {},
};

const mutations: MutationTree<UsersState> = {
  SET_TOKEN(state, token: string) {
    state.token = token;
  },
  SET_INFOS(state, infos: Infos) {
    state.infos = infos;
  },
  REMOVE_TOKEN(state) {
    state.token = '';
  },
};
const actions: ActionTree<UsersState, State> = {
  login(context, payload){
    return http.post('users/login', payload)
  },
  infos() {
    return http.get('users/infos')
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