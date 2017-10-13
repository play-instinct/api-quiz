const state = {
	questions: [],
	currentQuestion: 0,
	correctCount: 0,

}


function bubbleSwitch(){
	$('#bubbles-switch').on('click', function(event){
		event.preventDefault();
		$(".bubble").toggleClass('hidden');
		checkText();
	})
}


function removefailedOption(){
	console.log('failed');
	$('#category').parent().parent().remove();
}


function organizeData(data){
	console.log('in organize data function')
	console.log(data.results);
	const questions = data.results.map(item => ({
	question: item.question,
    correctAnswer: item.correct_answer,
    possibleAnswers: [...item.incorrect_answers, item.correct_answer],
	}));
	state.questions = questions
	beginGame();
	renderQuestion();


}


function changeQuestionOptions(category, difficulty,){
	$.ajax({
        url: 'https://opentdb.com/api.php?amount=10' + '&category=' + category +  '&difficulty=' + difficulty,
        type: 'GET',
        dataType: 'json',
        timeout: 1000,
       success: organizeData,
       error: serveStaticQuestions
   })
}


function organizeOptions(data){
	console.log('organizing results of options');
	const categories = data.trivia_categories.map(item => ({
		category: item.name,
		foo: "bar"
	}));

	console.log(categories[0].category)
	const selectors = categories.map( item => '<option value="' + item.category + '"' +  'aria-labelledby="' + item.category + '"' + '>' + item.category + '</option>');

	const selecttag = $("#category").html(selectors);
	$("#category").append('<option value="random" selected>Any Category</option>')
}


function playAgain() {
	location.reload();
}




function beginGame() {	
	$('#start-button').text('Start Quiz').prop('disabled', false);
	$('#start-button').on("click", function(){
		console.log('event handled');
		$('.intro-page').addClass('hidden');
		$('.quiz-page').removeClass('hidden');
		changeQuestionNumber();
		$('#next-question').hide();
	})

}


function clickAnswer(){
	$(function() {
		$('.choice-wrapper').on('click', 'input', () => {
	        const userChoice = $('input[name=answerchoice]:checked').val();
			console.log(userChoice);
			checkAnswerChoice(userChoice)
			$('#next-question').show();
	    });
	})
}


function showCorrect(){
	$("input:radio").find()
}

function showCorrectAnswer(string){

}

function checkText(){
	let currentText;
	currentText = $('#bubbles-switch').text()
	if ($(".bubble").hasClass('hidden')) {

		$('#bubbles-switch').text('Turn ON Distracting Bubbles!')
	}	
	else {
		$('#bubbles-switch').text('Turn OFF Distracting Bubbles!')
		}
}

function checkAnswerChoice(userChoice){
	const correctAnswer = state.questions[state.currentQuestion].correctAnswer;
	const radio = $('input[value="' + correctAnswer + '"]');
	radio.parent().addClass('correct');
	if (userChoice === correctAnswer) {
		console.log('correct');
		const correct = $('input[name=answerchoice]:checked');
		correct.parent().addClass('correct');
		state.correctCount++;
	}
	else {
		const inCorrect = $('input[name=answerchoice]:checked');
		inCorrect.parent().addClass('incorrect');
		showCorrectAnswer(correctAnswer)
	}
	
}


function getData(){
	$.ajax({
        url: 'https://opentdb.com/api.php?amount=10',
        type: 'GET',
        dataType: 'json',
        timeout: 1000,
       success: organizeData,
       error: serveStaticQuestions
   })
}


function getCategories(){
	$.ajax({
        url: 'https://opentdb.com/api_category.php',
        type: 'GET',
        dataType: 'json',
        timeout: 1000,
       success: organizeOptions,
       error: removefailedOption
   })	
}

function changeQuestionNumber() {
	const currentQuestionNumber = (state.currentQuestion + 1);
	$('h1').text('Question ' + currentQuestionNumber + "/10" );
}

function renderQuestion() {
	const currQuestionText = state.questions[state.currentQuestion].question;
    $('.question').html(currQuestionText).text();
    const possibleAnswers = state.questions[state.currentQuestion].possibleAnswers
    const answersHtml = possibleAnswers.map( item => '<li><input type="radio" name="answerchoice" aria-labelledby="' + item +'"' + 'value="' + item + '">' + item + '</li>');
    $('#choices').html(answersHtml);
    $('#next-question').hide();

}

