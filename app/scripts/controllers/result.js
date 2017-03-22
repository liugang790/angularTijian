'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.result', {
      url: '/result',
      templateUrl: 'views/result/main.html',
      controller: 'ResultCtrl'
    })
   })
  .controller('ResultCtrl', function ($scope) {
    $scope.setWeiXinTitle("检查结果");
    $scope.share("体简");    
  });
    