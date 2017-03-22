'use strict';

angular.module('TiJian')
.service('Report', function(ATHttpService, $q, $cookies, $location) {
	this.getReports = function() {
		return ATHttpService.get("/v1/reports/").success(function(data,status,headers,config){
			return data;
		});
	};
  
   this.getReportById = function(report_id) {
		return ATHttpService.get("/v1/report/"+report_id+"/").success(function(data,status,headers,config){
			return data;
		});
	};

});
