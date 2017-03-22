'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app', {
      abstract:true,
      url: '/app',
      templateUrl: 'views/home/main.html',
      controller: 'MainCtrl'
    })
    .state('app.home', {
      url: '',
      templateUrl: 'views/home/list.html',
      controller: 'HomeCtrl'
    })
  })
  .controller('MainCtrl', function ($scope, $cookies) {
  })
  .controller('HomeCtrl', function ($scope, $location, $cookies, $state) {
    $scope.setWeiXinTitle("体简");
    $scope.share("体简");
    $scope.token = $cookies.get('token');
    $scope.homeData = [{
      url:"app.login.list",
      name:"报告查询"
    },
    {
      url:"app.report.list",
      name:"体检报告"
    },
    {
      url:"app.consultation.list",
      name:"咨询医生"
    },
    {
      url:"app.doctor.list",
      name:"咨询医生doctor"
    },
    {
      url:"app.delivery",
      name:"快递报告"
    },
    {
      url:"app.send",
      name:"发送报告"
    },
    {
      url:"app.healthy.list",
      name:"健康百科"
    },
    {
      url:"app.check.list",
      name:"体检报告--详情"
    },
    {
      url:"app.detail.list",
      name:"疾病百科--详情"
    },
    {
      url:"app.disease.list",
      name:"疾病百科"
    },
    {
      url:"app.vocabulary.list",
      name:"词汇百科"
    },
    {
      url:"app.talk",
      name:"体简在线客服"
    },
    {
      url:"app.result",
      name:"检查结果"
    },
    {
      url:"app.history",
      name:"历史报告"
    },
    {
      url:"app.noservice",
      name:"报告服务"
    },
    {
      url:"app.user",
      name:"用户协议"
    },
    {
      url:"app.cihui",
      name:"词汇百科"
    },
    {
      url:"app.list",
      name:"数据列表"
    }]
  });

    