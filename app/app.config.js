
var app = angular.module('DemoApp', []);

app.controller('DemoAppController', ['$scope', '$http', function ($scope, $http) {   
   
    $scope.propertyName = null;
    $scope.reverse = false;
    $scope.loadAll = 2;
    $scope.redfonts = "redfonts"; 
    $scope.loadAllFunc = function () {
        $scope.loadAll = 1;
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

    $scope.checkValue = function (val) {
        if (val.percentChange == 0)
            return 'grayfonts';
        else if (val.percentChange > 0)
            return 'greenfonts';
        else
            return 'redfonts'
    }
}]);