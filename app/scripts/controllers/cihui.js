'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.cihui', {
      url: '/cihui/:category',
      templateUrl: 'views/cihui/main.html',
      controller: 'CihuiCtrl'
    })
   })
  .controller('CihuiCtrl', function ($scope, $state, $stateParams, Wiki) {
    $scope.category = $stateParams.category;
    if ($stateParams.category == "cihui") {
      $scope.setWeiXinTitle("词汇百科");
      $scope.share("体简");
      Wiki.getVblist().then(function(response){
        $scope.alphatet = response.data;
        $scope.category = 'vb';
        $scope.alphatet_keys =  Object.keys(response.data);
      });
    }else{
      $scope.setWeiXinTitle("症状百科");
      $scope.share("体简");
      Wiki.getSymplist().then(function(response){
        $scope.alphatet = response.data;
        $scope.category = 'symp';
        $scope.alphatet_keys =  Object.keys(response.data).sort(function(a,b){
                                return a > b ? 1 : -1;
                              });
      });
    };


  });
    