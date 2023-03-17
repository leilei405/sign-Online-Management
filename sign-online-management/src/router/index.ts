import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import _ from 'lodash'
import store from '@/store';
import type { StateAll } from '@/store';
import { ElMessage } from 'element-plus';
(store.state as StateAll).users.token;  // 使用as 断言成stateAll

// 使用懒加载方式引入
const Home = () => import('@/views/Home/Home.vue');
const Check = () => import('@/views/Check/Check.vue');
const Sign = () => import('@/views/Sign/Sign.vue');
const Login = () => import('@/views/Login/Login.vue');
const Exception = () => import('@/views/Exception/Exception.vue');
const Apply = () => import('@/views/Apply/Apply.vue');

declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean;
    title?: string;
    icon?: string;
    auth?: boolean;
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/sign', // 重定向到签到页
    meta: {
      menu: true,
      title: '首页-考勤管理',
      icon: 'document-copy',
      auth: true
    },
    children: [
      {
        path: 'check',
        name: 'check',
        component: Check,
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true
        },
      },
      {
        path: 'sign',
        name:'sign',
        component: Sign,
        meta: {
          menu: true,
          title: '签到-在线打卡',
          icon: 'calendar',
          auth: true
        },
        // 路由独享守卫
        beforeEnter(to, from, next) {
          const userInfos = (store.state as StateAll).users.infos;
          const signsInfos = (store.state as StateAll).signs.infos;
          if (_.isEmpty(signsInfos)) {
            store.dispatch('signs/getTime', { userid: userInfos._id }).then((res) => {
              if (+res.errcode === 0) {
                store.commit('signs/updateInfos', res.infos);
                next();
              } else {
                ElMessage.error(res.errmsg || '用户打卡信息获取失败')
              }
            })
          }else {
            next();
          }
        }
      },
      {
        path: 'exception',
        name: 'exception',
        component: Exception,
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true
        },
      },
      {
        path: 'apply',
        name: 'apply',
        component: Apply,
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'document-add',
          auth: true
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局守卫
router.beforeEach((to, from, next) => {
  console.log(2222);
  // 拿到token
  const token = (store.state as StateAll).users.token;
  const infos = (store.state as StateAll).users.infos;
  if (to.meta.auth && _.isEmpty(infos)) {
    if (token) {
      store.dispatch('users/infos').then((res) => {
        if (+res.errcode === 0) {
          store.commit('users/SET_INFOS', res.infos);
          next();
        }
      });
    } else {
      next('/login');
    }
  } else {
    if (token && to.path === '/login') {
      next('/');
    } else {
      next();
    }
  }
})

export default router
