'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.vocabulary', {
      abstract:true,
      url: '/vocabulary',
      templateUrl: 'views/vocabulary/main.html',
      controller: 'VocabularyCtrl'
    })
    .state('app.vocabulary.list', {
      url: '/list/:category/:request_id',
      templateUrl: 'views/vocabulary/list.html',
      controller: 'VocabularyListCtrl'
    })
  })
  .controller('VocabularyCtrl', function ($scope) {
  })
  .controller('VocabularyListCtrl', function ($scope, $stateParams, Wiki) {
    $scope.share("体简");
    if ($stateParams.category == "vb") {
      $scope.setWeiXinTitle("词汇百科");

    }else{
      $scope.setWeiXinTitle("病症百科");
    }

    Wiki.getWordByRequestId($stateParams.category, $stateParams.request_id).then(function(response){
      $scope.word = response.data;
      console.log(response.data);
    });
  });

    