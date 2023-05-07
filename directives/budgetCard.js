angular.module('monthlyUs')
    .directive('budgetCard', function() {
        return {
            restrict: 'E',
            scope: {
                budget: '=',
            },
            templateUrl: 'directives/templates/budget-card.html',
            controller: function($scope, $location, $mdDialog, $http) {
                const budgetId = $scope.budget._id;
                // console.log(budgetId);
                $scope.gotoBudget = () => {
                    var path = "/budget/" + budgetId;
                    $location.path(path);   
                };
                // $scope.addTransaction = (budget) => {
                    
                // }
                
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
                            url: "http://monthly-us-be.vercel.app/api/transactions",
                            data: {
                                budgetId: budgetId,
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
            }
        };
    });