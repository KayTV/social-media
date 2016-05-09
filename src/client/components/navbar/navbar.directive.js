(function() {
  'use strict';

  angular.module('app').directive('navBar', navbarDirective);

  function navbarDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/navbar/navbar.html',
      controller: navbarController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {}
    };
  }

  navbarController.$inject = ['$location', 'authFactory']

  function navbarController($location, authFactory) {
    var vm = this;
    vm.isActive = function(viewLocation){
      return viewLocation===$location.path();
    };

    vm.isAdmin = function() {
      return authFactory.getAdminStatus();
    }

    vm.isAuthenticated = function() {
      var auth = authFactory.getUserStatus();
      if(auth) {
        vm.user = authFactory.getUserName();
      }
      return auth;
    };
  }
})();
