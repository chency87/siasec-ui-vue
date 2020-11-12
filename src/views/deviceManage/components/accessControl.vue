<template>
  <div class="dashboard-container">
    <el-form :inline="true"
             :model="subRuleForm"
             status-icon
             :rules="rules"
             ref="subRuleForm"
             class="access-control-form">
      <el-form-item prop="action">
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
      <el-form-item prop="subRule">
        <el-input v-model="subRuleForm.subRule"
                  placeholder="请输入属性集规则"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="handleInsertRule('subRuleForm')"><i class="el-icon-upload el-icon--right">增加规则</i></el-button>
        <!-- @click="submitForm('ruleForm')" -->
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div class="grid-content">
      <el-table :data="accessRuleTable"
                style="width: 100%"
                close-on-press-escape
                :header-row-style="{height:'35px'}"
                :header-cell-style="{padding:'0px'}"
                :row-style="{height:'35px'}"
                :cell-style="{padding:'0px'}">

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
  </div>

</template>

<script>
import { getAccessPolicyByEntityId, saveAccessPolicyByEntityId, deleteAccessPolicyByEntityId } from '@/api/entityAccessControl'
import { getInitialAccessRule } from '@/api/constant-value'

export default {
  name: 'AccessControlPanel',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  computed: {
    computedDevId() {
      return this.deviceId
    }
  },
  data() {
    return {
      devId: this.deviceId,
      options: null,
      action_value: '',
      subRule: '',
      accessRuleTable: [],
      subRuleForm: {
        subRule: '',
        action: '',
        entityId: this.deviceId,
        entityType: 'DEVICE'
      },
      rules: {
        action: [
          { required: true, message: '请选择授权行为', trigger: 'change' }
        ],
        subRule: [
          { required: true, message: '请填写访问控制规则', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.options = getInitialAccessRule()
    this.getAccessPolicyByEntity('DEVICE', this.devId)
  },
  methods: {
    handleInsertRule(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveAccessPolicyByEntityId(this.subRuleForm).then(res => {
            this.$message.success('规则集添加成功')
            this.subRuleForm.subRule = ''
            this.getAccessPolicyByEntity(this.subRuleForm.entityType, this.subRuleForm.entityId)
          })
        } else {
          return false
        }
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
        this.$message.success('规则集删除成功')
        this.getAccessPolicyByEntity(this.subRuleForm.entityType, this.subRuleForm.entityId)
      })
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
    margin: 10px;
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
.el-divider {
  margin: 0 0;
}
</style>
