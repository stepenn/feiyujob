let qqmap = require('../../libs/qqmap-wx-jssdk.js');
var config = require('../../config.js');
Page({
  data: {
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],//字母排序
    cityListId: '',
    citylist: [],//城市列表信息
    newcity: [],//热门城市数据
  },

  //点击城市
  cityTap(e) {
    const val = e.currentTarget.dataset.val || '',
      types = e.currentTarget.dataset.types || '',
      Index = e.currentTarget.dataset.index || '';
    let city = '';
    switch (types) {
      case 'national':
        //全国
        city = '全国';
        break;
      case 'new':
        //热门城市
        city = val;
        break;
      case 'list':
        //城市列表
        city = val;
        break;
    }
    if (city) {
      wx.setStorage({
        key: 'city',
        data: city,
        success: function () {
          wx.navigateBack();   
        }
      })
      
    } 
  },
  //点击城市字母
  letterTap(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      cityListId: Item
    });
  },
  //获取热门城市
  getHotCity: function () {
    wx.request({
      url: config.service.hotCity,
      data: {
        level: 2,//1省 2市
        order: 1 //0 普通 1 热门
      },
      success: res => {
        let val = res.data.data;
        let valArr=[],hotCity=[];
        val.forEach((item,index)=>{
          valArr.push(item.city)
          return valArr
        })
        valArr.forEach(item=>{
          if (item.indexOf('市') !== -1) //这里是去掉“市”这个字
            item = item.slice(0, item.indexOf('市'));
            hotCity.push(item)
            return hotCity
        })
        this.setData({
          newcity: hotCity
        })

      }

    })
  },
  //获取普通城市
  getCityList:function(){
    wx.request({
      url: config.service.hotCity,
      data: {
        level: 2,//1省 2市
        order: 0 //0 普通 1 热门
      },
      success: res => {
       let city = res.data.data;
       //一维数组按首字母A-Z匹配变成二维数组
        var newData = [];
        city.forEach(function (v, i) {
          var n;
          for (var i = 0; i < newData.length; i++) {
            var t = newData[i];
            if (t.pinyin.substr(0, 1) == v.pinyin.substr(0, 1)) {
              n = t;
              break;
            }
          }
          if (!n) {
            var p = v.pinyin.substr(0, 1);
            n = { pinyin: p, data: [] };
            newData.push(n);
          }
          delete v.pinyin;
          n.data.push(v);
        });
        //按首字母A-Z排序
        let letter = this.data.letter;
        let sortData = [];
        for(var j = 0;j<letter.length;j++){
          for(var k=0;k<newData.length;k++){
            if (newData[k].pinyin == letter[j]){
              sortData.push(newData[k])
            }
          }
        }
        this.setData({
          citylist:sortData
        })
      }

    })
  },
  onLoad: function (options) {
    //this.getHotCity();
    this.getCityList();
  },
  onShow() {
  }
})