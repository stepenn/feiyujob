import * as echarts from '../../ec-canvas/echarts.js';
const app = getApp();
let config = require('../../config.js');

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#fff",
    color: ["#35a7ff", "#f669ff"],
    tooltip: {},
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    radar: {
      name: {
        show: true, 
        textStyle: {
          color: '#286fbb',
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: '#286fbb' 
        }
      },

      indicator: [
      {   
        name: '社交能力',
        max: 100
      },
      {
        name: '技能水平',
        max: 100
      },
      {
        name: '工作经历',
        max: 100
      },
      {
        name: '学习能力',
        max: 100
      },
      {
        name: '院校实力',
        max: 100
      },
      
      ]
    },
    series: [{
      name: '社交 vs 实践',
      type: 'radar',
      data: [{
        value: [30, 40, 50, 30, 90, 40],
        name: '社交能力'
      },
      {
        value: [30, 40, 15, 30, 20, 50],
        name: '技能水平'
      }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart,
      awardWinningScore: '',//获奖得分
      educationalLevelScore:'',//教育水平
      scoreResume:'',//简历得分
      socialAbilityScore:'',//社交能力
      workExperienceScore:'',//工作经验
    }
  },
  //获取简历打分数据
  getScoreResume(){
    let header = {};
    let cookie = wx.getStorageSync("sessionid");
    if (cookie) {
      header["Cookie"] = cookie;
    } 
    wx.request({
      url: config.service.score,
      header:header,
      success:res=>{
        console.log(res)
      }
    })
  },
  onLoad(){
    this.getScoreResume();
  },
  onReady() {
  }
});
