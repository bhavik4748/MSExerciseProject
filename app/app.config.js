
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
    controller: ['dataService', function (dataService) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.propertyName = null;
            ctrl.reverse = false;
            ctrl.loadAll = 2;
            ctrl.redfonts = "redfonts";
        }

        ctrl.loadAllFunc = function () {
            ctrl.loadAll = 1;
        }

        ctrl.sortBy = function (propertyName) {
            ctrl.reverse = (ctrl.propertyName === propertyName) ? !ctrl.reverse : false;
            ctrl.propertyName = propertyName;
        };

        dataService.makeHttpGetRequest().then(function (response) {
            ctrl.dataapi = response.data;
        }, function (reject) {
            return false;
        });

        ctrl.checkValue = function (val) {
            if (val.percentChange == 0)
                return 'grayfonts';
            else if (val.percentChange > 0)
                return 'greenfonts';
            else
                return 'redfonts'
        }
    }]
});