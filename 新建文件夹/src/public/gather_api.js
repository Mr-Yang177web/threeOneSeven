import {post, get} from './port.js';

// 接口
// const patch  = (data) => patch('/pat',data);

// const getData = (data)=> get('/list',data);

// const putLsit = (data)=> put('/list?id=10',data);

// 获取手机验证码
const postApi = (data) => post("/code", data);

// 判断登陆信息是否正确
const postApiPhone = (data) => post("/iphon", data);

// 获取手机验证码
const getSchoolListApi = (data) => get("/schoolList", data);

// 不同用户 获取不同权限
const postSchoolRouter = (data) => post("/schoolRouter", data);

// 获取学校管理权限的数据列表
const schoolLsitInfo = (data) => get("schoolLsit", data);


// 获取老师的信息列表数据
const teacherList = (data) => get("/teacherList", data);

export {postApi,postApiPhone,getSchoolListApi,postSchoolRouter,schoolLsitInfo,teacherList}
