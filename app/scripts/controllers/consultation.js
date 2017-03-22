'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.consultation', {
      abstract:true,
      url: '/consultation',
      templateUrl: 'views/consultation/main.html',
      controller: 'ConsultationCtrl'
    })
    .state('app.consultation.list', {
      url: '/list',
      views:{
        'list':{
          templateUrl: 'views/consultation/list.html'
        },
        'doctor@app.consultation.list':{
          templateUrl: 'views/doctor/doctor.html'
        }
      }
    })
  })
  .controller('ConsultationCtrl', function ($scope) {
 
    $scope.setWeiXinTitle("咨询医生");
    $scope.share("体简");    
  });
    