
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
        console.log(response.data.length);
        //$scope.dataapi = [];
        //var counter = 1;
        //angular.forEach(response.data, function (item) {
        //    $scope.dataapi.push(item);
        //    ++counter;
        //    if(counter > (response.data.length / 2) )
        //        break;

        //});
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