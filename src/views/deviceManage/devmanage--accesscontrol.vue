<template>
  <div class="dashboard-container">

    <el-button type="text"
               @click="handleDialogTableVisible()">打开授权界面</el-button>

    <el-dialog title="访问控制规则管理"
               :visible.sync="dialogTableVisible"
               center>
      <el-form :inline="true"
               :model="subRuleForm"
               class="access-control-form">
        <el-form-item>
          <el-select v-model="subRuleForm.action"
                     clearable
                     placeholder="请选择ACTION">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="subRuleForm.subRule"
                    placeholder="请输入属性集规则"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="handleInsertRule"><i class="el-icon-upload el-icon--right">增加规则</i></el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>

      <div class="grid-content">
        <el-table :data="accessRuleTable"
                  style="width: 100%"
                  height="450"
                  close-on-press-escape>

          <el-table-column prop="act"
                           label="ACT"
                           width="180"
                           calss="success-row">
          </el-table-column>

          <el-table-column prop="rule"
                           label="RULE">
          </el-table-column>

          <el-table-column label="操作"
                           width="100">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="danger"
                         @click="handleDeleteAccessRule(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { getAccessPolicyByEntityId, saveAccessPolicyByEntityId, deleteAccessPolicyByEntityId } from '@/api/entityAccessControl'

// , saveAccessPolicyByEntityId, deleteAccessPolicyByEntityId

export default {
  name: 'DevManage',

  methods: {
    handleDialogTableVisible() {
      this.dialogTableVisible = true
      this.subRuleForm.entityType = 'DEVICE'
      this.subRuleForm.entityId = '7c48f780-e753-11ea-ae85-51dcbebeaadc'
      this.getAccessPolicyByEntity(this.subRuleForm.entityType, this.subRuleForm.entityId)
    },
    handleInsertRule() {
      saveAccessPolicyByEntityId(this.subRuleForm).then(res => {
        this.$message.success('规则集添加成功')
        this.subRuleForm.subRule = ''
        this.getAccessPolicyByEntity(this.subRuleForm.entityType, this.subRuleForm.entityId)
      })
    },
    getAccessPolicyByEntity(entityType, entityId) {
      const params = {
        entityType: entityType,
        entityId: entityId
      }
      getAccessPolicyByEntityId(params).then(res => {
        this.accessRuleTable = []
        res.forEach(row => {
          if (row[3] !== 'ALL') {
            const temp = {
              rule: row[0],
              entityType: row[1],
              entityId: row[2],
              act: row[3]
            }
            this.accessRuleTable.push(temp)
          }
        })
      })
    },
    handleDeleteAccessRule(index, row) {
      const param = {
        subRule: row.rule,
        action: row.act,
        entityType: row.entityType,
        entityId: row.entityId
      }
      deleteAccessPolicyByEntityId(param).then(res => {
        // const req = 'subRule=' + encodeURIComponent(this.subRuleForm.subRule) + '&action=' + this.subRuleForm.action + '&entityType=' + this.subRuleForm.entityType + '&entityId=' + this.subRuleForm.entityId
        this.$message.success('规则集删除成功')
        this.getAccessPolicyByEntity(this.subRuleForm.entityType, this.subRuleForm.entityId)
      })
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      subRuleForm: {
        subRule: '',
        action: '',
        entityId: '7c48f780-e753-11ea-ae85-51dcbebeaadc',
        entityType: 'DEVICE'
      },
      options: [{
        value: 'READ',
        label: '查看设备'
      }, {
        value: 'WRITE',
        label: '修改设备',
        disabled: true
      }, {
        value: 'DELETE',
        label: '删除设备'
      }, {
        value: 'EXEC_DATA_FETCH_JOB',
        label: '启停设备'
      }, {
        value: 'READ_CREDENTIALS',
        label: '查看接入标识'
      }, {
        value: 'WRITE_CREDENTIALS',
        label: '修改接入标识'
      }, {
        value: 'READ_ATTRIBUTES',
        label: '查看设备属性'
      }, {
        value: 'WRITE_ATTRIBUTES',
        label: '修改设备属性'
      }, {
        value: 'READ_TELEMETRY',
        label: '查看设备数据'
      }, {
        value: 'WRITE_TELEMETRY',
        label: '写入设备数据'
      }, {
        value: 'WRITE_ACCESS_RULE',
        label: '写入设备规则'
      }, {
        value: 'READ_ACCESS_RULE',
        label: '读取设备规则'
      }],
      action_value: '',
      subRule: '',
      accessRuleTable: []
    }
  }

}
</script>

<style lang="scss" scoped>
.el-table .tr {
  background: yellow;
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
.access-control-form {
  margin-left: 0px;
}
.access-control-form .el-select {
  width: 170px;
}
.access-control-form .el-input {
  margin-left: 10px;
  width: 550px;
}
// .el-row {
//   margin-bottom: 20px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// }
// .el-col {
//   border-radius: 4px;
// }
// .grid-content {
//   border-radius: 4px;
// }
// .row-bg {
//   background-color: #f9fafc;
// }
</style>
