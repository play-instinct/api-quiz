
$(function(){
	$('#start-button').on("click", function(){
		console.log('event handled');
		$('.intro-page').addClass('hidden');
		$('.quiz-page').removeClass('hidden');
	})

});

$(function(){
	$('#bubbles-switch').on('click', function(event){
		event.preventDefault();
		$(".bubble").toggleClass('hidden');
		checkText();
	})
})

function checkText(){
	let currentText;
	currentText = $('#bubbles-switch').text()
	if ($(".bubble").hasClass('hidden')) {
		$('#bubbles-switch').text('');
		$('#bubbles-switch').text('Turn ON annoying bubbles!')
	}	
	else {
		$('#bubbles-switch').text('Turn OFF annoying bubbles!')
		}
}

$.ajax({
        url: "https://opentdb.com/api.php?amount=10",
        type: 'GET',
        dataType: 'json',
       success: function(data) {
          console.log(data.results);        
       },
       error: function() {
          //error condition code
       }
    });

function displayObjects(data) {
	data.results.forEach(function(result){
    console.log(result.category)
	});
}