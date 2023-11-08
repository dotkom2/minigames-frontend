////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 *
 * START GAME CANVAS - This is the function that runs to setup game canvas
 *
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;

	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");

	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer, confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.bg = {};
$.button = {};
$.pop = {};

/*!
 *
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 *
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	bgContainer = new createjs.Container();
	baseContainer = new createjs.Container();
	baseGameContainer = new createjs.Container();
	baseDesignContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	selectContainer = new createjs.Container();
	selectButtonContainer = new createjs.Container();
	scoreContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	particlesContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();


	bg = new createjs.Bitmap(loader.getResult('background'));
	bgP = new createjs.Bitmap(loader.getResult('backgroundP'));

	logo = new createjs.Bitmap(loader.getResult('logo'));
	logoP = new createjs.Bitmap(loader.getResult('logoP'));

	buttonStart = createButton('buttonStart', textDisplay.buttonStart, 0);

	//select
	buttonArrowL = createButton('buttonArrowL', '', 1, 'buttonArrow');
	buttonArrowR = createButton('buttonArrowR', '', 1, 'buttonArrow');
	buttonEmpty = createButton('buttonEmpty', '', 3);
	buttonDisabled = createButton('buttonDisabled', '', 3);

	buttonArrowR.scaleX = -1;
	buttonArrowL.x -= 170;
	buttonArrowR.x += 170;

	selectButtonContainer.addChild(buttonArrowL, buttonArrowR, buttonEmpty, buttonDisabled);

	//game
	gameTouch = new createjs.Shape();
	gameTouch.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, landscapeSize.w, portraitSize.h));

	scoreTxt = new createjs.Text();
	scoreTxt.font = "50px bpreplaybold";
	scoreTxt.color = '#fff';
	scoreTxt.textAlign = "center";
	scoreTxt.textBaseline='alphabetic';
	scoreTxt.y += 20;

	scoreContainer.addChild(scoreTxt);

	//result
	itemResult = createPop('itemResult');
	itemResultP = createPop('itemResultP');

	buttonRetry = createButton('buttonRetry', textDisplay.buttonRetry, 0);
	buttonMain = createButton('buttonMain', textDisplay.buttonMain, 0);

	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "20px bpreplaybold";
	resultShareTxt.color = '#fff';
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textDisplay.share;

	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "45px bpreplaybold";
	resultTitleTxt.color = '#fff';
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = textDisplay.resultTitle;

	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "60px bpreplaybold";
	resultScoreTxt.color = '#fff';
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.text = '';

	resultBestScoreTxt = new createjs.Text();
	resultBestScoreTxt.font = "35px bpreplaybold";
	resultBestScoreTxt.color = '#fff';
	resultBestScoreTxt.textAlign = "center";
	resultBestScoreTxt.textBaseline='alphabetic';
	resultBestScoreTxt.text = '';


	buttonFacebook = createButton('buttonFacebook', '', 1, 'buttonFacebook');
	buttonTwitter = createButton('buttonTwitter', '', 1, 'buttonTwitter');
	buttonWhatsapp = createButton('buttonWhatsapp', '', 1, 'buttonWhatsapp');

	buttonFullscreen = createButton('buttonFullscreen', '', 2, 'buttonFullscreen');
	buttonSoundOn = createButton('buttonSoundOn', '', 2, 'buttonSoundOn');
	buttonSoundOff = createButton('buttonSoundOff', '', 2, 'buttonSoundOff');
	buttonSoundOn.visible = false;

	buttonExit = createButton('buttonExit', '', 2, 'buttonExit');
	buttonSettings = createButton('buttonSettings', '', 2, 'buttonSettings');

	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;

	//exit
	itemExit = createPop('itemExit');
	itemExitP = createPop('itemExitP');

	buttonConfirm = createButton('buttonConfirm', textDisplay.buttonConfirm, 0);
	buttonCancel = createButton('buttonCancel', textDisplay.buttonCancel, 0);

	popTitleTxt = new createjs.Text();
	popTitleTxt.font = "45px bpreplaybold";
	popTitleTxt.color = "#fff";
	popTitleTxt.textAlign = "center";
	popTitleTxt.textBaseline='alphabetic';
	popTitleTxt.text = textDisplay.exitTitle;

	popDescTxt = new createjs.Text();
	popDescTxt.font = "30px bpreplaybold";
	popDescTxt.lineHeight = 35;
	popDescTxt.color = "#fff";
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textDisplay.exitMessage;

	confirmContainer.addChild(itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	confirmContainer.visible = false;

	if(guide){
		guideline = new createjs.Shape();
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}

	mainContainer.addChild(logo, logoP, buttonStart);
	baseContainer.addChild(baseGameContainer, baseDesignContainer, particlesContainer);
	selectContainer.addChild(selectButtonContainer);
	gameContainer.addChild(gameTouch, scoreContainer);
	resultContainer.addChild(itemResult, itemResultP, buttonRetry, buttonMain, resultTitleTxt, resultScoreTxt, resultBestScoreTxt);

	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}

	buildCanvasBg();
	canvasContainer.addChild(bgContainer, baseContainer, mainContainer, selectContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);

	changeViewport(viewport.isLandscape);
	resizeGameFunc();
}

function buildCanvasBg(){
	$.bg['bg'] = new createjs.Shape();
	$.bg['bgOld'] = new createjs.Shape();

	gameData.bgNum = Math.floor(Math.random()*gameSettings.background.length);

	$.bg['bg'].fillCommand = $.bg['bg'].graphics.beginFill(gameSettings.background[gameData.bgNum]).command;
	$.bg['bgOld'].fillCommand = $.bg['bgOld'].graphics.beginFill(gameSettings.background[gameData.bgNum]).command;

	$.bg['bg'].graphics.drawRect(0, 0, landscapeSize.w, portraitSize.h);
	$.bg['bgOld'].graphics.drawRect(0, 0, landscapeSize.w, portraitSize.h);

	bgContainer.addChild($.bg['bg'], $.bg['bgOld']);
}

function createButton(name, text, size, image){
	$.button[name] = new createjs.Container();

	var buttonBg = new createjs.Container();
	var buttonText = new createjs.Text();
	buttonText.font = "25px bpreplaybold";
	buttonText.color = '#fff';
	buttonText.textAlign = "center";
	buttonText.textBaseline='alphabetic';
	buttonText.text = text;
	buttonText.y = 10;

	var buttonImage
	if(image != undefined){
		buttonImage = new createjs.Bitmap(loader.getResult(image));
		centerReg(buttonImage);
	}

	var buttonBg = new createjs.Shape();
	var buttonShadow = new createjs.Shape();
	var buttonShadowDim = new createjs.Shape();
	var buttonW = 140;
	var buttonH = 55;
	var buttonRadius = 5;

	if(size == 1){
		buttonW = buttonH;
	}else if(size == 2){
		buttonW = buttonH = 40;
	}else if(size == 3){
		buttonW = 250;
	}

	buttonBg.fillCommand = buttonBg.graphics.beginFill('red').command;
	buttonBg.graphics.drawRoundRectComplex(-(buttonW/2), -(buttonH/2), buttonW, buttonH, buttonRadius, buttonRadius, buttonRadius, buttonRadius);

	buttonShadow.fillCommand = buttonShadow.graphics.beginFill('red').command;
	buttonShadow.graphics.drawRoundRectComplex(-(buttonW/2), -(buttonH/2), buttonW, buttonH, buttonRadius, buttonRadius, buttonRadius, buttonRadius);

	buttonShadowDim.fillCommand = buttonShadowDim.graphics.beginFill('#000').command;
	buttonShadowDim.graphics.drawRoundRectComplex(-(buttonW/2), -(buttonH/2), buttonW, buttonH, buttonRadius, buttonRadius, buttonRadius, buttonRadius);
	buttonShadowDim.alpha = .5;

	buttonShadow.y = buttonShadowDim.y = 8;

	$.button[name].textObj = buttonText;
	$.button[name].bgObj = buttonBg;
	$.button[name].bgShadowObj = buttonShadow;
	$.button[name].addChild(buttonShadow, buttonShadowDim, buttonBg, buttonText, buttonImage);
	gameData.buttons.push($.button[name]);

	return $.button[name];
}

function createPop(name){
	$.pop[name] = new createjs.Container();

	var popBg = new createjs.Shape();
	var popW = 420;
	var popH = 500;
	var popRadius = 10;
	var popStroke = 10;

	popBg.fillCommand = popBg.graphics.beginFill('red').command;
	popBg.graphics.setStrokeStyle(popStroke).beginStroke('#fff').drawRoundRectComplex(-(popW/2), -(popH/2), popW, popH, popRadius, popRadius, popRadius, popRadius);

	$.pop[name].bgObj = popBg;
	$.pop[name].addChild(popBg);
	gameData.pop.push($.pop[name]);

	return $.pop[name];
}

function changeViewport(isLandscape){
	if(isLandscape){
		//landscape
		stageW=landscapeSize.w;
		stageH=landscapeSize.h;
		contentW = landscapeSize.cW;
		contentH = landscapeSize.cH;
	}else{
		//portrait
		stageW=portraitSize.w;
		stageH=portraitSize.h;
		contentW = portraitSize.cW;
		contentH = portraitSize.cH;
	}

	gameCanvas.width = stageW;
	gameCanvas.height = stageH;

	canvasW=stageW;
	canvasH=stageH;

	changeCanvasViewport();
}

function changeCanvasViewport(){
	if(canvasContainer!=undefined){
		baseContainer.x = canvasW/2;
		baseContainer.y = canvasH/2;

		itemResult.x = canvasW/2;
		itemResult.y = canvasH/2;
		itemResultP.x = canvasW/2;
		itemResultP.y = canvasH/2;

		itemExit.x = canvasW/2;
		itemExit.y = canvasH/2;
		itemExitP.x = canvasW/2;
		itemExitP.y = canvasH/2;

		if(viewport.isLandscape){
			logo.visible = true;
			logoP.visible = false;

			buttonStart.x = selectButtonContainer.x = canvasW/2;
			buttonStart.y = selectButtonContainer.y = canvasH/100 * 82;

			//result
			itemResult.visible = true;
			itemResultP.visible = false;

			buttonFacebook.x = canvasW/100*45;
			buttonFacebook.y = canvasH/100*61;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*61;
			buttonWhatsapp.x = canvasW/100*55;
			buttonWhatsapp.y = canvasH/100*61;

			buttonRetry.x = canvasW/2 - 75;
			buttonRetry.y = canvasH/100 * 72;

			buttonMain.x = canvasW/2 + 75;
			buttonMain.y = canvasH/100 * 72;

			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 56;

			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 33;

			resultScoreTxt.x = canvasW/2;
			resultScoreTxt.y = canvasH/100 * 44;

			resultBestScoreTxt.x = canvasW/2;
			resultBestScoreTxt.y = canvasH/100 * 49;

			//exit
			itemExit.visible = true;
			itemExitP.visible = false;

			buttonConfirm.x = canvasW/2 - 75;
			buttonConfirm.y = canvasH/100 * 72;

			buttonCancel.x = canvasW/2 + 75;
			buttonCancel.y = canvasH/100 * 72;

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 33;

			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 46;

		}else{
			logo.visible = false;
			logoP.visible = true;

			buttonStart.x = selectButtonContainer.x = canvasW/2;
			buttonStart.y = selectButtonContainer.y = canvasH/100 * 80;

			//result
			itemResult.visible = false;
			itemResultP.visible = true;

			buttonFacebook.x = canvasW/100*41;
			buttonFacebook.y = canvasH/100*59;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*59;
			buttonWhatsapp.x = canvasW/100*59;
			buttonWhatsapp.y = canvasH/100*59;

			buttonRetry.x = canvasW/2 - 75;
			buttonRetry.y = canvasH/100 * 67;

			buttonMain.x = canvasW/2 + 75;
			buttonMain.y = canvasH/100 * 67;

			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 55;

			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 38;

			resultScoreTxt.x = canvasW/2;
			resultScoreTxt.y = canvasH/100 * 46;

			resultBestScoreTxt.x = canvasW/2;
			resultBestScoreTxt.y = canvasH/100 * 50;

			//exit
			itemExit.visible = false;
			itemExitP.visible = true;

			buttonConfirm.x = canvasW/2 - 75;
			buttonConfirm.y = canvasH/100 * 67;

			buttonCancel.x = canvasW/2 + 75;
			buttonCancel.y = canvasH/100 * 67;

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 38;

			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 47;
		}

		resultShareTxt.visible = false;
		buttonFacebook.visible = false;
		buttonTwitter.visible = false;
		buttonWhatsapp.visible = false;
	}
}



/*!
 *
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 *
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){

		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;

		var distanceNum = 55;
		var nextCount = 0;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}

			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}

			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));

			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));
		}

		resizeGameLayout();
	}
}

/*!
 *
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 *
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 *
 * CANVAS LOOP - This is the function that runs for canvas loop
 *
 */
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 *
 * CANVAS MISC FUNCTIONS
 *
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}