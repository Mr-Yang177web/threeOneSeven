<template>
  <div>
    <div class="header">
      成绩分析名称:<el-input
      
        placeholder="请输入"
        clearable
        size="mini"
       class="input_el"
      >
      </el-input>
      分析类型：<el-select class="el_select" v-model="value" placeholder="请选择" />
      状态：<el-select class="el_select" v-model="value" placeholder="请选择" /> 
      <div class="block">
        <span class="demonstration">考试时间: </span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </div>
      <el-button class="btn" type="success" size="small"> 查询 </el-button>
      <el-button class="btn" icon="el-icon-plus" type="success" size="small">
        新增分析
      </el-button>
    </div>
    <!-- 首页 -->
    <div class="content">
      <el-table :data="tableData">
        <el-table-column prop="phone" label="成绩分析名称"> </el-table-column>
        <el-table-column prop="stage" label="学段"></el-table-column>
        <el-table-column prop="subject" label="年级"></el-table-column>
        <el-table-column prop="date" label="入学年份"> </el-table-column>
        <el-table-column prop="date" label="考试时间"> </el-table-column>
        <el-table-column prop="date" label="分析类型"> </el-table-column>
        <el-table-column prop="date" label="创建人"> </el-table-column>
        <el-table-column prop="date" label="创建时间"> </el-table-column>
        <el-table-column prop="date" label="状态"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Singleanalysis",
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  line-height: 80px;
  .input_el{
    width: 160px;
  }
  .el_select{
    width: 100px;
  }
  .btn{
    width: 100px;
    height: 30px;
    margin-top:25px;
  }
  .content{
    .el-main{
      line-height: 0px;
    }
  }
}
</style>