'use strict';

angular.module('TiJian')
.service('Hospital', function(ATHttpService, $q, $cookies, $location) {
   
   this.getHospitals = function() {
		return ATHttpService.get("/v1/hospitals/").success(function(data,status,headers,config){
			return data;
		});
	};

});
