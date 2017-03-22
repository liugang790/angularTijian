'use strict';

/**
 * @ngdoc overview
 * @name TiJian
 * @description
 * # TiJian
 *
 * Main module of the application.
 */
angular.module('TiJian', [
  'config',
  'ngCookies',
  'ngRoute',
  'ngTouch',
  'ui.router',
  'angular-md5',
  'ab-base64',
  'ionic',
  'angular-carousel',
  'hSweetAlert',
  'ja.qr'
]).run(function($rootScope, $cookies, $location, ENV, AppAuth, base64, User) {
  AppAuth.ensureHasCurrentUser();
  var ua = navigator.userAgent;
  document.getElementById("spinner").style.display = "none";
  $rootScope.ua = navigator.userAgent;
  $rootScope.font_size = window.screen.width/7.5;//屏幕的分比率除以375*2(因为苹果手机是以2个像素为1个像素)算出1个像素的rem值再除以100是为了好算设计师所给出的PX像素
  $rootScope.swidth = window.screen.width;

  User.getUser().then(function(response){
      if (!response.data.wx_account) {
        if (/micromessenger/i.test(navigator.userAgent) && !ENV.isDebug ) {
                location.href = "http://tijian.techmars.cn/api/v1/wx_auth/?redirect="
                        + base64.encode(window.location.href).replace(/=/g,'-').replace(/\//g,'_');
              };
      };
      $cookies.put("i", JSON.stringify(response.data));
      if (response.data.wx_account) {
        $cookies.put("i", JSON.stringify(response.data));
        AppAuth.currentUser.profile = response.data;
      }
  });

  if(/android/i.test(ua)){
    var webkit = parseInt(ua.split('AppleWebKit/')[1].substring(0,3));//取出webkit/后的版本号  
    if (webkit < 537) {
        $rootScope.font_size = $rootScope.font_size / window.devicePixelRatio;//window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。公式表示就是：window.devicePixelRatio = 物理像素 / dips
    };
    $rootScope.is_android = true;//如果是安卓机型小于537版本的时候页面就会错位，所以除以 window.devicePixelRatio;
  }

  if(/iPhone|iPad|iPod/i.test(ua)){
      $rootScope.is_ios = true;
    }

  $rootScope.html_font_size = "font-size:"+ $rootScope.font_size +'px'; 
  $rootScope.swidth_rem = window.screen.width/$rootScope.font_size;
  
  $rootScope.compressImageUrl = function(url, height, width, is_not_jpg){
    if(!url){
      return null;
    }

    width = width || (window.screen.width / $rootScope.font_size);

    var pixels = width * height * $rootScope.font_size * $rootScope.font_size;
    if(/iPhone|iPad|iPod/i.test(ua)){
      pixels *= window.devicePixelRatio*window.devicePixelRatio;
    }
    if (/android/i.test(ua)) {
      pixels *= window.devicePixelRatio;
    };
    if (is_not_jpg) {
      return url+"?imageMogr2/thumbnail/"+ pixels+"@";
    };
    return url+"?imageMogr2/thumbnail/"+ pixels +"@/format/jpg";
  }

  $rootScope.setWeiXinTitle = function(title){
    if($rootScope.is_ios){   
      var body = document.getElementsByTagName('body')[0];
      document.title = title;
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", "http://7xls5t.com2.z0.glb.qiniucdn.com/loading.png");
      iframe.addEventListener('load', function() {
        setTimeout(function() {
          iframe.removeEventListener('load');
            document.body.removeChild(iframe);
          }, 0);
      });
      document.body.appendChild(iframe);
    }else{
      document.title = title;
    }
  }

  // WX.getWX({'url':window.location.href.split("#")[0]}).then(function(response){
  //       var wx_config = response.data;
  //       wx_config.jsApiList = ['onMenuShareTimeline',
  //       'onMenuShareAppMessage',
  //       'onMenuShareQQ',
  //       'onMenuShareWeibo',
  //       'onMenuShareQZone'];
  //       wx.config(wx_config);
  // });

  $rootScope.share = function(title, desc, imgUrl, link, success, cancel){

    var shareData = {
        title: title,
        desc: desc || '',        
        imgUrl: imgUrl || 'http://7xls5t.com2.z0.glb.qiniucdn.com/250.png',
        link: link,
        type: 'link',
        success: typeof(success) == "function" ? success() : function(){},
        cancel: typeof(cancel) == "function" ? cancel() : function(){},
    };

    wx.onMenuShareTimeline(shareData);
    wx.onMenuShareAppMessage(shareData);
    wx.onMenuShareQQ(shareData);
    wx.onMenuShareWeibo(shareData);
    wx.onMenuShareQZone(shareData);

  }

}).controller('RouteCtrl', function ($q, $scope, $state, $location, AppAuth, $cookies) {
    $location.path("/app");
  })
  .controller('LayoutCtrl', function ($scope, ENV, md5) {

  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
      url: '/login',
      template: '<login></login>',
      controller: 'LoginCtrl'
    }).state('register', {
      url: '/register',
      template: '<register></register>',
      controller: 'LoginCtrl'
    }).state('router', {
      url: '/router',
      template: '<div class="lockscreen" style="height: 100%"></div>',
      controller: 'RouteCtrl'
    });

    $urlRouterProvider.otherwise('/router');

  })

  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location, AppAuth) {
      return {
        responseError: function (rejection) {
          if (rejection.status) {};
          return $q.reject(rejection);
        }
      };
    });
  });
