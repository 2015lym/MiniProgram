// pages/elevator-detail/echarts2/echarts2.js
import * as echarts from '../../../ec-canvas/echarts';

const app = getApp();


function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      y: 15,
      y2: 25,
      x: 35,
      x2: 20
    },
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
      data: [18, 36, 65, 30, 78, 40, 33]
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

  }
})
