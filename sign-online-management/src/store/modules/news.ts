import http from '@/utils/http';
import type { MutationTree, ActionTree, GetterTree } from 'vuex';
import type { State } from '../index';

interface Info {
    [index: string]: unknown;
}

export interface NewsState {
    info: Info
}

const state: NewsState = {
    info: {}
}

const mutations: MutationTree<NewsState> ={
    updateInfo: (state, payload) => {
        state.info = payload
    }
};
const actions: ActionTree<NewsState, State> ={
    getRemind: (state, payload) => {
        return http.get('news/remind', payload)
    }
};
const getters: GetterTree<NewsState, State> ={

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
  