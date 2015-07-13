// public/js/services/AnswerService.js
angular.module('AnswerService', []).factory('Answer', ['$http', function($http) {

    return {
        // call to get all quiz
        get: function(id) {
            if(id)
                return $http.get('/api/answer/' + id)
            return $http.get('/api/answer/');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create: function(answerData) {
            return $http.post('/api/answer', answerData);
        },

        update: function(answerData) {
            return $http.put('/api/answer', answerData);
        },

        // call to DELETE a nerd
        delete: function(id) {
            return $http.delete('/api/answer/' + id);
        }
    }

}]);
