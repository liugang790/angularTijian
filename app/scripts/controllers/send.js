'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.send', {
      url: '/send',
      templateUrl: 'views/send/list.html',
      controller: 'SendCtrl'
    })
  })
  .controller('SendCtrl', function ($scope, sweet) {
    $scope.setWeiXinTitle("发送报告");
    $scope.share("体简")
    $scope.send_params = {};
    $scope.send = function(){
      if (!$scope.send_params.email.match("^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$")) {
        $scope.showHint("邮箱");
        return;
      }else{
        alert("发送成功");
      };

    }  
    $scope.showAlert = function(hint) {
        sweet.show({
          title:'',
          text:hint+"没有输入哟！",    
          confirmButtonText: "确定"
        });
     };
    $scope.showHint = function(hint) {
        sweet.show({
          title:'',
          text:"请输入正确的"+hint,    
          confirmButtonText: "确定"
        });
     };
  });

    