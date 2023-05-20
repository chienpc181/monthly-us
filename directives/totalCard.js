var template = require('./templates/total-card.html');
angular.module('monthlyUs')
    .directive('totalCard', function() {
        return {
            restrict: 'E',
            scope: {
                category: '=',
            },
            template: template.default,
            controller: function($scope) {
                $scope.testButton = () => {
                    alert('total');
                }
            }
        };
    });