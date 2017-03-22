'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.list', {
      url: '/list',
      templateUrl: 'views/list/main.html',
      controller: 'ListCtrl'
    })
   })
  .controller('ListCtrl', function ($scope) {
    $scope.setWeiXinTitle("数据展示");
    $scope.share("体简");    
  });
    