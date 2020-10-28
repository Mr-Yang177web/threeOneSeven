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
        class="input">
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
           @click="$refs.addfrom.edit()"
        >
          新增教师
        </el-button>
      </div>
    </div>
    <!-- 首页 -->
    <div class="content">
      <el-table :data="tableData">
        <el-table-column prop="phone" label="手机号码"> </el-table-column>
        <el-table-column prop="name" label="教师姓名"></el-table-column>
        <el-table-column
          prop="stage"
          :formatter="formatterschool"
          label="学校"
        ></el-table-column>
        <el-table-column
          prop="subject"
          :formatter="formattersubject"
          label="任教科目"
        ></el-table-column>
        <el-table-column prop="sex" :formatter="formatter" label="性别">

        </el-table-column>
        <el-table-column prop="date" label="更新时间"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- scope.row.status -->
            <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
            <el-tag v-if="scope.row.status == 0" type="warning">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column  label="操作" class="operation">
          <template slot-scope="scope">
          <i class="el-icon-edit" @click="$refs.addfrom.edit(scope.row)"></i>
          <i class="el-icon-delete"></i>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框组件 -->
    <Addfrom ref="addfrom"/>
  </div>
</template>
<script>
import { getTeachersmanagement } from "@/api/api";
import { mapState } from "vuex";
export default {
  name: "Teachersmanagement",
  //拆分出去的数据 通过vuex在导入进来
  
  data() {
    return {
      tableData: [],
      user: {
        pageIndex: 1,
        pageSize: 10,
      },
      num: 1,
      dialogVisible:false,
    };
  },
  computed: {
    ...mapState("teacherInfo", {
      //中小学阶段
      stage: "stage",
      //语数外科目
      subject: "subject",
      //性别
      sex: "sex",
    }),
  },
  //方法
  methods: {
    //获取数据接口
    getTeachersmanagement() {
      getTeachersmanagement(this.user).then((res) => {
        this.tableData = res.data.data.list;
        this.num = res.data.data.num;
      });
    },
    handleClick(row, num) {
      //当点击成功的时候 改变他的状态码
      return (row.status = num);
    },
    //row  from表单里获取当前行数据，并格式化(尽量减少对原数据的修改)
    //性别
    formatter(row) {
      return this.sex[row.sex]
    },
    //学校阶段 初高中
    formatterschool(row) {
      return this.stage[row.stage];
    },
    //任教科目
    formattersubject(row) {
      return this.subject[row.subject];
    },
    
    changeMain(e){
    let index = this.tableData.findIndex((item) => item.id === e.id);
    this.tableData.splice(index,1,e)
    }
  },
  mounted() {
    this.getTeachersmanagement();
    this.$bus.$off("teacherInfo");
    this.$bus.$on("teacherInfo",this.changeMain);
  },
};
</script>

<style lang="scss" >
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
.el-icon-edit {
  margin-right: 15px;
  cursor: pointer;
}
.el-icon-delete {
  cursor: pointer;
}
</style>