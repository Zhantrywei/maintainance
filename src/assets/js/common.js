export default {
  test: function () {
    alert(123);
  },

  //JS操作cookies方法!
  //写cookies
  setCookie: function (name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString();
  },
  // 读取cookies
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return decodeURI(arr[2]);
    else
      return null;
  },
  // 删除cookies
  delCookie: function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },

  //格式化时间戳
  showTime: function (time) {
    var time = new Date(time);
    var y = time.getFullYear(); //年
    var m = time.getMonth() + 1; //月
    var d = time.getDate(); //日
    var h = time.getHours(); //时
    var mm = time.getMinutes(); //分
    var s = time.getSeconds(); //秒
    return y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
  }
}
