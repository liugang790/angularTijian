'use strict';

angular.module('TiJian')
.service('Query', function(ATHttpService, $q) {
   
   this.getYanZhengMa = function(phone_number) {
		return ATHttpService.post("/v1/send_code/", {phone_number:phone_number}).success(function(data,status,headers,config){
			return data;
		});
	};


   this.createReportQuery = function(params) {
		return ATHttpService.put("/v1/query/", params).success(function(data,status,headers,config){
			return data;
		});
	};

});
