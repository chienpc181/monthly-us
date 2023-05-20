var monthlyUs = angular.module('monthlyUs', ["ngRoute", 'ngMaterial', 'ngMessages']);

monthlyUs.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "views/home.html",
        controller: "HomeController"
    })
    .when("/budget/:id", {
        templateUrl: "views/budgetView.html",
        controller: "budgetViewController"
    }).otherwise({
        redirectTo: "/home"
    });
}]);

monthlyUs.controller('HomeController', function($scope, $http) {
    const currentPeriod = getCurrentPeriod();
    $http({
        method: "GET",
        // url: "http://localhost:3000/api/budgets",
        url: "https://monthly-us-be.vercel.app/api/budgets",
        params: {
            period: currentPeriod
        }
    })
    .then(function(response) {
        $scope.currentBudgets = response.data;
        console.log($scope.currentBudgets);
    }, function(error) {
        console.log('Error fetching data:', error);
    });
    function getCurrentPeriod() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // add 1 to get month number from 1 to 12, and pad with '0' if needed
        // const result = parseInt(`${year}${month}`);
        const result = year + month;
        return result
    }
});

monthlyUs.controller('budgetViewController', function($scope, $routeParams, $http, $mdDialog) {
    $scope.id = $routeParams.id;
    $http({
        method: "GET",
        // url: "http://localhost:3000/api/transactions",
        url: "https://monthly-us-be.vercel.app/api/transactions",
        params: {
            budgetId: $routeParams.id
        }
    })
    .then(function(response) {
        $scope.transactions = response.data;
        console.log($scope.transactions);
    }, function(error) {
        console.log('Error fetching data:', error);
    });

    $scope.addTransaction = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/add-transaction.html',
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application to prevent interaction outside of dialog
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          }).then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function () {
            $scope.status = 'You cancelled the dialog.';
          });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
          $mdDialog.hide();
        };
    
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
    
        $scope.ok = function () {
            $http({
                method: 'POST',
                // url: "http://localhost:3000/api/transactions",
                url: "https://monthly-us-be.vercel.app/api/transactions",
                data: {
                    budgetId: $routeParams.id,
                    amount: $scope.transaction.amount,
                    time: new Date(),
                    description: $scope.transaction.description,
                    reason: $scope.transaction.reason,
                }
            }).then(function successCallback(response) {
                console.log('New transaction added:', response.data);
            }, function errorCallback(response) {
                console.error('Error adding new transaction:', response.status, response.statusText);
            });
            $mdDialog.hide();
        };

        $scope.transaction = {
            amount: '',
            reason: '',
            description: ''
        }
    }
});

