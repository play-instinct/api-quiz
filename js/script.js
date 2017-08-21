const state = {
	questions: [],
	currentQuestion: 0,

}


function bubbleSwitch(){
	$('#bubbles-switch').on('click', function(event){
		event.preventDefault();
		$(".bubble").toggleClass('hidden');
		checkText();
	})
}




function organizeData(data){
	console.log('in organize data function')
	console.log(data.results);
	const questions = data.results.map(item => ({
	question: item.question,
    correctAnswer: item.correct_answer,
    possibleAnswers: [...item.incorrect_answers, item.correct_answer],
	}));
	serveQuestions(questions)

}



function beginGame() {
	$('#start-button').on("click", function(){
		console.log('event handled');
		$('.intro-page').addClass('hidden');
		$('.quiz-page').removeClass('hidden');
	})
}


function clickAnswer(){
		$('.answer-choice').on('click', function(event){
		event.preventDefault();
		$('.answer-choice').addClass('inactive');
		$(this).addClass('chosen').removeClass('inactive');
		checkAnswerChoice();
	})
}

$(function(){
	bubbleSwitch();
	beginGame();
	clickAnswer();
});



function checkText(){
	let currentText;
	currentText = $('#bubbles-switch').text()
	if ($(".bubble").hasClass('hidden')) {

		$('#bubbles-switch').text('Turn ON distracting bubbles!')
	}	
	else {
		$('#bubbles-switch').text('Turn OFF distracting bubbles!')
		}
}

function checkAnswerChoice(){

}



$.ajax({
        url: "https://opentdb.com/api.php?amount=10",
        type: 'GET',
        dataType: 'json',
       success: organizeData,
       error: serveStaticQuestions
});


function serveQuestions(questions){
	questions.map(function(x) {
   	var questiontext = $('.question');
	questiontext.append(x.question)
	});

}





function serveStaticQuestions(){

}





