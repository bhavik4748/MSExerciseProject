
var app = angular.module('DemoApp', []);

app.service('dataService', ['$http', '$q',  function ($http, $q) {        
    this.makeHttpGetRequest = function (methodName) {
        var deferred = $q.defer();
        var req = {
            method: 'GET',
            url: '/app/data.json'           
        }

        try {
            $http(req).then(function (response) {
                if (response.status === 200)
                    deferred.resolve(response);               
            }, function (reject) {
                // add logging service to track reject response
                console.log(reject);
                deferred.reject(reject);
            });
        }
        catch (reject) {
            // add logging service to track reject response
            console.log(reject);
            deferred.reject(reject);
        }
        return deferred.promise;
    };

}]);

app.controller('DemoAppController', ['$scope',  function ($scope) {

}]);

app.component('demoComponent', {
    templateUrl: 'app/demoComponent.html',
    controller: ['$scope',  'dataService', function ($scope,  dataService) {
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

        dataService.makeHttpGetRequest().then(function (response) {
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
    }]
});