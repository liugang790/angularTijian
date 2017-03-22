'use strict';

angular.module('TiJian')
.service('Wiki', function(ATHttpService, $q, $cookies, $location) {
	this.getBanners = function(params) {
		return ATHttpService.get("/v1/banners", params).success(function(data,status,headers,config){
			return data;
		});
	};
  
   this.getDisslist = function() {
		return ATHttpService.get("/v1/disslist").success(function(data,status,headers,config){
			return data;
		});
	};

  
   this.getSymplist = function() {
		return ATHttpService.get("/v1/symplist").success(function(data,status,headers,config){
			return data;
		});
	};
  
   this.getVblist = function() {
		return ATHttpService.get("/v1/vblist").success(function(data,status,headers,config){
			return data;
		});
	};


  
   this.getWordByRequestId = function(category, request_id) {
		return ATHttpService.get("/v1/"+category+"?id="+request_id).success(function(data,status,headers,config){
			return data;
		});
	};
});
