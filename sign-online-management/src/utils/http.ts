import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/store';
import type{ StateAll  } from '@/store';
import { ElMessage } from 'element-plus';
const instance = axios.create({
    baseURL: 'http://api.h5ke.top/',
    timeout: 3000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.headers) {  //  config.headers  存在设置token
        config.headers .Authorization = (store.state as StateAll).users.token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.errmsg === 'token error') {
        ElMessage.error('token error');
        store.commit('users/REMOVE_TOKEN');
        // 这里不推荐编程式路由跳转  因为跳转之后不会刷新
        // 所以才采用原生的location方式
        setTimeout(()=> {
            window.location.replace('/login');
        }, 500)
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

interface Data {
    [index: string]: unknown;
}

// 定义类型请求接口
interface Http {
    get: (url: string, data?: Data, config?: AxiosRequestConfig) =>  Promise<AxiosResponse>
    post: (url: string, data?: Data, config?: AxiosRequestConfig) =>  Promise<AxiosResponse>
    put: (url: string, data?: Data, config?: AxiosRequestConfig) =>  Promise<AxiosResponse>
    patch: (url: string, data?: Data, config?: AxiosRequestConfig) =>  Promise<AxiosResponse>
    delete: (url: string, data?: Data, config?: AxiosRequestConfig) =>  Promise<AxiosResponse>
}

const http: Http = {
    get(url, data, config){
        return instance.get(url, {
            params: data,
          ...config
        }).then(res => res.data)
    },
    post(url, data, config){
        return instance.post(url, data, config).then(res => res.data)
    },
    put(url, data, config){
        return instance.put(url, data, config).then(res => res.data)
    },
    patch(url, data, config){
        return instance.patch(url, data, config).then(res => res.data)
    },
    delete(url, data, config){
        return instance.delete(url, {
            params: data,
          ...config
        }).then(res => res.data)
    },
}

export default http