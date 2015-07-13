// public/js/controllers/AppCtrl.js
angular.module('AppCtrl', []).controller('AppController', function($scope, $http, $rootScope) {
    $rootScope.user = undefined;
    $rootScope.userId = undefined;
    $rootScope.userType = "student";

    $scope.logout = function() {
        $http.get('/logout').success()
        $rootScope.user = undefined;
        $rootScope.userType = "student";
    };
});
