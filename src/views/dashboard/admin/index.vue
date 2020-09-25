<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:64px 10px 0;margin-bottom:40px;width:100%">
      <el-col :span="5">
        <div>
          <el-table :data="tableData"
                    style="width: 78%; ">
            <el-table-column class-name="tt"
                             label="Alert Information"
                             align="center">
              <el-table-column prop="name"
                               label=" "
                               width="150"></el-table-column>
              <el-table-column prop="num"
                               label="#"
                               width="55"></el-table-column>
              <el-table-column prop="proportion"
                               label="%"
                               width="55"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="5">
        <div>
          <el-table :data="tableData1"
                    style="width: 78%; ">
            <el-table-column class-name="tt"
                             label="Sensors"
                             align="center">
              <el-table-column prop="name"
                               label="sensor"
                               width="150"></el-table-column>
              <el-table-column prop="num"
                               label="sigs"
                               width="55"></el-table-column>
              <el-table-column prop="proportion"
                               label="Alert"
                               width="55"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="5">
        <div>
          <el-table :data="tableData2"
                    style="width: 78%; ">
            <el-table-column label="Top Sources"
                             align="center">
              <el-table-column prop="ip"
                               label="IP Adress"
                               width="150"></el-table-column>
              <el-table-column prop="count"
                               label="sigs"
                               width="55"></el-table-column>
              <el-table-column prop="proportion"
                               label="Alert"
                               width="55"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="5">
        <div>
          <el-table :data="tableData3"
                    style="width: 78%; ">
            <el-table-column label="Top Targets"
                             align="center">
              <el-table-column prop="ip"
                               label="IP Adress"
                               width="150"></el-table-column>
              <el-table-column prop="count"
                               label="sigs"
                               width="55"></el-table-column>
              <el-table-column prop="address4"
                               label="Alert"
                               width="55"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-table :data="tableData4"
                    style="width: 97.5%; ">
            <el-table-column label="Top Target Ports"
                             align="center">
              <!-- <el-span>  -->
              <!-- <span style="{color:'red'}"> -->
              <el-table-column prop="TCP"
                               label="Tcp"
                               width="65"></el-table-column>
              <el-table-column prop="name5"
                               label="#"
                               width="65"></el-table-column>
              <!-- </span> -->
              <!-- </el-span> -->
              <!-- <el-span> -->
              <el-table-column prop="UDP"
                               label="UDP"
                               width="65"></el-table-column>
              <el-table-column prop="address55"
                               label="#"
                               width="65"></el-table-column>
              <!-- </el-span> -->
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <div>
      <!-- <github-corner class="github-corner" /> -->

      <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

      <el-row style="background:#fff;padding:64px 64px 0;margin-bottom:64px;width:100%">
        <!-- <div>
          <bar-chart style="width:50%;float:right" />
        </div>-->
        <div>
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker v-model="value2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd 00:00:00"
                            @change="change"
                            :picker-options="pickerOptions"></el-date-picker>
          </div>

          <line-chart :chart-data="lineChartData"
                      style="float: left;width:100%" />
          <!-- <div class="chart-wrapper"> -->

          <!-- </div> -->
        </div>
      </el-row>
      <el-row style="background:#fff;padding:64px 64px 0;margin-bottom:64px;width:100%">
        <div v-infinite-scroll="load">
          <el-table :data="tableData5"
                    v-el-table-infinite-scroll="load"
                    height="550"
                    style="width: 100%;float:left;overflow:auto">
            <el-table-column class-name="tt"
                             label="Signatures"
                             align="center">
              <el-table-column prop="sig_priority"
                               label="Prio Signature"></el-table-column>
              <el-table-column prop="sig_name"
                               label="#sensors"
                               width="500"></el-table-column>
              <el-table-column prop="sig_rev"
                               label="#Alerts"></el-table-column>
              <el-table-column prop="sig_sid"
                               label="#Srcs"></el-table-column>
              <el-table-column prop="sig_gid"
                               label="#Dests"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-row>

      <div>
        <el-row style="background:#fff;padding:64px 64px 0;margin-bottom:64px;width:100%">
          <el-table :data="tableData6.filter(data => !search || data.cid.toLowerCase().includes(search.toLowerCase()))"
                    v-el-table-infinite-scroll="updatepage"
                    height="300"
                    style="width: 100%;float:left;overflow:auto"
                    :default-sort="{prop: 'date', order: 'descending'}">
            <!-- <el-table-column  class-name="tt" label="Signatures" align="center"> -->
            <el-table-column prop="sid"
                             label="传感信号"></el-table-column>
            <el-table-column prop="cid"
                             label="CID"></el-table-column>
            <el-table-column prop="sigClassId"
                             label="对应规则"></el-table-column>
            <el-table-column prop="sigName"
                             label="警告名称"
                             width="200"></el-table-column>
            <el-table-column prop="sigPriority"
                             label="优先级"></el-table-column>
            <el-table-column prop="timestamp"
                             label="时间戳"
                             width="230"></el-table-column>
            <el-table-column prop="ipSrc"
                             label="原地址"></el-table-column>
            <el-table-column prop="signature"
                             label="数据"></el-table-column>
            <el-table-column prop="ipProto"
                             label="上层协议"></el-table-column>
            <el-table-column prop="udport"
                             label="源端口"></el-table-column>
            <el-table-column prop="usport"
                             label="目的端口"></el-table-column>
            <el-table-column align="right">
              <template slot="header"
                        slot-scope="scope">
                <el-input v-model="search"
                          size="mini"
                          placeholder="输入关键字搜索" />
              </template>
            </el-table-column>
            <!-- </el-table-column> -->
          </el-table>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";
