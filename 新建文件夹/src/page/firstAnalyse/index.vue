<template>
  <div id="teacher" v-loading="loading">
    <div>
      <span class="text">成绩分析名称:</span>
      <el-input size="small" style="width: 16%;" v-model="input" v-on:input="inputInfo" placeholder="请输入"></el-input>
      <span class="text">分析类型:</span>
      <el-select size="small" class="select" v-model="value" placeholder="请选择">
            <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            </el-option>
      </el-select>
      <span class="text">状态:</span>
      <el-select size="small" class="select" v-model="states" placeholder="请选择">
            <el-option
                v-for="item in state"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            </el-option>
      </el-select>
      <span class="text">考试时间:</span>
            <el-date-picker
                size="small"
                class="picker"
                v-model="value1"
                type="date"
                placeholder="请选择">
            </el-date-picker>
      <span class="btn">
        <el-button size="small" @click="searchs">查询</el-button>
      </span>
        <span class="span_top">
          <i class="el-icon-plus"></i>
          <span @click="$refs.TeacherDialog.dialogVisible = true">新增分析</span>
        </span>
    </div>
    <div class="center">
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column class="serial_number" label="编号" prop="serial_number"></el-table-column>
        <el-table-column style="width: 20%" label="成绩分析名称" prop="age"></el-table-column>
        <el-table-column label="学段" prop="stage" :formatter="formatStage"></el-table-column>
        <el-table-column label="入学年份" prop="date"></el-table-column>
        <el-table-column label="考试时间" prop="date"></el-table-column>
        <el-table-column label="分析类型" prop="sex" :formatter="formatDate"></el-table-column>
        <el-table-column label="创建人">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.cname }}</p>
              <div slot="reference" class="name-wrapper">
                <span style="margin-left: -10px">{{ scope.row.cname }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="date"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1 " type="primary" size="mini">参数设置</el-button>
            <el-button v-if="scope.row.status == 2 " type="success" size="mini">分析设置</el-button>
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
    <!-- 全局组成的组件 不需要变成组件化 直接使用 -->
    <TeacherDialog
      ref="TeacherDialog"
      :stage="stage"
      :subject="subject"
      :sex="sex"
    />
  </div>
</template>  
<script>
import { teacherList } from "../../public/gather_api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
        phone: ""
      },
      dialogVisible:false,
      tableData: [],
      num: 0,
      input: "",
      input2: "",
      loading: false,
      value: '',
      states:'',
      value1:[],
      cities: [{
          value: '选项1',
          label: '总分基本分析'
        }, {
          value: '选项2',
          label: '学业质量分析'
        }, {
          value: '选项3',
          label: '成绩高级分析'
        }],
      state: [{
          value: '选项1',
          label: '参数设置'
        }, {
          value: '选项2',
          label: '分析完成'
        }],
      }
  },
  // 计算属性  
  computed:{
    // mapState 获取vuex中的状态数据
    ...mapState("teacherInfo", {
      stage: "stage",
      subject: "subject",
      sex: "sex",
    }),
  },
  methods: {
    // 数据请求
    teacherList() {
      this.loading = true;
      teacherList(this.page).then(res => {
        this.loading = false;
        this.tableData = res.data.data.list;
        this.num = res.data.data.num;
      });
    },
    // formatter  
    // 获取当前行数据，并格式化(尽量减少对原数据的修改) 格式化
    formatDate(row) {
      // console.log(row);
      //格式化是针对表格内容即使data数据
      // return row.sex ? "女" : "男";
      return this.sex[row.sex];
    },
    formatStage(row){
      return this.stage[row.stage];
    },
    formatSubject(row) {
      return this.subject[row.subject];
    },
    // 修改页面条数
    pageSizeChange(e) {
      this.page.pageIndex = 1;
      this.page.pageSize = e;
      this.teacherList();
    },
    // 修改页数
    pageIndexChange(e) {
      this.page.pageIndex = e;
      this.teacherList();
    },
    // 点击  通过与否
    handleEdit(row, status) {
      row.status = status;
    },
    // reset 重置
    reset() {
      this.page.pageIndex = 1;
      this.teacherList();
    },
    // 输入手机框校验
    inputInfo(e) {
      if (e.length === 11) {
        var tell = /^[1][3,4,5,6,7,8,9]\d{9}$/;
        if (tell.test(e)) {
          this.page.phone = e;
        } else {
          this.$message("手机号格式错误");
        }
      }
    },
    // 点击搜索手机号
    searchs() {
      // this.page.pageIndex = 1;
      // this.teacherList();
    },

    incident(e){
      console.log(e)
      // findIndex 找出数据中 修改信息对应的id
      let index = this.tableData.findIndex((item)=>{
        return item.id === e.id
          // item 当前页面的每一项数据 e 修改后传过来的数据
          // item.id === e.id
      })
      // 返回找到的index，找不到返回-1  下标 个数  替换的数据
       this.tableData.splice(index, 1, e);
    }
  },
  mounted() {
    this.teacherList();
    // bus $on()第一个参数是定义的名字 第二个是方法（需要调用的方法） 
    // this.$bus.$off("changeIncidents");
    this.$bus.$on("changeIncidents", this.incident)
  }
};
</script>
<style>
.el-table_1_column_1{
    width: 20px;
}
.select{
    width: 126px !important;
}
.el-input__prefix {
    left: 110px;
}
.el-input--prefix .el-input__inner {
    padding-left: 10px;
}
.el-input__prefix{
    height: 0%;
}
.el-date-editor.el-input{
    width: 142px;
}
.searchs{
  background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
}
.el-button--small{
  width: 74px;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
}
.el-main {
  padding: 14px;
}
.iOne,.iTwo{
  color: #0fbc77;
}
.iTwo{
  color: rgb(253, 100, 113);
}
#teacher {
  width: 100%;
  font-size: 30px;
}
.el-table th > .cell {
  text-align: center;
}
.el-table .cell {
  display: flex;
  justify-content: space-evenly;
}
.center {
  box-sizing: border-box;
}
.el-table {
  padding: 0px 9px;
}

.el-main {
  position: relative;
}
.footer {
  position: absolute;
  bottom: 0;
  right: 10px;
}
.el-pagination {
  float: right !important;
}
.el-table td,
.el-table th {
  padding: 4px 0 !important;
}
.btn {
  margin-left: 22px;
}
.text {
  font-size: 13px;
  margin: 0px 12px;
}

.span_top{
  display: inline-block;
  text-align: center;
  width: 90px;
  border-radius:3px;
  height: 28px;
  line-height: 26px;
  border: 1px solid #0fbc77;
  background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
  font-size: 14px;
  color: #fff;
  margin-left: 28px;
  cursor: pointer;
}
.one{
    margin: 0 20px 0 200px;
    color: #0fbc77;
    background:none;
}
.span_top > i{
  font-size: 10px;
  margin-right: 5px;
}
.span_top > span{
  font-size: 14px;
}
</style>