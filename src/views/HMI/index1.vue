<template>
  <div class="dashboard-container">
    <div class="settings">
      <el-row class="configitems">
        <el-divider content-position="right">
          <i>
            &nbsp;&nbsp;
            <el-button size="mini" type="success" @click="fanhui">返回</el-button>
          </i>
        </el-divider>
      </el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="设备状态">
          <div class="dashboard-container">
            <div class="settings">
              <el-row class="configitems">
                <el-divider content-position="left">
                  <i class="el-icon-s-grid">&nbsp;&nbsp;基本信息</i>
                </el-divider>
              </el-row>

              <el-row>
                <el-col :span="10" :offset="2">
                  I D :
                  <el-input placeholder="请输入内容" style="width:70%;" v-model="input" :disabled="true"></el-input>
                </el-col>配置认证方式 ：
                <el-input placeholder="请输入内容" style="width:15%;" v-model="access1" :disabled="true"></el-input>
                <el-input placeholder="请输入内容" style="width:20%;" v-model="accessid"></el-input>
              </el-row>
              <el-row>
                <el-col :span="10" :offset="2">
                  Protocol :
                  <!-- <el-select v-model="value1" style="width:300px;">
                <el-option v-model="this.select.select1"></el-option>
                <el-option v-model="this.select.select2"></el-option>
                <el-option v-model="this.select.select3"></el-option>
                <el-option v-model="this.select.select4"></el-option>
                <el-option v-model="this.select.select5"></el-option>
                <el-option v-model="this.select.select6"></el-option>
                  </el-select>-->
                  <el-select v-model="value1" @focus="fun1" @change="fun2(value1)">
                    <el-option
                      v-for="item in selectdata"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-col>设备运行 ：
                <el-switch
                  v-model="status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="fim3"
                ></el-switch>
              </el-row>
            </div>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="settings">
                    <el-row class="configitems">
                      <el-divider content-position="left">
                        <i class="el-icon-s-grid">&nbsp;&nbsp;配置信息</i>
                      </el-divider>
                    </el-row>
                    <!-- <el-row>
                  <div class="demo-input-suffix">
                   name：
                    <el-input  style="width:15%;"  v-model="input1"></el-input>
                    attr:
                    <el-input   style="width:50%;"v-model="input2"></el-input>
                  </div>
                    </el-row>-->
                    <el-row>
                      <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                      >
                        <el-table-column
                          prop="name"
                          label="name"
                          sortable
                       
                          width="100"
                        ></el-table-column>

                        <el-table-column prop="attr" label="attr" width="160"></el-table-column>

                        <el-table-column align="left">
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              type="warning"
                              @click="peizhibianji(scope.$index, scope.row)"
                            >编辑</el-button>

                            <el-button
                              size="mini"
                              type="success"
                              @click="handleDelete(scope.$index, scope.row)"
                            >保存</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-row>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="settings">
                    <el-row class="configitems">
                      <el-divider content-position="left">
                        <i class="el-icon-s-grid">&nbsp;&nbsp;流量图</i>
                      </el-divider>
                    </el-row>
                    <!-- <el-row>
                  <div class="demo-input-suffix">
                   name：
                    <el-input  style="width:15%;"  v-model="input1"></el-input>
                    attr:
                    <el-input   style="width:50%;"v-model="input2"></el-input>
                  </div>
                    </el-row>-->
                    <el-row>
                      <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker
                          v-model="value2"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd 00:00:00"
                          @change="change"
                          :picker-options="pickerOptions"
                        ></el-date-picker>
                      </div>
                      <div>
                        <line-chart :chart-data="lineChartData" style="float: left;width:100%" />
                      </div>
                    </el-row>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <!-- <div class="settings">
                <el-row class="configitems">
                  <el-divider content-position="left">
                    <i class="el-icon-s-grid">&nbsp;&nbsp;信息指标探测</i>
                  </el-divider>
                </el-row>
                <el-row>
                  <el-row>
                    HostName:
                    <el-input v-model="input" placeholder style="width: 350px"></el-input>
                  </el-row>
                  <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    :default-sort="{prop: 'date', order: 'descending'}"
                  >
                    <el-table-column
                      prop="name"
                      label="No."
                      sortable
                      :formatter="formatter"
                      width="100"
                    ></el-table-column>

                    <el-table-column prop="attr" label="事件" width="160"></el-table-column>
                    <el-table-column prop="attr" label="Alerts" width="160"></el-table-column>
                    <el-table-column prop="attr" label="Src" width="160"></el-table-column>
                    <el-table-column prop="attr" label="Dst" width="160"></el-table-column>
                  </el-table>
                </el-row>
                  </div>-->
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="settings">
                    <el-row class="configitems">
                      <el-divider content-position="left">
                        <i class="el-icon-s-grid">&nbsp;&nbsp;流量数据</i>
                      </el-divider>
                    </el-row>
                    <el-row>
                      <el-table
                        :data="tableDatapic.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                      >
                        <!-- <el-table-column
                      prop="name"
                      label="No."
                      sortable
                      :formatter="formatter"
                      width="100"
                        ></el-table-column>-->

                        <el-table-column prop="xAxis" label="xAxis" sortable width="160"></el-table-column>
                        <el-table-column prop="data" label="data" width="160"></el-table-column>
                      </el-table>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审计">
          <el-table
            :data="audittableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="createdTime" label="时间"  sortable></el-table-column>
            <el-table-column prop="userId.entityType" label="类型"  sortable></el-table-column>
            <el-table-column prop="entityName" label="名称" ></el-table-column>

            <el-table-column prop="userName" label="用户" sortable></el-table-column>
            <el-table-column prop="actionType" label="操作"></el-table-column>
            <el-table-column prop="actionStatus" label="状态"></el-table-column>

            <el-table-column align="right" label>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handlebianji(scope.$index, scope.row)"
                >详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-dialog title :visible.sync="dialogFormVisiblexq">
          <el-form :model="form">
            <el-form-item label="clientAddress" :label-width="formLabelWidth">
              <el-input v-model="form.clientAddress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="browser" :label-width="formLabelWidth">
              <el-input v-model="form.browser" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="os" :label-width="formLabelWidth">
              <el-input v-model="form.os" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="device" :label-width="formLabelWidth">
              <el-input v-model="form.device" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisiblexq = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisiblexq = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改配置信息" :visible.sync="centerDialogVisible" width="30%" center>
          <span>
            <el-row>
              <div class="demo-input-suffix">
                name：
                <el-input style="width:20%;" v-model="input1"></el-input>attr:
                <el-input style="width:50%;" v-model="input2"></el-input>
              </div>
            </el-row>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="peizhitijiao">确 定</el-button>
          </span>
        </el-dialog>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { gettraffic, gettrafficdata } from "@/api/ids";
