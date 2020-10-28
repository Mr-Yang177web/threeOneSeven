<template>
  <div class="form">
    <div class="head">
      <el-steps :active="active" align-center="true" finish-status="success">
        <el-step title="分析类型确定"></el-step>
        <el-step title="分析成绩导入"></el-step>
        <el-step title="报表类型选择"></el-step>
        <el-step title="报表参数设置"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newly",
  data() {
    return {
      active: 0
      //   form: {
      //     serial: "",
      //     phase: "",
      //     time: "",
      //     region: "",
      //     delivery: false,
      //     type: [],
      //     resource: "",
      //     desc: "",
      //   },
      //   value1: '',
      //   visible: false,
      //   rules: {
      //     name:[{ required: true, message: '请输入活动名称'}],
      //     date0: [{ required: true, message: "请选择年份" }],
      //     date1: [{ required: true, message: "请选择日期" }],
      //     date2: [{ required: true, message: "请选择时间" }],
      //     date3: [{ required: true, message: "请选择科目" }],
      //     date4: [{ required: true, message: "请选择年级" }],
      //   },
    };
  },
  computed: {
    // ...mapState("newlys", {
    //   stage: "stage",
    //   subject: "subject",
    //   sex: "sex",
    //   sexs: "sexs",
    // }),
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
    // froms(e) {
    //   this.form = { ...e };
    //   console.log(this.form);
    // },
  }
};
</script>

<style>
.head {
  height: 120%;
  background: #fff;
}
</style>