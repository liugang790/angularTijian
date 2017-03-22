'use strict';

/**
 * @ngdoc service
 * @name TiJian.AppAuth
 * @description
 * # AppAuth
 * Factory in the TiJian.
 */
angular.module('TiJian')
  .factory('AppAuth', function ($cookies, base64, ENV) {
    return {
      currentUser: null,
      ensureHasCurrentUser: function() {
        if (this.currentUser) {

        } else {
          if (ENV.isDebug) {
            $cookies.put("token", ENV.fake_token);
          };
          if($cookies.get("token")){
            this.currentUser = {
               token : $cookies.get("token")
            };
          }else{
            this.currentUser = false;
              if (/micromessenger/i.test(navigator.userAgent) && !ENV.isDebug ) {
                location.href = "http://tijian.techmars.cn/api/v1/wx_auth/?redirect="
                        + base64.encode(window.location.href).replace(/=/g,'-').replace(/\//g,'_');
              };
          }
        }
      }

    };
  });
