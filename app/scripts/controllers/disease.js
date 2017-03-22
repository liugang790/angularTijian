'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.disease', {
      abstract:true,
      url: '/disease/:type',
      templateUrl: 'views/disease/main.html',
      controller: 'DiseaseCtrl'
    })
    .state('app.disease.list', {
      url: '/list',
      views:{
        'list':{
            templateUrl: 'views/disease/list.html'
        },
        'sort@app.disease.list':{
            templateUrl: 'views/disease/sort.html'
        },
        'index@app.disease.list':{
            templateUrl: 'views/disease/index.html'
        }
      }
    })
  })
  .controller('DiseaseCtrl', function ($scope, $state, $stateParams, Wiki) {
    $scope.setWeiXinTitle("疾病百科");
    $scope.share("体简");
    $scope.selecTabIndex = 0;
    $scope.changeTab = function(index){
      $scope.selecTabIndex = index;
    }

    Wiki.getDisslist().then(function(response){
      $scope.category = response.data.category;
      $scope.disslist_keys =  Object.keys(response.data.category);
      $scope.alphatet = response.data.alphabet;
      console.log($scope.alphatet);
      $scope.alphatet_keys =  Object.keys(response.data.alphabet).sort(function(a,b){//将相加的数组已ID从大到小的顺序排列；
                                return a > b ? 1 : -1;//如果大于升序反之同样
                              });
    });

  });


    