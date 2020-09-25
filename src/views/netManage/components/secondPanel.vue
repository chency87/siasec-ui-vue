<template>
  <div>

    <el-row :gutter="40">
      <el-col :span="12">
        <div class="daterange-block">
          <el-date-picker v-model="value1"
                          type="datetimerange"
                          size="mini"
                          align="right"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['12:00:00', '08:00:00']"
                          @change="handleDateChange" />
        </div>
        <div id="bar-chart"
             style="height: 220px;" />
      </el-col>
      <el-col :span="12">
        <el-table :data="signatures"
                  border
                  size="mini"
                  fit
                  height="100%"
                  :header-row-style="{height:'20px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="width: 100%">
          <el-table-column label="Network Signatures"
                           header-align="center">
            <el-table-column prop="date"
                             label="日期" />
            <el-table-column prop="name"
                             label="姓名"
                             width="60" />
            <el-table-column prop="address"
                             label="地址"
                             width="60" />
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {

  name: 'SecondPanel',
  data() {
    return {
      value1: null,
      signatures: null
    }
  },
  computed: {

  },
  mounted() {
    const data = [22, 932, 901, 934, 1290, 1330, 13]
    this.drawBarChart(data)
  },
  created() {

  },
  updated() {

  },
  methods: {
    handleDateChange() {
      console.log(this.value1)
      const data = [820, 932, 901, 934, 1290, 1330, 13]
      this.drawBarChart(data)
    },
    drawBarChart(data) {
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data,
          type: 'line'
        }]
      }
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById('bar-chart'))
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
</style>
