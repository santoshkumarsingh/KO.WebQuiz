function QuizViewModel() {
    var self = this;
    self.quizState = ko.observable("start");
    self.currentQuestion = ko.observable(0);
    self.correctAnswersVisible = ko.observable(false);
    self.questions = ko.observableArray(questionData);
    self.startQuiz = function () {
        self.quizState("inGame")
    };
    self.displayQuestion = ko.computed(function () {
        return self.questions()[self.currentQuestion()]["question"]
    });
    self.displayAnswers = ko.computed(function () {
        return self.questions()[self.currentQuestion()]["answers"]
    });
    self.answerIsChecked = function () {
        return self.questions()[self.currentQuestion()].currentAnswer()
    };
    self.questionsCount = function () {
        return self.questions().length
    };
    self.questionNumber = function () {
        return self.currentQuestion() + 1
    };
    self.gotoPrevious = function () {
        var current = self.currentQuestion();
        if (current > 0) {
            self.currentQuestion(current - 1);
            $("#alert-area").addClass("hide")
        }
    };
    self.gotoNext = function () {
        var current = self.currentQuestion();
        if (current + 1 < self.questionsCount() && self.questions()[current]["currentAnswer"]() !== -2) {
            self.currentQuestion(t + 1);
            $("#alert-area").addClass("hide")
        }
    };
    self.previousDisabled = function () {
        if (self.currentQuestion() === 0) {
            return true
        } else {
            return false
        }
    };
    self.nextDisabled = function () {
        var current = self.currentQuestion();
        if (self.questionsCount() <= current + 1 || self.questions()[current].currentAnswer() === -2) {
            return true
        } else {
            return false
        }
    };
    self.submitAnswer = function () {
        var current = self.currentQuestion();
        var n = self.questions()[t]["answers"].length;
        var r = $("ul#answers input:radio:checked").val();
        var i = true;
        if (typeof r === "undefined") {
            i = true
        } else {
            r = parseInt(r, 10);
            if (r > -2 && r < n) {
                i = false
            }
        }
        if (i === true) {
            $("#alert-area").removeClass("hide")
        } else {
            $("#alert-area").addClass("hide");
            self.questions()[current].currentAnswer(r);
            var s = self.currentQuestion();
            if (s === self.questionsCount() - 1) {
                self.quizState("results")
            } else {
                self.currentQuestion(s + 1)
            }
        }
    };
    self.answersCorrect = function () {
        var t = 0;
        for (var n = 0; n < self.questionsCount() ; n++) {
            if (self.questions()[n]["currentAnswer"]() !== -2) {
                if (self.questions()[n]["currentAnswer"]() === self.questions()[n]["correctAnswer"]) {
                    t++
                }
            }
        }
        return t
    };
    self.answersIncorrect = function () {
        var t = 0;
        for (var n = 0; n < self.questionsCount() ; n++) {
            if (self.questions()[n]["currentAnswer"]() !== -2) {
                if (self.questions()[n]["currentAnswer"]() !== -1 && self.questions()[n]["currentAnswer"]() !== self.questions()[n]["correctAnswer"]) {
                    t++
                }
            }
        }
        return t
    };
    self.answersSkipped = function () {
        var t = 0;
        for (var n = 0; n < self.questionsCount() ; n++) {
            if (self.questions()[n]["currentAnswer"]() !== -2) {
                if (self.questions()[n]["currentAnswer"]() === -1) {
                    t++
                }
            }
        }
        return t
    };
    self.displayCorrectAnswers = function () {
        var t = [];
        for (var n = 0; n < self.questionsCount() ; n++) {
            var r = self.questions()[n]["correctAnswer"];
            var i = self.questions()[n]["currentAnswer"]();
            var s = "";
            var o = "";
            if (i === -1) {
                s = "Skipped";
                o = "skipped summary-skipped"
            } else if (i !== -2) {
                s = self.questions()[n]["answers"][i].answer;
                if (i === r) {
                    o = "correct"
                } else {
                    o = "incorrect"
                }
            }
            var u = self.questions()[n].question;
            var a = self.questions()[n]["answers"][r].answer;
            t.push({
                number: n + 1,
                question: u,
                correctAnswer: a,
                yourAnswer: s,
                cssClass: o
            })
        }
        return t
    };
    self.pointsTotal = function () {
        var t = 0;
        for (var n = 0; n < self.questionsCount() ; n++) {
            var r = self.questions()[n]["currentAnswer"]();
            if (r >= 0) {
                var i = self.questions()[n]["correctAnswer"];
                var s = self.questions()[n]["currentAnswer"]();
                if (i === s) {
                    t++
                } else {
                    t--
                }
            }
        }
        return t
    };
    self.toggleCorrectAnswerVisibility = function () {
        if (self.correctAnswersVisible() === true) {
            self.correctAnswersVisible(false)
        } else {
            self.correctAnswersVisible(true)
        }
    };
    self.restart = function () {
        for (var t = 0; t < self.questionsCount() ; t++) {
            self.questions()[t]["currentAnswer"](-2)
        }
        self.currentQuestion(0);
        self.quizState("inGame");
        self.correctAnswersVisible(false)
    }
}