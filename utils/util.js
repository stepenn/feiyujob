let app = getApp();
const timestampToTime = timestamp =>{
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-',
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
  D = date.getDate() + ' ',
  h = date.getHours() + ':',
  m = date.getMinutes() + ':',
  s = date.getSeconds();
  return Y + M + D + h + m + s;
}
const curTime = ()=>{
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
const request = (url,method,data)=>{
  let header = {};
  let cookie = app.globalData.header.Cookie 
  if (cookie) {
    header["Cookie"] = cookie;
  }
  let promise = new Promise((resolve, reject)=>{
   wx.request({
     url: url,
     header:header,
     method:method,
     data:data,
     success:res=>{
       if(res.data.success){
         resolve(res.data.data);
       }else{
         reject(res.data.errMsg);
         if (res.data.errMsg ==='用户未登录'){
           wx.redirectTo({
             url: '../login/login',
           })
         }
       }
     },
     fail:()=>{
       reject('网络出错');
     }
   })
  });
  return promise;
}

module.exports = {
  timestampToTime,
  request,
  curTime
}
