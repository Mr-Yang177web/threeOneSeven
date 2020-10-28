<template>
  <div>
    <div class="header">
      手机号码：<el-input
        placeholder="请输入手机号"
        clearable
        size="mini"
        class="input"
      >
      </el-input>
      姓名：<el-input
        placeholder="请输入姓名"
        clearable
        size="mini"
        class="input"
      >
      </el-input>
      <el-button class="btn" type="success" size="small"> 查询 </el-button>
      <el-button class="btn" type="success" size="small"> 重置 </el-button>
      <div class="right_btn">
        <el-button class="btn_share" icon="el-icon-share" size="small">
          邀请教师
        </el-button>
        <el-button
          class="btn_add"
          type="success"
          icon="el-icon-plus"
          size="small"
        >
          新增教师
        </el-button>
      </div>
    </div>
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
  </div>
</template>

<script>
import { getTeacherapply } from "@/api/api";
export default {
  name: "Applicationmanagement",
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
      console.log(e, "aaaa");
      this.user.pageSize = e;
      this.user.pageIndex = 1;
      this.getTeacherapply();
    },
    //改变页数
    handleCurrentChange(e) {
      console.log(e, "bbbb");
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
.header {
  padding: 0 20px 20px 0px;
  font-size: 12px;

  .input {
    width: 200px;
    margin-right: 20px;
  }

  .btn {
    background: #1dbd84;
    height: 28px;
    line-height: 0px;
  }

  .right_btn {
    float: right;
    .btn_add {
      background: #1dbd84;
    }
    .btn_share,
    .btn_add {
      height: 28px;
      line-height: 0px;
    }
  }
}
#List {
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