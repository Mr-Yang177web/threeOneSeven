import {get, post} from '../utils/request.js'


//获取验证码接口
const getList = (data) =>post('/userPhone',data);

//登录的接口
const getlogin = (data) =>post('/loginPhone',data);

// 获取学校列表
const getSchoolList = (data) => get("/schoolList", data);

// 获取学校权限
const postSchoolRouter = (data) => post("/schoolRouter", data);

// 获取教师
const getTecherList = (data) => get("/shooteacherlList", data);


export {
    getList,
    getlogin,
    getSchoolList,
    postSchoolRouter,
    getTecherList
}