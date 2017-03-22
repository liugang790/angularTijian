'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.detail', {
      abstract:true,
      url: '/detail',
      templateUrl: 'views/detail/main.html',
      controller: 'DetailCtrl'
    })
    .state('app.detail.list', {
      url: '/list/:category/:request_id',
      templateUrl: 'views/detail/list.html',
      controller: 'DetailListCtrl'
    })
  })
  .controller('DetailCtrl', function ($scope) {
  })
  .controller('DetailListCtrl', function ($scope, $state, $stateParams, Wiki) {
    $scope.setWeiXinTitle("疾病百科");
    $scope.share("体简");

    Wiki.getWordByRequestId($stateParams.category, $stateParams.request_id).then(function(response){
      $scope.word = response.data;
    });
  });

    