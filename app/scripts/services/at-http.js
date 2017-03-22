'use strict';

/**
 * @description
 * # at-http
 * Factory in the TiJian.
 */
angular.module('TiJian')
.service('ATHttpService', function($http, md5, base64, $cookies, $ionicPopup, ENV, sweet) {
    this.authorization = function(jsonString){
        if (ENV.isMock) {

        }else{
            return $cookies.get("token");
        };
    }

    this.http = function(theMethod, thePath, params){

        var httpAuthorization = this.authorization(JSON.stringify(params));
        return $http({       
                     method: theMethod, 
                     url: ENV.apiUrl + thePath,
                     data: params,
                     headers:{
                                'Accept' : "application/json",
                                'AUTHORIZATION': httpAuthorization
                            }
                    }).success(function(data,status,headers,config){

            }).error(function(data,status,headers,config){
       
                console.log("ERROR_STATUS:"+status+data);
                // if (ENV.isDebug) {
                if (status != 401 && status != 0 &&status != 402) {
                    $ionicPopup.alert({
                        title: "好像出错了 "+status,
                        template: data
                    });
                };
                
                if (status == 402) {
                    $ionicPopup.alert({
                        title: "好像出错了 "+status,
                        template: "验证码请求次数过多噢~"
                    });
                };

                if (status == 401) {
                    $cookies.remove("token");
                      if (/micromessenger/i.test(navigator.userAgent) && !ENV.isDebug ) {
                        location.href = "http://tijian.techmars.cn/api/v1/wx_auth/?redirect="
                                + base64.encode(window.location.href).replace(/=/g,'-').replace(/\//g,'_');
                      };
                }

            });
    }

    this.get = function(path){
        return this.http('GET', path, "{}");
    }


    this.post = function(path, params){
        return this.http('POST', path, params);
    }


    this.put = function(path, params){
        return this.http('PUT', path, params);
    }


    this.delete = function(path, params){
    	if (params == null){
    		params = "{}";
    	}
        return this.http('DELETE', path, params);
    }
});
