'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.history', {
      url: '/history',
      templateUrl: 'views/history/main.html',
      controller: 'HistoryCtrl'
    })
   })
  .controller('HistoryCtrl', function ($scope, Report, $state) {
    $scope.setWeiXinTitle("历史档案");
    $scope.share("体简");  
    Report.getReports().then(function(response){
      if (response.data.unread) {
        $scope.reports = response.data;
        $scope.new_reports = $scope.reports.read.concat($scope.reports.unread); //数组相加
        $scope.new_reports = $scope.new_reports.sort(function(a,b){//将相加的数组已ID从打到小的顺序排列；
          return b.id > a.id ? 1 : -1;//如果大于升序反之同样
        });
        
      }else{
         $state.go('app.result');
      };    
    });

    $scope.seeReport = function(report_id){
      $state.go('app.check.list', {report_id:report_id});
    };  
  });
    