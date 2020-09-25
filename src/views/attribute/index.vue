<template>
  <div class="dashboard-container">

    <div class="settings">
      <div class="dashboard-text">
        属性: {{ name }}
        <el-form label-width="80%"
                 :model="userInfoDetail">
          <el-form-item label="上次登录时间">
            <el-input v-model="userInfoDetail.last"
                      :disabled="true" />
          </el-form-item>
        </el-form>
      </div>

      <el-row>
        <el-col :span="10"
                :offset="2">
          <el-form label-width="80px"
                   :model="userInfoDetail">
            <el-form-item label="电子邮件">
              <el-input v-model="userInfoDetail.address"
                        placeholder="请输入邮件地址"
                        prop="address" />
            </el-form-item>
            <el-form-item label="名字">
              <el-input v-model="userInfoDetail.firstname"
                        placeholder="请输入转发端口" />
            </el-form-item>
            <el-form-item label="姓">
              <el-input v-model="userInfoDetail.lastname"
                        placeholder="请输入用户名"></el-input>
            </el-form-item>
            <!-- <el-form-item label="语言">
              <el-select v-model="userInfoDetail.password"
                         placeholder="中文"></el-select>
            </el-form-item> -->

            <el-form-item>
              <el-button type="primary"
                         @click="dialogFormVisible = true">修改密码</el-button>

            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-dialog title="修改密码"
                 :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="旧密码"
                        label-width="120px"
                        prop="currentPass">
            <el-input type="password"
                      v-model="ruleForm.currentPass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="pass">
            <el-input type="password"
                      v-model="ruleForm.pass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="checkPass">
            <el-input type="password"
                      v-model="ruleForm.checkPass"
                      autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser, changePassword } from '@/api/auth'
import moment from 'moment'

export default {
  name: 'Setting',
  created() {
    this.update()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePassword(this.ruleForm.pass).then((res) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          })
        } else {
          this.$message.error({
            message: '两次输入密码不一致',
            type: 'success'
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    update() {
      getUser().then((res) => {
        this.userInfoDetail.address = res.email
        this.userInfoDetail.firstname = res.firstName
        this.userInfoDetail.lastname = res.lastName
        this.userInfoDetail.last = moment(JSON.parse(res.additionalInfo.lastLoginTs)).format('YYYY-MM-DD hh:mm:ss')
      })
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        currentPass: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再一次输入新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        currentPass: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ]
      },
      userInfoDetail: {
        address: '',
        username: '',
        password: '',
        topic: ''
      },
      dialogFormVisible: false,
      xinjiumima: {
        currentPassword: '',
        newPassword: ''
      },
      form: {
        jiu: '',
        xin: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
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
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &-i {
    font-size: 50px;
  }
}
.configitems {
  margin: 10px 50px;
}
</style>
