import axios from 'axios';
// 全局配置默认值
// axios.defaults.withCredentials = true;
// 实例配置默认值
// axios默认以JSON格式发送data
const baseConfig = {
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:1111/' : '', // 使用nodejs+mockjs
    baseURL: process.env.NODE_ENV === 'development' ? '' : '', // 前端直接使用mockjs
    timeout: 5000,
    withCredentials: true
};
// 创建实例
// 1.默认实例
export const ajaxJson = axios.create(baseConfig);
// 2.表单请求体实例
export const ajaxForm = axios.create(
    Object.assign({}, baseConfig, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
);
// 取消请求
const cancelToken = axios.CancelToken;
const cancelObj = {};
export const cancelResquest = (httpId) => {
    if (httpId) {
        cancelObj[httpId].func()
    }
}
// 请求拦截器
const interceptorsRequest = config => {
    if (config.httpId) {
        config.cancelToken = new cancelToken(cancel => {
            cancelObj[config.httpId] = {
                func: cancel
            };
        });
    }
      if (!config.params) config.params = {}; // get请求的参数
      if (typeof config.data === 'object' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        // form表单数据格式化
        config.data = Object.keys(config.data)
          .map(attr => `${attr}=${config.data[attr]}`)
          .join('&');
      }
      return config;
}

// 添加请求拦截器
ajaxJson.interceptors.request.use(interceptorsRequest, (error)  =>{
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
ajaxJson.interceptors.response.use(interceptorsRequest, (error) =>{
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 添加请求拦截器
ajaxForm.interceptors.request.use(interceptorsRequest, (error)  =>{
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
ajaxForm.interceptors.response.use(interceptorsRequest, (error) =>{
    // 对响应错误做点什么
    return Promise.reject(error);
});


