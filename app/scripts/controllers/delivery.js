'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.delivery', {
      url: '/delivery',
      templateUrl: 'views/delivery/list.html',
      controller: 'DeliveryCtrl'
    })
  })
  .controller('DeliveryCtrl', function ($scope, sweet) {
    $scope.setWeiXinTitle("快递报告");
    $scope.share("体简");
    $scope.information_params = {};
    $scope.delivery = function(){
      if ($scope.information_params.address == "" || $scope.information_params.address == null ) {
        $scope.showAlert("地址");
        return;
      };
      if ($scope.information_params.name == "" || $scope.information_params.name == null ) {
        $scope.showAlert("姓名");
        return;
      };
       if ($scope.information_params.phone == "" || $scope.information_params.phone == null ) {
        $scope.showAlert("手机号码");
        return;
      };
     if ($scope.information_params.phone.length<7 || $scope.hospital_params.phone_number.length>15) {
        $scope.showHint("手机号码");
        return;
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


    