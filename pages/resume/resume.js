// pages/resume/resume.js
let config =require('../../config.js');
let utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    headImg:'',
    fillout:false,
    fillFirst:false,
    practiceData:[],
    honorData:[],
    eduData:[],
    eduTime:'2008-2012',
    practiceTime:'',
    honorTime:'',
    skillData:[],
    credentialData:[],
    massData:[],
    massTime: '',
    attachData:[],
    projectData:[],
    projectTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let canUser = wx.getStorageSync('canUser');
    let wxInfo = wx.getStorageSync('info');
    this.setData({
      userName: canUser.userName,
      headImg: wxInfo.avatarUrl
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  

  },
  //获取教育经历信息
  getEduInfos(){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.getEduInfos, 'get', {}).then(res => {
      wx.hideLoading()
      let time = [];
      res.map((item, index) => {
        let timeStart = ((utils.timestampToTime(item.startDate)).slice(0, 7)).replace(/-/, '.');
        let timeEnd = ((utils.timestampToTime(item.endDate)).slice(0, 7)).replace(/-/, '.');
        time.push(timeStart + '-' + timeEnd)
        return time
      })
      this.setData({
        eduData: res,
        eduTime: time,
      })
    }).catch(() => {
      wx.hideLoading();
      console.log('getEduInfos')
    })
  },

  //获取实习经历信息
  getPractice(workType){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.getPractices,'get',{
      workType: workType
    }).then(res=>{
      wx.hideLoading()
      let time = [];
      res.map((item, index) => {
        let timeStart = ((utils.timestampToTime(item.startDate)).slice(0, 7)).replace(/-/, '.');
        let timeEnd = ((utils.timestampToTime(item.endDate)).slice(0, 7)).replace(/-/, '.');
        time.push(timeStart + '-' + timeEnd)
        return time
      })
      this.setData({
        practiceData: workType == 3 ? res : this.data.practiceData,
        projectData: workType == 4 ? res : this.data.projectData,
        practiceTime: time,
        projectTime:time
      })
    }).catch(() => {
      wx.hideLoading();
      console.log('getPractice')
    })
  },
  //获取荣誉奖项信息
  getHonor() {
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.getAwards,'get',{}).then(res => {
      wx.hideLoading();
      let time = [];
      res.map((item, index) => {
        let timeStart = ((utils.timestampToTime(item.awardDate)).slice(0, 7)).replace(/-/, '.');
        time.push(timeStart)
        return time
      })
      this.setData({
        honorData: res,
        honorTime: time
      })
    }).catch(() => {
      wx.hideLoading();
      console.log('getHonor')
    })
  },
  //获得技能信息
  getSkills(types) {
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.getSkills,'get',{type:types}).then(res=>{
      wx.hideLoading()
      let time = [];
      res.map((item, index) => {
        let timeStart = ((utils.timestampToTime(item.startDate)).slice(0, 7)).replace(/-/, '.');
        time.push(timeStart)
        return time
      })
      this.setData({
        skillData: types == 1 ? res : this.data.skillData,
        credentialData: types == 2 ? res : this.data.credentialData
      })
    }).catch(()=>{
      wx.hideLoading();
      console.log('getSkills')
    })
  },
  //获得附加信息
  getAttchs(){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.getAttachs,'get',{}).then(res=>{
      wx.hideLoading()
      this.setData({
        attachData: res
      })
    }).catch(()=>{
      wx.hideLoading();
      console.log('getAttchs')
    })
  },
  //获取社团经历
  getMass(){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.getSchoolWorks,'get',{}).then(res=>{
      wx.hideLoading()
      let time = [];
      res.map((item, index) => {
        let timeStart = ((utils.timestampToTime(item.startDate)).slice(0, 7)).replace(/-/, '.');
        let timeEnd = ((utils.timestampToTime(item.endDate)).slice(0, 7)).replace(/-/, '.');
        time.push(timeStart + '-' + timeEnd)
        return time
      })
      this.setData({
        massData:res,
        massTime: time
      })
    }).catch(()=>{
      wx.hideLoading();
      console.log('getMass')
    })
  },
  
  
  //基本信息
  onInfo:function(){
    wx.navigateTo({
      url: '../info/info',
    })
  },
  //求职意向
  intention: function () {
    wx.navigateTo({
      url: '../intention/intention',
    })
  },
  
  //教育经历
  eduThrough:function(e){
    let id = e.currentTarget.dataset.id;
    let obj = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../education/education?id=" + id + "&obj=" + JSON.stringify(obj)
    })
  },
  //实习经历
  practiceTh: function (e) {
    let id = e.currentTarget.dataset.id;
    let obj = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../practice/practice?id="+id+"&obj="+JSON.stringify(obj)
    })
  },
  //项目经验
  projectTh:function (e) {
    let id = e.currentTarget.dataset.id;
    let obj = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../project/project?id=" + id + "&obj=" + JSON.stringify(obj)
    })
  },
  //荣誉奖项
  honorTh:function(e){
    let id = e.currentTarget.dataset.id;
    let obj = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../honor/honor?id=" + id + "&obj=" + JSON.stringify(obj)
    })
  },
  //社团经历
  massTh: function (e) {
    let id = e.currentTarget.dataset.id;
    let obj = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../mass/mass?id=" + id + "&obj=" + JSON.stringify(obj)
    })
  },
  //技能特长
  skillTh: function (e) {
    let id = e.currentTarget.dataset.id;
    let obj = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../skill/skill?id=" + id + "&obj=" + JSON.stringify(obj)
    })
  },
  //获得证书
  credential:function(e){
    let id = e.currentTarget.dataset.id;
    let obj = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../credential/credential?id=" + id + "&obj=" + JSON.stringify(obj)
    })
  },
  //附加信息
  proDescribe: function (e) {
    let id = e.currentTarget.dataset.id;
    let obj = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../attachs/attachs?id=" + id + "&obj=" + JSON.stringify(obj)
    })
  },
  //简历预览
  glance:function(){
    wx.navigateTo({
      url: '../preview/preview',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getEduInfos();
    this.getPractice(3);
    this.getPractice(4);
    this.getHonor();
    this.getSkills(1);
    this.getSkills(2);
    this.getAttchs();
    this.getMass();
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