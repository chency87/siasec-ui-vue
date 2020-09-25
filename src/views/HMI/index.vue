<template>
  <div class="dashboard-container">
   
      <el-tabs type="border-card">
        <el-tab-pane label="设备状态">
          <el-container>
             <div class="settings">
    </div>
            <el-row class="configitems">
              <el-divider content-position="left">
                <i class="el-icon-s-grid">&nbsp;&nbsp;基本信息</i>
              </el-divider>
            </el-row>

            <el-header style="width: 100%">
              ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-input v-model="input" placeholder style="margin-right:350px;width: 150px"></el-input>配置认证方式:
              <el-select v-model="value" placeholder="Access_Token">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <div>&nbsp;</div>
              <div>
                Protocol:
                <el-select v-model="value" placeholder="Modbus TCP" style="margin-right:300px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>设备运行：
                <el-switch v-model="valueyunxing" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </div>
            </el-header>
            <div>&nbsp;</div>
    
            <el-container>
              <el-main style="width: 50%">
                <div class="settings">
                  <el-row class="configitems">
                    <el-divider content-position="left">
                      <i class="el-icon-s-grid">&nbsp;&nbsp;配置信息</i>
                    </el-divider>
                  </el-row>
                </div>
                <el-table :data="tableData1" border style="width: 60%">
                  <el-table-column fixed prop="name" label="name" width="150"></el-table-column>
                  <el-table-column prop="attr" label="attr" width="120"></el-table-column>
                  <el-table-column fixed="right" label="详情">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-main>
              <el-main>
                <h5>信息指标探测</h5>HostName:
                <el-input v-model="input" placeholder style="width: 350px"></el-input>
                <el-table :data="tableData2" border style="width: 90%">
                  <el-table-column fixed prop="no" label="No." width="80"></el-table-column>
                  <el-table-column prop="matter" label="事件" width="100"></el-table-column>
                  <el-table-column prop="alerts" label="Alerts" width="100"></el-table-column>
                  <el-table-column prop="src" label="Src" width="100"></el-table-column>
                  <el-table-column prop="dst" label="Dst" width="100"></el-table-column>
                </el-table>
              </el-main>
            </el-container>

            <h5>设备状态</h5>
            <div class="chart-container">
              <chart />
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="审计">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="time" label="时间" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="120"></el-table-column>
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="user" label="用户" width="180"></el-table-column>
            <el-table-column prop="operate" label="操作" width="300"></el-table-column>
            <el-table-column prop="status" label="状态" width="120"></el-table-column>
            <el-table-column fixed="right" label="详情">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="云边协同"></el-tab-pane>
      </el-tabs>
   
  </div>
</template>

<script>
import Chart from "@/components/Charts/LineMarker";
export default {
  name: "LineChart",
  components: { Chart },
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },

  data() {
    return {
      tableData: [
        {
          time: "2020-05-19 13:31:55",
          type: "用户",
          name: "tenant@thingsboard.org",
          user: "tenant@thingsboard.org",
          operate: "Login",
          status: "成功",
        },
      ],
      tableData1: [
        {
          name: "IP",
          attr: "129",
        },
        {
          name: "Port",
          attr: "502",
        },
        {
          name: "funCode",
          attr: "1",
        },
        {
          name: "address",
          attr: "1",
        },
        {
          name: "quality",
          attr: "5",
        },
        {
          name: "attr",
          attr: "{v1,v2,v3,v4,v5}",
        },
      ],
      tableData2: [
        {
          no: "1",
          matter: "ping",
          alerts: "15",
          src: "182.6.3",
          dst: "186.6.2",
        },
      ],

      valueyunxing: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
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
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>