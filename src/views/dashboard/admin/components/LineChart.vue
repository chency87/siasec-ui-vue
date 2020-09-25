<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { networkabnormalcountinfo } from "@/api/traffic";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created(){
    this.update();
  },
  methods: {
    update(){
       networkabnormalcountinfo().then((res) => {
      
      console.log(res.xAxis);
       this.xAxis.data=res.xAxis;
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      console.log(sessionStorage.getItem("key"));
      var data2=sessionStorage.getItem("key");
      var data1=data2.split(",")
      // data1=data1.splice(1,9)
      // console.log(data1);
      //  var data1=
      this.chart.setOption({
        xAxis: {
          // data: ['2020-08-16 13:47:48', '2020-08-17 13:47:48', '2020-08-18 13:47:48', '2020-08-19 13:47:48', '2020-08-20 13:47:48', '2020-08-21 13:47:48', '2020-08-22 13:47:48', '2020-08-22 13:47:48', '2020-08-22 13:47:48', '2020-08-22 13:47:48'],
          data: data1,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 60,
          right: 60,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [{
          name: 'expected', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
