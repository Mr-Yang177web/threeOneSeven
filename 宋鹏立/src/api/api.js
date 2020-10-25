import { post,get } from "@/utils/request.js";

// 获取列表接口
const postcode = (data) => post("/code", data);
const postphone = (data) => post("/logincode", data);
const getschoolList = (data) => get("/schoolList", data);
const postschoolrouter = (data) => post("/shcoolRouter", data);
const getTeacherapply = (data) => get("/teacherapply", data);

export { postcode,postphone ,getschoolList,postschoolrouter,getTeacherapply};
