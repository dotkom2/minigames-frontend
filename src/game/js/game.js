////////////////////////////////////////////////////////////
// GAME v1.4
////////////////////////////////////////////////////////////

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */

//game array
var games_arr = [
	{
		name:'SQUARE FALL',
		type:0,
		settings:{
			delay:0,
			size:[10,20],
			speed:[5,5],
			loop:.8,
			score:1
		},
		levels:{
			target:5,
			speed:[2,2],
			loop:.1
		}
	},
	{
		name:'ORBIT BLAST',
		type:1,
		settings:{
			delay:0,
			size:[10,15],
			speed:[5, 2],
			score:1
		},
		levels:{
			target:5,
			speed:[2, 0]
		}
	},
	{
		name:'TRICKY DISC',
		type:2,
		settings:{
			delay:0,
			size:[10,15],
			speed:[5, 2],
			score:1
		},
		levels:{
			target:5,
			speed:[2, 0]
		}
	},
	{
		name:'RISKY WEAVE',
		type:3,
		settings:{
			delay:0,
			size:[10,15],
			speed:[5, 2],
			loop:.8,
			score:1
		},
		levels:{
			target:5,
			speed:[2, 1],
			loop:.2
		}
	},
	{
		name:'CIRCLE DASH',
		type:4,
		settings:{
			delay:1,
			size:[10,15],
			speed:[3],
			score:1
		},
		levels:{
			target:5,
			speed:[1]
		}
	},
	{
		name:'CORNER RUSH',
		type:5,
		settings:{
			delay:1,
			size:[20,10],
			speed:[4],
			score:1
		},
		levels:{
			target:5,
			speed:[1]
		}
	},
	{
		name:'CIRCLE DODGE',
		type:6,
		settings:{
			delay:0,
			size:[10,10],
			speed:[3, 2],
			loop:.8,
			score:1
		},
		levels:{
			target:5,
			speed:[1, 1],
			loop:.2
		}
	},
	{
		name:'ROTATE RUSH',
		type:7,
		settings:{
			delay:0,
			size:[10,20],
			speed:[4, 3, 1],
			loop:1.5,
			score:1
		},
		levels:{
			target:5,
			speed:[.5, .5, .5],
			loop:.2
		}
	},
	{
		name:'WALL SWITCH',
		type:8,
		settings:{
			delay:0,
			size:[20,10],
			speed:[5, 5],
			loop:1,
			score:1
		},
		levels:{
			target:5,
			speed:[1, 1],
			loop:.1
		}
	},
	{
		name:'SQUARE SHIFT',
		type:9,
		settings:{
			delay:0,
			size:[20,20],
			speed:[5, 3],
			loop:.8,
			score:1
		},
		levels:{
			target:5,
			speed:[1, 1],
			loop:.1
		}
	},
	// {
	// 	name:'TRICKY SPIN',
	// 	type:10,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[5, 3],
	// 		loop:1.2,
	// 		score:1
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1, 1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'TRICKY TURN',
	// 	type:11,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[4, 3],
	// 		loop:1.2,
	// 		score:1
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1, 1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'ORBIT DODGE',
	// 	type:12,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[3, 2],
	// 		loop:1.2,
	// 		score:1
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1, 2],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'ROTATE BLAST',
	// 	type:13,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[3, 3],
	// 		score:1
	// 	},
	// 	levels:{
	// 		target:2,
	// 		speed:[.5, 0]
	// 	}
	// },
	// {
	// 	name:'ANGLE LAUNCH',
	// 	type:14,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[3],
	// 		score:1
	// 	},
	// 	levels:{
	// 		target:2,
	// 		speed:[.5]
	// 	}
	// },
	// {
	// 	name:'RISKY WALL',
	// 	type:15,
	// 	settings:{
	// 		delay:0,
	// 		size:[20,20],
	// 		speed:[5,5],
	// 		score:1,
	// 		loop:1,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.2
	// 	}
	// },
	// {
	// 	name:'CORNER CROSS',
	// 	type:16,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[5,5],
	// 		score:1,
	// 		loop:1,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.2
	// 	}
	// },
	// {
	// 	name:'UP DASH',
	// 	type:17,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[5,5,1],
	// 		score:1,
	// 		loop:.8,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1,.5],
	// 		loop:.2
	// 	}
	// },
	// {
	// 	name:'GRAVITY DASH',
	// 	type:18,
	// 	settings:{
	// 		delay:0,
	// 		size:[20,20],
	// 		speed:[5,5],
	// 		score:1,
	// 		loop:.8,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.2
	// 	}
	// },
	// {
	// 	name:'HEX RUSH',
	// 	type:19,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[5,5],
	// 		score:1,
	// 		loop:.8,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.2
	// 	}
	// },
	// {
	// 	name:'TRICKY RING',
	// 	type:20,
	// 	settings:{
	// 		delay:1,
	// 		size:[10,20],
	// 		speed:[1.5,.5],
	// 		score:1
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[.5,0]
	// 	}
	// },
	// {
	// 	name:'BOX DASH',
	// 	type:21,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,10],
	// 		speed:[6,3],
	// 		score:1,
	// 		loop:.8,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,0],
	// 		loop:0
	// 	}
	// },
	// {
	// 	name:'WALL HOP',
	// 	type:22,
	// 	settings:{
	// 		delay:0,
	// 		size:[20,20],
	// 		speed:[2,3],
	// 		score:1,
	// 		loop:1.4,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[0,.5],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'DROP BOUCNE',
	// 	type:23,
	// 	settings:{
	// 		delay:0,
	// 		size:[20,20],
	// 		speed:[2,3],
	// 		score:1,
	// 		loop:.6,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[0,1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'CIRCLE RUSH',
	// 	type:24,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[4,4],
	// 		score:1,
	// 		loop:1.2,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[0,1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'DISH DASH',
	// 	type:25,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[4,3],
	// 		score:1,
	// 		loop:1.4,
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'TRICKY SQUARE',
	// 	type:26,
	// 	settings:{
	// 		delay:1,
	// 		size:[10,20],
	// 		speed:[5,1],
	// 		score:1
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[.5,0]
	// 	}
	// },
	// {
	// 	name:'SQUARE SHIFT',
	// 	type:27,
	// 	settings:{
	// 		delay:0,
	// 		size:[30,10],
	// 		speed:[5,.5],
	// 		score:1
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[.5,-.1]
	// 	}
	// },
	// {
	// 	name:'LINE SWITCH',
	// 	type:28,
	// 	settings:{
	// 		delay:0,
	// 		size:[30,20],
	// 		speed:[5,7],
	// 		score:1,
	// 		loop:.6
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'INFINITY SPIN',
	// 	type:29,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[4,5],
	// 		score:1,
	// 		loop:.8
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'STAR DODGE',
	// 	type:30,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[8,3],
	// 		score:1,
	// 		loop:1.4
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'TARGET DASH',
	// 	type:31,
	// 	settings:{
	// 		delay:1,
	// 		size:[10,10],
	// 		speed:[8,1],
	// 		score:1,
	// 		loop:1
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[.5,.5],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'LEVEL DODGE',
	// 	type:32,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[6,4],
	// 		score:1,
	// 		loop:1
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'TRIPLE DODGE',
	// 	type:33,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[3,4],
	// 		score:1,
	// 		loop:1.2
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.1
	// 	}
	// },
	// {
	// 	name:'TRIANGLE SHOT',
	// 	type:34,
	// 	settings:{
	// 		delay:0,
	// 		size:[10,20],
	// 		speed:[3,4],
	// 		score:1,
	// 		loop:1.2
	// 	},
	// 	levels:{
	// 		target:5,
	// 		speed:[1,1],
	// 		loop:.1
	// 	}
	// },
];

