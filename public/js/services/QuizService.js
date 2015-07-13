// public/js/services/QuizService.js
angular.module('QuizService', []).factory('Quiz', ['$http', function($http) {

    return {
        // call to get all quiz
        get: function(id) {
            if(id)
                return $http.get('/api/quiz/' + id)
            return $http.get('/api/quiz/');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create: function(quizData) {
            return $http.post('/api/quiz', quizData);
        },

        update: function(quizData) {
            return $http.put('/api/quiz', quizData);
        },

        // call to DELETE a nerd
        delete: function(id) {
            return $http.delete('/api/quiz/' + id);
        }
    }

}]);
