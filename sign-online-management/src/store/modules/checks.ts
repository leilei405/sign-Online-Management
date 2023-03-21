import http from '@/utils/http';
import type { MutationTree, ActionTree, GetterTree } from 'vuex';
import type { State } from '../index';


interface Infos {
    [index: string]: unknown;
}
export interface ChecksState {
    applyList: Infos [],
    checkList: Infos[],
}

const state: ChecksState = {
    applyList: [],
    checkList: [],
}

const mutations: MutationTree<ChecksState> ={
    updateApplyList: (state, payload) => {
        state.applyList = payload;
    },
    // 审批人
    updateCheckList: (state, payload) => {
        state.checkList = payload;
    }
};
const actions: ActionTree<ChecksState, State> ={
    // 获取审批列表
    getApplyList: (context, payload) => {
        return http.get('checks/apply', payload);
    },
    // 提交表单
    postApply: (context, payload) => {
        return http.post('checks/apply', payload);
    },
    putCheck: (context, payload) => {
        return http.put('checks/apply', payload);
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
  