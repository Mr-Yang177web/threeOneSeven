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
    
   <div class="main">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="分析名称:">
            <el-input v-model="sizeForm.name" size="mini"></el-input>
          </el-form-item>
         <el-form-item label="学段年级:">
            <el-select v-model="sizeForm.region" placeholder="请选择入学段年级">
              <el-option label="区域一" ></el-option>
              <el-option label="区域二" ></el-option>
            </el-select>
          </el-form-item>
         <el-form-item label="入学年份:">
            <el-select v-model="sizeForm.regions" placeholder="请选择入学年份">
              <el-option label="区域一" ></el-option>
              <el-option label="区域二" ></el-option>
            </el-select>
          </el-form-item>
          <!-- <span class="text">k:</span> -->
           <el-form-item label="考试科目:">
            <el-select v-model="value1" multiple placeholder="请选择考试科目">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="活动时间:">
              <el-date-picker
                  size="small"
                  class="picker"
                  v-model="value2"
                  type="date"
                  placeholder="请选择">
              </el-date-picker>
           </el-form-item>
         <el-form-item label="分析类型:" size="mini">
             <!-- <el-radio-group v-model="labelPosition" size="small">
              <el-radio-button type="primary" >左对齐</el-radio-button>
              <el-radio-button type="primary">右对齐</el-radio-button>
              <el-radio-button type="primary">顶部对齐</el-radio-button>
            </el-radio-group> -->
            <el-button type="primary">总分基本分析</el-button>
            <el-button type="primary">学业质量分析</el-button>
            <el-button type="primary">成绩高级分析</el-button>
          </el-form-item>
        
        </el-form>
   </div>
   <div>
     <footer><el-button class="btn" style="margin-top: 12px" @click="next">下一步</el-button></footer>
   </div>
  </div>
</template>

<script>
export default {
  name: "Newly",
  data() {
    return {
      active: 0,
      sizeForm: {
          name: '',
          region: '',
          regions: '',
      },
      labelPosition: 'right',
      value1:[],
      value2: '',
      options: [{
          value: '选项1',
          label: '语文'
        }, {
          value: '选项2',
          label: '数学'
        }, {
          value: '选项3',
          label: '道法'
        }, {
          value: '选项4',
          label: '体育'
        }, {
          value: '选项5',
          label: '思美'
        }, {
          value: '选项6',
          label: '英语'
        },{
          value: '选项7',
          label: '音乐'
        }],

    };
  },
  computed: {
 
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
.btn{
  float: right;
}
.head {
  height: 120%;
  background: #fff;
}
.main {
  margin-top: 20px;
  background: #fff;
  padding: 40px 96px 40px 330px;
  box-sizing: border-box;
}
.el-input{
  width: 60%;
}
.el-select {
    width: 100%;
}
.el-date-editor.el-input{
    width: 368px !important;
}
</style>