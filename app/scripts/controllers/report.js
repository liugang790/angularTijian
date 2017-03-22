'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.report', {
      abstract:true,
      url: '/report',
      templateUrl: 'views/report/main.html',
      controller: 'ReportCtrl'
    })
    .state('app.report.list', {
      url: '/list',
      templateUrl: 'views/report/list.html',
      controller: 'ReportListCtrl'
    })
  })
  .controller('ReportCtrl', function ($scope) {
  })
  .controller('ReportListCtrl', function ($scope, Report, $state) {
    $scope.setWeiXinTitle("体简报告");
    $scope.share("体简");
    Report.getReports().then(function(response){
      if (response.data.unread.length > 0) {
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

    