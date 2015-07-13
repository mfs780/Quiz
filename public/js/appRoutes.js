// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'MainController'
        })
        // home page
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        // quiz page
        .when('/quiz/:id', {
            templateUrl: 'views/quiz.html',
            controller: 'QuizController'
        })
        // create page
        .when('/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateController'
        })
        // edit page
        .when('/edit/:id', {
            templateUrl: 'views/create.html',
            controller: 'CreateController'
        })


    // nerds page that will use the NerdController
    // .when('/nerds', {
    //     templateUrl: 'views/nerd.html',
    //     controller: 'NerdController'
    // });

    $locationProvider.html5Mode(true);

}]);
