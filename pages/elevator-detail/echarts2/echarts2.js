// pages/elevator-detail/echarts2/echarts2.js
import * as echarts from '../../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      y: 15,
      y2: 25,
      x: 40,
      x2: 20
    },
    minInterval: 1,
    color: ["#57BE6C"],
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: [0, 0, 0, 0, 0, 0, 0]
    }]
  };
  chart.setOption(option);
  return chart;
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    echartsData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  observers: {
    'echartsData': function () {
      if (this.data.echartsData) {
        var array = [];
        for (var i = 0; i < this.data.echartsData.length; i++) {
          array.push(this.data.echartsData[i].LockBrakeTimes)
        }
        setTimeout(function () {
          chart.setOption({
            series: [{
              type: 'line',
              smooth: true,
              data: array
            }]
          })
        }, 500);
      }
    }
  } 
})
