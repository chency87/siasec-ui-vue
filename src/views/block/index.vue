<template>
  <div class='dashboard-container'
       style='text-align: center'>
    <div class='demo-image'>
      <el-image style='margin: 20px auto;width: 1500px; height: 300px'
                :src='url'></el-image>
      <div class='tableCenter'>
        <el-table :data='tableData'
                  border
                  :show-header='false'
                  style='margin: 20px auto;width: 40%;'>
          <el-table-column prop='xitong'
                           label></el-table-column>
          <el-table-column prop='systemName'
                           label></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getsysPatameter } from '@/api/first'

export default {
  data() {
    return {
      fits: [''],
      url: require('@/assets/imgs/first.png'),
      tableData: [
        {
          xitong: '系统名称',
          systemName: ''
        },
        {
          xitong: '版本',
          systemName: ''
        },
        {
          xitong: '运行时间',
          systemName: ''
        },
        {
          xitong: 'CPU利用率',
          systemName: ''
        },
        {
          xitong: '内存利用率',
          systemName: ''
        },
        {
          xitong: 'swap利用率',
          systemName: ''
        },
        {
          xitong: '存储空间利用率',
          systemName: ''
        },
        {
          xitong: '设备个数',
          systemName: ''
        },
        {
          xitong: '协议数',
          systemName: ''
        },
        {
          xitong: '缓存数据量',
          systemName: ''
        }
      ]
    }
  },
  created() {
    this.updatedsysPara()
  },
  methods: {
    // toggleFullscreen() {
    //   this.$router.push({
    //     path: '/netManage',

    //   });
    //   let _this = this;
    //   let el = document.documentElement;
    //   if (document.fullscreenElement === null) {
    //     _this.openFullscreen(el);
    //   } else {
    //     _this.quitFullscreen();
    //   }
    // },
    // openFullscreen(element) {
    //   if (element.requestFullscreen) {
    //     element.requestFullscreen();
    //   } else if (element.webkitRequestFullScreen) {
    //     element.webkitRequestFullScreen();
    //   } else if (element.mozRequestFullScreen) {
    //     element.mozRequestFullScreen();
    //   } else if (element.msRequestFullscreen) {
    //     // IE11
    //     element.msRequestFullscreen();
    //   }
    // },
    // quitFullscreen() {
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   } else if (document.webkitCancelFullScreen) {
    //     document.webkitCancelFullScreen();
    //   } else if (document.mozCancelFullScreen) {
    //     document.mozCancelFullScreen();
    //   } else if (document.msExitFullscreen) {
    //     document.msExitFullscreen();
    //   }
    // },
    // getKeyDown(e) {
    //   let _this = this;
    //   if (event.keyCode === 122) {
    //     event.preventDefault() || (event.returnValue = false);
    //     _this.toggleFullscreen(); // 触发全屏的按钮
    //   } else if (event.keyCode === 27) {
    //     if (document.fullscreenElement !== null) {
    //       _this.quitFullScreen();
    //     }
    //   }
    // },
    updatedsysPara() {
      getsysPatameter().then((res) => {
        // console.log(res.data[0].createdTime);
        // this.tableData = res

        this.tableData[0].systemName = res[0].systemName;
        this.tableData[1].systemName = res[0].systemVersion;
        this.tableData[2].systemName = res[0].runningTime;
        this.tableData[3].systemName = res[0].cpuUtilization;
        this.tableData[4].systemName = res[0].memoryUtilization;
        this.tableData[5].systemName = res[0].swapUtilization;
        this.tableData[6].systemName = res[0].storageSpaceUtilization;
        this.tableData[7].systemName = res[0].numOfDevice;
        this.tableData[8].systemName = res[0].numOfProtocol;
        this.tableData[9].systemName = res[0].numOfDataCache;
      })
    }
  },
  mounted() {
    // window.addEventListener('keydown', this.getKeyDown);
  }
}
</script>
<style >
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>>
