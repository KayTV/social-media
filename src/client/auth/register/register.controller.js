(function() {
  'use strict';

  angular.module('app')
  .controller('RegisterController', ['$scope', '$location', 'authFactory',
    function ($scope, $location, authFactory) {

      console.log(authFactory.getUserStatus());
      $scope.register = function () {
        // initial values
        $scope.error = false;
        $scope.disabled = true;
        // call register from service
        authFactory.register($scope.user.email, $scope.user.password)
          // handle success
          .then(function () {
            console.log('successful register');
            $location.path('/');
            $scope.disabled = false;
            $scope.user = {};
          })
          // handle error
          .catch(function (response) {
            console.log('error message', response);
            $scope.error = true;
            $scope.errorMessage = response.err.message
            $scope.disabled = false;
            $scope.user = {};
          });
      };

  }]);

})();
