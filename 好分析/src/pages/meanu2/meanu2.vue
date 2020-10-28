<template >
  <div id="meanu2" v-loading="loading">
    <EeacherDialog ref="EeacherDialog" :stage="stage" :subject="subject" :sex="sex" />
    <div class="header">
      手机号码：
      <el-input placeholder="请输入手机号" class="input" v-model="page.phone" clearable size="mini"></el-input>姓名：
      <el-input placeholder="请输入姓名" class="input" v-model="page.name" clearable size="mini"></el-input>
      <el-button class="btn" type="success" @click="search" size="small">查询</el-button>

      <el-button
        class="add"
        @click="$refs.EeacherDialog.visible=true"
        icon="el-icon-plus"
        type="primary"
      >新增教师</el-button>
      <el-button class="invite" icon="el-icon-share">邀请教师</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="教师姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="stage" label="学段" :formatter="formatterStage"></el-table-column>
      <el-table-column prop="subject" label="任教科目" :formatter="formatterSubj"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatter"></el-table-column>
      <el-table-column prop="date" label="更新时间"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" size="small">正常</el-tag>
          <el-tag v-if="scope.row.status == 0" type="danger" size="small">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="$refs.EeacherDialog.editor(scope.row)"
            icon="el-icon-edit-outline"
            circle
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页-->
    <el-pagination
      class="page"
      background
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="page.pageIndex"
      :page-sizes="[5,10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 弹层 -->
  </div>
</template>

<script>
import { techerList } from "../../api/api.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
        phone: "",
        name: ""
      },
      tableData: [],
      total: 0,
      visible: false,
      loading: false
    };
  },


  //计算属性
  computed: {
    ...mapState("teacherInfo", {
      stage: "stage",
      subject: "subject",
      sex: "sex"
    })
  },

  methods: {
    //获取数据
    getTecherList() {
      this.loading = true;
      techerList(this.page)
        .then(res => {
          // console.log(res.data.data.list);
          this.tableData = res.data.data.list;
          this.total = res.data.data.num;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    // //新增教师
    newAdd() {
      this.visible = true;
      console.log(this.visible);
    },

    //点击编辑
    bianji() {
      this.visible = true;
    },

    // //点击table按钮
    // handleClick(row, status) {
    //   console.log(row); //打印这行对应的数据
    //   //浅拷贝 eg：点击通过 status： 1 赋值
    //   row.status = status;
    // },

    //性别
    //获取行数据，并格式化 formatter 自带方法
    formatter(row) {
      // console.log(this.sex, row.sex);
      // return row.sex ? "男" : "女";
      return this.sex[row.sex];
    },

    //学段
    formatterStage(row) {
      return this.stage[row.stage];
    },

    //任教科目
    formatterSubj(row) {
      return this.subject[row.subject];
    },

    //修改页面条目数量
    changeSize(e) {
      console.log(e);
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.getTecherList();
    },

    //修改页数
    changePage(e) {
      console.log(e);
      this.page.pageIndex = e;
      this.getTecherList();
    },

    //查询
    search() {
      this.page.pageIndex = 1;
      this.getTecherList();
    },

    //重置
    clear() {
      (this.page.phone = ""), (this.page.name = ""), (this.page.pageIndex = 1);
      this.getTecherList();
    },

    //子组件传过来 
    changeTeacherInfo(e) {
      console.log(e);
      let index = this.tableData.findIndex(item => item.id === e.id);
      this.tableData.splice(index, 1, e);
    }
  },

  mounted() {
    this.getTecherList();
    console.log(this.$refs.EeacherDialog.visible);

    //关闭子组件上的bus方法
    this.$bus.$off("teacherInfo");
    //开启子组件上的bus方法
    this.$bus.$on("teacherInfo", this.changeTeacherInfo);
  }
};
</script>
<style>
#meanu2 {
  padding: 35px 20px;
  box-sizing: border-box;
  position: relative;
}
.page {
  position: absolute;
  right: 0px;
  bottom: 0px;
}

.page .active {
  background-color: #1dbd84 !important;
}

.header {
  font-size: 14px;
}
.header .input {
  width: 200px;
  margin-right: 20px;
}

.header .btn {
  background-color: #1dbd84;
  height: 28px;
  line-height: 0px;
}

.header .add {
  background-color: #1dbd84;
  float: right;
}

.header .invite {
  /* background-color: #1dbd84; */
  float: right;
}

/* .main{
el-table_1_column_1  
} */
/* .el-table_1_column_1 {
  width: 50px !important;
  height: 24px;
  border: solid 1px #ff2233;
} */
</style>