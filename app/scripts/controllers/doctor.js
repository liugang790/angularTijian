'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.doctor', {
      abstract:true,
      url: '/doctor',
      templateUrl: 'views/doctor/main.html',
      controller: 'DoctorCtrl'
    })
    .state('app.doctor.list', {
      url: '/list', 
     views:{
      'list':{
        templateUrl: 'views/doctor/list.html'
      },
      'doctor_list@app.doctor.list':{
         templateUrl: 'views/doctor/doctor.html'
      }
     }
    })
  })
  .controller('DoctorCtrl', function ($scope) {
    $scope.setWeiXinTitle("咨询医生");
    $scope.share("体简");  
  });
