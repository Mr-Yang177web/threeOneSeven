import Vue from "vue";
import Vuex from "vuex";
//引入拆分的模块
import teacherInfo from "./modules/teacherInfo";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {},
    modules: {
        teacherInfo,
    },
});