//game settings
var gameSettings = {
	screen:{
		width:500,
		height:500
	},
	background:[
		'#0B0F1A'
	],
	colors:[
		{
			baseDark:'#000',
			baseGrey:'#333',
			baseLight:'#fff',
			main:'#00B9F4',
			obstacle:'#fff',
		},
		{
			baseDark:'#000',
			baseGrey:'#333',
			baseLight:'#fff',
			main:'#85C212',
			obstacle:'#fff',
		},
		{
			baseDark:'#000',
			baseGrey:'#333',
			baseLight:'#fff',
			main:'#BE0C0C',
			obstacle:'#fff',
		},
		{
			baseDark:'#000',
			baseGrey:'#333',
			baseLight:'#fff',
			main:'#DD6F00',
			obstacle:'#fff',
		},
		{
			baseDark:'#000',
			baseGrey:'#333',
			baseLight:'#fff',
			main:'#A300D9',
			obstacle:'#fff',
		},
		{
			baseDark:'#000',
			baseGrey:'#333',
			baseLight:'#fff',
			main:'#D45B9E',
			obstacle:'#fff',
		},
		{
			baseDark:'#000',
			baseGrey:'#333',
			baseLight:'#fff',
			main:'#384C81',
			obstacle:'#fff',
		},
		{
			baseDark:'#000',
			baseGrey:'#333',
			baseLight:'#fff',
			main:'#8E725D',
			obstacle:'#fff',
		}
	],
	particles:[5, 5], //particles size
	numberList:true //game name with number lists
}

