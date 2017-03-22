'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.healthy', {
      abstract:true,
      url: '/healthy',
      templateUrl: 'views/healthy/main.html',
      controller: 'HealthyCtrl'
    })
    .state('app.healthy.list', {
      url: '/list',
      templateUrl: 'views/healthy/list.html',
      controller: 'HealthyListCtrl'
    })
  })
  .controller('HealthyCtrl', function ($scope) {
  })
  .controller('HealthyListCtrl', function ($scope, Wiki) {
    $scope.setWeiXinTitle("健康百科");
    $scope.share("体简");
    $scope.banners = [{
                 seq:1,
                 link_to:"#",
                 img_url:"http://7xnsso.com2.z0.glb.qiniucdn.com/picture.jpg",
                 description:"体简教你自诊、自查、自解"
              },
              {
                 seq:2,
                 link_to:"#",
                 img_url:"http://7xnsso.com2.z0.glb.qiniucdn.com/picture.jpg",
                 description:"体简教你自诊、自查、自解"
              },
              {
                 seq:3,
                 link_to:"#",
                 img_url:"http://7xnsso.com2.z0.glb.qiniucdn.com/picture.jpg",
                 description:"体简教你自诊、自查、自解"
              }];
    // Wiki.getBanners().then(function(response){
    //   if (response.data.length > 0) {
    //     $scope.banners = response.data.items;
    //     console.log( response.data.items); c
    //   };
    // });

    $scope.bannerClicked = function(banner){
      window.location.href = banner.link_to;
    }
  });

    