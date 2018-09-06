// pages/preview/preview.js
let config = require('../../config.js');
let utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    practiceInfos:[],
    practiceTime:'',
    awardTime:'',
    schoolTime:'',
    awardInfos:[],
    schoolWorks:[],
    intentCity:'',
    intentJob:'',
    attachInfos:[],
    skillData: [],
    credentialData: [],
    practiceData:[],
    projectData:[],
    levelData:['校级','市级','省级','国家级'],
    highData:['未知','大专','本科','硕士','博士'],
    eduInfos:[],
    eduTime:'',
    name:'',
    age:'',
    hignEdu:'',
    telephone:'',
    headImg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wxInfo = wx.getStorageSync('info');
    this.setData({
      headImg: wxInfo.avatarUrl
    })
    
  },
  timeHander(obj){
    let time = [];
    obj.map((item, index) => {
      let timeStart = ((utils.timestampToTime(item.startDate)).slice(0, 7)).replace(/-/, '.');
      let timeEnd = ((utils.timestampToTime(item.endDate)).slice(0, 7)).replace(/-/, '.');
      time.push(timeStart + '-' + timeEnd)
    })
    return time
  },
  timeHanderS(obj) {
    let time = [];
    obj.map((item, index) => {
      let timeStart = ((utils.timestampToTime(item.awardDate)).slice(0, 7)).replace(/-/, '.');
      time.push(timeStart)
    })
    return time
  },
  getResume(){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.Allresume,'get',{}).then(res=>{
      wx.hideLoading();
      let timePra = this.timeHander(res.practiceInfos);
      let timeAward = this.timeHanderS(res.awardInfos);
      let timeSchool = this.timeHander(res.schoolWorks);
      let timeEdu = this.timeHander(res.userEduInfos);
      let skillData = [], credentialData = [], skill = res.skillInfos;
      let practiceData = [], projectData = [], project = res.practiceInfos;
      for(var i=0;i<skill.length;i++){
        if (skill[i].skillType == 1){
          skillData.push(skill[i])
        }else{
          credentialData.push(skill[i])
        }
      }
      for (var j = 0; j < project.length;j++){
        if(project[j].workType==3){
          practiceData.push(project[j])
        }else{
          projectData.push(project[j])
        }
      }
      this.setData({
        practiceTime: timePra,
        awardTime:timeAward,
        schoolTime: timeSchool,
        attachInfos: res.attachInfos,
        awardInfos: res.awardInfos,
        practiceInfos: res.practiceInfos,
        intentCity: res.resumeIntent.cityName,
        intentJob: res.resumeIntent.intentPosition,
        schoolWorks: res.schoolWorks,
        skillData: skillData,
        credentialData: credentialData,
        practiceData: practiceData,
        projectData: projectData,
        eduInfos: res.userEduInfos,
        eduTime: timeEdu
      })
      console.log(this.data.eduInfos)
    }).catch(()=>{
      wx.hideLoading();
      console.log(123)
    })
  },
  checkInfo() {
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.userInfo, 'get', {}).then(res => {
      wx.hideLoading();
      if(res){
        this.setData({
          name: res.name,
          sex: res.sex,
          age: res.age,
          hignEdu: res.hignEdu,
          telephone: res.telephone,
        })
      }
    }).catch(() => {
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkInfo();
    this.getResume();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})