//game test display
var textDisplay = {
					buttonStart:'START',
					buttonConfirm:'CONFIRM',
					buttonCancel:'CANCEL',
					buttonMain:'GAMES',
					buttonRetry:'RETRY',
					exitTitle:'EXIT GAME',
					exitMessage:'ARE YOU SURE\nYOU WANT TO\nQUIT THE GAME?',
					share:'SHARE YOUR SCORE',
					resultTitle:'GAME OVER',
					resultScore:'SCORE : [NUMBER]',
					resultScoreBest:'BEST SCORE : [NUMBER]'
				}

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = 'Highscore on Mini Games - [GAME] is [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on Mini Games - [GAME] game! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = {enable:false};
var playerData = {score:0};
var gameData = {paused:true, gameNum:0, bgNum:0, colorNum:0, type:0, buttons:[], pop:[]};
var baseData = {animating:false, touch:false, over:false, settings:{}, levels:{}, target:[], objects:[], obstacles:[]};
var storeData = {};
var tweenData = {score:0, tweenScore:0};
var timeData = {enable:false, startDate:null, nowDate:null, timer:0, oldTimer:0};
var protonData = {proton:null, explodeEmitter:[], trailEmitter:[]};

var cookieName = 'minigames2022';

/*!
 *
 * DATA UPDATE - This is the function that runs to update data
 *
 */
function retrieveScoreData(){
	for(var n=0; n<games_arr.length; n++){
		games_arr[n].bestscore = 0;
	}

	var bestScore = Cookies.get(cookieName);
	if(bestScore != undefined){
		var bestScore = JSON.parse(bestScore);
		for(var n=0; n<bestScore.length; n++){
			var index = games_arr.findIndex(x => x.type === bestScore[n].type);
			if(index != -1){
				games_arr[index].bestscore = bestScore[n].bestscore;
			}
		}
	}
}

function saveScoreData(){
	var bestScore = [];
	for(var n=0; n<games_arr.length; n++){
		if(games_arr[n].bestscore > 0){
			bestScore.push({type:games_arr[n].type, bestscore:games_arr[n].bestscore});
		}
	}

	Cookies.set(cookieName, bestScore, {expires:360});
}

