'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.talk', {
      url: '/talk',
      templateUrl: 'views/talk/main.html',
      controller: 'TalkCtrl'
    })
  })
  .controller('TalkCtrl', function ($scope) {
    $scope.setWeiXinTitle("体简在线客服");
    $scope.share("体简");    
  });

    