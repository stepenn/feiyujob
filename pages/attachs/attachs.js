// pages/attachs/attachs.js
let config = require('../../config.js');
let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beContent: "",
    itemId: '',
    itemObj: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      itemId: options.id,
      itemObj: options.obj
    })
    this.showItem(this.data.itemId, JSON.parse(this.data.itemObj))
  },
  showItem(id, obj) {
    if (id == this.data.itemId) {
      this.setData({
        beContent: obj.content
      })
    }
  },
  //获取描述
  getDes: function (e) {
    this.setData({
      beContent: e.detail.value
    })
  },
  save(){
    if(!this.data.beContent.length){
      wx.showToast({
        title: '请输入项目描述',
        icon: 'none',
        duration: 1000
      })
    }else{
      if (this.data.itemId == 'undefined'){
        this.getAttachs({
          list: [{
            content: this.data.beContent
          }]
        })
      }else{
        this.putAttachs();
      }
    }
  },
  deleteItem() {
    utils.request(config.service.deleteResume,'get',{
      id: this.data.itemId,
      type: 7
    }).then(res=>{
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 1500,
      })
    })
  },
  //更新附加信息
  putAttachs(){
    this.getAttachs({
      list: [{
        id:this.data.itemId,
        content: this.data.beContent
      }]
    })
  },
  //添加附加信息
  getAttachs: function (params) {
    utils.request(config.service.attachs,'post',params).then(res=>{
      wx.redirectTo({
        url: "../resume/resume"
      })
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