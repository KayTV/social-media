(function() {
  'use strict';

  angular.module('app')
  .controller('LogoutController', ['$scope', '$location', 'authFactory',
    function ($scope, $location, authFactory) {

      $scope.logout = function () {
        console.log(authFactory.getUserStatus());
        // call logout from service
        authFactory.logout()
          .then(function () {
            $location.path('/login');
          });
      };

  }]);

})();
