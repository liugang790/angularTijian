'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.noservice', {
      url: '/noservice',
      templateUrl: 'views/noservice/main.html',
      controller: 'NoserviceCtrl'
    })
   })
  .controller('NoserviceCtrl', function ($scope) {
    $scope.setWeiXinTitle("咨询医生");
    $scope.share("体简");    
  });
    