/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */
function buildGameButton(){
	$(window).focus(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(false);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(false);
			}
		}
	});

	$(window).blur(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(true);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(true);
			}
		}
	});
	if($.browser.mobile || isTablet){

	}else{

	}

	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundStart');
		playSound('soundButton');

		window.ReactNativeWebView.postMessage("start:1");

		goPage('select');

	});

	buttonEmpty.cursor = "pointer";
	buttonEmpty.addEventListener("click", function(evt) {
		playSound('soundButton');
		window.ReactNativeWebView.postMessage("gamestart:1");
		goPage('game');
	});

	buttonArrowL.cursor = "pointer";
	buttonArrowL.addEventListener("click", function(evt) {
		playSound('soundSelect');
		toggleStage(false);
	});

	buttonArrowR.cursor = "pointer";
	buttonArrowR.addEventListener("click", function(evt) {
		playSound('soundSelect');
		toggleStage(true);
	});

	itemExit.addEventListener("click", function(evt) {
	});

	buttonMain.cursor = "pointer";
	buttonMain.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('select');
	});

	buttonRetry.cursor = "pointer";
	buttonRetry.addEventListener("click", function(evt) {
		window.ReactNativeWebView.postMessage("retry:1");
		playSound('soundButton');
		buildBase();
		goPage('game');
	});

	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});

	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});

	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleSoundMute(true);
	});

	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleSoundMute(false);
	});

	if (typeof buttonMusicOff != "undefined") {
		buttonMusicOff.cursor = "pointer";
		buttonMusicOff.addEventListener("click", function(evt) {
			toggleMusicMute(true);
		});
	}

	if (typeof buttonMusicOn != "undefined") {
		buttonMusicOn.cursor = "pointer";
		buttonMusicOn.addEventListener("click", function(evt) {
			toggleMusicMute(false);
		});
	}

	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});

	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		togglePop(true);
		toggleOption();
	});

	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});

	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);

		stopAudio();
		stopGame();
		goPage('select');
	});

	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
	});

	gameTouch.addEventListener("click", function(evt) {
		actionTouch(evt);
	})

	gameData.gameNum = Math.floor(Math.random()*games_arr.length);

	window.addEventListener("message", message => {
		gameData.gameNum = parseInt(message.data)
		alert(message.data)
	  });
}

function toggleStage(con){
	stopGame();

	if(con){
		gameData.gameNum++;
		gameData.gameNum = gameData.gameNum > games_arr.length-1 ? 0 : gameData.gameNum;
		window.ReactNativeWebView.postMessage("nextgame:"+gameData.gameNum)
	}else{
		gameData.gameNum--;
		gameData.gameNum = gameData.gameNum < 0 ? games_arr.length-1 : gameData.gameNum;
		window.ReactNativeWebView.postMessage("prevgame:"+gameData.gameNum)
	}

	gameData.colorNum = Math.floor(Math.random()*gameSettings.colors.length);

	buttonEmpty.visible = true;
	buttonDisabled.visible = false;

	var gameName = games_arr[gameData.gameNum].name;
	if(gameSettings.numberList){
		gameName = (gameData.gameNum+1) + '. ' + gameName;
	}
	$.button['buttonEmpty'].textObj.text = gameName;
	$.button['buttonDisabled'].textObj.text = gameName;
	gameData.type = games_arr[gameData.gameNum].type;

	$.button['buttonDisabled'].visible = false;
	if(games_arr[gameData.gameNum].lock == true){
		$.button['buttonEmpty'].visible = false;
		$.button['buttonDisabled'].visible = true;
	}

	resultScoreTxt.color = gameSettings.colors[gameData.colorNum].main;

	//buttons
	for(var n=0; n<gameData.buttons.length; n++){
		gameData.buttons[n].bgObj.fillCommand.style = gameSettings.colors[gameData.colorNum].main;
		gameData.buttons[n].bgShadowObj.fillCommand.style = gameSettings.colors[gameData.colorNum].main;
	}

	$.button['buttonDisabled'].bgObj.fillCommand.style = gameSettings.colors[gameData.colorNum].baseGrey;
	$.button['buttonDisabled'].bgShadowObj.fillCommand.style = gameSettings.colors[gameData.colorNum].baseGrey;

	//pop
	for(var n=0; n<gameData.pop.length; n++){
		gameData.pop[n].bgObj.fillCommand.style = gameSettings.background[gameData.bgNum];
	}

	buildBase();
}


/*!
 *
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 *
 */
function togglePop(con){
	confirmContainer.visible = con;
}


/*!
 *
 * DISPLAY PAGES - This is the function that runs to display pages
 *
 */
