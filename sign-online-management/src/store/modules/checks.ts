import http from '@/utils/http';
import type { MutationTree, ActionTree, GetterTree } from 'vuex';
import type { State } from '../index';

export interface ChecksState {
    [index: string]: unknown;
}

const state: ChecksState = {
    applyList: []
}

const mutations: MutationTree<ChecksState> ={
    updateApplyList: (state, payload) => {
        state.applyList = payload;
    }
};
const actions: ActionTree<ChecksState, State> ={
    getApplyList: (context, payload) => {
        return http.get('checks/apply', payload);
    }
};
const getters: GetterTree<ChecksState, State> ={

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
  