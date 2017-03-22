'use strict';

angular.module('TiJian')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.login', {
      url: '/login',
      abstract:true,
      templateUrl: 'views/login/main.html',
      controller: 'LoginCtrl'
    })
    .state('app.login.list', {
      url: '/list',
      views:{
        'list':{
            templateUrl:'views/login/list.html'
          },
        'select@app.login.list':{
            templateUrl:'views/login/select.html'
        }
      }
    })
  })
  .controller('LoginCtrl', function ($scope, $state, md5, $interval, sweet, Query, Hospital, AppAuth, $cookies, User) {
    $scope.setWeiXinTitle("报告查询");
    $scope.share("体简");
    $scope.verifiticationCode = "获取验证码";
    $scope.hospital_params = {};
    // $scope.hospital_params.title = "华西保健医院";
    $scope.yanzhema_disable = true;
    $scope.button_disabled = true;
    $scope.selected_hospital = {};
    $scope.hospital_check=false;
    $scope.hospitals = [];
    var time = 0;
    if (AppAuth.currentUser.profile) {
      $scope.head_url = AppAuth.currentUser.profile.wx_account.headimgurl;
    }else{
      User.getUser().then(function(response){
        $cookies.put("i", JSON.stringify(response.data)); 
        if (response.data.wx_account) {
          $cookies.put("i", JSON.stringify(response.data));
          AppAuth.currentUser.profile = response.data;
          $scope.head_url = AppAuth.currentUser.profile.wx_account.headimgurl;
        }
      });
    };
    
    var code_md5 = $cookies.get('code_md5') || '';

    Hospital.getHospitals().then(function(response){
      $scope.hospitals = response.data;
      $scope.hospital = $scope.hospitals[0];
    });
    $scope.time_out = function(){
      time = 120;
      $scope.button_disabled = true;
      console.log($scope.hospital_params.phone_number);
      Query.getYanZhengMa($scope.hospital_params.phone_number).then(function(response){
        code_md5 = response.data.code_md5;
        $cookies.put('code_md5', code_md5);
      });
      $interval(function(){
        if (time <= 0) {
          $scope.button_disabled = false;
          $scope.verifiticationCode = "重新获取";
          return;
        };
        time--;
        $scope.verifiticationCode = "剩" + time + "秒";
      }, 1000);
    }
    $scope.phoneChange = function(){
      var phone_number = $scope.hospital_params.phone_number;
      if (typeof($scope.hospital_params.phone_number) == "number") {//typeof给什么类型返回什么类型 如：对于字符串类型，typeof返回值是string。比如typeof("123")返回的值是string
        phone_number = new Number($scope.hospital_params.phone_number).toString();
      };

      if ($scope.hospital_params.phone_number && phone_number.length == 11) {
        $scope.button_disabled = false;
      }else{
        $scope.button_disabled = true;
      }
    }

    $scope.hositalCheckChange =function(){
      $scope.hospital_check = !$scope.hospital_check;
    }
    $scope.check =function(hospital){
        $scope.hospital_params.title = $scope.hospital.name;
        $scope.hospital_params.hospital_id = $scope.hospital.id;
        $scope.hospital_check = false;
    }

    $scope.query = function(){
      var sms_code = $scope.hospital_params.sms_code;
      $scope.hospital_params.hospital_id = $scope.hospital.id;
      if (typeof(sms_code) == 'number') {
        sms_code = new Number(sms_code).toString();
      };

      if (sms_code.length !=6 || md5.createHash(sms_code) != code_md5) {
        $scope.showHint("验证码");
        return;
      }else{
        Query.createReportQuery($scope.hospital_params).then(function(response){
          $state.go('app.report.list');
        });
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

    