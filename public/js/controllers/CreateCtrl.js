// public/js/controllers/CreateCtrl.js
angular.module('CreateCtrl', []).controller('CreateController', function($scope, $routeParams, $location, Quiz) {

    if ($scope.user && $scope.userType == 'admin' && $routeParams.id) {
        Quiz.get($routeParams.id).success(function(data) {
            console.log('got', data);
            $scope.quizMain = data
            $scope.quizObj = $scope.quizMain.quiz;
        })
    }

    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    // Date Box

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.openStart = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.start_opened = true;
        $scope.end_opened = false;
    };
    $scope.openEnd = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.end_opened = true;
        $scope.start_opened = false;
    };

    $scope.questionTypes = [
        "Multiple Choice",
        "True and False",
        "Fill in the Blanks",
        "Short Answer",
    ];

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

    $scope.currentQuestion = 0;

    $scope.setQuestion = function(index) {
        $scope.currentQuestion = index;
        $scope.getBlankArr();
    };

    $scope.currQuestion = function() {
        return $scope.quizObj.questions[$scope.currentQuestion];
    };

    $scope.getAlpha = function(index) {
        return ['A', 'B', 'C', 'D', 'E', ][index];
    };

    $scope.print = function() {
        console.log('quizObj', $scope.quizObj);
    };

    $scope.changeStart = function() {
        if ($scope.quizObj.end && $scope.quizObj.start > $scope.quizObj.end) {
            $scope.quizObj.end = undefined;
        }
    };

    $scope.addQuestion = function() {
        $scope.currentQuestion = $scope.quizObj.questions.length;
        $scope.quizObj.questions.push({
            id: guid(),
            prompt: "",
            type: "Multiple Choice",
            points: 10,
            answer: 0,
            responses: ["", ""]
        });
    };

    $scope.changeQuestion = function() {
        var question = $scope.currQuestion();
        switch (question.type) {
            case "Multiple Choice":
                question.answer = 0;
                question.responses = ["", ""];
                break;
            case "True and False":
                question.answer = "True";
                question.responses = "Bool"
                break;
            case "Fill in the Blanks":
                question.answer = [];
                question.responses = "Fill";
                $scope.getBlankArr();
                break;
            case "Short Answer":
                question.answer = "Text";
                question.responses = "Text";
                break;
        }
    };

    $scope.removeQuestion = function(index) {
        $scope.quizObj.questions.splice($scope.currentQuestion, 1);
        $scope.currentQuestion = $scope.quizObj.questions.length ? $scope.quizObj.questions.length - 1 : 0;
    };

    $scope.addResponse = function() {
        var question = $scope.currQuestion();
        question.responses.push("");
    };

    $scope.removeResponse = function(index) {
        var question = $scope.currQuestion();
        if (question.answer == index) {
            question.answer = 0;
        }
        question.responses.splice(index, 1);
    };

    $scope.blankArray = {};

    $scope.getBlankArr = function(index) {
        if ($scope.currQuestion().type == 'Fill in the Blanks') {
            var prompt = $scope.currQuestion().prompt;
            var l = (prompt.split('_').length - 1);
            var promptArr = prompt.split('_');

            // Reset Responses
            $scope.currQuestion().answer.length = l;
            for (var i = 0; i < l; i++) {
                if (!($scope.currQuestion().answer[i])) {
                    $scope.currQuestion().answer[i] = "";
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

    $scope.assignQuiz = function() {
        if ($scope.quizMain._id) {
            $scope.quizMain.quiz.update_date = new Date();
            Quiz.update($scope.quizMain).success(function(data) {
                console.log('update');
                $location.url('/home');
            })
        } else {
            $scope.quizMain.quiz.create_date = $scope.quizMain.quiz.update_date = new Date();
            Quiz.create($scope.quizMain).success(function(data) {
                console.log('create');
                $scope.quizMain._id = data._id;
                $location.url('/home');
            });
        }
    };
});
