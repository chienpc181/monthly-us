angular.module('monthlyUs')
    .directive('totalCard', function() {
        return {
            restrict: 'E',
            scope: {
                category: '=',
            },
            templateUrl: 'directives/templates/total-card.html',
            controller: function($scope) {
                $scope.testButton = () => {
                    alert('total');
                }
            }
        };
    });