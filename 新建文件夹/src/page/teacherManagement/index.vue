<template>
  <div id="teacher" v-loading="loading">
    <div>
      <span class="text">手机号码:</span>
      <el-input size="small" v-model="input" v-on:input="inputInfo"  placeholder="请输入手机号"></el-input>
      <span class="text">姓名:</span>
      <el-input size="small" v-model="input2" placeholder="请输入姓名"></el-input>
        <span class="btn">
          <el-button size="small" @click="searchs">搜索</el-button>
          <el-button size="small" @click="reset">重置</el-button>
      </span>
    </div>
    <div class="center">
      <el-table :data="tableData" style="width: 100%" size="small"> 
        <el-table-column label="教师姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.cname }}</p>
              <div slot="reference" class="name-wrapper">
                <span style="margin-left: -10px">{{ scope.row.cname }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="性别" prop="sex" :formatter="formatDate" ></el-table-column>
        <el-table-column label="手机号码" prop="phone" ></el-table-column>
        <el-table-column label="申请时间" prop="date"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0">
              <el-button type="success" size="mini" @click="handleEdit(scope.row,1)">通过</el-button>
              <el-button type="danger" size="mini" @click="handleEdit(scope.row,2)">拒绝</el-button>
            </div>
            <el-button v-if="scope.row.status == 1" type="success" size="mini">已通过</el-button>
            <el-button v-if="scope.row.status == 2" type="danger" size="mini">已拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageIndexChange"
        :current-page="page.pageIndex"
        :page-sizes="[5,10]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num"
      ></el-pagination>
    </div>
  </div>
</template>
      
<script>
import { schoolLsitInfo } from "../../public/gather_api";

export default {
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
        phone:''
      },
      tableData: [],
      num: 0,
      input:'',
      input2:'',
      loading:false
    };
  },
  methods: {
    schoolLsitInfo() {
        this.loading = true;
      schoolLsitInfo(this.page).then(res => {
        this.loading = false;
        this.tableData = res.data.data.list;
        console.log(this.tableData)
        this.num = res.data.data.num;
      });
    },
    formatDate(row) {
      //return row.date == "2016-05-04" ? '男' : row.sex == 0 ? '女' : '未知';
      //格式化是针对表格内容即使data数据
      return row.sex ? "女" : "男";
    },
    // 修改页面条数
    pageSizeChange(e) {
      console.log(e);
      this.page.pageIndex = 1;
      this.page.pageSize = e;
      this.schoolLsitInfo();
    },
    // 修改页数
    pageIndexChange(e) {
      this.page.pageIndex = e;
      this.schoolLsitInfo();
    },
    // 点击 通过与否
    handleEdit(row,status){
        row.status = status;
    },
    // reset 重置
    reset(){
      this.page.pageIndex = 1;
      this.schoolLsitInfo();
    },
    inputInfo(e){
      if(e.length === 11){
        var tell = /^[1][3,4,5,6,7,8,9]\d{9}$/;
        if(tell.test(e)){
          this.page.phone = e
        }else{
        this.$message('手机号格式错误');
       }
      }
    },
    searchs(){
       this.page.pageIndex = 1;
       this.schoolLsitInfo();
      //  this.tableData.forEach((item)=>{
      //   //  item
      //   //  this.page.phone
         
      //  })

    }
  },
  mounted() {
    this.schoolLsitInfo();
  }
};
</script>

<style>
.el-main {
  padding: 14px;
}
#teacher {
  width: 100%;
  font-size: 30px;
}
.center {
  box-sizing: border-box;
}
.el-table {
  padding: 0px 9px;
}
.el-input {
  width: 18%!important;
}
.el-main{
    position: relative;
}
.footer{
    position: absolute;
    bottom: 0;
    right: 0;
}
.el-pagination{
    float: right !important;
}
.el-table td, .el-table th{
    padding: 4px 0 !important;
}
.el-table td div{
  display: flex;
}
.el-button+.el-button{
  margin-left: 14px!important;
}
.btn {
  margin-left: 14px;
}
.text {
  font-size: 16px;
  margin: 0px 12px;
}
</style>