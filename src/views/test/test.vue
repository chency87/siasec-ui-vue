<template>
  <div class="dashboard-container">
    <div class="settings">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="dialogFormVisible = true">新增设备</el-button>
            <el-button type="primary" @click="startall">启动全部</el-button>
            <el-button type="primary" @click="stopall1">停止全部</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="id.id" label="NO." :formatter="formatter" width="290%"></el-table-column>
        <el-table-column prop="name" label="Name" :formatter="formatter" width="100%"></el-table-column>
        <el-table-column prop="type" label="Type" :formatter="formatter" width="140%"></el-table-column>

        <el-table-column prop="label" label="Label" sortable width="90%"></el-table-column>
        <el-table-column prop="additionalInfo" label="Desc" sortable width="90%"></el-table-column>
        <el-table-column prop="tenantId.entityType" label="Group" sortable width="90%"></el-table-column>
        <el-table-column prop="Status" label="Status" sortable width="90%"></el-table-column>
        <el-table-column prop="createdTime" label="CreatedTime" sortable width="160%"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handlebianji(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="handleHMI(scope.$index, scope.row)">HMI</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
            <el-button size="mini" type="success" @click="handlebianji1(scope.$index, scope.row)">授权</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title='新增设备' :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Name :" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Type :" :label-width="formLabelWidth">
          <!-- <el-select v-model="form.type" filterable allow-create placeholder="请选择设备类型">
            <el-option v-model="this.select.select1"></el-option>
            <el-option v-model="this.select.select2"></el-option>
          </el-select>-->
          <el-select
            v-model="form.type"
            filterable
            allow-create
            placeholder="请选择设备类型"
            @focus="fun1"
            @change="fun2"
          >
            <el-option
              v-for="item in selectData"
              :key="item.type"
              :label="item.type"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="label :" :label-width="formLabelWidth">
          <el-input v-model="form.label" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="desc :" :label-width="formLabelWidth">
          <el-input v-model="form.additionalInfo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="handlesubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title='修改设备' :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="Name :" :label-width="formLabelWidth">
          <el-input v-model="form1.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Type :" :label-width="formLabelWidth">
          <el-select
            v-model="form1.type"
            filterable
            allow-create
            placeholder="请选择设备类型"
            @focus="fun1"
            @change="fun2"
          >
            <el-option
              v-for="item in selectData"
              :key="item.type"
              :label="item.type"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="label :" :label-width="formLabelWidth">
          <el-input v-model="form1.label" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="desc :" :label-width="formLabelWidth">
          <el-input v-model="form1.additionalInfo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="success" @click="handlesubmit1()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getdeviceInfo,
  addeviceInfo,
  deleteDevice,
  getDeviceTypes,
  getDeviceById,
  execall,
  stopall,
  getDevicesByIds,
} from "@/api/device";
export default {
  data() {
    return {
      selectData: {},
      emet: "",
      select: {
        select1: "",
        select2: "",
      },
      search: "",
      deviceId: "",
      device: {
        name: "",
        type: "",
        label: "",
        additionalInfo: "",
      },
      tableData: [{}],
      dialogFormVisible: false,
      form: {
        name: "",
        type: "",
        label: "",
        additionalInfo: "",
      },
      formLabelWidth: "120px",
      dialogFormVisible1: false,
      form1: {
        name: "",
        type: "",
        label: "",
        additionalInfo: "",
      },
      formLabel1Width: "120px",
    };
  },

  created() {
    this.updatedeviceTable();
  },
  methods: {
    updatedeviceTable() {
      getdeviceInfo().then((res) => {
        console.log(res);
        // console.log(res.data[0].createdTime);
        for (let i = 0; i < res.data.length; i++) {
          var date = new Date(res.data[i].createdTime * 1);
          console.log(res.data[i].createdTime);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          var d = date.getDate();
          var h = date.getHours();
          var mm = date.getMinutes();
          var s = date.getSeconds();
          m = m < 10 ? "0" + m : m;
          d = d < 10 ? "0" + d : d;
          h = h < 10 ? "0" + h : h;
          mm = mm < 10 ? "0" + mm : mm;
          s = s < 10 ? "0" + s : s;
          date = y + "-" + m + "-" + d + "  " + h + ":" + mm + ":" + s + " ";
          res.data[i].createdTime = date;
        }
        this.tableData = res.data;
        // this.emet = res.data.id.entityType;
        this.form.name = "";
        this.form.type = "";
        this.form.label = "";
        this.form.additionalInfo = "";
               console.log("data");
   var data=this.$route.query.val.data;
        if(data!=null){
          this.tableData=data;
          console.log("data");
      console.log(data);
        }
        // this.tableData.forEach((element) => {
        //   element.requires = element.requires.join(",");
        // });
      });
      execall().then((res) => {
        console.log(res);

        // this.tableData.forEach((element) => {
        //   element.requires = element.requires.join(",");
        // });
      });
    },
    fun1() {
      getDeviceTypes().then((res) => {
        this.selectData = res;

        console.log(this.selectData);
      });
    },
    startall() {
      execall().then((res) => {
        console.log(res);

        // this.tableData.forEach((element) => {
        //   element.requires = element.requires.join(",");
        // });
      });
    },
    stopall1() {
      stopall(this.emet).then((res) => {
        console.log(this.emet);

        // this.tableData.forEach((element) => {
        //   element.requires = element.requires.join(",");
        // });
      });
    },
    handlebianji(index, row) {
      this.dialogFormVisible1 = true;
       console.log("kaishi");
      console.log(row.id.id);
      getDevicesByIds(row.id.id).then((res) => {
        console.log(res);
        this.form1.name = res[0].name;
        this.form1.type = res[0].type;
        this.form1.label = res[0].label;
        this.form1.additionalInfo = res[0].additionalInfo;

        // this.tableData.forEach((element) => {
        //   element.requires = element.requires.join(",");
        // });
      });
    },
    handlebianji1(index, row) {
      this.dialogFormVisible1 = true;
      console.log(this.tableData[index]);
      this.form1.name = row.name;
      this.form1.type = row.type;
      this.form1.label = row.label;
      this.form1.additionalInfo = row.additionalInfo;
      console.log(row.type);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      // console.log(row.id.id);

      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // const param = { name: row.name }
          deleteDevice(row.id.id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.updatedeviceTable();
          });
        })
        .catch(() => {});
    },
    handleHMI(index, row) {
      let zhi = this.tableData[index];
      console.log("zhi.id.id");
      this.$router.push({
        path: "/HMI",
        query: { num: zhi.id.id, num1: zhi.id.entityType, from: "/test" },
      });
    },
    handlesubmit() {
      console.log("123");
      // var formData = new FormData();
      // formData.append("name", this.form.name);
      // formData.append("type", this.form.type);
      // formData.append("label", this.form.label);
      // formData.append("additionalInfo", this.form.additionalInfo);
      this.device.name = this.form.name;
      this.device.type = this.form.type;
      this.device.label = this.form.label;
      this.device.additionalInfo = this.form.additionalInfo;
      console.log(this.device);
      addeviceInfo(this.device).then((res) => {
        this.dialogFormVisible = false;
        this.updatedeviceTable();
      });
    },
    handlesubmit1() {
      console.log("123");
      // var formData = new FormData();
      // formData.append("name", this.form.name);
      // formData.append("type", this.form.type);
      // formData.append("label", this.form.label);
      // formData.append("additionalInfo", this.form.additionalInfo);
      this.device.name = this.form1.name;
      this.device.type = this.form1.type;
      this.device.label = this.form1.label;
      this.device.additionalInfo = this.form1.additionalInfo;
      console.log(this.device);
      addeviceInfo(this.device).then((res) => {
        this.dialogFormVisible1 = false;
        this.updatedeviceTable();
      });
    },
  },

  formatter(row, column) {
    return row.address;
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.settings {
  margin: 35px 55px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &-i {
    font-size: 50px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
// .button-new-tag {
//   margin-left: 10px;
//   height: 32px;
//   line-height: 30px;
//   padding-top: 0;
//   padding-bottom: 0;
// }
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
