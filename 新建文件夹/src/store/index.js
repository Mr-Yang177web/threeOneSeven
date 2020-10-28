import Vue from "vue";
import Vuex from "vuex";
import teacherInfo from "./modules/teacherInfo.js";

Vue.use(Vuex);
export default new Vuex.Store({
    state:{},
    modules:{
        teacherInfo
    }
})