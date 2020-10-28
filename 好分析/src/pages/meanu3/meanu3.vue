<template >
  <div id="meanu3" v-loading="loading" >
    <div class="header">
      手机号码：
      <el-input placeholder="请输入手机号" class="input" v-model="page.phone" clearable size="mini"></el-input>姓名：
      <el-input placeholder="请输入姓名" class="input" v-model="page.name" clearable size="mini"></el-input>
      <el-button class="btn" type="success" @click="search" size="small">查询</el-button>

      <el-button class="btn" type="success" @click="clear" size="small">重置</el-button>
    </div>

    <el-table   :data="tableData" style="width: 100%">
      <el-table-column fixed prop="name" label="教师姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatter"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="date" label="申请时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 0">
            <el-button @click="handleClick(scope.row,1)" type="success" size="small">通过</el-button>
            <el-button @click="handleClick(scope.row,2)" type="danger" size="small">拒绝</el-button>
          </div>
          <el-tag v-if="scope.row.status == 1" type="success" size="small">通过</el-tag>
          <el-tag v-if="scope.row.status == 2" type="danger" size="small">拒绝</el-tag>
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
  </div>
</template>

<script>
import { getTecherList } from "../../api/api.js";
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
      loading: false
    };
  },

  methods: {
    //获取数据
    getTecherList() {
      this.loading = true;
      getTecherList(this.page).then(res => {
        console.log(res.data.data.list);
        this.tableData = res.data.data.list;
        this.total = res.data.data.num;
        this.loading = false    
      });
    },

    //点击table按钮
    handleClick(row, status) {
      console.log(row); //打印这行对应的数据
      //浅拷贝 eg：点击通过 status： 1 赋值
      row.status = status;
    },

    //获取行数据，并格式化 formatter 自带方法
    formatter(row) {
      // console.log(row);
      return row.sex ? "男" : "女";
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
      this.page.phone = "",
      this.page.name = "",
      this.page.pageIndex = 1;
      this.getTecherList();
    }
  },

  mounted() {
    this.getTecherList();
  }
};
</script>
<style>
#meanu3 {
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






</style>