(function() {
  'use strict';

  angular.module('app')
  .factory('authFactory', ['$q', '$timeout', '$http',
    function ($q, $timeout, $http) {

      // create user variable
      var user = null;
      var name = null;
      var admin = null;
      // return available functions for use in controllers
      return ({
        getUserStatus: getUserStatus,
        getUserName: getUserName,
        getAdminStatus: getAdminStatus,
        login: login,
        logout: logout,
        register: register
      });

      function getUserStatus() {
        if(user) {
          return true;
        } else {
          return false;
        }
      }

      function getUserName() {
        if(user) {
          return name;
        } else {
          return 'Guest';
        }
      }

      function getAdminStatus() {
        if(user) {
          return admin;
        } else {
          return false;
        }
      }

      function login(email, password) {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.post('/login', {email: email, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              console.log('logged in', data);
              user = true;
              name = data.email;
              admin = data.admin;
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });
        // return promise object
        return deferred.promise;
      }

      function logout() {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a get request to the server
        $http.get('/logout')
          // handle success
          .success(function (data) {
            user = false;
            name = '';
            admin = false;
            deferred.resolve();
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });
        // return promise object
        return deferred.promise;
      }

      function register(email, password) {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.post('/register', {email: email, password: password})
          // handle success
          .success(function (data, status) {
            console.log('in AuthFactory success', data, status);
            if(status === 200 && data.status){
              login(email, password);
              user = email;
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject(data);
          });
        // return promise object
        return deferred.promise;
      }

  }]);

})();
