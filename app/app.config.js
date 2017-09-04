
var app = angular.module('DemoApp', []);

app.controller('DemoAppController', ['$scope', '$http', function ($scope, $http) {
    $scope.test = "Hello World";

    var sObj = {};
    $scope.propertyName = null;
    $scope.reverse = false;

    $scope.sort = function (obj) {
        //switch (obj) {
        //    case 1: sObj.accSort = 1;

        //}
        //console.log(obj);
        $scope.sortBy();
    }

    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $http.get('/app/data.json').then(function (response) { 
        $scope.dataapi = response.data;
    }, function (reject) {
        return false;
    });
  
}]);