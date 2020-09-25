<template>
  <!-- <div class="dashboard-container"   v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10"> -->
  <div class="dashboard-container">
    <div class="settings">
      <el-row>
        <el-col :span="1">
          <el-date-picker v-model="value2"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd 00:00:00"
                          @change="load"
                          :picker-options="pickerOptions"></el-date-picker>
        </el-col>
      </el-row>
      <el-table :data="tableData.filter(data => !search || data.entityName.toLowerCase().includes(search.toLowerCase()))"
                v-el-table-infinite-scroll="load"
                height="500"
                style="width: 100%;overflow:auto"
                :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="createdTime"
                         v-infinite-scroll="load"
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
    </div>
    <el-dialog title
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="clientAddress"
                      label-width="120px">
          <el-input v-model="form.clientAddress"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="browser"
                      label-width="120px">
          <el-input v-model="form.browser"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="os"
                      label-width="120px">
          <el-input v-model="form.os"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="device"
                      label-width="120px">
          <el-input v-model="form.device"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <span class="demonstration"></span>
    </div>
  </div>
</template>
<script>
import { getAuditLogs, getAuditLogsmore } from '@/api/audit'
import infiniteScroll from 'vue-infinite-scroll'
import { getpage } from '@/api/page'
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import moment from 'moment'

export default {
  directives: { infiniteScroll },
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },

  data() {
    return {
      count: 11,
      pickerOptions: '',
      count1: 11,
      busy: true,
      totalDate: 0,
      pageSize: 0,
      dialogFormVisible: false,
      form: {
        browser: '',
        clientAddress: '',
        device: '',
        os: ''
      },
      value2: '',
      search: '',
      tableData: [{}]
    }
  },
  computed: {
    disabled() {
      return this.busy
    }
  },
  methods: {
    load1() {
      this.count1 = 11
      var value1 = Math.floor(new Date(this.value2[0]).getTime())
      var value2 = Math.floor(new Date(this.value2[1]).getTime())
      getAuditLogsmore(value1, value2, this.count1).then((res) => {
        setTimeout(() => {
          this.count += 1
        }, 500)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].createdTime = moment(JSON.parse(res.data[i].createdTime)).format('YYYY-MM-DD hh:mm:ss')
        }
        this.tableData = res.data
      })
    },

    getMoreLog() {
      getAuditLogs(this.count).then((res) => {
        this.busy = res.hasNext
        this.count += 1
      })
    },
    updatepage() {
      getpage().then((res) => {
        this.totalDate = res.pageCount
        this.pageSize = res.pageSize
      })
    },
    load() {
      if (this.value2 !== '') {
        var value1 = Math.floor(new Date(this.value2[0]).getTime())
        var value2 = Math.floor(new Date(this.value2[1]).getTime())
        getAuditLogsmore(value1, value2, this.count1).then((res) => {
          setTimeout(() => {
            this.count1 += 1
          }, 500)
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].createdTime = moment(JSON.parse(res.data[i].createdTime)).format('YYYY-MM-DD hh:mm:ss')
          }
          this.tableData = res.data
        })
      } else {
        getAuditLogs(this.count).then((res) => {
          setTimeout(() => {
            this.count += 1
          }, 500)
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].createdTime = moment(JSON.parse(res.data[i].createdTime)).format('YYYY-MM-DD hh:mm:ss')
          }
          this.tableData = res.data
        })
      }
    },
    updatedeviceTable() {
      var count = 5
      getAuditLogs(count).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].createdTime = moment(JSON.parse(res.data[i].createdTime)).format('YYYY-MM-DD hh:mm:ss')
        }
        this.tableData = res.data
      })
    },
    handleDetail(index, row) {
      this.dialogFormVisible = true
      getAuditLogs(this.count).then((res) => {
        this.form.browser = res.data[index].actionData.browser
        this.form.clientAddress = res.data[index].actionData.clientAddress
        this.form.device = res.data[index].actionData.device
        this.form.os = res.data[index].actionData.os
      })
    }
  }
}
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
  &-i {
    font-size: 50px;
  }
}
</style>
