<template>
  <div id="List">
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="教师姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" :formatter="formatter" label="姓别">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="date" label="申请时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- scope.row.status -->
          <div v-if="scope.row.status == 0">
            <el-button
              @click="handleClick(scope.row, 1)"
              type="success"
              size="small"
              >同意</el-button
            >
            <el-button
              @click="handleClick(scope.row, 2)"
              type="warning"
              size="small"
              >拒绝</el-button
            >
          </div>
          <el-tag v-if="scope.row.status == 1" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status == 2" type="warning">已拒绝</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="user.pageIndex"
        :page-sizes="[5, 10]"
        :page-size="user.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getTeacherapply } from "@/api/api";
export default {
  name: "Teachersmanagement",
  data() {
    return {
      tableData: [],
      user: {
        pageIndex: 1,
        pageSize: 10,
      },
      num: 1,
    };
  },
  methods: {
    getTeacherapply() {
      getTeacherapply(this.user).then((res) => {
        this.tableData = res.data.data.list;
        console.log(this.tableData, "asasasas");
        this.num = res.data.data.num;
      });
    },
    handleClick(row, num) {
      console.log(row.status, num, "zxzxz");
      //当点击成功的时候 改变他的状态码
      return (row.status = num);
    },
    //性别
    formatter(row) {
      return row.sex ? "男" : "女";
    },
    //修改当前条数 每页几条
    handleSizeChange(e) {
      console.log(e,"aaaa")
      this.user.pageSize = e;
      this.user.pageIndex = 1
      this.getTeacherapply();
    },
    //改变页数
    handleCurrentChange(e) {
      console.log(e,"bbbb")
      this.user.pageIndex = e;
      this.getTeacherapply();
    },
  },
  mounted() {
    this.getTeacherapply();
  },
};
</script>

<style lang="scss">
#List {
  padding: 20px;
  min-height: 520px;
}
.el-table {
  td {
    padding: 6px;
  }
}
.el-main {
  line-height: 0px;
}
</style>