import {time} from "./gather_time";
import axios from "axios"

const instance = axios.create({
    // 根地址
    baseURL:
        "https://www.fastmock.site/mock/405280892d3b9cd1106c403e57c51d1e/api",
    timeout: 15000, // 请求超时时间 请求将被中断
    // headers: {'X-Custom-Header': 'foobar'} //请求头
});

// 拦截器
// 在请求或响应被 then 或 catch 处理前拦截它们。

// 请求前拦截
instance.interceptors.request.use(
    (config) => {//config  拦截的请求数据
        // console.log(config,"url")
       return time(config);
        // 设置其url 给其加时间戳
        // let url = config.url.split('?');//以？为分割 化为数组
        // url.length > 1//大于一说名有？号
        //     ? (config.url = `${url[0]}?${time(url[1])}`)
        //     : (config.url = `${url[0]}${time(url[1])}`);
            // console.log(config,'789')
        // return config;
    },
     // 对请求错误做些什么
    (err) => { return Promise.reject(err); }
);

// 添加响应拦截器 --- 响应后（未正式返回数据时）
instance.interceptors.response.use(
    (res)=>{
        let {data} = res;
        // console.log(data,'hfhfhfh');
        // 对响应数据做点什么 如（统一处理错误信息）
        // if(Number(data.code) === 0){
        //     alert(data.errorMessage);
        // }
        // // console.log(typeof data.code)
        // if(data.code=== '001'){
        //     alert(data.errorMessage);
        // }
        if(data.code=== '1'){
            // alert(data.errorMessage);
        }
        // console.log(data , res, "datatatattat")
        return res;
    },
     // 网络问题导致的错误 如：接口路径写错，断网，接口被人拦截重定向了
    (err)=>{
        // console.log(err, '0000')
        // alert(err.response.data.desc);
        // 对响应错误做点什么
        return Promise.reject(
            (   err.response &&
                err.response.data &&
                err.response.data.errorMessage) ||
              "网络问题，请刷新重试"
          );
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, data) {
    return new Promise((resolve,reject)=>{
        instance.get(url,{
               params: data,
            })
            .then((response)=>{
                // console.log(response,'popo');
                resolve(response.data);
            })
            .catch((err)=>{
                console.log(err)
                // alert(err);
                reject(err)//  "网络问题，请刷新重试"
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 function post(url,data = {}){
     return new Promise((resolve,reject)=>{
        instance.post(url,data)
            .then((response)=>{
                // console.log(response,'yy')
                resolve(response.data);
            },
            (error)=>{
                reject(error);
            });
           
     });
 }

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 function put(url, data = {}){
     return new Promise((resolve,reject)=>{
         instance.put(url,data)
         .then((response)=>{
            //  console.log('ppuutt',response)
            resolve(response.data);
         })
         .catch((err)=>{
            reject(err);
         })
     })
 }

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function patch(url,data){
    return new Promise((resolve,reject)=>{
        instance.patch(url,data)
         .then((res)=>{
            resolve(res);
         },
         (err)=>{
             reject(err);
         })
        
    });
}


// instance
// .get('/data?id=10')
// .then(function (response) {
//     // 后端请求过来的数据
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// })

export { get ,post ,put, patch};
