'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.user', {
      url: '/user',
      templateUrl: 'views/user/main.html',
      controller: 'UserCtrl'
    })
   })
  .controller('UserCtrl', function ($scope) {
    $scope.setWeiXinTitle("用户协议");
    $scope.share("体简");    
  });
    