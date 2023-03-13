import { createStore, useStore as baseUseStore } from 'vuex';
import type { Store } from 'vuex';
import users from './modules/users';
import signs from './modules/signs';
import news from './modules/news';
import checks from './modules/checks';
import type { UsersState } from './modules/users';
import type { SignsState } from './modules/signs';
import type { ChecksState } from './modules/checks';
import type { NewsState } from './modules/news';
import type { InjectionKey } from 'vue';
import VuexPersistence from 'vuex-persist';  // 基于vuex的持久化插件
export interface State {

}

export interface StateAll extends State {
  users: UsersState,
  signs: SignsState,
  checks: ChecksState,
  news: NewsState
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  reducer: (state) => ({ users: { token:(state as StateAll).users.token } }),
})

export const key: InjectionKey<Store<StateAll>> = Symbol()

// 二次封装的store
export const useStore = (): Store<StateAll> => {
  return baseUseStore(key)
};

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    signs,
    checks,
    news,
  },
  plugins: [vuexLocal.plugin]
})
