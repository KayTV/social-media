(function() {
  'use strict';

  angular.module('app')
  .controller('LoginController', ['$scope', '$location', 'authFactory',
    function ($scope, $location, authFactory) {

      console.log(authFactory.getUserStatus());

      $scope.login = function () {
        // initial values
        $scope.error = false;
        $scope.disabled = true;
        // call login from service
        authFactory.login($scope.user.email, $scope.user.password)
          // handle success
          .then(function () {
            $location.path('/');
            $scope.disabled = false;
            $scope.user = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.user = {};
          });
      };

  }]);

})();
