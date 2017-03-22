'use strict';

angular.module('TiJian')
.service('User', function(ATHttpService, $q, $cookies, $location) {
	this.login = function(params) {
		return ATHttpService.post("/v1/user/", params).success(function(data,status,headers,config){
			return data;
		});
	};
  
   this.getUser = function() {
		return ATHttpService.get("/v1/userinfo/").success(function(data,status,headers,config){
			return data;
		});
	};

});