import elTableInfiniteScroll from "el-table-infinite-scroll";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import { TimePicker, Divider } from "element-ui";
import {
  getAlertInformation,
  getSensors,
  getTopSources,
  getTopTargetPort,
  getTopTargets,
  getSignatures,
  getAcidevent,
  gettraffic,
} from "@/api/ids";
const lineChartData = {
  newVisitis: {
    actualData: [120, 82, 91, 154, 162, 140, 145, 5, 5, 5, 5, 5],
  },
};

export default {
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  name: "DashboardAdmin",
  components: {
    // GithubCorner,
    // PanelGroup,
    LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },

  data() {
    return {
      value2: 0,
      page: 1,
      size: 5,
      page1: 1,
      pickerOptions: '',
      disabled: '',
      size1: 10,
      currentPage3: 1,
      count: 0,
      tableData5: [{}],
      search: "",
      var1: "TCP Alerts",
      var2: (
        <el-link disabled type="danger">
          [view]
        </el-link>
      ),
      tableData: [
        {
          data: "Signatures",
          name: "62",
          address: " ",

          //  {
          //   date: '2016-05-01',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1519 弄'
          // }, {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1516 弄'
          // }
        },
        {
          name: '',
          num: '',
          proportion: ''
        },
        {
          name: '',
          num: '',
          proportion: ''
        },
        {
          name: '',
          num: '',
          proportion: ''
        },
        {
          name: '',
          num: '',
          proportion: ''
        },
      ],
      lineChartData: lineChartData.newVisitis,
      tableData1: [{}],
      tableData2: [{}],
      tableData3: [{}],
      tableData4: [{}],
      tableData5: [{}],
      tableData6: [{}],
    };
  },
  created() {
    this.updatepage();
    this.updateids();
  },
  methods: {
    updatepage() {
      getAcidevent(this.page, this.size).then((res) => {
        if (res.hasNextPage) {
          this.page += 1;
          this.size += 1;
        }

        this.address = res.pageNum;
        this.totalDate = res.pageNum;
        this.pageSize = res.pageSize;
        this.tableData6 = res.list;
      });
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    load() {
      getSignatures(this.page1, this.size1).then((res) => {
        if (res.totalPages > this.page) {
          this.size1 += 5;
        }
        this.tableData5 = res.content;
        //  res.forEach((item, index, arr) => {
        //         this.tableData5 = item
        //          console.log("151");
        //   console.log(item);
        //                });
      });
    },
    change() {
      gettraffic(this.value2[0], this.value2[1]).then((res) => {
        console.log(res.data);
        this.lineChartData.actualData = res.data;
        sessionStorage.setItem("key", res.xAxis);
        console.log(sessionStorage.getItem("key"));
      });
    },
    updateids() {
      gettraffic("2020-08-26 19:44:30", "2020-08-26 19:44:30").then((res) => {
        this.lineChartData.actualData = res.data;
      });
      getAlertInformation().then((res) => {
        this.tableData = this.res.silce(count);
      });
      getSensors().then((res) => {
        this.tableData1 = res;
      });
      getTopSources().then((res) => {
        this.tableData2 = res;
      });
      getTopTargets().then((res) => {
        this.tableData3 = res;
      });
      getTopTargetPort().then((res) => {
        this.tableData4 = res;
      });
      getSignatures(this.page1, this.size1).then((res) => {
        if (res.totalPages > this.page) {
          this.size1 += 5;
        }
        this.tableData5 = res.content;
      });
      // getAcidevent(this.page,this.size).then((res)=>{
      //    this.page+=1;
      //  this.size+=1;
      //  this.address=res.pageNum;
      //   this.totalDate=res.pageNum;
      //   this.pageSize=res.pageSize;
      //   this.tableData6 = res.list;
      // })
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
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
<style>
/* .el-table-col--border, .el-table--group {
    border-color:  red;
}
.el-table--border:after, .el-table--group:after, .el-table:before {
    background-color: red;
}
.el-table td, .el-table--border th,.el-table th.is-leaf {
    border-bottom-color: red;
}
.el-table--border td, .el-table--border th {
    border-right-color: red;
} */
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
</style>>
