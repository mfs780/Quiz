// public/js/controllers/QuizCtrl.js
angular.module('QuizCtrl', []).controller('QuizController', function($scope, $rootScope, $routeParams, Quiz, Answer) {

    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    // Variables
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.quizMain = {
        quiz: {
            name: "",
            timelimit: 10,
            questions: [],
            about: "",
            start: undefined,
            end: undefined,
            // questions: [
            //  {
            //      id: "",
            //      prompt: "",
            //      type: "",
            //      points: 10,
            //      answer: // True, False, 0-4, Text
            //      responses: "", // Bool, ["", ""], ""
            //  }
            // ]
        }
    };
    $scope.quizObj = $scope.quizMain.quiz;
    $scope.answerMain = {
        user: $rootScope.userId,
        quizId: undefined, //$scope.quizMain._id,
        answer: [], // {qid: 001i0, answer: x}
    };
    $scope.answerObj = $scope.answerMain.answer;
    $scope.currentQuestion = 0;

    // Get Quiz
    if ($scope.user && $routeParams.id) {
        Quiz.get($routeParams.id).success(function(data) {
            console.log('got', data);
            $scope.quizMain = data
            $scope.quizObj = $scope.quizMain.quiz;

            $scope.answerMain.quizId = $scope.quizMain._id;

            for (var i = 0; i < $scope.quizObj.questions.length; i++) {
                var question = $scope.quizObj.questions[i];
                var ans = {
                    qid: question.id,
                    answer: undefined
                };
                switch (question.type) {
                    case "Multiple Choice":
                        ans.answer = undefined;
                        break;
                    case "True and False":
                        ans.answer = undefined;
                        break;
                    case "Fill in the Blanks":
                        ans.answer = [];
                        break;
                    case "Short Answer":
                        ans.answer = "";
                        break;
                }
                $scope.answerObj.push(ans)
            };
        })
    };

    $scope.setQuestion = function(index) {
        $scope.currentQuestion = index;
        $scope.getBlankArr();
    };

    $scope.currQuestion = function() {
        return $scope.quizObj.questions[$scope.currentQuestion];
    };
    $scope.currAnswer = function() {
        return $scope.answerObj[$scope.currentQuestion];
    };

    $scope.getAlpha = function(index) {
        return ['A', 'B', 'C', 'D', 'E', ][index];
    };

    $scope.print = function() {
        console.log('quizMain', $scope.quizMain);
        console.log('answerMain', $scope.answerMain);
    };

    $scope.blankArray = {};

    $scope.getBlankArr = function(index) {
        if ($scope.currQuestion().type == 'Fill in the Blanks') {
            var prompt = $scope.currQuestion().prompt;
            var l = (prompt.split('_').length - 1);
            var promptArr = prompt.split('_');

            // Reset Responses
            $scope.currQuestion().responses.length = l;
            for (var i = 0; i < l; i++) {
                if (!($scope.currQuestion().responses[i])) {
                    $scope.currQuestion().responses[i] = "";
                }
            }

            var result = [];
            var numBoxes = 0;
            for (var i = 0; i < promptArr.length; i++) {
                var obj = {
                    text: promptArr[i],
                    box: false,
                    boxIndex: 0
                };
                if (numBoxes < l) {
                    obj.box = true;
                    obj.boxIndex = numBoxes;
                    numBoxes++;
                }
                result.push(obj);
            }


            $scope.blankArray = result;
        };
    };

    $scope.submitQuiz = function() {
        console.log('create', $scope.answerMain);
        Answer.create($scope.answerMain).success(function(data) {
            $scope.answerMain._id = data._id;
            console.log(data);
        });
        // if ($scope.quizMain._id) {
        //     console.log('update');
        //     $scope.quizMain.quiz.update_date = new Date();
        //     Quiz.update($scope.quizMain).success(function(data) {

        //     })
        // } else {
        //     console.log('create');
        //     $scope.quizMain.quiz.create_date = $scope.quizMain.quiz.update_date = new Date();
        //     Quiz.create($scope.quizMain).success(function(data) {
        //         $scope.quizMain._id = data._id;
        //     });
        // }
    };
});
