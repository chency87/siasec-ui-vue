<template>
  <div>
    <el-table :data="acidEvents"
              border
              size="mini"
              fit
              :header-row-style="{height:'20px'}"
              :header-cell-style="{padding:'0px'}"
              :row-style="{height:'20px'}"
              :cell-style="{padding:'0px'}"
              style="width: 100%"
              @row-click="handleAcidDetail">
      <el-table-column label="Abnormal Event Information"
                       header-align="center">
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
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange"
                   :current-page.sync="acidPageOffset"
                   :page-size="acidPageSize"
                   layout="total, prev, pager, next"
                   :total="acidTotalNum">
    </el-pagination>
  </div>
</template>
<script>
import {
  getAcidevent
} from '@/api/ids'
import moment from 'moment'

export default {

  name: 'ThirdPanel',
  data() {
    return {
      acidPageOffset: 1,
      acidPageSize: 10,
      acidTotalNum: 1,
      acidEvents: null
    }
  },
  computed: {

  },
  created() {
    this.initAcidEvents(1, 10)
  },
  methods: {
    handleAcidDetail(row, column, event) {
      console.log(row)
    },
    handleCurrentChange(val) {
      this.initAcidEvents(val, this.acidPageSize)
    },
    initAcidEvents(offset, pagesize) {
      getAcidevent(offset, pagesize).then(res => {
        this.acidEvents = res.list
        this.acidTotalNum = res.total
        this.acidEvents.forEach(item => {
          item['timestamp'] = moment(item['timestamp']).format('YYYY-MM-DD hh:mm:ss')
        })
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
.el-pagination {
  margin-right: 10px;
  float: right;
}
</style>
