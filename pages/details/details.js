// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beContent: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      beContent: options.pro
    })
    if (options.id == 'undefined') {
      wx.removeStorageSync('proContent')
    }
  },
  //获取描述
  getDes: function (e) {
    this.setData({
      beContent: e.detail.value
    })
  },
  save: function () {
    if (this.data.beContent.length) {
      wx.setStorage({
        key: "proContent",
        data: this.data.beContent,
        success: function () {
          wx.navigateBack()
        }
      })
    } else {
      wx.showToast({
        title: '请输入项目描述',
        icon: 'none',
        duration: 1000
      })
    }
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
    let proContent = wx.getStorageSync('proContent');
    this.setData({
      beContent: proContent
    })
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