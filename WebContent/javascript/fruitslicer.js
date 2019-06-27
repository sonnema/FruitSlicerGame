var playing = false;
var score = 0;
var trialsLeft = 3;
var action;
var step;
var fruitArray = ['apple.png','banana.png','cherry.png','orange.png','pineapple.png','strawberry.png','watermelon.png'];
var fruitSrc = '../img/';
var totalFruits = fruitArray.length;
var min = 160;
var max = 900;
var fruitName = '';
var fruitIndex = 0;

$(document).ready(function(){
	//Start button is clicked 
	$('#startresetGame').click(function(){
		//the game is reset
		if(playing == true)
		{
			location.reload();
		}
		//the game has started
		else
		{
			playing = true;
			//hide gameOver 
			$("#gameOver").hide();
			//update the score to 0
			score = 0;
			$("#scoreValue").html(score);
			//change the text message from start to reset
			$('#startresetGame').html('Reset Game');
			//show the total trials left
			trialsLeft = 3;
			$('#trialsLeft').show();
			showTrials();
			//Show the Fruits in Action
			startAction();
		}	
	});
	//if the fruit is sliced
	$("#fruits").mouseover(function(){
		score++;
		$("#scoreValue").html(score); //update score
		$("#sliceSound")[0].play();//play sound
		//stop fruit
		clearInterval(action);
		//hide fruit
		$("#fruits").hide("explode", 500); //slice fruit
		//send new fruit
		setTimeout(startAction, 500);
	});
	
	//Show trials
	function showTrials(){
		$("#trialImages").empty();
		for(var i=0;i<trialsLeft;i++)
		{
			$("#trialImages").append('<img class="trial" src="../img/star.png" alt="star">');
		}	
	}
	
	//Function showing random fruit, moving it down and reducing the trials if the fruit remains not sliced till the end 
	function startAction(){
		//show a random fruit
		showRandomFruit();
		//calculate random steps the fruit goes down every 10 milliseconds 
		step = 1+ Math.round(5*Math.random());
		//move down the fruit every 10 milliseconds
		action = setInterval(moveFruitDown,10);
	}
	 
	function showRandomFruit(){
		do{fruitIndex = Math.round(totalFruits*Math.random());}while(fruitIndex >= totalFruits);
		fruitName = fruitArray[fruitIndex];
		$("#fruits").show();
		$("#fruits").attr('src',fruitSrc + fruitName);
		$("#fruits").css({"left":Math.round(Math.random()*(max-min+1)+min),"top":-100});
	}
	function moveFruitDown(){
		$("#fruits").css('top',$("#fruits").position().top + step);
		if($("#fruits").position().top > $("#fruitBox").height())
		{
			if(trialsLeft > 1)
			{
				showRandomFruit();
				step = 1+ Math.round(5*Math.random());
				trialsLeft --;
				showTrials();
			}	
			else
			{
				playing = false;
				$("#startresetGame").html('Start Game');
				$("#totalScore").html(score); 
				$("#gameOver").show();
				$("#trialsLeft").hide();
				stopAction();
			}	
		}
	}	
	function stopAction()
	{
			clearInterval(action);
			$("#fruits").hide();
	}
});
