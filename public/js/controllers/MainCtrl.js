// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $rootScope, $http, $q, Quiz) {

    var checkLogin = function() {
        var deferred = $q.defer();
        $http.get('/api/login').success(function(data) {
                if (data.google) {
                    $rootScope.user = data.google;
                    $rootScope.userId = data._id;
                    if($rootScope.user.email == "fahadsheikh780@gmail.com" || $rootScope.user.email == "sharmeenkazi@gmail.com"){
                    	$rootScope.userType = "admin";
                    }
                    
                    deferred.resolve(data);
                } else {
                    deferred.resolve(false);
                }
            })
            .error(function(data) {
                deferred.resolve(false);
            })
        return deferred.promise;
    };

    checkLogin()
        .then(function(data) {
            if (data) {
            	console.log($rootScope.user, $rootScope.userType);
                Quiz.get().success(function(data) {
                    $scope.quizzes = data;

                    console.log($scope.quizzes)
                });
            }

        })

    $scope.getDate = function(date) {
        return new Date(date).toLocaleDateString("en-US");
    }

    $scope.login = function(url) {
        $http.get(url)
    }

});
