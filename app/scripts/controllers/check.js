'use strict';
angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.check', {
      abstract:true,
      url: '/check/:report_id',
      templateUrl: 'views/check/main.html',
      controller: 'CheckCtrl'
    })
    .state('app.check.list', {
      url: '/list',
      views:{
        'list':{
          templateUrl: 'views/check/list.html'
        },
        'report@app.check.list':{
          templateUrl: 'views/check/report.html'
        },
        'service@app.check.list':{
          templateUrl: 'views/check/service.html'
        },
        'analysis@app.check.list':{
          templateUrl: 'views/check/analysis.html'
        }, 
      }
    })
  })
  .controller('CheckCtrl', function ($scope, $stateParams, Report) {
    $scope.setWeiXinTitle("体检报告");
    $scope.share("体简");
    $scope.selecTabIndex = 0;
    $scope.exception_items = [];

    $scope.changeTab = function(index){
      $scope.selecTabIndex = index;
    }

    $scope.itemResult = function(item){
      // if (item.unit.length == 0) {   
        return item.item_result;
      // };
    }
   
    $scope.adviseResult = function(advise){
      var advises = advise.split('\r\n');
      advises.shift();
      return advises;
    }

    Report.getReportById($stateParams.report_id).then(function(response){
      $scope.report = response.data;
      $scope.check_items = response.data.report.check_items;
      $scope.check_items_keys = Object.keys($scope.check_items);//获取所有检查的项目 返回一个所有检查项目的数组
                                                                                                   
      $scope.advises = response.data.report.advice;
      console.log($scope.report);
      console.log($scope.check_items);
      console.log($scope.check_items_keys);
      // 遍历检查项目 修正 exception的值
      for(var key in $scope.check_items){
        var items = $scope.check_items[key]
        if(items.length == 0){
          delete $scope.check_items[key];
          var i = $scope.check_items_keys.indexOf(key);
          $scope.check_items_keys.splice(i, 1);
        }

        var item_array= ["通畅","未见明显异常","未见异常","未发现异常"];
        angular.forEach(items, function(item){
              if(item.exception){
               if(item.item_name == "身高"){
                  item.exception = false;
                  return;
               }
               for (var i = item_array.length - 1; i >= 0; i--) {
                 item_array[i];
                 if(item.item_result == item_array[i]){
                   item.exception = false;
                   return;
                 }
               };
               var low, high, result;
               try{
                   low = parseFloat(item.normal_low);
                   high = parseFloat(item.normal_high);
                   result = parseFloat(item.item_result);
                   if(!isNaN(low) && !isNaN(high) && !isNaN(result)){
                      if(low<= result <= high){                    
                          item.exception = false;
                      }else{
                         $scope.exception_items.push(item);
                      }
                   }else{
                     $scope.exception_items.push(item);
                   }                   
               }catch(e){
                $scope.exception_items.push(item);
               }             
             }
        });
      }
      
      console.log($scope.exception_items);
      // console.log($scope.exception_items[1].item_name);
    });
       
       
  });

    