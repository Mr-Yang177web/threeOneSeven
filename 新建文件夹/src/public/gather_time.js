// const time = (url = "")=>{//默认为空
//     let time = new Date().getTime();//时间搓
//     //如果 传过来的参数 url 为空说明 没有？ 及给它添加个时间戳 ?时间搓
//     // url为空 则为假 走后面 
//     return url ? `${url}&_t=${time}` : `${url}?_t=${time}`;
// };

const time = (config)=>{
    let time = new Date().getTime();
    if(config.url.indexOf('?') === -1){
        config.url = `${config.url}?t_=${time}`
    }else{
        config.url = `${config.url}&t_=${time}`
    }
    return config;
}
export{time};