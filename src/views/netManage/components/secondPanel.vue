<template>
  <div>

    <el-row :gutter="40">
      <el-col :span="12">
        <div class="daterange-block">
          <el-date-picker v-model="dateRangeForLine"
                          type="datetimerange"
                          size="mini"
                          align="right"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['12:00:00', '08:00:00']"
                          @change="handleDateChange" />
        </div>
        <div id="line-chart"
             style="height: 280px;" />
      </el-col>
      <el-col :span="12">
        <el-table :data="signatures"
                  border
                  size="mini"
                  v-loading="listLoading"
                  fit
                  :header-row-style="{height:'20px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="width: 100%">
          <el-table-column label="Network Signatures"
                           header-align="center">
            <el-table-column prop="sig_id"
                             label="sig_id"
                             header-align="center"
                             align="center"
                             width="60" />
            <el-table-column prop="sig_name"
                             label="#sensors"
                             width="450"></el-table-column>
            <el-table-column prop="sig_class_id"
                             label="#sig_class_id"></el-table-column>
            <el-table-column prop="sig_rev"
                             label="#sig_rev"
                             min-width="70"></el-table-column>
            <el-table-column prop="sig_sid"
                             label="#sig_sid"
                             min-width="70"></el-table-column>
            <el-table-column prop="sig_gid"
                             label="#sig_gid"
                             min-width="70"></el-table-column>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"
                       :current-page.sync="signaturesPageOffset"
                       :page-size="signaturesPageSize"
                       layout="total, prev, pager, next"
                       :total="signaturesTotalNum">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
import {
  getSignatures,
  gettraffic
} from '@/api/ids'
import moment from 'moment'

export default {

  name: 'SecondPanel',
  data() {
    return {
      listLoading: true,
      dateRangeForLine: [],
      signaturesPageSize: 10,
      signaturesPageOffset: 0,
      signaturesTotalNum: 0,
      signaturesTotalPages: 1,
      signatures: null,
      timer: null
    }
  },
  computed: {

  },
  mounted() {
    // const data = [22, 932, 901, 934, 1290, 1330, 13]
    // this.drawLineChart(data)
    this.timer = setInterval(this.getList, 1000)
  },
  created() {
    // this.getList()
  },
  updated() {

  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // updateLine() {
    //   console.log('1111111111111')
    // },
    getList() {
      this.initSignatures(0, 10)
      this.dateRangeForLine[0] = moment().subtract(10, 'days').format('YYYY-MM-DD HH:mm:ss')
      this.dateRangeForLine[1] = moment().format('YYYY-MM-DD HH:mm:ss')
      this.handleDateChange(this.dateRangeForLine[0], this.dateRangeForLine[1])
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },

    handleCurrentChange(val) {
      this.initSignatures(val - 1, this.signaturesPageSize)
    },
    initSignatures(offset, pageSize) {
      getSignatures(offset, pageSize).then(res => {
        this.signatures = res.content
        this.signaturesTotalNum = res.totalElements
        this.signaturesTotalPages = res.totalPages
      })
    },
    handleDateChange(start, end) {
      if (this.dateRangeForLine !== null) {
        this.dateRangeForLine[0] = moment(this.dateRangeForLine[0]).format('YYYY-MM-DD hh:mm:ss')
        this.dateRangeForLine[1] = moment(this.dateRangeForLine[1]).format('YYYY-MM-DD hh:mm:ss')
        gettraffic(this.dateRangeForLine[0], this.dateRangeForLine[1]).then(res => {
          this.drawLineChart(res.xAxis, res.data)
        })
      }
    },
    drawLineChart(xAxis, data) {
      var option = {
        title: [{
          left: 'center',
          text: 'Network Traffic Trend'
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: xAxis
        },
        yAxis: {
          splitLine: { show: false },
          type: 'value'
        },
        series: [{
          data: data,
          type: 'line'
        }]
      }
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById('line-chart'))
        myChart.setOption(option)
        myChart.resize()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-content {
  margin-bottom: 15px;
  height: 100%;
}
.table-title {
  text-align: center;
  margin-left: 85px;
}
.daterange-block {
  width: 50%;
  text-align: center;
  margin: 10px 30px;
}
.el-pagination {
  margin-right: 10px;
  float: right;
}
</style>
