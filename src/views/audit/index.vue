<template>
  <!-- <div class="dashboard-container"   v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10"> -->
  <div class="dashboard-container">
    <el-row class="grid-content">
      <el-date-picker v-model="dateRangeForAudit"
                      type="datetimerange"
                      align="right"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['12:00:00', '08:00:00']"
                      @change="handleDateChange" />
    </el-row>
    <el-row class="bg-purple-dark chart-view">
      <el-table :data="auditTable.filter(data => !search || data.entityName.toLowerCase().includes(search.toLowerCase()))"
                v-el-table-infinite-scroll="loadAudit"
                height="650"
                style="width: 100%;overflow:auto"
                :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="createdTime"
                         label="时间"></el-table-column>
        <el-table-column prop="customerId.entityType"
                         label="类型"></el-table-column>
        <el-table-column prop="entityName"
                         label="名称"></el-table-column>
        <el-table-column prop="userName"
                         label="用户"
                         sortable></el-table-column>
        <el-table-column prop="actionType"
                         label="操作"
                         sortable></el-table-column>
        <el-table-column prop="actionStatus"
                         label="状态"
                         sortable></el-table-column>

        <el-table-column align="right">
          <template slot="header"
                    slot-scope="scope">
            <el-input v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini"
                       type="warning"
                       @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog width="30%"
               title="日志详情"
               :visible.sync="auditDetailVisible"
               append-to-body>
      <el-input type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                placeholder="请输入内容"
                v-model="auditDetail">
      </el-input>
    </el-dialog>
  </div>
</template>
<script>
import { getAuditLogs } from '@/api/audit'
import moment from 'moment'
import elTableInfiniteScroll from 'el-table-infinite-scroll'

export default {
  name: 'AuditManage',
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  components: {
  },
  created() {
    this.initAuditTableData(null, null, false, null, null, 10)
  },
  data() {
    return {
      auditDetail: '',
      auditDetailVisible: false,
      auditTable: [],
      search: '',
      dateRangeForAudit: [],
      hasNext: false,
      nextPageLink: null
    }
  },
  methods: {
    loadAudit() {
      if (this.hasNext) {
        this.initAuditTableData(this.nextPageLink.startTime, this.nextPageLink.endTime, this.nextPageLink.ascOrder, this.nextPageLink.idOffset, null, this.nextPageLink.limit)
      }
    },
    initAuditTableData(startTime, endTime, ascOrder, offset, actionTypes, limit) {
      getAuditLogs(startTime, endTime, ascOrder, offset, actionTypes, limit).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].createdTime = moment(JSON.parse(res.data[i].createdTime)).format('YYYY-MM-DD hh:mm:ss')
          this.auditTable.push(res.data[i])
        }
        // this.auditTable = res.concat(this.auditTable)

        this.hasNext = res.hasNext
        this.nextPageLink = res.nextPageLink
      })
    },
    handleDateChange() {
      if (this.dateRangeForAudit !== null) {
        this.dateRangeForAudit[0] = moment(this.dateRangeForAudit[0]).valueOf()
        this.dateRangeForAudit[1] = moment(this.dateRangeForAudit[1]).valueOf()
        this.initAuditTableData(this.dateRangeForAudit[0], this.dateRangeForAudit[1], false, null, null, 11)
      }
    },
    handleDetail(index, row) {
      this.auditDetail = JSON.stringify(row, null, 2)
      this.auditDetailVisible = true
    }

  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px 30px;
  }
}
.grid-content {
  border-radius: 4px;
  /* min-height: 180px; */
}
.bg-purple-dark {
  background: #e5e9f2;
}
.chart-view {
  margin-top: 20px;
  border-radius: 4px;
  min-height: 220px;
}
</style>