import LineChart from "@/views/dashboard/admin/components/LineChart";
import {
  getDeviceCredentialsByDeviceId,
  startorstop,
  allplugin,
  showplugin,
  saveplugin,
} from "@/api/credemtials";
import { getAuditLogsByEntityId, getAuditLogs } from "@/api/audit";
const lineChartData = {
  newVisitis: {
    // expectedData: [100, 120, 161, 134, 105, 160, 165,5,5,5,5,5],
    actualData: [120, 82, 91, 154, 162, 140, 145, 5, 5, 5, 5, 5],
  },
};
export default {
  components: {
    LineChart,
  },
  data() {
    return {
      tableDatapic: [
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
        {
          data: 0,
          xAxis: 0,
        },
      ],
      // select: {
      //   select1: "",
      //   select2: "",
      //   select3: "",
      //   select4: "",
      //   select5: "",
      //   select6: "",
      // },
      lineChartData: lineChartData.newVisitis,
      search: '',
      pickerOptions:'',
      count: 11,
      peimap: {
        input1: this.input2,
      },
      selectdata: {},
      form: {
        browser: "",
        clientAddress: "",
        device: "",
        os: "",
      },
      peizhidata: {},
      formLabelWidth:'',
      input1: "",
      input2: "",
      entype: "",
      status: false,
      input: "",
      access1: "",
      accessid: "",
      value2: 0,
      centerDialogVisible: false,
      value1: "",
      dialogFormVisiblexq: false,
      tableData: [
        {
          name: "",
          attr: "",
        },
      ],
      audittableData: [{}],
    };
  },
  created() {
    this.getinfo();
    this.update();

    this.getaudit();
  },
  methods: {
    change() {
      gettraffic(this.value2[0], this.value2[1]).then((res) => {
        console.log(res.data);
        this.lineChartData.actualData = res.data;
        sessionStorage.setItem("key", res.xAxis);
        console.log(sessionStorage.getItem("key"));
      });
    },
    fim3() {
      if (this.status == true) {
        startorstop(this.input, this.entype, this.status).then((res) => {
          console.log(1);
          this.$message({
            message: "已启动",
            type: "success",
          });
        });
      } else {
        this.status == false;
        startorstop(this.input, this.entype, this.status).then((res) => {
          this.$message.error("已关闭");
        });
      }
    },
    getinfo() {
      gettraffic("2020-08-26 19:44:30", "2020-08-26 19:44:30").then((res) => {
        this.lineChartData.actualData = res.data;
      });
      gettrafficdata().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.tableDatapic[i].xAxis = res.xAxis[i];
          this.tableDatapic[i].data = res.data[i];
        }
        console.log("res");
        console.log(this.tableDatapic);
        console.log(res);
      });
      let self = this;

      var pId = this.$route.query.num;
      var pId1 = this.$route.query.num1;
      console.log(pId);
      console.log(pId1);
      this.entype = pId1;
      self.input = pId;
      console.log(this.entype);
    },
    update() {
      getDeviceCredentialsByDeviceId(this.input).then((res) => {
        console.log(res.credentialsType);
        this.access1 = res.credentialsType;
        this.accessid = res.credentialsId;
      });

      // allplugin().then((res) => {
      //   console.log(res.length);
      //   console.log("jjjj");
      //   this.select.select1 = res[0].name;
      //   this.select.select2 = res[1].name;
      //   this.select.select3 = res[2].name;
      //   this.select.select4 = res[3].name;
      //   this.select.select5 = res[4].name;
      //   this.select.select6 = res[5].name;
      //   console.log(this.options);
      // });
    },
    fun1() {
      allplugin().then((res) => {
        console.log(res.length);
        this.selectdata = res;
        console.log(this.selectdata);
        console.log(this.selectdata.name);
      });
    },
    fun2() {
      showplugin(this.entype, this.input, this.value1).then((res) => {
        console.log(this.tableData.name);
        console.log(Object.keys(res));
        this.tableData[0].name = Object.keys(res);
        this.tableData[0].attr = Object.values(res);
      });
    },
    fanhui() {
      this.$router.push({
        path: "/deviceManage",
      });
    },
    handlebianji(index, row) {
      this.dialogFormVisiblexq = true;
      getAuditLogs(this.count).then((res) => {
        console.log(res);
        console.log(index);
        // console.log(res.data[0].createdTime);
        this.form.browser = res.data[index].actionData.browser;
        this.form.clientAddress = res.data[index].actionData.clientAddress;
        this.form.device = res.data[index].actionData.device;
        this.form.os = res.data[index].actionData.os;
        console.log(this.browser);
        // this.tableData.forEach((element) => {
        //   element.requires = element.requires.join(",");
        // });
      });
    },

    peizhibianji(index, row) {
      this.centerDialogVisible = true;
      this.input1 = this.tableData[0].name;
      this.input2 = this.tableData[0].attr;
    },
    peizhitijiao() {
      var data = {};
      this.$set(data, this.input1, this.input2[0]);
      console.log(data);
      saveplugin(this.entype, this.input, this.input1[0], data).then((res) => {
        this.centerDialogVisible = false;
        this.fun2();
        console.log(res);
      });
      this.$message({
        message: "修改配置信息成功",
        type: "success",
      });
    },

    getaudit() {
      getAuditLogsByEntityId(this.entype, this.input, this.count).then(
        (res) => {
          console.log(res);
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
            date = y + "-" + m + "-" + d + "" + h + ":" + mm + ":" + s + "";
            res.data[i].createdTime = date;
          }
          this.audittableData = res.data;
        }
      );
    },
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
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.row-bg {
  padding: 10px 0;
}
</style>