var curPage=''
function goPage(page){
	curPage=page;

	mainContainer.visible = false;
	baseContainer.visible = false;
	selectContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;

	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = mainContainer;
		break;

		case 'select':
			targetContainer = selectContainer;
			baseContainer.visible = true;

			toggleStage(true);
			toggleStage(false);
			buildBase();
		break;

		case 'game':
			targetContainer = gameContainer;
			baseContainer.visible = true;
			startGame();
		break;

		case 'result':
			targetContainer = resultContainer;
			stopGame();
			togglePop(false);
			playSound('soundOver');

			resultTitleTxt.text = games_arr[gameData.gameNum].name;
			tweenData.tweenScore = 0;
			TweenMax.to(tweenData, .5, {tweenScore:playerData.score, overwrite:true, onUpdate:function(){
				resultScoreTxt.text = textDisplay.resultScore.replace('[NUMBER]', addCommas(Math.floor(tweenData.tweenScore)));
			}});

			var bestScore = games_arr[gameData.gameNum].bestscore;
			if(games_arr[gameData.gameNum].bestscore < playerData.score){
				games_arr[gameData.gameNum].bestscore = playerData.score;
				bestScore = playerData.score;
			}
			resultBestScoreTxt.text = textDisplay.resultScoreBest.replace('[NUMBER]', addCommas(Math.floor(bestScore)));

			window.ReactNativeWebView.postMessage("score:"+playerData.score);

			saveScoreData();
			saveGame(playerData.score, games_arr[gameData.gameNum].name);
		break;
	}

	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}

	resizeCanvas();
}

/*!
 *
 * START GAME - This is the function that runs to start game
 *
 */
function startGame(){
	playerData.score = 0;
	updateGameScore();
	startGameType();
}

 /*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame(){
	destoryProton();
	baseData.touch = false;

	gameData.paused = true;
	TweenMax.killAll(false, true, false);
}

function saveGame(score, type){
	if ( typeof toggleScoreboardSave == 'function' ) {
		$.scoreData.score = score;

		if(typeof type != 'undefined'){
			$.scoreData.type = type;
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 *
 * UPDATE GAME - This is the function that runs to loop game update
 *
 */
function updateGame(){
	if(curPage == 'main'){
		return;
	}

	if(!gameData.paused){

		if(!baseData.over){
			loopGames();
		}
		loopParticles();
	}
}

/*!
 *
 * END GAME - This is the function that runs for game end
 *
 */
function endGame(){
	if(baseData.over){
		return;
	}

	baseData.over = true;
	TweenMax.killAll(false, true, false);

	changeBg();
	TweenMax.to(gameContainer, 1.5, {overwrite:true, onComplete:function(){
		goPage('result')
	}});
}

function changeBg(){
	gameData.bgNum++;
	gameData.bgNum = gameData.bgNum > gameSettings.background.length-1 ? 0 : gameData.bgNum;

	$.bg['bgOld'].alpha = 1;
	$.bg['bg'].fillCommand.style = gameSettings.background[gameData.bgNum];

	TweenMax.to($.bg['bgOld'], .5, {alpha:0, overwrite:true, onComplete:function(){
		$.bg['bgOld'].fillCommand.style = gameSettings.background[gameData.bgNum];
	}});
}

/*!
 *
 * OPTIONS - This is the function that runs to toggle options
 *
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}


/*!
 *
 * OPTIONS - This is the function that runs to mute and fullscreen
 *
 */
function toggleSoundMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleSoundInMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;
	}
}

function toggleMusicMute(con){
	buttonMusicOff.visible = false;
	buttonMusicOn.visible = false;
	toggleMusicInMute(con);
	if(con){
		buttonMusicOn.visible = true;
	}else{
		buttonMusicOff.visible = true;
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 *
 * SHARE - This is the function that runs to open share url
 *
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});

	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);

	var title = '';
	var text = '';

	title = shareTitle.replace("[SCORE]", addCommas(playerData.score));
	title = title.replace("[GAME]", games_arr[gameData.gameNum].name);
	text = shareMessage.replace("[SCORE]", addCommas(playerData.score));
	text = text.replace("[GAME]", games_arr[gameData.gameNum].name);

	var shareurl = '';

	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
}