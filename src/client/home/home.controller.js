angular.module('app')
.controller('HomeController', ['$scope', 'httpFactory', function($scope, httpFactory){
  $scope.title = 'Home';

}]);