function renderResultsPage() {
	$('.quiz-page').empty();
	$('.quiz-page').html(
		'<h1 class="results-page-title animated fadeInUp">Game Over!</h1><h5 class="number-correct">Number Correct: ' + state.correctCount + '/10 </h5><div class="play-again-container"><div class="gif"><img src="beer.gif"></div><button id="play-again" onclick="playAgain();">Play Again</button></div> ' +
		'<p class="signature animated fadeInUp"> Made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="mailto:ykatesque@gmail.com" class="email-link">Ykat</a></p>');


}



function nextQuestion() {
	if (state.currentQuestion < state.questions.length - 1){
	state.currentQuestion++;
    renderQuestion();
    changeQuestionNumber();
	}
	else {
		renderResultsPage()
	}
	$("input:radio").attr("checked", false);
}



function closeModal(){
	$('.exit-options').on("click", function(e){
		e.preventDefault();
		$('.options-modal').addClass('hidden');
		$('.intro-page').removeClass('hidden')
	})

}

function serveStaticQuestions(){
	console.log('in static')
	const data = {"response_code":0,"results":[{"category":"Science: Computers","type":"boolean","difficulty":"medium","question":"The HTML5 standard was published in 2014.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Science & Nature","type":"multiple","difficulty":"hard","question":"Which of the following liquids is least viscous? Assume temperature is 25&deg;C.","correct_answer":"Acetone","incorrect_answers":["Water","Mercury","Benzene"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"Who wrote and directed the 1986 film &#039;Platoon&#039;?","correct_answer":"Oliver Stone","incorrect_answers":["Francis Ford Coppola","Stanley Kubrick","Michael Cimino"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"What was the title of ABBA`s first UK hit single?","correct_answer":"Waterloo","incorrect_answers":["Mamma Mia","Fernando","Dancing Queen"]},{"category":"Geography","type":"boolean","difficulty":"easy","question":"Greenland is almost as big as Africa.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Books","type":"multiple","difficulty":"medium","question":"By what name was the author Eric Blair better known?","correct_answer":"George Orwell","incorrect_answers":["Aldous Huxley","Ernest Hemingway","Ray Bradbury"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"How many Chaos Emeralds are there in the &quot;Sonic the Hedgehog&quot; universe?","correct_answer":"7","incorrect_answers":["6","8","14"]},{"category":"Art","type":"multiple","difficulty":"easy","question":"Who painted &quot;Swans Reflecting Elephants&quot;, &quot;Sleep&quot;, and &quot;The Persistence of Memory&quot;?","correct_answer":"Salvador Dali","incorrect_answers":["Jackson Pollock","Vincent van Gogh","Edgar Degas"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"Which of these blocks in &quot;Minecraft&quot; has the lowest blast resistance?","correct_answer":"Sand","incorrect_answers":["End Stone","Water","Wood Planks"]},{"category":"General Knowledge","type":"multiple","difficulty":"hard","question":"According to the 2014-2015 Australian Bureau of Statistics, what percentage of Australians were born overseas?","correct_answer":"28%","incorrect_answers":["13%","20%","7%"]}]};
	organizeData(data);
}


$(function(){
	getData();
	getCategories();
	bubbleSwitch();
	clickAnswer();
	renderOptionsmodal();
	closeModal();
	harvestOptions();
    $('#next-question').click(nextQuestion);
});


function renderOptionsmodal() {
	$('#options-button').on("click", function(e){
		$('.intro-page').addClass('hidden');
		$('.options-modal').removeClass('hidden')
	})
}


function harvestOptions() {
	$('#reload-questions-btn').on("click", function(){
		const userCategory = $('#category').val();
		const difficulyLevel = $('#difficulty').val();
		const categoryValue = $('select[name=category]').val();
        const diffValue = $('select[name=diff]').val();
        const diff = diffValue === 'any' ? false : diffValue;
          if (diff || userCategory) {
        	changeQuestionOptions(diff, userCategory);
        }
        console.log('harvested!');

	})
}







