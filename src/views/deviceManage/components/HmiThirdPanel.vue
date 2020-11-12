 <template>
  <el-row :gutter="20">

    <el-col :span="12">
      <el-form label-width="120px">
        <!-- :model="transportCondition" -->
        <el-form-item label="请输入转发条件">
          <el-input v-model="transportCondition"
                    type="textarea"
                    placeholder="E.g return msg.temperature > 20;"></el-input>
        </el-form-item>
        <div class="tips">
          <span style="margin-right:20px;">E.g. return msg.temperature > 20;</span>
        </div>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmitTransportCondition">立即配置</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>

</template>

<script>
import { getDeviceTransportCondition, postDeviceTransportCondition } from '@/api/hmi'

export default {
  name: 'DevicehmiTransportPanel',
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
  created() {
    this.getDeviceTransportConfInfo()
  },
  data() {
    return {
      devId: this.deviceId,
      transportCondition: ''

    }
  },
  methods: {
    getDeviceTransportConfInfo() {
      getDeviceTransportCondition(this.deviceId).then(res => {
        this.transportCondition = res.jsScript
      })
    },
    onSubmitTransportCondition() {
      // {"jsScript":"if(metadata.transport == \"false\"){\n    return false;\n}\nif(metadata.deviceId === \"d684b360-f239-11ea-aa26-c148fbe7c0d8\" &&( msg.temperature > 20 && msg.temperature < 50)){\n    return true;    \n}\nreturn false;"}
      const params = {
        'jsScript': this.transportCondition
      }
      console.log(params)
      postDeviceTransportCondition(this.deviceId, params).then(res => {
        this.getDeviceTransportConfInfo()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  overflow: auto;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

.tips {
  font-size: 14px;
  color: burlywood;
  margin-bottom: 10px;
  margin-top: -5px;

  span {
    &:first-of-type {
      margin-left: 120px;
      margin-right: 16px;
    }
  }
}
</style>
