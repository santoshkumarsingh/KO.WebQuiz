﻿function QuizViewModel() {
    var e = this;
    e.quizState = ko.observable("start");
    e.currentQuestion = ko.observable(0);
    e.correctAnswersVisible = ko.observable(false);
    e.questions = ko.observableArray(questionData);
    e.startQuiz = function () {
        e.quizState("inGame")
    };
    e.displayQuestion = ko.computed(function () {
        return e.questions()[e.currentQuestion()]["question"]
    });
    e.displayAnswers = ko.computed(function () {
        return e.questions()[e.currentQuestion()]["answers"]
    });
    e.answerIsChecked = function () {
        return e.questions()[e.currentQuestion()].currentAnswer()
    };
    e.questionsCount = function () {
        return e.questions().length
    };
    e.questionNumber = function () {
        return e.currentQuestion() + 1
    };
    e.gotoPrevious = function () {
        var t = e.currentQuestion();
        if (t > 0) {
            e.currentQuestion(t - 1);
            $("#alert-area").addClass("hide")
        }
    };
    e.gotoNext = function () {
        var t = e.currentQuestion();
        if (t + 1 < e.questionsCount() && e.questions()[t]["currentAnswer"]() !== -2) {
            e.currentQuestion(t + 1);
            $("#alert-area").addClass("hide")
        }
    };
    e.previousDisabled = function () {
        if (e.currentQuestion() === 0) {
            return true
        } else {
            return false
        }
    };
    e.nextDisabled = function () {
        var t = e.currentQuestion();
        if (e.questionsCount() <= t + 1 || e.questions()[t].currentAnswer() === -2) {
            return true
        } else {
            return false
        }
    };
    e.submitAnswer = function () {
        var t = e.currentQuestion();
        var n = e.questions()[t]["answers"].length;
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
            e.questions()[t].currentAnswer(r);
            var s = e.currentQuestion();
            if (s === e.questionsCount() - 1) {
                e.quizState("results")
            } else {
                e.currentQuestion(s + 1)
            }
        }
    };
    e.answersCorrect = function () {
        var t = 0;
        for (var n = 0; n < e.questionsCount() ; n++) {
            if (e.questions()[n]["currentAnswer"]() !== -2) {
                if (e.questions()[n]["currentAnswer"]() === e.questions()[n]["correctAnswer"]) {
                    t++
                }
            }
        }
        return t
    };
    e.answersIncorrect = function () {
        var t = 0;
        for (var n = 0; n < e.questionsCount() ; n++) {
            if (e.questions()[n]["currentAnswer"]() !== -2) {
                if (e.questions()[n]["currentAnswer"]() !== -1 && e.questions()[n]["currentAnswer"]() !== e.questions()[n]["correctAnswer"]) {
                    t++
                }
            }
        }
        return t
    };
    e.answersSkipped = function () {
        var t = 0;
        for (var n = 0; n < e.questionsCount() ; n++) {
            if (e.questions()[n]["currentAnswer"]() !== -2) {
                if (e.questions()[n]["currentAnswer"]() === -1) {
                    t++
                }
            }
        }
        return t
    };
    e.displayCorrectAnswers = function () {
        var t = [];
        for (var n = 0; n < e.questionsCount() ; n++) {
            var r = e.questions()[n]["correctAnswer"];
            var i = e.questions()[n]["currentAnswer"]();
            var s = "";
            var o = "";
            if (i === -1) {
                s = "Skipped";
                o = "skipped summary-skipped"
            } else if (i !== -2) {
                s = e.questions()[n]["answers"][i].answer;
                if (i === r) {
                    o = "correct"
                } else {
                    o = "incorrect"
                }
            }
            var u = e.questions()[n].question;
            var a = e.questions()[n]["answers"][r].answer;
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
    e.pointsTotal = function () {
        var t = 0;
        for (var n = 0; n < e.questionsCount() ; n++) {
            var r = e.questions()[n]["currentAnswer"]();
            if (r >= 0) {
                var i = e.questions()[n]["correctAnswer"];
                var s = e.questions()[n]["currentAnswer"]();
                if (i === s) {
                    t++
                } else {
                    t--
                }
            }
        }
        return t
    };
    e.toggleCorrectAnswerVisibility = function () {
        if (e.correctAnswersVisible() === true) {
            e.correctAnswersVisible(false)
        } else {
            e.correctAnswersVisible(true)
        }
    };
    e.restart = function () {
        for (var t = 0; t < e.questionsCount() ; t++) {
            e.questions()[t]["currentAnswer"](-2)
        }
        e.currentQuestion(0);
        e.quizState("inGame");
        e.correctAnswersVisible(false)
    }
}