////////////////////////////////////////////////////////////
// BASE
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME BASE - This is the function that runs for game base
 * 
 */
function buildBase(){
	gameData.paused = true;
	baseGameContainer.removeAllChildren();
	baseDesignContainer.removeAllChildren();
	baseGameContainer.mask = null;

	storeData = {};
	baseData.preview = false;
	baseData.target = [];
	baseData.objects = [];
	baseData.obstacles = [];
	baseData.settings.side = randomBoolean();
	baseData.settings.turn = randomBoolean();

	//default circle
	baseData.target[0] = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, games_arr[gameData.gameNum].settings.size[0]);
	baseData.target[0].angle = randomIntFromInterval(0, 360);
	baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
	baseData.target[0].particleIndex = 1;

	switch(gameData.type){
		case 34:
			storeData = {
				moveRadius:games_arr[gameData.gameNum].settings.size[1] + games_arr[gameData.gameNum].settings.size[0]*2,
				moveRadiusMax:gameSettings.screen.width/1.3,
				baseRadius:gameSettings.screen.width/4.5,
				obstacleRadius:games_arr[gameData.gameNum].settings.size[0]*7,
				obstacleSize:games_arr[gameData.gameNum].settings.size[0],
				objects:[270, 150, 30],
				objectIndex:0,
				obstacles:[[0,180], [270,90], [45,225]],
				objectOldIndex:0,
				obstacleInit:false
			}

			for(var n = 0; n<storeData.objects.length; n++){
				var baseRadius = games_arr[gameData.gameNum].settings.size[1];
				var circleBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseGrey, 0, 0, baseRadius);
				circleBg.size = baseRadius;
				circleBg.angle = storeData.objects[n];
				setAnglePos(circleBg, 0, 0, storeData.baseRadius);

				baseData.objects.push(circleBg);
				baseGameContainer.addChild(circleBg);
			}

			baseGameContainer.addChild(baseData.target[0]);
		break;

		case 33:
			storeData = {
				width:gameSettings.screen.width*2.6,
				moveRadius:gameSettings.screen.width/100 * 30,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				way:true,
			}
			var baseRadius = storeData.moveRadius;
			var baseBg = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseDark, 0, 0, baseRadius, games_arr[gameData.gameNum].settings.size[0] * 2);

			baseData.target[0].angle = 120;
			baseData.target[1] = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, games_arr[gameData.gameNum].settings.size[0]);
			baseData.target[1].angle = 240;
			baseData.target[1].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[1].particleIndex = 1;

			baseData.target[2] = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, games_arr[gameData.gameNum].settings.size[0]);
			baseData.target[2].angle = 360;
			baseData.target[2].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[2].particleIndex = 1;
			
			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			setAnglePos(baseData.target[1], 0, 0, storeData.moveRadius);
			setAnglePos(baseData.target[2], 0, 0, storeData.moveRadius);

			baseGameContainer.addChild(baseBg, baseData.target[0], baseData.target[1], baseData.target[2]);
		break;

		case 32:
			storeData = {
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				objects:[],
				objectIndex:0,
				obstacles:[],
				obstaclesSide:[true, false, true, false,],
				obstacleIndex:-1,
				scoreIndex:-1,
				scoreCon:false,
				scoreArr:[0,3,4,7,8,9,6,5,2,1],
				spaceX:110,
				spaceY:games_arr[gameData.gameNum].settings.size[0]*6
			}

			var startY = (4 * storeData.spaceY);
			startY = -(startY/2);
			for(var n = 0; n<5; n++){
				var objectW = games_arr[gameData.gameNum].settings.size[0] * 6;
				var objectH = games_arr[gameData.gameNum].settings.size[0]*2;
				var rectObjectL = drawRect('fill', gameSettings.colors[gameData.colorNum].baseGrey, -(objectW/2), -(objectH/2), objectW, objectH, 0);
				var rectObjectR = drawRect('fill', gameSettings.colors[gameData.colorNum].baseGrey, -(objectW/2), -(objectH/2), objectW, objectH, 0);
				rectObjectL.x = -storeData.spaceX;
				rectObjectR.x = storeData.spaceX;
				rectObjectL.y = rectObjectR.y = startY;

				if(n < 4){
					storeData.obstacles.push({lx:-storeData.spaceX*2, ly:startY+(storeData.spaceY/2), rx:storeData.spaceX*2, ry:startY+(storeData.spaceY/2)});
				}
				startY += storeData.spaceY;

				baseData.objects.push(rectObjectL);
				baseData.objects.push(rectObjectR);
				baseGameContainer.addChild(rectObjectL, rectObjectR);
			}

			var deductSize = (objectW/2) + games_arr[gameData.gameNum].settings.size[0]
			storeData.objects.push({x:baseData.objects[0].x + deductSize, y:baseData.objects[0].y});
			storeData.objects.push({x:baseData.objects[3].x - deductSize, y:baseData.objects[3].y});
			storeData.objects.push({x:baseData.objects[4].x + deductSize, y:baseData.objects[4].y});
			storeData.objects.push({x:baseData.objects[7].x - deductSize, y:baseData.objects[7].y});
			storeData.objects.push({x:baseData.objects[8].x + deductSize, y:baseData.objects[8].y});
			storeData.objects.push({x:baseData.objects[9].x - deductSize, y:baseData.objects[9].y});
			storeData.objects.push({x:baseData.objects[6].x + deductSize, y:baseData.objects[6].y});
			storeData.objects.push({x:baseData.objects[5].x - deductSize, y:baseData.objects[5].y});
			storeData.objects.push({x:baseData.objects[2].x + deductSize, y:baseData.objects[2].y});
			storeData.objects.push({x:baseData.objects[1].x - deductSize, y:baseData.objects[1].y});

			baseData.target[0].x = storeData.objects[0].x;
			baseData.target[0].y = storeData.objects[0].y;

			baseGameContainer.addChild(baseData.target[0]);
		break;

		case 31:
			var radiusGap = 30;
			storeData = {
				baseRadius:gameSettings.screen.width/3,
				obstacleRadius:gameSettings.screen.width/3.5,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleInit:false,
				position:[0,90,180,270],
				positionIndex:-1,
				scoreObj:null,
				scoreCon:false,
				obstacles:[0,180,90,270,0,180],
				obstaclesDistance:[-radiusGap,-radiusGap,-(radiusGap*2),-(radiusGap*2),-(radiusGap*3),-(radiusGap*3)]
			}

			var baseBorderOuter = games_arr[gameData.gameNum].settings.size[0];
			var baseBg = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, storeData.baseRadius, baseBorderOuter);
			baseGameContainer.addChild(baseBg, baseData.target[0]);
		break;

		case 30:
			storeData = {
				width:gameSettings.screen.width*2.6,
				moveRadius:gameSettings.screen.width/3,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				objects:[],
				objectIndex:0,
				obstacles:[[22,165],[305,165],[22,228],[90,228],[305,90],[228,90]],
				spikes:5,
			}

			var rot = Math.PI / 2 * 3;
			var step = Math.PI / 5;
			var x,y;
			for (var n = 0; n < storeData.spikes; n++) {
				x = Math.cos(rot) * storeData.moveRadius;
				y = Math.sin(rot) * storeData.moveRadius;
				baseData.objects[n] = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseGrey, x, y, games_arr[gameData.gameNum].settings.size[0]*2, 0);
				storeData.objects.push({x:x, y:y});

				rot += step;
		
				//x = Math.cos(rot) * innerRadius;
				//y = Math.sin(rot) * innerRadius;
				rot += step;
				baseGameContainer.addChild(baseData.objects[n]);
			}
			swapArray(storeData.objects, 1,2);
			swapArray(storeData.objects, 2,4);
			swapArray(storeData.objects, 3,4);

			baseData.target[0].x = storeData.objects[storeData.objectIndex].x;
			baseData.target[0].y = storeData.objects[storeData.objectIndex].y;

			baseGameContainer.addChild(baseData.target[0]);
		break;

		case 29:
			storeData = {
				width:gameSettings.screen.width*2.6,
				moveRadius:gameSettings.screen.width/5,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				distance:[10,80],
				centerObj:'',
				turn:false,
				way:randomBoolean(),
				scoreCon:false
			}

			var baseBorderOuter = games_arr[gameData.gameNum].settings.size[0]*2;

			baseData.objects[0] = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseDark, 0, 0, storeData.moveRadius, baseBorderOuter);
			baseData.objects[1] = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseDark, 0, 0, storeData.moveRadius, baseBorderOuter);
			baseData.objects[0].y = -storeData.moveRadius;
			baseData.objects[1].y = storeData.moveRadius;

			storeData.centerObj = baseData.objects[0];

			baseData.settings.side = true;
			baseData.settings.turn = true;
			baseData.target[0].angle = 270;
			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			baseGameContainer.addChild(baseData.objects[0], baseData.objects[1], baseData.target[0]);
		break;

		case 28:
			storeData = {
				moveRadius:gameSettings.screen.width/8,
				width:gameSettings.screen.width/100 * 45,
				height:gameSettings.screen.height * 2,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleW:games_arr[gameData.gameNum].settings.size[1]*2,
				distance:[10,80],
				moveX:0,
				stroke:games_arr[gameData.gameNum].settings.size[1]/2,
				way:randomBoolean()
			}

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			storeData.moveX = storeData.stroke/2 + squareSize/2;

			baseData.target[0] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0].particleIndex = 1;
			baseData.target[0].x = storeData.moveX;

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			baseCenterBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseGrey, -(storeData.stroke/2), -(storeData.height/2), storeData.stroke, storeData.height, 0);

			baseGameContainer.addChild(baseBg, baseCenterBg, baseData.target[0]);
		break;

		case 27:
			storeData = {
				width:gameSettings.screen.width*2.6,
				height:gameSettings.screen.height/100 * 60,
				moveX:gameSettings.screen.width/8,
				obstacles:[],
				obstacleIndex:-1,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1]
			}

			var space = games_arr[gameData.gameNum].settings.size[0]/4;
			var areaW = games_arr[gameData.gameNum].settings.size[0] * 6 + (space*5);
			var startX = -(areaW/2);
			for(var n=0; n<6; n++){
				startX += games_arr[gameData.gameNum].settings.size[0]/2;
				storeData.obstacles.push(startX);
				startX += games_arr[gameData.gameNum].settings.size[0]/2 + space;
			}

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			baseGameContainer.addChild(baseBg);
			
			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			var pos = [-((squareSize + space)*2 - space), -(squareSize/2 + space), squareSize/2 + space, (squareSize + space)*2 - space];

			storeData.obstacleIndex = findUniqueIndex(storeData.obstacles, [storeData.obstacleIndex]);
			for(var n=0; n<4; n++){
				var squareColor = isEven(n) ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
				baseData.target[n] = drawRect('fill', squareColor, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
				baseData.target[n].particleIndex = 1;
				baseData.target[n].x = storeData.obstacles[storeData.obstacleIndex];
				baseData.target[n].y = pos[n];
				baseData.target[n].side = isEven(n) ? true : false;

				baseGameContainer.addChild(baseData.target[n]);
			}
		break;

		case 26:
			storeData = {
				baseRadius:gameSettings.screen.width/2.3,
				moveRadius:0,
				obstacleRadius:0,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				angle:0,
				rotateRange:[-45, 45],
				obstacles:[],
				obstaclesExist:[],
				obstacleIndex:-1,
				obstacleDivide:0,
				obstacleInit:false,
				last:{old:0, target:0}
			}

			for(var n=0; n<360; n+=25){
				storeData.obstacles.push(n);
			}
			storeData.obstacleDivide = Math.floor(storeData.obstacles.length/4);

			var baseBorderOuter = games_arr[gameData.gameNum].settings.size[0];
			storeData.moveRadius = storeData.baseRadius - baseBorderOuter;
			storeData.obstacleRadius = storeData.baseRadius - (baseBorderOuter/2);

			var baseBg = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, storeData.baseRadius, baseBorderOuter);
			baseGameContainer.addChild(baseBg, baseData.target[0]);
		break;

		case 25:
			storeData = {
				objectRadius:gameSettings.screen.width/5,
				moveRadius:gameSettings.screen.width/3,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				objects:[0, 180, 90, 270],
				objectIndex:0,
				obstacles:[[45,225], [135,315]]
			}

			for(var n = 0; n<storeData.objects.length; n++){
				var baseRadius = games_arr[gameData.gameNum].settings.size[0]*2;
				var circleBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseGrey, 0, 0, baseRadius, 0);
				circleBg.angle = storeData.objects[n];
				setAnglePos(circleBg, 0, 0, storeData.objectRadius);

				baseData.objects.push(circleBg);
				baseGameContainer.addChild(circleBg);

				if(storeData.objectIndex == n){
					baseData.target[0].x = circleBg.x;
					baseData.target[0].y = circleBg.y;
				}
			}

			baseGameContainer.addChild( baseData.target[0]);
		break;

		case 24:
			storeData = {
				moveRadius:gameSettings.screen.width/5,
				moveX:gameSettings.screen.width/2,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1]
			}

			var baseBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseDark, 0, 0, storeData.moveRadius, 0);

			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			baseData.target[0].angle = 0;

			baseData.target[1] = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, games_arr[gameData.gameNum].settings.size[0]);
			baseData.target[1].angle = 180;
			baseData.target[1].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[1].particleIndex = 1;

			baseGameContainer.addChild(baseBg, baseData.target[0], baseData.target[1]);
		break;

		case 23:
			storeData = {
				width:gameSettings.screen.width,
				height:gameSettings.screen.height/100 * 45,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				stroke:baseData.target[0].size/2,
				obstacleH:0,
				topY:0,
				distance:[10,80],
				side:randomBoolean(),
				way:randomBoolean(),
			}

			storeData.objectH = storeData.height/1.5;
			storeData.topY = -((storeData.height/2) - (baseData.target[0].size/2));

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var maskBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);

			var extraSize = (storeData.stroke/2);
			var baseStrokeBg = drawRect('stroke', gameSettings.colors[gameData.colorNum].baseLight, -(storeData.width/2+extraSize), -(storeData.height/2+extraSize), storeData.width+(extraSize*2), storeData.height+(extraSize*2), 0, storeData.stroke);

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0].particleIndex = 1;
			baseData.target[0].y = storeData.topY;
			baseData.target[0].angle = 270;

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			storeData.hintObj = drawRect('fill', gameSettings.colors[gameData.colorNum].baseLight, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			storeData.hintObj.y = storeData.topY;
			storeData.hintObj.visible = false;

			baseGameContainer.addChild(baseBg, storeData.hintObj, baseData.target[0]);
			baseDesignContainer.addChild(baseStrokeBg);
			baseGameContainer.mask = maskBg;
		break;

		case 22:
			storeData = {
				width:gameSettings.screen.width*2.6,
				height:gameSettings.screen.height/100 * 45,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleH:0,
				obstacleRange:[-40, 40],
				bottomY:0,
				distance:[10,80],
				side:randomBoolean(),
				way:randomBoolean(),
				jump:0,
				jumpCount:2,
			}

			storeData.objectH = storeData.height/1.5;
			storeData.bottomY = (storeData.height/2) - (baseData.target[0].size/2);

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var maskBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0].particleIndex = 1;
			baseData.target[0].y = storeData.bottomY;
			baseData.target[0].angle = 270;

			baseGameContainer.addChild(baseBg, baseData.target[0]);
			baseGameContainer.mask = maskBg;
		break;

		case 21:
			storeData = {
				width:gameSettings.screen.width/100 * 60,
				height:gameSettings.screen.height/100 * 60,
				moveRadiusMax:gameSettings.screen.width,
				turnX:randomBoolean(),
				turnY:randomBoolean(),
				stroke:games_arr[gameData.gameNum].settings.size[0],
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleInit:false,
				scoreCon:false,
				scoreObj:null,
				obstacles:[]
			}

			storeData.obstacles.push({x:-(storeData.width/2), y:-(storeData.height/2)});
			storeData.obstacles.push({x:storeData.width/2, y:-(storeData.height/2)});
			storeData.obstacles.push({x:storeData.width/2, y:(storeData.height/2)});
			storeData.obstacles.push({x:-(storeData.width/2), y:(storeData.height/2)});

			baseData.objects[0] = new createjs.Container();
			baseData.objects[0].visible = false;
			baseData.objects[0].angle = 270;
			baseData.objects[0].side = randomBoolean();

			var pos = {y:-(games_arr[gameData.gameNum].settings.size[0] * 4)};
			var size = [.6, .5, .4];
			for(var n=0; n<size.length; n++){
				var radius = games_arr[gameData.gameNum].settings.size[0] * size[n];
				var newDot = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, radius);
				newDot.y = pos.y;
				pos.y -= radius * 3;
				baseData.objects[0].addChild(newDot);
			}

			var targetSize = games_arr[gameData.gameNum].settings.size[0] + (storeData.stroke*2);
			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var baseStrokeBg = drawRect('stroke', gameSettings.colors[gameData.colorNum].baseLight, -(storeData.width/2 + (targetSize/2)), -(storeData.height/2 + (targetSize/2)), storeData.width + targetSize, storeData.height + targetSize, 0, storeData.stroke);

			baseGameContainer.addChild(baseBg, baseData.objects[0], baseData.target[0]);
			baseDesignContainer.addChild(baseStrokeBg);
		break;

		case 20:
			storeData = {
				baseRadius:gameSettings.screen.width/2.3,
				moveRadiusMin:0,
				moveRadiusMax:0,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacles:[],
				obstaclesExist:[],
				obstacleIndex:-1,
				obstacleInit:false,
			}

			for(var n=0; n<360; n+=40){
				storeData.obstacles.push(n);
			}
			storeData.directionDivide = Math.floor(storeData.obstacles.length/4);
			storeData.moveRadiusMin = storeData.baseRadius - (games_arr[gameData.gameNum].settings.size[0]*2);
			storeData.moveRadiusMax = storeData.baseRadius + (games_arr[gameData.gameNum].settings.size[0]*2);

			var baseBorderOuter = games_arr[gameData.gameNum].settings.size[0];
			var baseBg = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, storeData.baseRadius, baseBorderOuter);
			baseData.target[0].radius = storeData.moveRadiusMin;
			setAnglePos(baseData.target[0], 0, 0, baseData.target[0].radius);

			baseGameContainer.addChild(baseBg, baseData.target[0]);
		break;

		case 19:
			storeData = {
				width:gameSettings.screen.width*2.6,
				objectRadius:gameSettings.screen.width/3,
				moveRadius:gameSettings.screen.width/2,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				objects:[0,60,120,180,240,300],
				objectIndex:0,
				obstacles:[[90,270],[30,210],[150,330]],
				scoreIndex:-1,
				scoreCon:false,
				extra:[]
			}

			var targetSize = games_arr[gameData.gameNum].settings.size[0];
			storeData.extra = [
				{x:targetSize, y:0},
				{x:targetSize*.8, y:targetSize*.8},
				{x:-(targetSize*.8), y:targetSize*.8},
				{x:-targetSize, y:0},
				{x:-(targetSize*.8), y:-(targetSize*.8)},
				{x:(targetSize*.8), y:-(targetSize*.8)}
			]

			for(var n = 0; n<storeData.objects.length; n++){
				var baseRadius = games_arr[gameData.gameNum].settings.size[0]/2;
				var rectW = games_arr[gameData.gameNum].settings.size[0]*15;
				var rectH = games_arr[gameData.gameNum].settings.size[0];

				var rectBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseGrey, -(rectW/2), -(rectH/2), rectW, rectH, baseRadius);
				rectBg.angle = storeData.objects[n];
				setAnglePos(rectBg, 0, 0, storeData.objectRadius);
				
				rectBg.rotation = storeData.objects[n]+90;

				baseData.objects.push(rectBg);
				baseGameContainer.addChild(rectBg);

				if(storeData.objectIndex == n){
					baseData.target[0].x = rectBg.x;
					baseData.target[0].y = rectBg.y;
				}
				
				rectBg.x += storeData.extra[n].x;
				rectBg.y += storeData.extra[n].y;
			}

			baseGameContainer.addChild( baseData.target[0]);	
		break;

		case 18:
			storeData = {
				moveX:gameSettings.screen.width/1.8,
				width:gameSettings.screen.width*2.6,
				height:gameSettings.screen.height/100 * 25,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				last:{x:0, y:0, rotation:0},
				scoreCon:false,
				scoreObj:null,
				scoreSide:false,
				distance:[10,80],
				way:randomBoolean()
			}

			var baseH = games_arr[gameData.gameNum].settings.size[0]/2;
			var baseRadius = games_arr[gameData.gameNum].settings.size[0] * .2;
			var baseTop = drawRect('fill', gameSettings.colors[gameData.colorNum].baseLight, -(storeData.moveX/2 + (games_arr[gameData.gameNum].settings.size[0]/2)), -(baseH/2), storeData.moveX + games_arr[gameData.gameNum].settings.size[0], baseH, baseRadius);
			var baseBottom = drawRect('fill', gameSettings.colors[gameData.colorNum].baseLight, -(storeData.moveX/2 + (games_arr[gameData.gameNum].settings.size[0]/2)), -(baseH/2), storeData.moveX + games_arr[gameData.gameNum].settings.size[0], baseH, baseRadius);
			baseTop.y = -(storeData.height + baseH);
			baseBottom.y = storeData.height + baseH;

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0].particleIndex = 1;

			baseGameContainer.addChild(baseTop, baseBottom, baseData.target[0]);
		break;

		case 17:
			storeData = {
				moveRadius:gameSettings.screen.width/8,
				width:gameSettings.screen.width/100 * 45,
				height:gameSettings.screen.height * 2,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleW:0,
				obstacleRange:0,
				obstacleRangeExtend:0,
				position:[],
				side:randomBoolean(),
				way:false
			}

			storeData.position[0] = (storeData.width/2) - (baseData.target[0].size);
			storeData.position[1] = -((storeData.width/2) - (baseData.target[0].size));

			storeData.obstacleW = storeData.width/1.2;
			storeData.obstacleRange = (storeData.width/100 * 20);
			storeData.obstacleRangeExtend = storeData.width/100 * 15;

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var maskBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			baseData.target[0].angle = 270;

			baseGameContainer.addChild(baseBg, baseData.target[0]);
			baseGameContainer.mask = maskBg;
		break;

		case 16:
			storeData = {
				width:gameSettings.screen.width*2.6,
				objectRadius:gameSettings.screen.width/3,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				objects:[45, 135, 225, 315],
				objectIndex:0,
				scoreIndex:-1,
				scoreCon:false,
				distance:[10,80],
				extra:[],
				way:randomBoolean()
			}

			var targetSize = games_arr[gameData.gameNum].settings.size[0]*1.5;
			storeData.extra = [
				{x:targetSize, y:targetSize},
				{x:-targetSize, y:targetSize},
				{x:-targetSize, y:-targetSize},
				{x:targetSize, y:-targetSize},
			]

			for(var n = 0; n<storeData.objects.length; n++){
				var baseRadius = games_arr[gameData.gameNum].settings.size[0];
				var rectW = games_arr[gameData.gameNum].settings.size[0]*4;
				var rectH = games_arr[gameData.gameNum].settings.size[0]*2;

				var rectBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseGrey, -(rectW/2), -(rectH/2), rectW, rectH, baseRadius);
				rectBg.angle = storeData.objects[n];
				setAnglePos(rectBg, 0, 0, storeData.objectRadius);
				
				rectBg.rotation = -storeData.objects[n];

				baseData.objects.push(rectBg);
				baseGameContainer.addChild(rectBg);

				if(storeData.objectIndex == n){
					baseData.target[0].x = rectBg.x;
					baseData.target[0].y = rectBg.y;
				}
				
				rectBg.x += storeData.extra[n].x;
				rectBg.y += storeData.extra[n].y;
			}

			baseGameContainer.addChild( baseData.target[0]);
		break;

		case 15:
			storeData = {
				width:gameSettings.screen.width*2.6,
				height:gameSettings.screen.height/100 * 45,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleH:0,
				obstacleRange:[-20, 50],
				position:[],
				distance:[10,80],
				side:randomBoolean(),
				way:randomBoolean()
			}

			storeData.objectH = storeData.height/1.5;
			storeData.position[0] = (storeData.height/2) - (baseData.target[0].size/2);
			storeData.position[1] = -((storeData.height/2) - (baseData.target[0].size/2));

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var maskBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0].particleIndex = 1;
			baseData.target[0].y = baseData.settings.side == true ? storeData.position[0] : storeData.position[1];

			baseGameContainer.addChild(baseBg, baseData.target[0]);
			baseGameContainer.mask = maskBg;
		break;

		case 14:
			storeData = {
				moveRadius:games_arr[gameData.gameNum].settings.size[1] + games_arr[gameData.gameNum].settings.size[0]*2,
				moveRadiusMax:gameSettings.screen.width/1.3,
				objectRadius:gameSettings.screen.width/2.6,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				objects:[0,60,120,180,240,300],
				objectIndex:0,
				objectOldIndex:0
			}

			for(var n = 0; n<storeData.objects.length; n++){
				var baseRadius = games_arr[gameData.gameNum].settings.size[1];
				var circleBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseGrey, 0, 0, baseRadius);
				circleBg.size = baseRadius;
				circleBg.angle = storeData.objects[n];
				setAnglePos(circleBg, 0, 0, storeData.objectRadius);

				baseData.objects.push(circleBg);
				baseGameContainer.addChild(circleBg);
			}

			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);

			baseGameContainer.addChild(baseData.target[0]);
		break;

		case 13:
			storeData = {
				moveRadius:(games_arr[gameData.gameNum].settings.size[0] * 3) + games_arr[gameData.gameNum].settings.size[0]*2,
				moveRadiusMax:gameSettings.screen.width/1.8,
				objectRadius:gameSettings.screen.width/2.6,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				objects:[0,45,90,135,180,225,270,315],
				objectLast:-1,
				rotateCon:false,
				rotate:0,
				baseRotate:[45,-45,90,-90]
			}

			for(var n = 0; n<storeData.objects.length; n++){
				var baseRadius = games_arr[gameData.gameNum].settings.size[1];
				var circleBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseGrey, 0, 0, baseRadius);
				circleBg.size = baseRadius;
				circleBg.angle = storeData.objects[n];
				setAnglePos(circleBg, 0, 0, storeData.objectRadius);

				baseData.objects.push(circleBg);
				baseGameContainer.addChild(circleBg);
			}

			var baseRadius = games_arr[gameData.gameNum].settings.size[0] * 3;
			var baseBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, baseRadius);
			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);

			baseGameContainer.addChild(baseBg, baseData.target[0]);
		break;

		case 12:
			storeData = {
				moveRadius:gameSettings.screen.width/3.9,
				baseInnerRadius:gameSettings.screen.width/9,
				baseRadius:gameSettings.screen.width/2.3,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleInit:false,
				obstacles:[45, 135, 225, 315],
				scores:[0, 90, 180, 270],
				scoreIndex:-1,
				scoreCon:false
			}

			var baseBorderOuter = games_arr[gameData.gameNum].settings.size[0];
			var baseStroke = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, storeData.baseRadius, baseBorderOuter);
			var baseBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, storeData.baseInnerRadius, baseBorderOuter);

			baseGameContainer.addChild(baseBg, baseData.target[0]);
			baseDesignContainer.addChild(baseStroke);
		break;

		case 11:
			storeData = {
				moveRadius:gameSettings.screen.width/6,
				width:gameSettings.screen.width * 2.6,
				height:gameSettings.screen.height/100 * 45,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacles:[],
				distance:[10,50],
				way:randomBoolean()
			}

			var range = storeData.moveRadius/100 * 80;
			storeData.obstacles = [-range, range];

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			baseData.target[0].angle = 0;

			baseData.target[1] = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, games_arr[gameData.gameNum].settings.size[0]);
			baseData.target[1].angle = 180;
			baseData.target[1].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[1].particleIndex = 1;

			baseGameContainer.addChild(baseBg, baseData.target[0], baseData.target[1]);
		break;

		case 1:
			storeData = {
				moveRadius:(games_arr[gameData.gameNum].settings.size[0] * 3) + games_arr[gameData.gameNum].settings.size[0]*2,
				moveRadiusMax:gameSettings.screen.width/1.8,
				baseRadius:gameSettings.screen.width/2.3,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleRange:[45, 180]
			}
			var baseRadius = games_arr[gameData.gameNum].settings.size[0] * 3;
			var baseBorderOuter = games_arr[gameData.gameNum].settings.size[1] * 2;

			var baseBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseDark, 0, 0, baseRadius);
			var baseBgOuter = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseDark, 0, 0, storeData.baseRadius, baseBorderOuter, );

			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			baseGameContainer.addChild(baseBgOuter, baseBg, baseData.target[0]);
		break;
		
		case 2:
			storeData = {
				startY:gameSettings.screen.height/100 * 40,
				rotateMax:270 + 35,
				rotateMin:270 - 35,
				moveRadiusMax:gameSettings.screen.width/1.2,
				moveX:gameSettings.screen.width/1.5,
				moveY:-(gameSettings.screen.height/100 * 30),
				obstacleSize:games_arr[gameData.gameNum].settings.size[1]
			}

			storeData.moveY += (games_arr[gameData.gameNum].settings.size[1]) + games_arr[gameData.gameNum].settings.size[0];

			var baseH = games_arr[gameData.gameNum].settings.size[0] * 1.5;
			var baseRadius = games_arr[gameData.gameNum].settings.size[0] * .8;
			
			var obstableBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseGrey, -(storeData.moveX/2), -(baseH/2), storeData.moveX, baseH, baseRadius);

			baseData.objects[0] = new createjs.Container();
			baseData.objects[0].angle = 270;
			var pos = {y:-(games_arr[gameData.gameNum].settings.size[0] * 4)};
			var size = [.8, .7, .6];
			for(var n=0; n<size.length; n++){
				var radius = games_arr[gameData.gameNum].settings.size[0] * size[n];
				var newDot = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, radius);
				newDot.y = pos.y;
				pos.y -= radius * 3;

				baseData.objects[0].addChild(newDot);
			}

			var baseBg = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, games_arr[gameData.gameNum].settings.size[0] * 2);

			baseBg.alpha = .3;
			obstableBg.y = -(gameSettings.screen.height/100 * 30);
			baseData.target[0].y = baseBg.y = baseData.objects[0].y = storeData.startY;

			baseGameContainer.addChild(obstableBg, baseBg, baseData.target[0], baseData.objects[0]);
		break;
		
		case 3:
			storeData = {
				width:gameSettings.screen.width,
				height:gameSettings.screen.height/100 * 60,
				moveRadiusMax:gameSettings.screen.width,
				stroke:games_arr[gameData.gameNum].settings.size[0],
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				turn:[45, 135, 225, 315],
				turnIndex:0,
				way:false
			}
			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var baseStrokeBg = drawRect('stroke', gameSettings.colors[gameData.colorNum].baseLight, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0, storeData.stroke);

			baseGameContainer.addChild(baseBg, baseData.target[0]);
			baseDesignContainer.addChild(baseStrokeBg);
			animateTarget();
		break;

		case 4:
			storeData = {
				first:true,
				pass:false,
				width:gameSettings.screen.width/100 * 60,
				height:gameSettings.screen.height/100 * 60,
				moveRadiusMax:gameSettings.screen.width,
				stroke:games_arr[gameData.gameNum].settings.size[0],
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacles:[],
				obstacleIndex:-1
			}

			var percentX = storeData.width/100 * 35;
			var percentY = storeData.height/100 * 35;
			storeData.obstacles = [
				{x:-percentX, y:0},
				{x:-percentX, y:-percentY},
				{x:-percentX, y:percentY},
				{x:percentX, y:0},
				{x:percentX, y:-percentY},
				{x:percentX, y:percentY},
				{x:0, y:-percentY},
				{x:0, y:percentY},
				{x:0, y:0},
			];

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var baseStrokeBg = drawRect('stroke', gameSettings.colors[gameData.colorNum].baseLight, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0, storeData.stroke);

			baseGameContainer.addChild(baseBg, baseData.target[0]);
			baseDesignContainer.addChild(baseStrokeBg);
		break;

		case 5:
			storeData = {
				width:gameSettings.screen.width/100 * 50,
				height:gameSettings.screen.height/100 * 50,
				moveRadiusMax:gameSettings.screen.width/1.2,
				stroke:games_arr[gameData.gameNum].settings.size[0] * 2.5,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				preview:[],
				previewIndex:0,
				turn:[45, 135, 225, 315],
				turnIndex:0,
				obstacles:[],
				obstacleIndex:-1
			}
			var percentX = storeData.width/100 * 68;
			var percentY = storeData.height/100 * 68;
			storeData.preview = [
				{x:0, y:-percentY},
				{x:percentX, y:0},
				{x:0, y:percentY},
				{x:-percentX, y:0},
			];

			var percentX = storeData.width/100 * 35;
			var percentY = storeData.height/100 * 35;
			storeData.obstacles = [
				{x:-percentX, y:-percentY},
				{x:percentX, y:-percentY},
				{x:-percentX, y:percentY},
				{x:percentX, y:percentY},
			];

			storeData.previewIndex = Math.floor(Math.random()* storeData.preview.length);

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[0].angle = randomIntFromInterval(0, 360);
			baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0].particleIndex = 1;
			baseData.target[0].rotation = 45;
			baseData.target[0].x = storeData.preview[storeData.previewIndex].x;
			baseData.target[0].y = storeData.preview[storeData.previewIndex].y;

			var randomIndex = storeData.previewIndex;
			if(!baseData.settings.side){
				randomIndex = increaseArrayIndex(storeData.previewIndex, storeData.preview);
			}
			storeData.turnIndex = randomIndex;
			
			var baseStrokeBg = drawRect('stroke', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0, storeData.stroke);
			baseStrokeBg.rotation = 45;

			var hitOuterStroke = games_arr[gameData.gameNum].settings.size[0];
			var hitOuterW = storeData.width + (storeData.stroke/2) + (hitOuterStroke/2) + (games_arr[gameData.gameNum].settings.size[0]);
			var hitOuterH = storeData.height + (storeData.stroke/2) + (hitOuterStroke/2) + (games_arr[gameData.gameNum].settings.size[0]);
			var hitOuterBg = new createjs.Shape();
			hitOuterBg.hitArea = new createjs.Shape(drawRect('stroke', gameSettings.colors[gameData.colorNum].baseGrey, -(hitOuterW/2), -(hitOuterH/2), hitOuterW, hitOuterH, 0, hitOuterStroke));
			hitOuterBg.rotation = 45;

			var hitInneStroke = games_arr[gameData.gameNum].settings.size[0];
			var hitInnerW = storeData.width - ((storeData.stroke/2) + (hitOuterStroke/2) + (games_arr[gameData.gameNum].settings.size[0]));
			var hitInnerH = storeData.height - ((storeData.stroke/2) + (hitOuterStroke/2) + (games_arr[gameData.gameNum].settings.size[0]));
			var hitInnerBg = new createjs.Shape();
			hitInnerBg.hitArea = new createjs.Shape(drawRect('stroke', gameSettings.colors[gameData.colorNum].baseGrey, -(hitInnerW/2), -(hitInnerH/2), hitInnerW, hitInnerH, 0, hitInneStroke));
			hitInnerBg.rotation = 45;

			baseData.objects[0] = new createjs.Container();
			baseData.objects[0].addChild(hitOuterBg, hitInnerBg);
			baseGameContainer.addChild(baseStrokeBg, baseData.objects[0], baseData.target[0]);
		break;

		case 6:
			storeData = {
				moveRadius:gameSettings.screen.width/3.3,
				baseRadius:gameSettings.screen.width/2.3,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1]
			}

			var baseBorderOuter = games_arr[gameData.gameNum].settings.size[0];
			var baseStroke = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, storeData.baseRadius, baseBorderOuter);
			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			baseData.target[0].angle = 0;

			baseData.target[1] = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, games_arr[gameData.gameNum].settings.size[0]);
			baseData.target[1].angle = 180;
			baseData.target[1].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[1].particleIndex = 1;

			baseGameContainer.addChild(baseData.target[0], baseData.target[1]);
			baseDesignContainer.addChild(baseStroke);
		break;

		case 7:
			storeData = {
				moveRadius:gameSettings.screen.width/8,
				width:gameSettings.screen.width/100 * 45,
				height:gameSettings.screen.height * 2,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleW:0,
				obstacleRange:0,
				obstacleRangeExtend:0,
				way:false
			}

			storeData.obstacleW = storeData.width/1.2;
			storeData.obstacleRange = (storeData.width/100 * 20);
			storeData.obstacleRangeExtend = storeData.width/100 * 15;

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var maskBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);

			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			baseData.target[0].angle = 0;

			baseData.target[1] = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, games_arr[gameData.gameNum].settings.size[0]);
			baseData.target[1].angle = 180;
			baseData.target[1].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[1].particleIndex = 1;

			baseGameContainer.addChild(baseBg, baseData.target[0], baseData.target[1]);
			baseGameContainer.mask = maskBg;
		break;

		case 8:
			storeData = {
				width:gameSettings.screen.width*2.6,
				height:gameSettings.screen.height/100 * 45,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				turn:[135, 225],
				obstacleRadius:gameSettings.screen.width,
				position:[],
				way:randomBoolean()
			}

			if(!storeData.way){
				storeData.turn = [45, 315];
			}

			storeData.position[0] = (storeData.height/2) - (baseData.target[0].size/2);
			storeData.position[1] = -((storeData.height/2) - (baseData.target[0].size/2));

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0].particleIndex = 1;
			baseData.target[0].y = baseData.settings.side == true ? storeData.position[0] : storeData.position[1];

			baseGameContainer.addChild(baseBg, baseData.target[0]);
		break;

		case 9:
			baseData.settings.side = true;
			storeData = {
				width:gameSettings.screen.width/100 * 50,
				height:gameSettings.screen.height * 2,
				turn:0,
				moveX:0,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				obstacleW:0,
				obstacleSide:[0,0,1,1,1],
				obstacleSideIndex:0,
				obstacleAlpha:[0,0,1,1,1,1,1,1],
				obstacleAlphaIndex:0,
				way:false
				
			}

			shuffle(storeData.obstacleSide);
			shuffle(storeData.obstacleAlpha);

			storeData.moveX = (storeData.width/100 * 60)/3;
			storeData.obstacleW = storeData.moveX;

			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);
			var maskBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.width/2), -(storeData.height/2), storeData.width, storeData.height, 0);

			var squareSize = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[0].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[0].particleIndex = 1;
			baseData.target[0].x = -storeData.moveX;

			baseData.target[1] = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(squareSize/2), -(squareSize/2), squareSize, squareSize, 0);
			baseData.target[1].size = games_arr[gameData.gameNum].settings.size[0];
			baseData.target[1].particleIndex = 1;
			baseData.target[1].x = storeData.moveX;

			baseGameContainer.addChild(baseBg, baseData.target[0], baseData.target[1]);
			baseGameContainer.mask = maskBg;
		break;

		case 10:
			storeData = {
				width:gameSettings.screen.width*2.6,
				moveRadius:gameSettings.screen.width/100 * 15,
				obstacleSize:games_arr[gameData.gameNum].settings.size[1],
				way:true,
			}
			var baseRadius = storeData.moveRadius;
			var baseBg = drawCircle('stroke', gameSettings.colors[gameData.colorNum].baseDark, 0, 0, baseRadius, games_arr[gameData.gameNum].settings.size[0] * 2);
			setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			baseGameContainer.addChild(baseBg, baseData.target[0]);
		break;

		default:
			storeData = {
				moveX:(gameSettings.screen.width/1.5),
				obstacleSize:games_arr[gameData.gameNum].settings.size[1]
			}
			var baseH = games_arr[gameData.gameNum].settings.size[0] * 2;
			var baseRadius = games_arr[gameData.gameNum].settings.size[0] * 1.2;
			var baseBg = drawRect('fill', gameSettings.colors[gameData.colorNum].baseDark, -(storeData.moveX/2), -(baseH/2), storeData.moveX, baseH, baseRadius);
			baseGameContainer.addChild(baseBg, baseData.target[0]);
	}

	baseData.target[0].oldX = baseData.target[0].x;
	baseData.target[0].oldY = baseData.target[0].y;

	prepareGameSettings();
	togglePreview(true);
	gameData.paused = false;
}

function drawCircle(type, color, x, y, radius, stroke){
	var newShape = new createjs.Shape();
	if(type == 'fill'){
		newShape.fillCommand = newShape.graphics.beginFill(color).command;
		newShape.graphics.drawCircle(x, y, radius);
	}else{
		newShape.graphics.setStrokeStyle(stroke).beginStroke(color).drawCircle(0, 0, radius);
	}
	newShape.setBounds(-(radius), -(radius), radius*2, radius*2);

	return newShape;
}

function drawRect(type, color, x, y, w, h, borderRadius, stroke){
	var newShape = new createjs.Shape();
	if(type == 'fill'){
		newShape.fillCommand = newShape.graphics.beginFill(color).command;
		if(borderRadius > 0){
			newShape.graphics.drawRoundRectComplex(x, y, w, h, borderRadius, borderRadius, borderRadius, borderRadius);
		}else{
			newShape.graphics.drawRect(x, y, w, h);
		}
	}else{
		if(borderRadius > 0){
			newShape.graphics.setStrokeStyle(stroke).beginStroke(color).drawRoundRectComplex(x, y, w, h, borderRadius, borderRadius, borderRadius, borderRadius);
		}else{
			newShape.graphics.setStrokeStyle(stroke).beginStroke(color).drawRect(x, y, w, h);
		}
	}
	newShape.setBounds(x, y, w, h);

	return newShape;
}

function togglePreview(con){
	baseData.preview = con;
	
	switch(gameData.type){
		case 4: case 5: case 8: case 9: case 15: case 16: case 17: case 18: case 19: case 21: case 22: case 23: case 25: case 26: case 27: case 28: case 30: case 31: case 32:
			animatePreview();
		break;

		default:
			baseData.preview = false;
	}
}

function animatePreview(){
	switch(gameData.type){
		case 32:
			animateTarget(animatePreview);
		break;

		case 31:
			if(!baseData.preview){
				return;
			}

			var newObject = {x:0, y:0, angle:0};
			var randomIndex = findUniqueIndex(storeData.position, [storeData.positionIndex]);
			storeData.positionIndex = randomIndex;
			newObject.angle = storeData.position[randomIndex];
			setAnglePos(newObject, 0, 0, storeData.baseRadius - storeData.obstacleSize);

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {delay:.5, x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				playSound('soundWall');
				TweenMax.to(baseData.target[0], speed, {x:0, y:0, ease:Linear.easeNone, overwrite:true, onComplete:function(){
					animatePreview();
				}});
			}});
		break;

		case 30:
			animateTarget(animatePreview);
		break;

		case 28:
			if(!baseData.preview){
				return;
			}

			baseData.settings.side = baseData.settings.side == true ? false : true;
			TweenMax.to(storeData, .5, {ease:Linear.easeNone, overwrite:true, onComplete:function(){
				animateTarget(animatePreview);
			}});
		break;

		case 27:
			if(!baseData.preview){
				return;
			}

			storeData.obstacleIndex = findUniqueIndex(storeData.obstacles, [storeData.obstacleIndex]);
			var delayNum = 1;
			for(var n=0; n<4; n++){
				var newObject = {x:storeData.obstacles[storeData.obstacleIndex], y:baseData.target[n].y};
				var speed = getTweenSpeed(getDistance(baseData.target[n].x, baseData.target[n].y, newObject.x, newObject.y), baseData.settings.speed[0]);
				
				if(n == 0){
					TweenMax.to(baseData.target[n], speed, {delay:delayNum, x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
						storeData.obstacleIndex = findUniqueIndex(storeData.obstacles, [storeData.obstacleIndex]);
						animatePreview();
					}});
				}else{
					TweenMax.to(baseData.target[n], speed, {delay:delayNum, x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true});
				}
			}
		break;

		case 26:
			if(!baseData.preview){
				return;
			}

			storeData.last.old = baseData.target[0].angle;

			var newObject = {x:0, y:0, angle:0};
			newObject.angle = storeData.last.old + 180;
			newObject.angle += randomIntFromInterval(storeData.rotateRange[0], storeData.rotateRange[1]);
			newObject.angle = newObject.angle > 360 ? newObject.angle-360 : newObject.angle;
			setAnglePos(newObject, 0, 0, storeData.moveRadius);

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			storeData.last.target = baseData.target[0].angle;

			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				playSound('soundWall');
				animatePreview();
			}});
		break;

		case 25:
			animateTarget(animatePreview);
		break;

		case 23:
			if(!baseData.preview){
				return;
			}

			baseData.animating = true;
			var newObject = {x:0, y:storeData.topY - (storeData.topY*2)};
			TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:newObject.y, ease:Power2.easeIn, onComplete:function(){
				playSound('soundWall');
			}});
			TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:storeData.topY, ease:Power2.easeOut, delay:baseData.settings.speed[0]/3.8, onComplete:function(){
				baseData.animating = false;
				animatePreview();
			}});
		break;

		case 22:
			if(!baseData.preview){
				return;
			}
			
			TweenMax.to(baseData.target[0], .5, {ease:Linear.easeNone, overwrite:true, onComplete:function(){
				var newObject = {x:0, y:baseData.target[0].y-(storeData.bottomY/1.2)};
				TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:newObject.y, ease:Power2.easeOut});
				TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:storeData.bottomY, ease:Power2.easeIn, delay:baseData.settings.speed[0]/5, onStart:function(){
					storeData.jump++;
					if(randomBoolean()){
						var newObject = {x:0, y:baseData.target[0].y-(storeData.bottomY/1.2)};
						TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:newObject.y, ease:Power2.easeOut});
						TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:storeData.bottomY, ease:Power2.easeIn, delay:baseData.settings.speed[0]/5, onStart:function(){
							storeData.jump++;
						}, onComplete:function(){
							playSound('soundWall');
							storeData.jump=0;
							animatePreview();
						}});
					}
				}, onComplete:function(){
					playSound('soundWall');
					storeData.jump=0;
					animatePreview();
				}});
			}});
		break;

		case 21:
			if(!baseData.preview){
				return;
			}
			
			baseData.animating = true;
			var newObject = {x:0, y:0, angle:0};
			newObject.x = randomIntFromInterval(-(storeData.width/2), storeData.width/2);
			newObject.y = randomIntFromInterval(-(storeData.height/2), storeData.height/2);

			if(randomBoolean()){
				newObject.x = storeData.turnX == true ? -(storeData.width/2) : (storeData.width/2);
			}else{
				newObject.y = storeData.turnY == true ? -(storeData.height/2) : (storeData.height/2);
			}

			storeData.turnX = storeData.turnX == true ? false : true;
			storeData.turnY = storeData.turnY == true ? false : true;
			
			
			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				playSound('soundWall');
				baseData.animating = false;
				animatePreview();
			}});
		break;

		case 19:
			animateTarget(animatePreview);
		break;

		case 18:
			if(!baseData.preview){
				return;
			}

			baseData.settings.side = baseData.settings.side == true ? false : true;
			
			var randomX = randomIntFromInterval(-(storeData.moveX/2), storeData.moveX/2);
			var newObject = {x:randomX, y:0, rotation:0};
			newObject.y = baseData.settings.side == false ? -(storeData.height) : storeData.height;
			newObject.rotation = randomBoolean() ? storeData.last.rotation+180 : storeData.last.rotation-180;

			storeData.last.x = newObject.x;
			storeData.last.y = newObject.y;
			storeData.last.rotation = newObject.rotation;

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, rotation:newObject.rotation, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				playSound('soundWall');
				animatePreview();
			}});
		break;

		case 17:
			if(!baseData.preview){
				return;
			}
			
			baseData.settings.side = baseData.settings.side == true ? false : true;
			animateTarget(animatePreview);
		break;

		case 16:
			animateTarget(animatePreview);
		break;

		case 15:
			if(!baseData.preview){
				return;
			}
			
			baseData.settings.side = baseData.settings.side == true ? false : true;
			animateTarget(animatePreview);
		break;

		case 4:
			var randomIndex = Math.floor(Math.random() * storeData.obstacles.length);
			var newObject = {x:0, y:0};
			newObject.x = storeData.obstacles[randomIndex].x;
			newObject.y = storeData.obstacles[randomIndex].y;

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				animatePreview();
			}});
		break;

		case 5:
			if(baseData.settings.side){
				storeData.previewIndex = increaseArrayIndex(storeData.previewIndex, storeData.preview);
			}else{
				storeData.previewIndex = decreaseArrayIndex(storeData.previewIndex, storeData.preview);
			}

			var newObject = {x:0, y:0};
			newObject.x = storeData.preview[storeData.previewIndex].x;
			newObject.y = storeData.preview[storeData.previewIndex].y;

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				if(baseData.settings.side){
					storeData.turnIndex = increaseArrayIndex(storeData.turnIndex, storeData.turn);
				}else{
					storeData.turnIndex = decreaseArrayIndex(storeData.turnIndex, storeData.turn);
				}
				animatePreview();
			}});
		break;

		case 8:
			if(!baseData.preview){
				return;
			}
			
			baseData.settings.side = baseData.settings.side == true ? false : true;
			animateTarget(animatePreview);
		break;

		case 9:
			if(!baseData.preview){
				return;
			}

			baseData.settings.side = baseData.settings.side == true ? false : true;
			TweenMax.to(storeData, .5, {ease:Linear.easeNone, overwrite:true, onComplete:function(){
				animateTarget(animatePreview);
			}});
		break;

		default:
			
	}
}

/*!
 * 
 * PREPARE GAME - This is the function that runs for game settings
 * 
 */
function prepareGameSettings(){
	destoryProton();

	baseData.animating = false;
	baseData.touch = false;
	baseData.over = false;

	protonData.explodeEmitter = [];
	protonData.trailEmitter = [];
	baseData.settings.delay = games_arr[gameData.gameNum].settings.delay;
	baseData.settings.score = games_arr[gameData.gameNum].settings.score;
	baseData.settings.loop = games_arr[gameData.gameNum].settings.loop;
	baseData.settings.count = 0;
	baseData.settings.countData = [];

	baseData.settings.speed = [];
	for(var n=0; n<games_arr[gameData.gameNum].settings.speed.length; n++){
		baseData.settings.speed.push(games_arr[gameData.gameNum].settings.speed[n])
	}

	baseData.settings.size = [];
	for(var n=0; n<games_arr[gameData.gameNum].settings.size.length; n++){
		baseData.settings.size.push(games_arr[gameData.gameNum].settings.size[n])
	}

	baseData.levels.target = games_arr[gameData.gameNum].levels.target;
	baseData.levels.loop = games_arr[gameData.gameNum].levels.loop;

	baseData.levels.speed = [];
	for(var n=0; n<games_arr[gameData.gameNum].levels.speed.length; n++){
		baseData.levels.speed.push(games_arr[gameData.gameNum].levels.speed[n])
	}

	var protonTrails = {
		shape:'circle',
		color:gameSettings.colors[gameData.colorNum].main,
		size:gameSettings.particles[0],
	};

	var protonExplode = {
		shape:'square',
		color:gameSettings.colors[gameData.colorNum].main,
		size:gameSettings.particles[1],
	};

	var protonExplodeObstacle = {
		shape:'square',
		color:gameSettings.colors[gameData.colorNum].obstacle,
		size:gameSettings.particles[1],
	};

	switch(gameData.type){
		case 28: case 30: case 33:
			baseData.settings.countData = [2,3];
		break;

		case 15: case 22: case 23:
			baseData.settings.countData = [1,2];
			setupTrailProton(protonTrails);
		break;

		case 17: case 25: case 29:
			baseData.settings.countData = [2,3];
			setupTrailProton(protonTrails);
		break;

		case 13: case 24:
			baseData.settings.countData = [1,2];
		break;
		
		case 3:
			baseData.settings.countData = [3,5];
			setupTrailProton(protonTrails);
		break;

		case 4: case 5: case 12: case 16: case 18: case 19: case 20: case 21: case 26: case 31: case 32:
			setupTrailProton(protonTrails);
		break;

		case 7: case 11:
			baseData.settings.countData = [2,3];
			break;

		case 8:
			baseData.settings.countData = [2,4];
			setupTrailProton(protonTrails);
			break;

		case 9: case 10:
			baseData.settings.countData = [2,4];
			break;

		case 0: case 6:
			baseData.settings.countData = [3,5];

		default:

	}

	setupExplodeProton(protonExplode);
	setupExplodeProton(protonExplodeObstacle);

	baseData.settings.count = randomIntFromInterval(baseData.settings.countData[0], baseData.settings.countData[1]);
}

/*!
 * 
 * GAME TOUCH EVENTS - This is the function that runs for game touch events
 * 
 */
function actionTouch(evt){
	if(gameData.paused){
		return;
	}

	if(baseData.over){
		return;
	}
	
	if(!baseData.touch){
		return;
	}

	if(baseData.animating){
		return;
	}
	
	playSound('soundSwing');
	
	switch(gameData.type){
		case 31:
			if(storeData.scoreCon){
				baseData.animating = true;
				animateTarget();
			}
		break;

		case 21: case 23: case 27: case 34:
			baseData.animating = true;
			animateTarget();
		break;

		case 22:
			animateTarget();
		break;

		case 20:
			baseData.settings.turn = baseData.settings.turn == true ? false : true;
		break;

		case 16: case 19: case 25: case 30: case 32:
			baseData.settings.side = baseData.settings.side == true ? false : true;
			if(baseData.settings.side){
				storeData.objectIndex = increaseArrayIndex(storeData.objectIndex, storeData.objects);
			}else{
				storeData.objectIndex = decreaseArrayIndex(storeData.objectIndex, storeData.objects);
			}
			animateTarget();
		break;
		
		case 1: case 2: case 13: case 14: case 28:
			baseData.animating = true;
			baseData.settings.side = baseData.settings.side == true ? false : true;
			animateTarget();
		break;
		
		case 3:
			baseData.settings.turn = baseData.settings.turn == true ? false : true;
			animateTarget();
		break;

		case 4:
			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, thisObj.x, thisObj.y);
				if(distanceNum <= thisObj.size/1.2){
					updateGameScore(baseData.settings.score);
					removeObject(thisObj);
					createObjects();
				}
			}
		break;

		case 5:
			if(baseData.settings.side){
				storeData.turnIndex = increaseArrayIndex(storeData.turnIndex, storeData.turn);
			}else{
				storeData.turnIndex = decreaseArrayIndex(storeData.turnIndex, storeData.turn);
			}
			animateTarget();
		break;

		case 8: case 15: case 17: case 18: case 26:
			baseData.settings.side = baseData.settings.side == true ? false : true;
			animateTarget();
		break;

		case 9:
			var point = baseGameContainer.globalToLocal(evt.stageX, evt.stageY);
			if(storeData.turn == 0){
				if(point.x <= 0){
					storeData.turn = 1;
				}else{
					storeData.turn = 2;
				}
			}else{
				storeData.turn = 0;
			}
			animateTarget();
		break;

		default:
			baseData.settings.side = baseData.settings.side == true ? false : true;
	}
}

function animateTarget(callback){
	switch(gameData.type){
		case 32:
			var newObject = {x:0, y:0, angle:0};
			newObject.x = storeData.objects[storeData.objectIndex].x;
			newObject.y = storeData.objects[storeData.objectIndex].y;
			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				if(callback == undefined){
					if(storeData.scoreIndex == storeData.scoreArr[storeData.objectIndex]){
						updateGameScore(baseData.settings.score);
						storeData.scoreCon = false;
						createObjects();
					}
				}
				
				playSound('soundWall');				
				if(baseData.settings.side){
					storeData.objectIndex = increaseArrayIndex(storeData.objectIndex, storeData.objects);
				}else{
					storeData.objectIndex = decreaseArrayIndex(storeData.objectIndex, storeData.objects);
				}
				if(callback != undefined){
					animatePreview();
				}else{
					animateTarget();
				}
			}});
		break;

		case 31:
			var newObject = {x:0, y:0, rotation:0};
			newObject.x = storeData.scoreObj.x;
			newObject.y = storeData.scoreObj.y;
			newObject.rotation = storeData.scoreObj.rotation;

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, rotation:newObject.rotation, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, storeData.scoreObj.x, storeData.scoreObj.y);
				if(distanceNum < storeData.scoreObj.size){
					removeObject(storeData.scoreObj);
					updateGameScore(baseData.settings.score);
					storeData.scoreCon = false;
				}

				playSound('soundWall');
				actionTouchRevert();
			}});
		break;

		case 30:
			var newObject = {x:storeData.objects[storeData.objectIndex].x, y:storeData.objects[storeData.objectIndex].y, angle:0};
			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				if(baseData.settings.side){
					storeData.objectIndex = increaseArrayIndex(storeData.objectIndex, storeData.objects);
				}else{
					storeData.objectIndex = decreaseArrayIndex(storeData.objectIndex, storeData.objects);
				}
				
				playSound('soundPass');
				if(callback != undefined){
					animatePreview();
				}else{
					animateTarget();
				}
			}});
		break;

		case 28:
			var newObject = {x:0, y:0};
			newObject.x = baseData.settings.side == false ? -(storeData.moveX) : storeData.moveX;

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			if(callback != undefined){
				TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:callback});
			}else{
				baseData.animating = false;
				TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true});
			}
		break;

		case 27:
			for(var n=0; n<4; n++){
				var newObject = {x:baseData.obstacles[0].x, y:baseData.target[n].y};
				var speed = getTweenSpeed(getDistance(baseData.target[n].x, baseData.target[n].y, newObject.x, newObject.y), baseData.settings.speed[0]);
				TweenMax.to(baseData.target[n], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
					baseData.animating = false;
				}});
			}
		break;

		case 26:
			var newObject = {angle:0};
			if(!baseData.settings.side){
				newObject.angle = storeData.last.old;
			}else{
				newObject.angle = storeData.last.target;
			}
			setAnglePos(newObject, 0, 0, storeData.moveRadius);

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, rotation:newObject.rotation, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				if(baseData.settings.side){
					storeData.last.old = storeData.last.target;

					var newAngle = storeData.last.target + 180;
					newAngle += randomIntFromInterval(storeData.rotateRange[0], storeData.rotateRange[1]);
					newAngle = newAngle > 360 ? newAngle - 360 : newAngle;

					storeData.last.target = newAngle;
				}else{
					baseData.settings.side = baseData.settings.side == true ? false : true;
				}
				playSound('soundWall');
				animateTarget();
			}});
		break;

		case 25:
			var newObject = {x:0, y:0, angle:0};
			newObject.angle = storeData.objects[storeData.objectIndex];
			setAnglePos(newObject, 0, 0, storeData.objectRadius);
			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				if(baseData.settings.side){
					storeData.objectIndex = increaseArrayIndex(storeData.objectIndex, storeData.objects);
				}else{
					storeData.objectIndex = decreaseArrayIndex(storeData.objectIndex, storeData.objects);
				}
				
				playSound('soundPass');
				if(callback != undefined){
					animatePreview();
				}else{
					animateTarget();
				}
			}});
		break;

		case 23:
			if(baseData.animating){
				storeData.hintObj.visible = false;
				TweenMax.killTweensOf(storeData.hintObj);
				
				var newObject = {x:0, y:storeData.topY - (storeData.topY*2)};
				TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:newObject.y, ease:Power2.easeIn, onComplete:function(){
					playSound('soundWall');
				}});
				TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:storeData.topY, ease:Power2.easeOut, delay:baseData.settings.speed[0]/3.8, onComplete:function(){
					baseData.animating = false;
					actionTouchRevert();
				}});
			}
		break;

		case 22:
			if(storeData.jump < storeData.jumpCount){
				storeData.jump++;
				TweenMax.killTweensOf(baseData.target[0]);

				if(storeData.jump >= storeData.jumpCount){
					baseData.animating = true;
				}
				
				var newObject = {x:0, y:baseData.target[0].y-(storeData.bottomY/1.2)};
				var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
				TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:newObject.y, ease:Power2.easeOut});
  				TweenMax.to(baseData.target[0], baseData.settings.speed[0]/4, {y:storeData.bottomY, ease:Power2.easeIn, delay:baseData.settings.speed[0]/5, onStart:function(){
					baseData.animating = true;
					storeData.jump++;
				}, onComplete:function(){
					playSound('soundWall');
					baseData.animating = false;
					storeData.jump = 0;
				}});
			}
		break;

		case 21:
			var newObject = {x:0, y:0, angle:0};
			newObject.angle = baseData.objects[0].angle;
			setAnglePos(newObject, 0, 0, storeData.moveRadiusMax);
			
			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				
			}});
		break;

		case 19:
			var newObject = {x:0, y:0, angle:0};
			newObject.angle = storeData.objects[storeData.objectIndex];
			setAnglePos(newObject, 0, 0, storeData.objectRadius);
			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				if(callback == undefined){
					if(storeData.scoreIndex == storeData.objectIndex){
						updateGameScore(baseData.settings.score);
						storeData.scoreCon = false;
						createObjects();
					}
					animateTarget();
				}
				
				playSound('soundWall');
				if(baseData.settings.side){
					storeData.objectIndex = increaseArrayIndex(storeData.objectIndex, storeData.objects);
				}else{
					storeData.objectIndex = decreaseArrayIndex(storeData.objectIndex, storeData.objects);
				}

				if(callback != undefined){
					animatePreview();
				}else{
					animateTarget();
				}
			}});
		break;

		case 18:
			var newObject = {x:0, y:0, rotation:0};
			if(baseData.settings.side){
				newObject.x = storeData.last.x;
				newObject.y = storeData.last.y;
				newObject.rotation = storeData.last.rotation;
			}else{
				newObject.x = storeData.scoreObj.x;
				newObject.y = storeData.scoreObj.y;
				newObject.rotation = storeData.scoreObj.rotation;
			}

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, rotation:newObject.rotation, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, storeData.scoreObj.x, storeData.scoreObj.y);
				if(distanceNum < storeData.scoreObj.size){
					removeObject(storeData.scoreObj);
					updateGameScore(baseData.settings.score);
					
					storeData.last.x = baseData.target[0].x;
					storeData.last.y = baseData.target[0].y;
					storeData.scoreCon = false;
					createObjects();
				}

				baseData.settings.side = baseData.settings.side == true ? false : true;
				playSound('soundWall');
				animateTarget();
			}});
		break;

		case 17:
			var areaIndex = baseData.settings.side == true ? 1 : 0;
			var newObject = {x:0, y:0};
			newObject.x = storeData.position[areaIndex];
			newObject.y = 0;

			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				playSound('soundPass');
				if(callback != undefined){
					animatePreview();
				}else{
					baseData.settings.side = baseData.settings.side == true ? false : true;
					animateTarget();
				}
			}});
		break;

		case 16:
			var newObject = {x:0, y:0, angle:0};
			newObject.angle = storeData.objects[storeData.objectIndex];
			setAnglePos(newObject, 0, 0, storeData.objectRadius);
			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				if(callback == undefined){
					if(storeData.scoreIndex == storeData.objectIndex){
						updateGameScore(baseData.settings.score);
						storeData.scoreCon = false;
						createObjects();
					}
				}
				
				playSound('soundWall');				
				if(baseData.settings.side){
					storeData.objectIndex = increaseArrayIndex(storeData.objectIndex, storeData.objects);
				}else{
					storeData.objectIndex = decreaseArrayIndex(storeData.objectIndex, storeData.objects);
				}
				if(callback != undefined){
					animatePreview();
				}else{
					animateTarget();
				}
			}});
		break;

		case 15:
			var areaIndex = baseData.settings.side == true ? 1 : 0;
			var newObject = {x:0, y:0};
			newObject.x = 0;
			newObject.y = storeData.position[areaIndex];

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				playSound('soundPass');
				if(callback != undefined){
					animatePreview();
				}
			}});
		break;

		case 14: case 34:
			var pos = getRadiusPos(baseData.target[0], baseData.objects[storeData.objectOldIndex].x, baseData.objects[storeData.objectOldIndex].y, storeData.moveRadiusMax);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0] + 3);

			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				baseData.target[0].visible = false;
				createExplosion(baseData.target[0], true);
				endGame();
			}});
		break;

		case 13:
			var pos = getRadiusPos(baseData.target[0], 0, 0, storeData.moveRadiusMax);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0] + 3);

			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				baseData.target[0].visible = false;
				createExplosion(baseData.target[0], true);
				endGame();
			}});
		break;

		case 1:
			var pos = getRadiusPos(baseData.target[0], 0, 0, storeData.moveRadiusMax);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0] + 3);

			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				baseData.target[0].visible = false;
				createExplosion(baseData.target[0], true);
				endGame();
			}});
		break;
		
		case 2:
			var pos = getRadiusPos(baseData.objects[0], baseData.target[0].x, baseData.target[0].y, storeData.moveRadiusMax);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0] + 3);

			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				baseData.target[0].visible = false;
				createExplosion(baseData.target[0], true);
				endGame();
			}});
		break;
		
		case 3:
			if(baseData.settings.side){
				if(baseData.settings.turn){
					storeData.turnIndex = 0;
				}else{
					storeData.turnIndex = 3;
				}
			}else{
				if(baseData.settings.turn){
					storeData.turnIndex = 1;
				}else{
					storeData.turnIndex = 2;
				}
			}
			
			baseData.target[0].angle = storeData.turn[storeData.turnIndex];
			var pos = getRadiusPos(baseData.target[0], baseData.target[0].x, baseData.target[0].y, storeData.moveRadiusMax);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0]);

			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true});
		break;

		case 4:
			baseData.obstacles[0].angle = baseData.target[0].angle = getDirection(baseData.target[0], baseData.obstacles[0]);
			var pos = getRadiusPos(baseData.obstacles[0], baseData.target[0].x, baseData.target[0].y, storeData.moveRadiusMax);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				
			}});
		break;

		case 5:
			baseData.target[0].angle = storeData.turn[storeData.turnIndex];
			var pos = getRadiusPos(baseData.target[0], baseData.target[0].x, baseData.target[0].y, storeData.moveRadiusMax);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0]);

			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true});
		break;

		case 8:
			var areaIndex = baseData.settings.side == true ? 1 : 0;
			var newObject = {x:0, y:0};
			newObject.x = 0;
			newObject.y = storeData.position[areaIndex];

			baseData.target[0].angle = getDirection(baseData.target[0], newObject);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, newObject.x, newObject.y), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:newObject.x, y:newObject.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				if(callback != undefined){
					animatePreview();
				}
				playSound('soundPass');
			}});
		break;

		case 9:
			var previewCon = callback != undefined ? true : false;
			var centerX = 0;
			var moveX = storeData.moveX;
			if(previewCon){
				if(storeData.turn == 0){
					if(randomBoolean()){
						storeData.turn = 1;
						centerX -= moveX;
					}else{
						storeData.turn = 2;
						centerX += moveX;
					}
				}else{
					storeData.turn = 0;
				}
			}else{
				if(storeData.turn == 1){
					centerX -= moveX;
				}else if(storeData.turn == 2){
					centerX += moveX;
				}
			}

			for(var n=0; n<baseData.target.length; n++){
				var moveX = storeData.moveX;
				var withCallback = false;
				moveX = n == 0 ? centerX - moveX : centerX + moveX;
				var speed = getTweenSpeed(getDistance(baseData.target[n].x, baseData.target[n].y, moveX, baseData.target[n].y), baseData.settings.speed[0]);
				if(callback != undefined && n == 0){
					withCallback = true;
				}

				if(withCallback){
					TweenMax.to(baseData.target[n], speed, {x:moveX, ease:Linear.easeNone, overwrite:true, onComplete:callback});
				}else{
					TweenMax.to(baseData.target[n], speed, {x:moveX, ease:Linear.easeNone, overwrite:true});
				}
			}
		break;

		default:
			
	}
}

function actionTouchRevert(){
	switch(gameData.type){
		case 31:
			var pos = getRadiusPos(baseData.target[0], 0, 0, storeData.baseRadius);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, 0, 0), baseData.settings.speed[0]);
			TweenMax.to(baseData.target[0], speed, {x:0, y:0, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				baseData.animating = false;
				createObjects();
			}});
		break;

		case 23:
			storeData.hintObj.visible = true;
			storeData.hintObj.scaleX = storeData.hintObj.scaleY = 3;
			storeData.hintObj.alpha = 0;

			TweenMax.to(storeData.hintObj, baseData.settings.speed[0]*.8, {scaleX:1, scaleY:1, alpha:1, ease:Linear.easeNone, onComplete:function(){
				playSound('soundSwing');
				baseData.animating = true;
				animateTarget();
			}});
		break;

		case 14: case 34:
			baseData.target[0].angle = getDirection(baseData.objects[storeData.objectIndex], baseData.target[0]);
			baseData.animating = false;
			createObjects();
		break;

		case 13:
			var pos = getRadiusPos(baseData.target[0], 0, 0, storeData.moveRadius);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0] + 3);

			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				baseData.animating = false;
				createObjects();
			}});
		break;

		case 1:
			var pos = getRadiusPos(baseData.target[0], 0, 0, storeData.moveRadius);
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, pos.x, pos.y), baseData.settings.speed[0] + 3);

			TweenMax.to(baseData.target[0], speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				baseData.animating = false;
				createObjects();
			}});
		break;
		
		case 2:
			var speed = getTweenSpeed(getDistance(baseData.target[0].x, baseData.target[0].y, 0, storeData.startY), baseData.settings.speed[0] + 3);

			TweenMax.to(baseData.target[0], speed, {x:0, y:storeData.startY, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				baseData.animating = false;
				createObjects();
			}});
		break;

		default:
			
	}
}

/*!
 * 
 * RESIZE GAME LAYOUT - This is the function that runs for resize game layout
 * 
 */
function resizeGameLayout(){
	var scoreX = canvasW/2;
	var scoreY = baseContainer.y;
	
	switch(gameData.type){
		case 29:
			scoreY = viewport.isLandscape ? scoreY+100 : scoreY+280;
		break;

		case 5: case 8: case 10: case 11: case 15: case 16: case 18: case 19: case 22: case 23: case 25: case 27: case 31: case 32: case 33:
			scoreY = scoreY+240;
		break;

		case 7: case 9: case 17: case 24: case 28:
			scoreY = viewport.isLandscape ? scoreY-200 : scoreY-300;
		break;

		case 1: case 2: case 3: case 4: case 6: case 12: case 13: case 14: case 21: case 26: case 34:
			scoreY = scoreY+260;
		break;

		case 0:  case 30:
			scoreY = viewport.isLandscape ? scoreY+200 : scoreY+300;
		break;

		default:

	}

	scoreContainer.x = scoreX;
	scoreContainer.y = scoreY;
}

/*!
 * 
 * START GAME TYPE - This is the function that runs for start game type
 * 
 */
function startGameType(){
	togglePreview(false);

	switch(gameData.type){
		case 32:
			loopObjects();
			animateTarget();
		break;

		case 31:
			TweenMax.killTweensOf(baseData.target[0]);
			baseData.target[0].x = 0;
			baseData.target[0].y = 0;
			createObjects();
			loopObjects();
		break;

		case 27:
			for(var n=0; n<4; n++){
				TweenMax.killTweensOf(baseData.target[n]);
			}
			createObjects();
		break;

		case 26:
			createObjects();
			createObjects();
			animateTarget();
		break;

		case 25:
			loopObjects();
			animateTarget()
		break;

		case 23:
			loopObjects();
			actionTouchRevert();
		break;

		case 12: case 21:
			createObjects();
			loopObjects();
		break;

		case 20: case 34:
			createObjects();
			createObjects();
		break;

		case 17: case 18:
			createObjects();
			loopObjects();
			animateTarget();
		break;

		case 16: case 18: case 19:
			createObjects();
			loopObjects();
			animateTarget();
		break;

		case 1: case 2: case 4: case 13: case 14:
			createObjects();
		break;

		case 5:
			animateTarget();
			createObjects();
		break;

		default:
			loopObjects();
	}

	gameData.paused = true;
	TweenMax.pauseAll(true, true);

	TweenMax.to(baseData, baseData.settings.delay, {overwrite:true, onComplete:function(){
		baseData.touch = true;
		gameData.paused = false;
		TweenMax.resumeAll(true, true);
	}});
}

/*!
 * 
 * GAME LOOP - This is the function that runs for game loop
 * 
 */
function loopGames(){
	var defaultCollision = false;

	switch(gameData.type){
		case 34:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], baseData.objects[storeData.objectOldIndex].x, baseData.objects[storeData.objectOldIndex].y, storeData.moveRadius);
			}

			for(var n = 0; n<baseData.objects.length; n++){
				baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].baseGrey;
				if(storeData.objectOldIndex == n){
					baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].baseLight;
				}
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				if(thisObj.objectType == 'score'){
					var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, thisObj.x, thisObj.y);
					if(distanceNum <= baseData.target[0].size + thisObj.size){
						storeData.objectOldIndex = storeData.objectIndex;
						storeData.objectIndex = thisObj.objectIndex;
						TweenMax.killTweensOf(baseData.target[0]);

						removeObject(thisObj);
						updateGameScore(baseData.settings.score);
						actionTouchRevert();
					}
				}else{
					loopTargetAngle(thisObj, baseData.settings.speed[1]);
					setAnglePos(thisObj, baseData.objects[thisObj.objectIndex].x, baseData.objects[thisObj.objectIndex].y, storeData.obstacleRadius);

					if(hitBounds(thisObj, baseData.target[0])){
						for(var t2=0; t2<baseData.target.length; t2++){
							baseData.target[t2].visible = false;
						}
						createExplosion(baseData.target[0], true);
						endGame();
					}
				}
			}
		break;

		case 33:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				loopTargetAngle(baseData.target[1], baseData.settings.speed[0]);
				loopTargetAngle(baseData.target[2], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
				setAnglePos(baseData.target[1], 0, 0, storeData.moveRadius);
				setAnglePos(baseData.target[2], 0, 0, storeData.moveRadius);
			}

			defaultCollision = true;
		break;

		case 31:
			for(var n=0; n<baseData.obstacles.length; n++){
				if(baseData.obstacles[n].objectType == 'hit'){
					if(baseData.obstacles[n].side){
						baseData.obstacles[n].angle += baseData.settings.speed[1];
					}else{
						baseData.obstacles[n].angle -= baseData.settings.speed[1];
					}
					setAnglePos(baseData.obstacles[n], 0, 0, baseData.obstacles[n].radius);
				}
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					if(hitBounds(thisObj, baseData.target[t])){
						if(thisObj.objectType == 'hit'){
							for(var t2=0; t2<baseData.target.length; t2++){
								baseData.target[t2].visible = false;
							}
							createExplosion(baseData.target[t], true);
							endGame();
						}
					}
				}
			}
		break;

		case 29:
			var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, 0, 0);
			if(distanceNum > 5){
				storeData.turn = true;
			}

			if(distanceNum <= 5 && storeData.turn){
				storeData.turn = false;
				baseData.settings.turn = baseData.settings.turn == true ? false : true;
				baseData.target[0].angle = baseData.settings.turn == true ? 90 : 270;
				storeData.centerObj = baseData.settings.turn == true ? baseData.objects[0] : baseData.objects[1];
			}

			if(baseData.settings.side){
				if(baseData.settings.turn){
					baseData.target[0].angle += baseData.settings.speed[0];
				}else{
					baseData.target[0].angle -= baseData.settings.speed[0];
				}
			}else{
				if(baseData.settings.turn){
					baseData.target[0].angle -= baseData.settings.speed[0];
				}else{
					baseData.target[0].angle += baseData.settings.speed[0];
				}
			}

			setAnglePos(baseData.target[0], storeData.centerObj.x, storeData.centerObj.y, storeData.moveRadius);

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					if(hitBounds(thisObj, baseData.target[t])){
						if(thisObj.objectType == 'score'){
							storeData.scoreCon = false;
							removeObject(thisObj);
							updateGameScore(baseData.settings.score);
						}else{
							for(var t2=0; t2<baseData.target.length; t2++){
								baseData.target[t2].visible = false;
							}
							createExplosion(baseData.target[t], true);
							endGame();
						}
					}
				}
			}
		break;
		
		case 27:
			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					if(hitBounds(thisObj, baseData.target[t])){
						if(thisObj.side == baseData.target[t].side){
							removeObject(thisObj);
							updateGameScore(baseData.settings.score);
							createObjects();
						}else{
							for(var t2=0; t2<baseData.target.length; t2++){
								baseData.target[t2].visible = false;
							}
							createExplosion(baseData.target[t], true);
							endGame();
						}
					}
				}
			}
		break;

		case 26:
			if(baseData.touch){
				if(baseData.settings.turn){
					storeData.angle += baseData.settings.speed[1];
				}else{
					storeData.angle -= baseData.settings.speed[1];
				}
			}

			for(var n = 0; n<baseData.obstacles.length; n++){
				baseData.obstacles[n].angle = storeData.angle + baseData.obstacles[n].oriAngle;
				baseData.obstacles[n].rotation = baseData.obstacles[n].angle;
				setAnglePos(baseData.obstacles[n], 0, 0, baseData.obstacles[n].radius);
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, thisObj.x, thisObj.y);
					if(distanceNum <= baseData.target[0].size * 3 && thisObj.objectType == 'hit'){
						for(var t2=0; t2<baseData.target.length; t2++){
							baseData.target[t2].visible = false;
						}
						createExplosion(baseData.target[t], true);
						endGame();
					}

					if(hitBounds(thisObj, baseData.target[t])){
						if(thisObj.objectType == 'score'){
							baseData.settings.turn = baseData.settings.turn == true ? false : true;
							removeObject(thisObj);
							updateGameScore(baseData.settings.score);
							createObjects();
						}
					}
				}
			}
		break;

		case 25: case 30:
			defaultCollision = true;
		break;

		case 24:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				loopTargetAngle(baseData.target[1], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
				setAnglePos(baseData.target[1], 0, 0, storeData.moveRadius);
			}

			defaultCollision = true;
		break;

		case 21:
			if(!baseData.preview){
				if(!baseData.animating){
					if(storeData.scoreCon){
						if(!baseData.objects[0].visible){
							baseData.objects[0].visible = true;

							baseData.objects[0].x = baseData.target[0].x;
							baseData.objects[0].y = baseData.target[0].y;
							baseData.objects[0].angle = baseData.objects[0].oriAngle = getDirection(baseData.target[0], storeData.scoreObj);
						}
						
						var maxRotate = 25;
						if(baseData.objects[0].side){
							baseData.objects[0].angle += baseData.settings.speed[0] * .5;
							if(baseData.objects[0].angle > baseData.objects[0].oriAngle + maxRotate){
								baseData.objects[0].side = false;
							}
						}else{
							baseData.objects[0].angle -= baseData.settings.speed[0] * .5;
							if(baseData.objects[0].angle < baseData.objects[0].oriAngle - maxRotate){
								baseData.objects[0].side = true;
							}
						}
						
						baseData.target[0].angle = getDirection(baseData.target[0], storeData.scoreObj);
						baseData.objects[0].rotation = baseData.objects[0].angle + 90;
					}
				}else{
					baseData.objects[0].visible = false;

					var hitCorner = false;
					var extraNum = 1;
					if(baseData.target[0].x <= -(storeData.width/2)){
						baseData.target[0].x = -(storeData.width/2 - extraNum);
						hitCorner = true;
					}

					if(baseData.target[0].x >= (storeData.width/2)){
						baseData.target[0].x = (storeData.width/2) - extraNum;
						hitCorner = true;
					}

					if(baseData.target[0].y <= -(storeData.height/2)){
						baseData.target[0].y = -(storeData.height/2 - extraNum);
						hitCorner = true;
					}

					if(baseData.target[0].y >= (storeData.height/2)){
						baseData.target[0].y = (storeData.height/2) - extraNum;
						hitCorner = true;
					}

					if(hitCorner){
						playSound('soundWall');
						TweenMax.killTweensOf(baseData.target[0]);
						baseData.animating = false;
					}
				}

				for(var n=0; n<baseData.obstacles.length; n++){
					var thisObj = baseData.obstacles[n];
					for(var t=0; t<baseData.target.length; t++){	
						if(hitBounds(thisObj, baseData.target[t])){
							if(thisObj.objectType == 'score'){
								removeObject(thisObj);
								updateGameScore(baseData.settings.score);
								storeData.scoreCon = false;
							}else{
								baseData.objects[0].visible = false;
								for(var t2=0; t2<baseData.target.length; t2++){
									baseData.target[t2].visible = false;
								}
								createExplosion(baseData.target[t], true);
								endGame();
							}
						}
					}
				}
			}
		break;

		case 20:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);

				if(baseData.settings.turn){
					baseData.target[0].radius += baseData.settings.speed[0]*4;
					baseData.target[0].radius = baseData.target[0].radius >= storeData.moveRadiusMax ? storeData.moveRadiusMax : baseData.target[0].radius;
				}else{
					baseData.target[0].radius -= baseData.settings.speed[0]*4;
					baseData.target[0].radius = baseData.target[0].radius <= storeData.moveRadiusMin ? storeData.moveRadiusMin : baseData.target[0].radius;
				}
				setAnglePos(baseData.target[0], 0, 0, baseData.target[0].radius);
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					if(thisObj.objectType == 'hit'){
						var hitObject = {x:0, y:0, angle:thisObj.angle};
						var radius = [0, -storeData.obstacleSize, storeData.obstacleSize];
						var hitCon = false;
						for(var l=0; l<3; l++){
							setAnglePos(hitObject, 0, 0, thisObj.tween.radius + radius[l]);
							var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, hitObject.x, hitObject.y);
							if(distanceNum <= baseData.target[0].size*2){
								hitCon = true;
							}
						}

						if(hitCon){
							for(var t2=0; t2<baseData.target.length; t2++){
								baseData.target[t2].visible = false;
							}
							createExplosion(baseData.target[t], true);
							endGame();
						}
					}

					if(hitBounds(thisObj, baseData.target[t])){
						if(thisObj.objectType == 'score'){
							removeObject(thisObj);
							updateGameScore(baseData.settings.score);
							createObjects();
						}
					}
				}
			}
		break;

		case 18:
			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					if(hitBounds(thisObj, baseData.target[t])){
						if(thisObj.objectType == 'hit'){
							for(var t2=0; t2<baseData.target.length; t2++){
								baseData.target[t2].visible = false;
							}
							createExplosion(baseData.target[t], true);
							endGame();
						}
					}
				}
			}
		break;

		case 14:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], baseData.objects[storeData.objectOldIndex].x, baseData.objects[storeData.objectOldIndex].y, storeData.moveRadius);
			}

			for(var n = 0; n<baseData.objects.length; n++){
				baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].baseGrey;

				if(storeData.objectOldIndex == n){
					baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].baseLight;
				}
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, thisObj.x, thisObj.y);
				if(distanceNum <= baseData.target[0].size + thisObj.size){
					storeData.objectOldIndex = storeData.objectIndex;
					storeData.objectIndex = thisObj.objectIndex;
					TweenMax.killTweensOf(baseData.target[0]);

					removeObject(thisObj);
					updateGameScore(baseData.settings.score);
					actionTouchRevert();
				}
			}
		break;
		
		case 13:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			}

			for(var n = 0; n<baseData.objects.length; n++){
				baseData.objects[n].angle = storeData.rotate + storeData.objects[n];
				setAnglePos(baseData.objects[n], 0, 0, storeData.objectRadius);
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				thisObj.x = baseData.objects[thisObj.objectIndex].x;
				thisObj.y = baseData.objects[thisObj.objectIndex].y;

				var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, thisObj.x, thisObj.y);
				if(distanceNum <= baseData.target[0].size + thisObj.size){
					TweenMax.killTweensOf(baseData.target[0]);

					removeObject(thisObj);
					updateGameScore(baseData.settings.score);
					actionTouchRevert();
				}
			}
		break;

		case 12:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					var distanceNum = getDistance(baseData.target[t].x, baseData.target[t].y, thisObj.x, thisObj.y);
					if(distanceNum <= (baseData.target[t].size/2) + (thisObj.size/2)){
						if(thisObj.objectType == 'score'){
							storeData.scoreCon = false;
							removeObject(thisObj);
							updateGameScore(baseData.settings.score);
						}else{
							for(var t2=0; t2<baseData.target.length; t2++){
								baseData.target[t2].visible = false;
							}
							createExplosion(baseData.target[t], true);
							endGame();
						}
					}
				}
			}
		break;

		case 11:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				loopTargetAngle(baseData.target[1], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
				setAnglePos(baseData.target[1], 0, 0, storeData.moveRadius);
			}

			defaultCollision = true;
		break;

		case 1:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, thisObj.x, thisObj.y);
				if(distanceNum <= baseData.target[0].size + thisObj.size){
					TweenMax.killTweensOf(baseData.target[0]);

					removeObject(thisObj);
					updateGameScore(baseData.settings.score);
					actionTouchRevert();
				}
			}
		break;
		
		case 2:
			if(!baseData.animating){
				loopTargetAngle(baseData.objects[0], baseData.settings.speed[0]* .3);

				if(baseData.objects[0].angle > (storeData.rotateMax)){
					baseData.settings.side = false;
				}else if(baseData.objects[0].angle < (storeData.rotateMin)){
					baseData.settings.side = true;
				}

				baseData.objects[0].rotation = baseData.objects[0].angle + 90;
			}
			
			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				var distanceNum = getDistance(baseData.target[0].x, baseData.target[0].y, thisObj.x, thisObj.y);
				if(distanceNum <= baseData.target[0].size + thisObj.size){
					TweenMax.killTweensOf(baseData.target[0]);

					removeObject(thisObj);
					updateGameScore(baseData.settings.score);
					actionTouchRevert();
				}
			}
		break;
		
		case 3:
			if(baseData.target[0].x > (storeData.width/2 - (storeData.stroke + (baseData.target[0].size/2)))){
				playSound('soundWall');
				baseData.settings.side = false;
				animateTarget();
			}

			if(baseData.target[0].x < -((storeData.width/2) - (storeData.stroke + (baseData.target[0].size/2)))){
				playSound('soundWall');
				baseData.settings.side = true;
				animateTarget();
			}

			if(baseData.target[0].y > (storeData.height/2 - (storeData.stroke + (baseData.target[0].size/2)))){
				playSound('soundWall');
				baseData.settings.turn = false;
				animateTarget();
			}

			if(baseData.target[0].y < -((storeData.height/2) - (storeData.stroke + (baseData.target[0].size/2)))){
				playSound('soundWall');
				baseData.settings.turn = true;
				animateTarget();
			}

			defaultCollision = true;
		break;

		case 4:
			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					if(hitBounds(thisObj, baseData.target[t])){
						if(!storeData.pass){
							storeData.pass = true;
						}
					}else{
						if(storeData.pass){
							baseData.target[0].visible = false;
							createExplosion(thisObj, true);
							endGame();
						}
					}
				}
			}
		break;

		case 5:
			for(var n=0; n<baseData.objects.length; n++){
				var thisObj = baseData.objects[n];
				if(thisObj.hitTest(baseData.target[0].x, baseData.target[0].y)){
					baseData.target[0].visible = false;
					createExplosion(baseData.target[0], true);
					endGame();
				}
			}

			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				for(var t=0; t<baseData.target.length; t++){
					if(hitBounds(thisObj, baseData.target[t])){
						var lastSide = baseData.settings.side;
						baseData.settings.side = randomBoolean();

						if(baseData.settings.side != lastSide){
							if(baseData.settings.side){
								storeData.turnIndex = decreaseArrayIndex(storeData.turnIndex, storeData.turn);
								storeData.turnIndex = decreaseArrayIndex(storeData.turnIndex, storeData.turn);
							}else{
								storeData.turnIndex = increaseArrayIndex(storeData.turnIndex, storeData.turn);
								storeData.turnIndex = increaseArrayIndex(storeData.turnIndex, storeData.turn);
							}
						}
						animateTarget();
						
						removeObject(thisObj);
						createObjects();
						updateGameScore(baseData.settings.score);
					}
				}
			}
		break;

		case 6:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				loopTargetAngle(baseData.target[1], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
				setAnglePos(baseData.target[1], 0, 0, storeData.moveRadius);
			}

			defaultCollision = true;
		break;

		case 7:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				loopTargetAngle(baseData.target[1], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
				setAnglePos(baseData.target[1], 0, 0, storeData.moveRadius);
			}

			defaultCollision = true;
		break;

		case 8:
			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				var bottomY = storeData.height/2 - thisObj.size;
				var topY = -(storeData.height/2 - thisObj.size);
				if(thisObj.y >= bottomY){
					thisObj.y = bottomY;
					thisObj.turnIndex = increaseArrayIndex(thisObj.turnIndex, storeData.turn);
					animateObject(thisObj);
				}

				if(thisObj.y <= topY){
					thisObj.y = topY;
					thisObj.turnIndex = increaseArrayIndex(thisObj.turnIndex, storeData.turn);
					animateObject(thisObj);
				}

				if(storeData.way){
					if(thisObj.x <= -(storeData.width/2)){
						removeObject(thisObj);
					}
				}else{
					if(thisObj.x >= (storeData.width/2)){
						removeObject(thisObj);
					}
				}
			}

			defaultCollision = true;
		break;

		case 9: case 15: case 16: case 17: case 19: case 22: case 23: case 28: case 32:
			defaultCollision = true;
		break;

		case 10:
			if(!baseData.animating){
				loopTargetAngle(baseData.target[0], baseData.settings.speed[0]);
				setAnglePos(baseData.target[0], 0, 0, storeData.moveRadius);
			}

			defaultCollision = true;
		break;
			
		default:
			if(baseData.settings.side){
				baseData.target[0].x += baseData.settings.speed[0];
			}else{
				baseData.target[0].x -= baseData.settings.speed[0];
			}

			if(baseData.target[0].x > (storeData.moveX/2) - baseData.target[0].size){
				playSound('soundPass');
				baseData.settings.side = false;
			}else if(baseData.target[0].x < -((storeData.moveX/2)  - baseData.target[0].size)){
				playSound('soundPass');
				baseData.settings.side = true;
			}
			
			defaultCollision = true;
	}

	if(defaultCollision){
		for(var n=0; n<baseData.obstacles.length; n++){
			var thisObj = baseData.obstacles[n];
			for(var t=0; t<baseData.target.length; t++){
				if(hitBounds(thisObj, baseData.target[t])){
					if(thisObj.objectType == 'score'){
						removeObject(thisObj);
						updateGameScore(baseData.settings.score);
					}else{
						for(var t2=0; t2<baseData.target.length; t2++){
							baseData.target[t2].visible = false;
						}
						createExplosion(baseData.target[t], true);
						endGame();
					}
				}
			}
		}
	}
}

/*!
 * 
 * GAME OBJECTS - This is the function that runs for game objects
 * 
 */
function loopObjects(){
	TweenMax.to(baseGameContainer, baseData.settings.loop, {overwrite:true, onComplete:function(){
		createObjects();
		loopObjects();
	}});
}

function createObjects(){
	switch(gameData.type){
		case 34:
			if(!storeData.obstacleInit){
				storeData.obstacleInit = true;
				
				for(var n=0; n<storeData.obstacles.length; n++){
					for(var a=0; a<storeData.obstacles[n].length; a++){
						var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, storeData.obstacleSize, 0);
						newObject.particleIndex = 0;
						baseData.obstacles.push(newObject);
						baseGameContainer.addChild(newObject);

						newObject.angle = storeData.obstacles[n][a];
						newObject.objectIndex = n;
						newObject.objectType = 'hit';
					}
				}
			}else{
				var randomIndex = findUniqueIndex(storeData.objects, [storeData.objectIndex]);
				storeData.objectIndex = randomIndex;

				var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, baseData.objects[randomIndex].size);
				newObject.particleIndex = 0;
				newObject.size = baseData.objects[randomIndex].size;
				newObject.objectIndex = randomIndex;
				newObject.objectType = 'score';
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				newObject.x = baseData.objects[randomIndex].x;
				newObject.y = baseData.objects[randomIndex].y;
			}
		break;

		case 33:
			var objectW = baseData.settings.count == 0 ? storeData.obstacleSize/1.5 : storeData.obstacleSize;
			var objectH = baseData.settings.count == 0 ? storeData.obstacleSize/1.5 : storeData.obstacleSize;
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(objectW/2), -(objectH/2), objectW, objectH, 0);
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.x = storeData.width/2;
			newObject.y = randomIntFromInterval(-(storeData.moveRadius), storeData.moveRadius);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			newObject.size = storeData.obstacleSize;
			
			animateObject(newObject);
			if(objectType == 'score'){
				animateObjectExtra(newObject);
			}
			updateCount();
		break;

		case 32:
			if(!storeData.scoreCon){
				storeData.scoreCon = true;

				storeData.scoreIndex = findUniqueIndex(storeData.scoreArr, [storeData.scoreIndex]);
				storeData.scoreIndex = storeData.scoreArr[storeData.scoreIndex];
				for(var n = 0; n<baseData.objects.length; n++){
					baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].baseGrey;

					if(storeData.scoreIndex == n){
						baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].main;
					}
				}
			}else{
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].obstacle, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
				newObject.particleIndex = 0;
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				storeData.obstacleIndex = findUniqueIndex(storeData.obstacles, [storeData.obstacleIndex]);
				if(storeData.obstaclesSide[storeData.obstacleIndex]){
					newObject.x = storeData.obstacles[storeData.obstacleIndex].lx;
					newObject.y = storeData.obstacles[storeData.obstacleIndex].ly;
					newObject.moveX = storeData.obstacles[storeData.obstacleIndex].rx;
					newObject.moveY = storeData.obstacles[storeData.obstacleIndex].ry;
				}else{
					newObject.x = storeData.obstacles[storeData.obstacleIndex].rx;
					newObject.y = storeData.obstacles[storeData.obstacleIndex].ry;
					newObject.moveX = storeData.obstacles[storeData.obstacleIndex].lx;
					newObject.moveY = storeData.obstacles[storeData.obstacleIndex].ly;
				}

				newObject.objectType = 'hit';
				newObject.particleIndex = 0;
				animateObject(newObject);
			}
		break;

		case 31:
			var changeSide = false;
			if(!storeData.obstacleInit){
				storeData.obstacleInit = true;
				
				for(var n=0; n<storeData.obstacles.length; n++){
					var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseLight, 0, 0, storeData.obstacleSize, 0);
					newObject.particleIndex = 0;
					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);

					newObject.angle = storeData.obstacles[n];
					newObject.radius = storeData.obstacleRadius + storeData.obstaclesDistance[n];
					setAnglePos(newObject, 0, 0, newObject.radius);
					newObject.objectType = 'hit';

					sideCount++;
					if(sideCount >= 2){
						sideCount = 0;
						hitSide = randomBoolean();
					}
				}
			}else{
				if(!storeData.scoreCon){
					storeData.scoreCon = true;
					changeSide = true;

					var scoreSize = storeData.obstacleSize;
					var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(scoreSize/2), -(scoreSize/2), scoreSize, scoreSize, 0);
					newObject.particleIndex = 0;
					newObject.objectType = 'score';
					newObject.size = scoreSize;

					var randomIndex = findUniqueIndex(storeData.position, [storeData.positionIndex]);
					storeData.positionIndex = randomIndex;
					newObject.angle = storeData.position[randomIndex];

					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);

					storeData.scoreObj = newObject;
					setAnglePos(newObject, 0, 0, storeData.baseRadius - (scoreSize*2));
				}
			}

			if(changeSide){
				var hitSide = randomBoolean();
				var sideCount = 0;
				for(var n=0; n<baseData.obstacles.length; n++){
					baseData.obstacles[n].side = hitSide;
					sideCount++;
					if(sideCount >= 2){
						sideCount = 0;
						hitSide = randomBoolean();
					}
				}
			}
		break;

		case 30:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var objectSize = baseData.settings.count == 0 ? storeData.obstacleSize/1.5 : storeData.obstacleSize;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(objectSize/2), -(objectSize/2), objectSize, objectSize, 0);
			newObject.particleIndex = 0;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);
			var randomIndex = findUniqueIndex(storeData.obstacles, [-1]);
			if(randomBoolean()){
				newObject.angle = storeData.obstacles[randomIndex][0];
				newObject.startRotate = storeData.obstacles[randomIndex][0];
				newObject.endRotate = storeData.obstacles[randomIndex][1];
			}else{
				newObject.angle = storeData.obstacles[randomIndex][1];
				newObject.startRotate = storeData.obstacles[randomIndex][1];
				newObject.endRotate = storeData.obstacles[randomIndex][0];
			}
			
			setAnglePos(newObject, 0, 0, storeData.moveRadius);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			
			animateObject(newObject);
			updateCount();
		break;

		case 29:
			var objectW = baseData.settings.count == 0 ? storeData.obstacleSize/2 : storeData.obstacleSize * 3;
			var objectH = baseData.settings.count == 0 ? storeData.obstacleSize/2 : storeData.obstacleSize;
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;
			
			if(objectType == 'hit'){
				var newObject = drawRect('fill', objectColor, -(objectW/2), -(objectH/2), objectW, objectH, 0);
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
				var rangeY = storeData.moveRadius * 1.5;
				newObject.x = storeData.way == true ? storeData.width/2+randomDistance : -(storeData.width/2+randomDistance);
				newObject.y = randomIntFromInterval(-(rangeY), rangeY);
				newObject.objectType = objectType;
				newObject.particleIndex = particleIndex;
				newObject.size = storeData.obstacleSize;
				
				animateObject(newObject);
			}else{
				if(!storeData.scoreCon){
					storeData.scoreCon = true;
					
					var newObject = drawRect('fill', objectColor, -(objectW/2), -(objectH/2), objectW, objectH, 0);
					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);

					var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
					var rangeY = storeData.moveRadius * 1.5;
					newObject.x = storeData.way == true ? storeData.width/2+randomDistance : -(storeData.width/2+randomDistance);
					newObject.y = randomIntFromInterval(-(rangeY), rangeY);
					newObject.objectType = objectType;
					newObject.particleIndex = particleIndex;
					newObject.size = storeData.obstacleSize;
					
					newObject.angle = randomIntFromInterval(0, 360);
					if(randomBoolean()){
						setAnglePos(newObject, baseData.objects[0].x, baseData.objects[0].y, storeData.moveRadius);
					}else{
						setAnglePos(newObject, baseData.objects[1].x, baseData.objects[1].y, storeData.moveRadius);
					}
					animateObjectExtra(newObject);
				}
			}
			updateCount();
		break;

		case 28:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var objectW = objectType == 'score' ? storeData.obstacleSize : storeData.obstacleW;
			var objectH = storeData.obstacleSize;
			var newObject = drawRect('fill', objectColor, -(objectW/2), -(objectH/2), objectW, objectH, 0);
			newObject.objectType = objectType;
			newObject.particleIndex = 0;
			newObject.size = objectW;

			var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
			var range = randomIntFromInterval(0, storeData.range);
			newObject.y = storeData.way == true ? (storeData.height/2 + randomDistance) : -(storeData.height/2 + randomDistance);
			newObject.x = randomBoolean() == true ? (storeData.stroke/2) + (newObject.size/2) : -((storeData.stroke/2) + (newObject.size/2));
			
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);
			
			animateObject(newObject);
			updateCount();
		break;

		case 27:
			storeData.obstacleIndex = findUniqueIndex(storeData.obstacles, [storeData.obstacleIndex]);

			var scoreSize = storeData.obstacleSize;
			var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(scoreSize/2), -(scoreSize/2), scoreSize, scoreSize, 0);
			newObject.side = randomBoolean();
			newObject.particleIndex = 0;
			newObject.objectType = 'score';

			var randomTarget = Math.floor(Math.random()*baseData.target.length);
			newObject.x = storeData.obstacles[storeData.obstacleIndex];
			newObject.y = baseData.target[randomTarget].y;

			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);
			animateObject(newObject);
		break;

		case 26:
			if(!storeData.obstacleInit){
				storeData.obstacleInit = true;

				var directionLength = 0;
				for(var n=0; n<4; n++){
					var objectSide = randomBoolean();
					var objectW = storeData.obstacleSize;
					var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].baseLight, -(objectW/2), -(storeData.obstacleSize/2), objectW, storeData.obstacleSize, 0);
					newObject.particleIndex = 0;
					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);

					var maxDivide = (directionLength + storeData.obstacleDivide) > storeData.obstacles.length-1 ? storeData.obstacles.length-1 : (directionLength + storeData.obstacleDivide);
					var randomIndex = randomIntFromInterval(directionLength, maxDivide);
					directionLength = randomIndex+1;
					newObject.angle = newObject.oriAngle = storeData.obstacles[randomIndex];
					storeData.obstaclesExist.push(randomIndex);
					
					newObject.radius = storeData.obstacleRadius - (storeData.obstacleSize/2);
					setAnglePos(newObject, 0, 0, newObject.radius);
					newObject.rotation = storeData.obstacles[randomIndex];
					newObject.objectType = 'hit';
					newObject.size = objectW;
				}
			}else{
				var scoreSize = storeData.obstacleSize/2;
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(scoreSize/2), -(scoreSize/2), scoreSize, scoreSize, 0);
				newObject.particleIndex = 0;
				newObject.objectType = 'score';
				newObject.size = scoreSize;

				storeData.obstaclesExist.push(storeData.obstacleIndex);
				var randomIndex = findUniqueIndex(storeData.obstacles, storeData.obstaclesExist);
				var findIndex = storeData.obstaclesExist.indexOf(storeData.obstaclesExist);
				storeData.obstaclesExist.splice(findIndex, 1);
				storeData.obstacleIndex = randomIndex;
				newObject.oriAngle = storeData.obstacles[randomIndex];
				newObject.angle = storeData.angle + storeData.obstacles[randomIndex];

				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				newObject.radius = storeData.obstacleRadius - (scoreSize*1.5);
				setAnglePos(newObject, 0, 0, newObject.radius);
			}
		break;

		case 25:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var objectSize = baseData.settings.count == 0 ? storeData.obstacleSize/1.5 : storeData.obstacleSize;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(objectSize/2), -(objectSize/2), objectSize, objectSize, 0);
			newObject.particleIndex = 0;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);
			
			var randomIndex = findUniqueIndex(storeData.obstacles, [-1]);
			if(randomBoolean()){
				newObject.angle = storeData.obstacles[randomIndex][0];
				newObject.startRotate = storeData.obstacles[randomIndex][0];
				newObject.endRotate = storeData.obstacles[randomIndex][1];
			}else{
				newObject.angle = storeData.obstacles[randomIndex][1];
				newObject.startRotate = storeData.obstacles[randomIndex][1];
				newObject.endRotate = storeData.obstacles[randomIndex][0];
			}
			
			setAnglePos(newObject, 0, 0, storeData.moveRadius);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			
			animateObject(newObject);
			updateCount();
		break;

		case 24:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
			baseData.obstacles.push(newObject);

			newObject.x = randomIntFromInterval(-(storeData.moveX/2), storeData.moveX/2);
			newObject.y = canvasH/100 * 70;
			newObject.rotation = randomIntFromInterval(-360, 360);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			newObject.size = storeData.obstacleSize;

			animateObject(newObject);
			baseGameContainer.addChild(newObject);

			updateCount();
		break;

		case 23:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var objectSize = baseData.settings.count == 0 ? storeData.obstacleSize/2 : storeData.obstacleSize;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(objectSize/2), -(objectSize/2), objectSize, objectSize, 0);
			newObject.particleIndex = 0;
			newObject.size = objectSize;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
			newObject.x = storeData.way == true ? storeData.width/2 + newObject.size + randomDistance : -(storeData.width/2 + newObject.size + randomDistance);
			newObject.y = storeData.height/2 - (objectSize/2);

			newObject.objectType = objectType;			
			animateObject(newObject);

			updateCount();
		break;

		case 22:
			var sizeW = storeData.obstacleSize;
			var sizeH = storeData.objectH;
			var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].obstacle, -(sizeW/2), -(sizeH/2), sizeW, sizeH, 0);
			newObject.particleIndex = 0;
			newObject.objectType = 'hit';
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
			var range = randomIntFromInterval(storeData.obstacleRange[0], storeData.obstacleRange[1]);
			newObject.x = storeData.way == true ? storeData.width/2+randomDistance : -(storeData.width/2+randomDistance);
			newObject.y = storeData.height/2 - range;
			animateObject(newObject);

			var obstacleX = newObject.x;
			var obstacleY = newObject.y;
			if(baseData.settings.count == 0){
				var scoreSize = storeData.obstacleSize/2;
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(scoreSize/2), -(scoreSize/2), scoreSize, scoreSize, 0);
				newObject.particleIndex = 0;
				newObject.objectType = 'score';
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				newObject.x = obstacleX;
				newObject.y = obstacleY < 0 ? obstacleY + (sizeH/1.2) : obstacleY - (sizeH/1.2);
				animateObject(newObject);
				animateObjectExtra(newObject);
			}

			updateCount();
		break;

		case 21:
			if(!storeData.obstacleInit){
				storeData.obstacleInit = true;
				
				var randomIndex = findUniqueIndex(storeData.obstacles, [-1]);
				for(var n=0; n<2; n++){
					var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].obstacle, 0, 0, storeData.obstacleSize);
					newObject.particleIndex = 0;
					newObject.size = storeData.obstacleSize;

					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);

					newObject.x = storeData.obstacles[randomIndex].x;
					newObject.y = storeData.obstacles[randomIndex].y;

					newObject.obstacleIndex = randomIndex;
					randomIndex = increaseArrayIndex(randomIndex, storeData.obstacles);
					randomIndex = increaseArrayIndex(randomIndex, storeData.obstacles);
				}

				animateObject();
			}else{
				if(!storeData.scoreCon){
					storeData.scoreCon = true;
					var scoreSize = storeData.obstacleSize;
					var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(scoreSize/2), -(scoreSize/2), scoreSize, scoreSize, 0);
					newObject.particleIndex = 0;
					newObject.objectType = 'score';
					newObject.size = scoreSize;
					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);

					var randomX = 0;
					var randomY = 0;
					var ratioStart = 2.5;
					var ratioEnd = 3.5;
					if(baseData.target[0].x < 0){
						randomX = randomIntFromInterval(storeData.width/ratioStart, storeData.width/ratioEnd);
					}else{
						randomX = randomIntFromInterval(-(storeData.width/ratioStart), -(storeData.width/ratioEnd));
					}

					if(baseData.target[0].y < 0){
						randomY = randomIntFromInterval(storeData.height/ratioStart, storeData.height/ratioEnd);
					}else{
						randomY = randomIntFromInterval(-(storeData.height/ratioStart), -(storeData.height/ratioEnd));
					}

					newObject.x = randomX;
					newObject.y = randomY;

					storeData.scoreObj = newObject;
					animateObjectExtra(newObject);
				}
			}
		break;

		case 20:
			if(!storeData.obstacleInit){
				storeData.obstacleInit = true;

				var directionLength = 0;
				for(var n=0; n<4; n++){
					var objectSide = randomBoolean();
					var objectW = storeData.obstacleSize * 4;
					var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].baseLight, -(objectW/2), -(storeData.obstacleSize/2), objectW, storeData.obstacleSize, 0);
					newObject.particleIndex = 0;
					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);

					var maxDivide = (directionLength + storeData.directionDivide) > storeData.obstacles.length-1 ? storeData.obstacles.length-1 : (directionLength + storeData.directionDivide);
					var randomIndex = randomIntFromInterval(directionLength, maxDivide);
					directionLength = randomIndex+1;
					newObject.angle = newObject.oriAngle = storeData.obstacles[randomIndex];
					storeData.obstaclesExist.push(randomIndex);
					
					var extraRadius = objectSide == true ? -(objectW/2) : (objectW/2);
					newObject.tween = {radius:storeData.baseRadius+extraRadius};
					setAnglePos(newObject, 0, 0, storeData.baseRadius+extraRadius);
					newObject.rotation = newObject.angle;
					newObject.objectType = 'hit';
					newObject.size = objectW;

					animateObject(newObject);
				}
				baseGameContainer.setChildIndex( baseData.target[0], baseGameContainer.numChildren-1);
			}else{
				var scoreSize = storeData.obstacleSize/2;
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(scoreSize/2), -(scoreSize/2), scoreSize, scoreSize, 0);
				newObject.particleIndex = 0;
				newObject.objectType = 'score';
				newObject.size = scoreSize;
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				storeData.obstaclesExist.push(storeData.obstacleIndex);
				var randomIndex = findUniqueIndex(storeData.obstacles, storeData.obstaclesExist);
				var findIndex = storeData.obstaclesExist.indexOf(storeData.obstaclesExist);
				storeData.obstaclesExist.splice(findIndex, 1);
				storeData.obstacleIndex = randomIndex;
				newObject.angle = storeData.obstacles[randomIndex];

				var objectSide = randomBoolean();
				var extraRadius = objectSide == true ? -(scoreSize * 2) : (scoreSize * 2);
				setAnglePos(newObject, 0, 0, storeData.baseRadius+extraRadius);
				newObject.rotation = -(newObject.angle);
				animateObjectExtra(newObject);
			}
		break;

		case 19:
			if(!storeData.scoreCon){
				storeData.scoreCon = true;

				storeData.scoreIndex = findUniqueIndex(storeData.objects, [storeData.scoreIndex]);
				for(var n = 0; n<baseData.objects.length; n++){
					baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].baseGrey;

					if(storeData.scoreIndex == n){
						baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].main;
					}
				}
			}else{
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].obstacle, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
				newObject.particleIndex = 0;
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);
				
				var randomIndex = findUniqueIndex(storeData.obstacles, [-1]);
				if(randomBoolean()){
					newObject.angle = storeData.obstacles[randomIndex][0];
					newObject.startRotate = storeData.obstacles[randomIndex][0];
					newObject.endRotate = storeData.obstacles[randomIndex][1];
				}else{
					newObject.angle = storeData.obstacles[randomIndex][1];
					newObject.startRotate = storeData.obstacles[randomIndex][1];
					newObject.endRotate = storeData.obstacles[randomIndex][0];
				}

				setAnglePos(newObject, 0, 0, storeData.moveRadius);

				newObject.objectType = 'hit';
				newObject.particleIndex = 0;
				
				animateObject(newObject);
			}
		break;

		case 18:
			if(!storeData.scoreCon){
				storeData.scoreCon = true;

				var scoreSize = storeData.obstacleSize/2;
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(scoreSize/2), -(scoreSize/2), scoreSize, scoreSize, 0);
				newObject.particleIndex = 0;
				newObject.objectType = 'score';
				newObject.size = scoreSize;
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				var randomX = randomIntFromInterval(-(storeData.moveX/2), storeData.moveX/2);
				newObject.x = randomX;
				newObject.y = storeData.last.y > 0 ? -(storeData.height - (scoreSize/2)) : storeData.height - (scoreSize/2);
				newObject.rotation = randomBoolean() ? storeData.last.rotation+180 : storeData.last.rotation-180;

				storeData.scoreObj = newObject;
				animateObjectExtra(newObject);
			}else{
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].obstacle, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
				newObject.particleIndex = 0;
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
				newObject.x = storeData.way == true ? storeData.width/2+randomDistance : -(storeData.width/2+randomDistance);
				newObject.y = randomIntFromInterval(-(storeData.height/2), storeData.height/2);

				newObject.objectType = 'hit';
				newObject.particleIndex = 0;
				
				animateObject(newObject);
			}
		break;

		case 17:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var objectW = objectType == 'score' ? storeData.width : storeData.obstacleW;
			var objectH = storeData.obstacleSize;
			var newObject = drawRect('fill', objectColor, -(objectW/2), -(objectH/2), objectW, objectH, 0);
			newObject.objectType = objectType;
			newObject.particleIndex = 0;
			newObject.size = storeData.obstacleSize;

			var range = randomIntFromInterval(0, storeData.obstacleRange);
			newObject.y = -(storeData.height/2);
			newObject.x = newObject.oriX = randomBoolean() == true ? (storeData.width/2) + range : -((storeData.width/2) + range);
			
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);
			
			animateObject(newObject);
			if(objectType == 'score'){
				newObject.x = 0;
			}else{
				animateObjectExtra(newObject);
			}
			updateCount();
		break;

		case 16:
			if(!storeData.scoreCon){
				storeData.scoreCon = true;

				storeData.scoreIndex = findUniqueIndex(storeData.objects, [storeData.scoreIndex]);
				for(var n = 0; n<baseData.objects.length; n++){
					baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].baseGrey;

					if(storeData.scoreIndex == n){
						baseData.objects[n].fillCommand.style = gameSettings.colors[gameData.colorNum].main;
					}
				}
			}else{
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].obstacle, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
				newObject.particleIndex = 0;
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
				newObject.x = storeData.way == true ? storeData.width/2 + randomDistance : -(storeData.width/2 + randomDistance);
				newObject.y = randomIntFromInterval(-(storeData.objectRadius/2), storeData.objectRadius/2);

				newObject.objectType = 'hit';
				newObject.particleIndex = 0;
				
				animateObject(newObject);
			}
		break;

		case 15:
			var sizeW = storeData.obstacleSize;
			var sizeH = storeData.objectH;
			var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].obstacle, -(sizeW/2), -(sizeH/2), sizeW, sizeH, 0);
			newObject.particleIndex = 0;
			newObject.objectType = 'hit';
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
			var range = randomIntFromInterval(storeData.obstacleRange[0], storeData.obstacleRange[1]);
			newObject.x = storeData.way == true ? storeData.width/2 + randomDistance : -(storeData.width/2 + randomDistance);
			newObject.y = storeData.side == true ? -(storeData.height/2 - range) : storeData.height/2 - range;
			storeData.side = storeData.side == true ? false : true;
			animateObject(newObject);

			var obstacleX = newObject.x;
			var obstacleY = newObject.y;
			if(baseData.settings.count == 0){
				var scoreSize = storeData.obstacleSize/2;
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(scoreSize/2), -(scoreSize/2), scoreSize, scoreSize, 0);
				newObject.particleIndex = 0;
				newObject.objectType = 'score';
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				newObject.x = obstacleX;
				newObject.y = obstacleY < 0 ? obstacleY + (sizeH/1.2) : obstacleY - (sizeH/1.2);
				animateObject(newObject);
				animateObjectExtra(newObject);
			}

			updateCount();
		break;

		case 14:
			var randomIndex = findUniqueIndex(storeData.objects, [storeData.objectIndex]);
			storeData.objectIndex = randomIndex;

			var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, baseData.objects[randomIndex].size);
			newObject.particleIndex = 0;
			newObject.size = baseData.objects[randomIndex].size;
			newObject.objectIndex = randomIndex;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.x = baseData.objects[randomIndex].x;
			newObject.y = baseData.objects[randomIndex].y;
		break;

		case 13:
			var randomIndex = findUniqueIndex(storeData.objects, [storeData.objectLast]);
			storeData.objectLast = randomIndex;

			var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, baseData.objects[randomIndex].size);
			newObject.particleIndex = 0;
			newObject.size = baseData.objects[randomIndex].size;
			newObject.objectIndex = randomIndex;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.x = baseData.objects[randomIndex].x;
			newObject.y = baseData.objects[randomIndex].y;
			
			if(baseData.settings.count == 0 && !storeData.rotateCon){
				storeData.rotateCon = true;
				animateObject();
			}

			updateCount();
		break;

		case 12:
			if(!storeData.obstacleInit){
				storeData.obstacleInit = true;

				for(var n=0; n<storeData.obstacles.length; n++){
					var objectType = 'hit';
					var objectColor = gameSettings.colors[gameData.colorNum].obstacle;

					var newObject = drawRect('fill', objectColor, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
					newObject.particleIndex = 0;
					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);

					newObject.objectType = objectType;
					newObject.particleIndex = particleIndex;
					newObject.size = storeData.obstacleSize;
					newObject.angle = storeData.obstacles[n];
					
					setAnglePos(newObject, 0, 0, storeData.baseInnerRadius + (newObject.size/2));
					newObject.rotation = newObject.angle;
					newObject.side = true;
					
					animateObject(newObject, {new:true});
				}
			}else{
				if(!storeData.scoreCon){
					storeData.scoreCon = true;

					var objectType = 'score';
					var objectW = storeData.baseRadius/1.3;
					var objectColor = gameSettings.colors[gameData.colorNum].main;
					
					var randomIndex = findUniqueIndex(storeData.scores, [storeData.scoreIndex]);
					storeData.scoreIndex = randomIndex;

					var newObject = drawRect('fill', objectColor, -(objectW/2), -(storeData.obstacleSize/2), objectW, storeData.obstacleSize, 0);
					newObject.particleIndex = 0;
					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);
					baseGameContainer.setChildIndex( newObject, 0);

					newObject.objectType = objectType;
					newObject.particleIndex = particleIndex;
					newObject.size = storeData.obstacleSize;
					newObject.angle = storeData.scores[randomIndex];

					setAnglePos(newObject, 0, 0, storeData.moveRadius);
					newObject.rotation = newObject.angle;
					
					animateObject(newObject);
				}
			}
		break;

		case 11:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
			newObject.particleIndex = 0;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			var randomDistance = randomIntFromInterval(storeData.distance[0], storeData.distance[1]);
			var randomY = Math.floor(Math.random()*storeData.obstacles.length);
			
			newObject.x = storeData.way == true ? storeData.width/2 + randomDistance : -(storeData.width/2 - randomDistance);
			newObject.y = baseData.settings.count == 0 ? 0 : storeData.obstacles[randomY];
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			newObject.size = storeData.obstacleSize;
			
			animateObject(newObject);
			updateCount();
		break;

		case 1:
			var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, storeData.obstacleSize);
			newObject.particleIndex = 0;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.angle = randomIntFromInterval(0, 360);
			newObject.size = storeData.obstacleSize;
			setAnglePos(newObject, 0, 0, storeData.baseRadius);
			
			animateObject(newObject, {new:true});
		break;
		
		case 2:
			var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].main, 0, 0, storeData.obstacleSize);
			newObject.particleIndex = 0;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.size = storeData.obstacleSize;
			newObject.x = randomIntFromInterval(-((storeData.moveX - newObject.size)/2), (storeData.moveX - newObject.size)/2);
			newObject.y = storeData.moveY;
			
			animateObject(newObject);
		break;
		
		case 3:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
			baseData.obstacles.push(newObject);

			newObject.x = randomIntFromInterval(-(storeData.width/2.5), storeData.width/2.5);
			newObject.y = -(storeData.height/2);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			newObject.size = storeData.obstacleSize;

			animateObject(newObject);
			baseGameContainer.addChild(newObject);

			updateCount();
		break;

		case 4:
			storeData.pass = false;
			var newObject = drawCircle('fill', gameSettings.colors[gameData.colorNum].baseGrey, 0, 0, storeData.obstacleSize);
			newObject.particleIndex = 0;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.size = storeData.obstacleSize;
			
			var randomIndex = findUniqueIndex(storeData.obstacles, [storeData.obstacleIndex]);
			storeData.obstacleIndex = randomIndex;

			if(storeData.first){
				randomIndex = Math.floor(Math.random() * (storeData.obstacles.length-1));
				storeData.first = false;
			}

			newObject.x = storeData.obstacles[randomIndex].x;
			newObject.y = storeData.obstacles[randomIndex].y;
			
			baseGameContainer.setChildIndex( baseData.target[0], baseGameContainer.numChildren-1);
			animateObject(newObject);
			animateTarget();
		break;

		case 5:
			var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
			newObject.particleIndex = 0;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.rotation = 45;
			newObject.size = storeData.obstacleSize;
			newObject.objectType = 'score';
			
			var randomIndex = findUniqueIndex(storeData.obstacles, [storeData.obstacleIndex]);
			storeData.obstacleIndex = randomIndex;
			newObject.x = storeData.obstacles[randomIndex].x;
			newObject.y = storeData.obstacles[randomIndex].y;

			animateObjectExtra(newObject);
		break;

		case 6:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawCircle('fill', objectColor, 0, 0, storeData.obstacleSize);
			newObject.particleIndex = 0;
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.angle = randomIntFromInterval(0, 360);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			newObject.size = storeData.obstacleSize;
			
			animateObject(newObject);
			updateCount();
		break;

		case 7:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var objectW = objectType == 'score' ? storeData.width : storeData.obstacleW;
			var objectH = storeData.obstacleSize;
			var newObject = drawRect('fill', objectColor, -(objectW/2), -(objectH/2), objectW, objectH, 0);
			newObject.objectType = objectType;
			newObject.particleIndex = 0;
			newObject.size = storeData.obstacleSize;

			var range = randomIntFromInterval(0, storeData.obstacleRange);
			newObject.y = -(storeData.height/2);
			newObject.x = newObject.oriX = randomBoolean() == true ? (storeData.width/2) + range : -((storeData.width/2) + range);
			
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);
			
			animateObject(newObject);
			if(objectType == 'score'){
				newObject.x = 0;
			}else{
				animateObjectExtra(newObject);
			}
			updateCount();
		break;

		case 8:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawCircle('fill', objectColor, 0, 0, storeData.obstacleSize);
			baseData.obstacles.push(newObject);

			newObject.x = storeData.way == true ? (storeData.width/2) : -(storeData.width/2);
			newObject.y = randomIntFromInterval(-(storeData.height/2), storeData.height/2);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			newObject.size = storeData.obstacleSize;
			newObject.turnIndex = randomIntFromInterval(0,1);

			animateObject(newObject);
			baseGameContainer.addChild(newObject);

			updateCount();
		break;

		case 9:
			var totalObjects = 3;
			var posArr = [-(storeData.moveX*2), 0, storeData.moveX*2];
			var scoreArr = [-(storeData.moveX), storeData.moveX];
			if(storeData.obstacleSide[storeData.obstacleSideIndex] == 0){
				totalObjects = 2;
				posArr = [-(storeData.moveX), storeData.moveX];
				scoreArr = [-(storeData.moveX*2), 0, (storeData.moveX*2)];
			}

			for(var n=0; n<totalObjects; n++){
				if(storeData.obstacleAlpha[storeData.obstacleAlphaIndex] == 1){
					var objectW = storeData.obstacleW;
					var objectH = storeData.obstacleSize;
					var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].obstacle, -(objectW/2), -(objectH/2), objectW, objectH, 0);
					newObject.objectType = 'hit';
					newObject.particleIndex = 1;
					newObject.size = storeData.obstacleSize;
					newObject.y = -(storeData.height/2);
					newObject.x = posArr[n];
					
					baseData.obstacles.push(newObject);
					baseGameContainer.addChild(newObject);
					
					animateObject(newObject);
				}

				storeData.obstacleAlphaIndex = increaseArrayIndex(storeData.obstacleAlphaIndex, storeData.obstacleAlpha);
			}

			if(baseData.settings.count == 0){
				shuffle(scoreArr);

				var objectSize = storeData.obstacleSize/1.5;
				var newObject = drawRect('fill', gameSettings.colors[gameData.colorNum].main, -(objectSize/2), -(objectSize/2), objectSize, objectSize, 0);
				baseData.obstacles.push(newObject);
				baseGameContainer.addChild(newObject);

				newObject.x = scoreArr[0];
				newObject.y = -(storeData.height/2);
				newObject.objectType = 'score';
				newObject.particleIndex = 0;
				newObject.size = objectSize;

				animateObject(newObject);
			}

			updateCount();
			storeData.obstacleSideIndex = increaseArrayIndex(storeData.obstacleSideIndex, storeData.obstacleSide);
		break;

		case 10:
			var objectW = baseData.settings.count == 0 ? storeData.obstacleSize/1.5 : storeData.obstacleSize * 3;
			var objectH = baseData.settings.count == 0 ? storeData.obstacleSize/1.5 : storeData.obstacleSize;
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(objectW/2), -(objectH/2), objectW, objectH, 0);
			baseData.obstacles.push(newObject);
			baseGameContainer.addChild(newObject);

			newObject.x = storeData.width/2;
			newObject.y = randomIntFromInterval(-(storeData.moveRadius), storeData.moveRadius);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			newObject.size = storeData.obstacleSize;
			
			animateObject(newObject);
			if(objectType == 'score'){
				animateObjectExtra(newObject);
			}
			updateCount();
		break;

		default:
			var objectType = baseData.settings.count == 0 ? 'score' : 'hit';
			var objectColor = baseData.settings.count == 0 ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;
			var particleIndex = baseData.settings.count == 0 ? 0 : 1;

			var newObject = drawRect('fill', objectColor, -(storeData.obstacleSize/2), -(storeData.obstacleSize/2), storeData.obstacleSize, storeData.obstacleSize, 0);
			baseData.obstacles.push(newObject);

			newObject.x = randomIntFromInterval(-(storeData.moveX/2), storeData.moveX/2);
			newObject.y = 0 - canvasH/2;
			newObject.rotation = randomIntFromInterval(-360, 360);
			newObject.objectType = objectType;
			newObject.particleIndex = particleIndex;
			newObject.size = storeData.obstacleSize;

			animateObject(newObject);
			baseGameContainer.addChild(newObject);

			updateCount();
	}
}

function animateObject(newObject, data){
	var moveX, moveY;
	switch(gameData.type){
		case 32:
			var newPos = {x:newObject.moveX, y:newObject.moveY, angle:0};
			
			var randomRotation = randomIntFromInterval(-360, 360);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, newPos.x, newPos.y), baseData.settings.speed[1]);
			newObject.scaleX = newObject.scaleY = 0;
			TweenMax.to(newObject, baseData.settings.speed[1] * .1, {scaleX:1, scaleY:1});
			TweenMax.to(newObject, speed, {x:newPos.x, y:newPos.y, rotation:randomRotation, ease:Linear.easeNone, onComplete:function(){
				TweenMax.to(newObject, baseData.settings.speed[1] * .1, {scaleX:0, scaleY:0, overwrite:true, onComplete:function(){
					removeObject(newObject);
				}});
			}});
		break;

		case 10: case 11: case 15: case 16: case 18: case 22: case 29: case 33:
			moveX = storeData.way == false ? (storeData.width/2) : -(storeData.width/2);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, moveX, newObject.y), baseData.settings.speed[1]);
			TweenMax.to(newObject, speed, {x:moveX, ease:Linear.easeNone, onComplete:function(){
				removeObject(newObject);
			}});
		break;

		case 3: case 7: case 9: case 17: case 28:
			moveY = storeData.way == false ? (storeData.height/2) : -(storeData.height/2);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, newObject.x, moveY), baseData.settings.speed[1]);
			TweenMax.to(newObject, speed, {y:moveY, ease:Linear.easeNone, onComplete:function(){
				removeObject(newObject);
			}});
		break;

		case 27:
			newObject.side = newObject.side == true ? false : true;
			newObject.fillCommand.style = newObject.side == true ? gameSettings.colors[gameData.colorNum].main : gameSettings.colors[gameData.colorNum].obstacle;

			TweenMax.to(newObject, baseData.settings.speed[1], {overwrite:true, onComplete:function(){
				animateObject(newObject);
			}});
		break;

		case 25: case 30:
			var newPos = {x:0, y:0, angle:0};
			newPos.angle = newObject.endRotate;
			setAnglePos(newPos, 0, 0, storeData.moveRadius);

			var randomRotation = randomIntFromInterval(-360, 360);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, newPos.x, newPos.y), baseData.settings.speed[1]);
			newObject.scaleX = newObject.scaleY = 0;
			TweenMax.to(newObject, baseData.settings.speed[1] * .1, {scaleX:1, scaleY:1});
			TweenMax.to(newObject, speed, {x:newPos.x, y:newPos.y, rotation:randomRotation, ease:Linear.easeNone, onComplete:function(){
				TweenMax.to(newObject, baseData.settings.speed[1] * .1, {scaleX:0, scaleY:0, overwrite:true, onComplete:function(){
					removeObject(newObject);
				}});
			}});
		break;

		case 24:
			moveX = randomIntFromInterval(-(storeData.moveX/2), storeData.moveX/2);
			moveY = -(canvasH/100 * 30);
			var moveRotation = randomIntFromInterval(-360, 360);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, moveX, moveY), baseData.settings.speed[1]);
			TweenMax.to(newObject, speed, {x:moveX, y:moveY, rotation:moveRotation, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				TweenMax.to(newObject, baseData.settings.speed[1] * .1, {scaleX:0, scaleY:0, overwrite:true, onComplete:function(){
					removeObject(newObject);
				}});
			}});
		break;

		case 23:
			moveX = storeData.way == true ? -(storeData.width/2 + newObject.size) : (storeData.width/2 + newObject.size);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, moveX, newObject.y), baseData.settings.speed[1]);
			var delayNum = randomIntFromInterval(0, baseData.settings.speed[1] * .2);
			TweenMax.to(newObject, speed, {delay:delayNum, x:moveX, overwrite:true, onComplete:function(){
				removeObject(newObject);
			}});
		break;

		case 21:
			var randomIndex = baseData.obstacles[0].obstacleIndex;
			if(randomBoolean()){
				randomIndex = increaseArrayIndex(randomIndex, storeData.obstacles);
			}else{
				randomIndex = decreaseArrayIndex(randomIndex, storeData.obstacles);
			}

			for(var n=0; n<2; n++){
				var newObject = baseData.obstacles[n];
				newObject.obstacleIndex = randomIndex;
				randomIndex = increaseArrayIndex(randomIndex, storeData.obstacles);
				randomIndex = increaseArrayIndex(randomIndex, storeData.obstacles);

				var newPos = {x:0, y:0};
				newPos.x = storeData.obstacles[newObject.obstacleIndex].x;
				newPos.y = storeData.obstacles[newObject.obstacleIndex].y;

				var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, newPos.x, newPos.y), baseData.settings.speed[1]);
				if(n == 0){
					TweenMax.to(newObject, speed, {x:newPos.x, y:newPos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
						animateObject();
					}});
				}else{
					TweenMax.to(newObject, speed, {x:newPos.x, y:newPos.y, ease:Linear.easeNone, overwrite:true});
				}
			}
		break;

		case 20:
			var objectSide = randomBoolean();
			var extraRadius = objectSide == true ? -(newObject.size/2) : (newObject.size/2);
			var delayNum = randomIntFromInterval(baseData.settings.speed[1]*.5, baseData.settings.speed[1]*1.5);

			TweenMax.to(newObject.tween, baseData.settings.speed[1], {delay:delayNum, radius:storeData.baseRadius+extraRadius, ease:Linear.easeNone, overwrite:true, onUpdate:function(){
				setAnglePos(newObject, 0, 0, newObject.tween.radius);
			},onComplete:function(){
				animateObject(newObject);
			}});
		break;

		case 19:
			var newPos = {x:0, y:0, angle:0};
			newPos.angle = newObject.endRotate;
			setAnglePos(newPos, 0, 0, storeData.moveRadius);
			var randomRotation = randomIntFromInterval(-360, 360);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, newPos.x, newPos.y), baseData.settings.speed[1]);
			newObject.scaleX = newObject.scaleY = 0;
			TweenMax.to(newObject, baseData.settings.speed[1] * .1, {scaleX:1, scaleY:1});
			TweenMax.to(newObject, speed, {x:newPos.x, y:newPos.y, rotation:randomRotation, ease:Linear.easeNone, onComplete:function(){
				TweenMax.to(newObject, baseData.settings.speed[1] * .1, {scaleX:0, scaleY:0, overwrite:true, onComplete:function(){
					removeObject(newObject);
				}});
			}});
		break;

		case 13:
			var randomIndex = findUniqueIndex(storeData.baseRotate, [-1]);
			var newRotate = storeData.baseRotate[randomIndex];
			var delayNum = randomIntFromInterval(baseData.settings.speed[1], baseData.settings.speed[1] * .5);

			newRotate = storeData.rotate + newRotate;
			TweenMax.to(storeData, baseData.settings.speed[1], {delay:delayNum, rotate:newRotate, ease:Expo.easeInOut, overwrite:true, onComplete:function(){
				animateObject();
			}});
		break;

		case 12:
			if(newObject.objectType == 'hit'){
				var delayNum = 2;
				if(data == undefined){
					delayNum = randomIntFromInterval(baseData.settings.speed[1], baseData.settings.speed[1] * 2) * .1;
				}

				var radius = newObject.side == true ? storeData.baseRadius - (newObject.size) : storeData.baseInnerRadius + (newObject.size/2);
				newObject.side = newObject.side == true ? false : true;
				var pos = getRadiusPos(newObject, 0, 0, radius);
				var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, pos.x, pos.y), baseData.settings.speed[1]);

				TweenMax.to(newObject, speed, {delay:delayNum, x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true, onComplete:function(){
					animateObject(newObject);
				}});
			}else{
				newObject.alpha = 0;
				TweenMax.to(newObject, .5, {alpha:1, ease:Linear.easeNone, overwrite:true});
			}
		break;

		case 1:
			var newAngle = randomIntFromInterval(storeData.obstacleRange[0], storeData.obstacleRange[1]);
			if(randomBoolean()){
				newAngle = newObject.angle + newAngle;
			}else{
				newAngle = newObject.angle - newAngle;
			}
			setAnglePos(newObject, 0, 0, storeData.baseRadius);
			
			baseData.tween = new TimelineMax();
			if(data != undefined && data.new){
				newObject.scaleX = newObject.scaleY = 0;
				baseData.tween.add(TweenMax.to(newObject, baseData.settings.speed[1] * .5, {scaleX:1, scaleY:1, ease:Expo.easeIn}))
			}
			baseData.tween.add(TweenMax.to(newObject, baseData.settings.speed[1], {angle:newAngle, ease:Expo.easeInOut, onUpdate:function(){
				setAnglePos(newObject, 0, 0, storeData.baseRadius);
			},onComplete:function(){
				TweenMax.to(newObject, baseData.settings.speed[1] * 1.5, {overwrite:true, onComplete:function(){
					animateObject(newObject);
				}});
			}}));
		break;
		
		case 2:
			var moveRange = storeData.moveX/2 - newObject.size;
			moveX = randomIntFromInterval(moveRange/2, moveRange);
			if(newObject.x > 0){
				moveX = newObject.x - moveX;
			}else{
				moveX = newObject.x + moveX;
			}

			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, moveX, storeData.moveY), baseData.settings.speed[1]);
			TweenMax.to(newObject, speed, {x:moveX, ease:Expo.easeInOut, overwrite:true, onComplete:function(){
				TweenMax.to(newObject, baseData.settings.speed[1] * 1.2, {overwrite:true, onComplete:function(){
					animateObject(newObject);
				}});
			}});
		break;

		case 4:
			newObject.scaleX = newObject.scaleY = 0;
			TweenMax.to(newObject, .2, {scaleX:1, scaleY:1, ease:Linear.easeNone, overwrite:true});
		break;

		case 6:
			newObject.scaleX = newObject.scaleY = 0;
			var pos = getRadiusPos(newObject, 0, 0, storeData.baseRadius - storeData.obstacleSize);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, pos.x, pos.y), baseData.settings.speed[1]);
			TweenMax.to(newObject, .2, {scaleX:1, scaleY:1, ease:Linear.easeNone});
			TweenMax.to(newObject, speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, onComplete:function(){
				removeObject(newObject);
			}});
			break;

		case 8:
			newObject.angle = storeData.turn[newObject.turnIndex];
			var pos = getRadiusPos(newObject, newObject.x, newObject.y, storeData.obstacleRadius);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, pos.x, pos.y), baseData.settings.speed[1]);

			TweenMax.to(newObject, speed, {x:pos.x, y:pos.y, ease:Linear.easeNone, overwrite:true});
		break;

		case 0:
			moveX = randomIntFromInterval(-(storeData.moveX/2), storeData.moveX/2);
			moveY = 0 + canvasH/4;
			var moveRotation = randomIntFromInterval(-360, 360);
			var speed = getTweenSpeed(getDistance(newObject.x, newObject.y, moveX, moveY), baseData.settings.speed[1]);
			TweenMax.to(newObject, speed, {x:moveX, y:moveY, rotation:moveRotation, ease:Linear.easeNone, overwrite:true, onComplete:function(){
				TweenMax.to(newObject, baseData.settings.speed[1] * .1, {scaleX:0, scaleY:0, overwrite:true, onComplete:function(){
					removeObject(newObject);
				}});
			}});
		break;
		
		default:
	}
}

function animateObjectExtra(newObject){
	switch(gameData.type){
		case 7: case 17:
			if(newObject.objectType == 'hit'){
				var range = storeData.obstacleRangeExtend;
				var moveX = newObject.oriX > 0 ? newObject.oriX - range : newObject.oriX + range;
				TweenMax.to(newObject, baseData.settings.speed[2], {delay:baseData.settings.speed[2] * .8, x:moveX, ease:Linear.easeNone, onComplete:function(){
					animateObjectExtra(newObject);
				}});
			}
		break;

		case 5: case 10: case 15: case 18: case 20: case 21: case 22: case 26: case 29:
			if(newObject.objectType == 'score'){
				var rotation = randomIntFromInterval(-360, 360);
				TweenMax.to(newObject, baseData.settings.speed[0] * .8, {rotation:rotation, ease:Linear.easeNone, onComplete:function(){
					animateObjectExtra(newObject);
				}});
			}
		break;

		default:
			
	}
}

function removeObject(obj){
	TweenMax.killTweensOf(obj);

	var objectIndex = baseData.obstacles.indexOf(obj);
	baseData.obstacles.splice(objectIndex, 1);
	baseGameContainer.removeChild(obj);
}

function updateObjects(){
	switch(gameData.type){
		case 10: case 9: case 7: case 15: case 17: case 22:
			for(var n=0; n<baseData.obstacles.length; n++){
				var thisObj = baseData.obstacles[n];
				animateObject(thisObj);
			}
		break;

		default:
			
	}
}

/*!
 * 
 * CREATE PROTON - This is the function that runs to create proton particles
 * 
 */
function setupTrailProton(data){
	if(protonData.proton == null){
		protonData.proton = new Proton();

		var renderer = new Proton.EaselRenderer(particlesContainer);
		protonData.proton.addRenderer(renderer);
	}

	protonData.trailEmitter.push(0);
	var index = protonData.trailEmitter.length-1;

	protonData.trailEmitter[index] = new Proton.Emitter();
	protonData.trailEmitter[index].rate = new Proton.Rate(new Proton.Span(2,4), new Proton.Span(.05, .1));
	
	var textures;
	if(data.shape == 'square'){
		textures = drawRect('fill', data.color, -(data.size/2), -(data.size/2), data.size, data.size, 0);
	}else{
		data.size = data.size/2;
		textures = drawCircle('fill', data.color, 0, 0, data.size);
	}

	protonData.trailEmitter[index].addInitialize(new Proton.Mass(1));
	protonData.trailEmitter[index].addInitialize(new Proton.Life(.1));
	protonData.trailEmitter[index].addInitialize(new Proton.Body(textures));
	protonData.trailEmitter[index].addInitialize(new Proton.Velocity(new Proton.Span(1, 1), new Proton.Span(180, 0, true), 'polar'));
	
	//protonData.trailEmitter[index].addBehaviour(new Proton.Scale(1, .5));
	//protonData.trailEmitter[index].addBehaviour(new Proton.Rotate(0, new Proton.Span([-1, -2, 0, 1, 2]), 'add'));
	protonData.trailEmitter[index].addBehaviour(new Proton.Alpha(1, 0));

	protonData.proton.addEmitter(protonData.trailEmitter[index]);
	protonData.trailEmitter[index].emit();
}

function setupExplodeProton(data){
	if(protonData.proton == null){
		protonData.proton = new Proton();

		var renderer = new Proton.EaselRenderer(particlesContainer);
		protonData.proton.addRenderer(renderer);
	}

	protonData.explodeEmitter.push(0);
	var index = protonData.explodeEmitter.length-1;

	protonData.explodeEmitter[index] = new Proton.Emitter();
	protonData.explodeEmitter[index].rate = new Proton.Rate(new Proton.Span(30, 50), new Proton.Span(.05, .1));
	
	var textures;
	if(data.shape == 'square'){
		textures = drawRect('fill', data.color, -(data.size/2), -(data.size/2), data.size, data.size, 0);
	}else{
		data.size = data.size/2;
		textures = drawCircle('fill', data.color, 0, 0, data.size);
	}

	protonData.explodeEmitter[index].addInitialize(new Proton.Mass(1));
	protonData.explodeEmitter[index].addInitialize(new Proton.Life(.6));
	protonData.explodeEmitter[index].addInitialize(new Proton.Body(textures));
	protonData.explodeEmitter[index].addInitialize(new Proton.Velocity(new Proton.Span(6, 7), new Proton.Span(0, 360), 'polar'));
	
	protonData.explodeEmitter[index].addBehaviour(new Proton.Scale(1, .5));
	protonData.explodeEmitter[index].addBehaviour(new Proton.Rotate(0, new Proton.Span([-1, -2, 0, 1, 2]), 'add'));

	protonData.proton.addEmitter(protonData.explodeEmitter[index]);
}

function createExplosion(obj, stopTrail){
	if(stopTrail){
		for(var n=0; n < protonData.trailEmitter.length;n++){
			protonData.trailEmitter[n].stop();
		}
	}

	protonData.explodeEmitter[obj.particleIndex].p.x = obj.x;
	protonData.explodeEmitter[obj.particleIndex].p.y = obj.y;

	protonData.explodeEmitter[obj.particleIndex].emit('once');
	playSound('soundExplode');
}

function destoryProton(){
	if(protonData.proton){
		protonData.proton.destroy();
		protonData.proton = null;
	}

	particlesContainer.removeAllChildren();
}

function loopParticles(){
	if (protonData.proton) {
		protonData.proton.update();

		for(var n=0; n < protonData.trailEmitter.length;n++){
			var distance = 1;
			var move = false;
			if(Math.abs(baseData.target[0].oldX - baseData.target[0].x) >= distance){
				move = true;
			}

			if(Math.abs(baseData.target[0].oldY - baseData.target[0].y) >= distance){
				move = true;
			}

			if(move){
				protonData.trailEmitter[n].addInitialize(new Proton.Life(.3));
			}else{
				protonData.trailEmitter[n].addInitialize(new Proton.Life(0));
			}

			baseData.target[0].oldX = baseData.target[0].x;
			baseData.target[0].oldY = baseData.target[0].y;

			protonData.trailEmitter[n].p.x = baseData.target[0].x;
			protonData.trailEmitter[n].p.y = baseData.target[0].y;
			protonData.trailEmitter[n].rotation = -(baseData.target[0].angle + 90);
		}
	}
}

/*!
 * 
 * UPDATE GAME SCORE - This is the function that runs to update game score
 * 
 */

function updateGameScore(num){
	scoreContainer.scaleX = scoreContainer.scaleY = .7;
	if(!isNaN(num)){
		var soundNum = Math.floor(Math.random()*3)+1;
		playSound('soundScore'+soundNum);
		playerData.score += num;

		TweenMax.to(scoreContainer, .3, {scaleX:1, scaleY:1, ease: "elastic.out(1, 0.75)", overwrite:true});
	}else{
		scoreContainer.scaleX = scoreContainer.scaleY = 1;
	}
	scoreTxt.text = playerData.score;

	//levels
	if(playerData.score >= baseData.levels.target){
		baseData.levels.target += games_arr[gameData.gameNum].levels.target;
		baseData.settings.loop -= games_arr[gameData.gameNum].levels.loop;
		baseData.settings.loop = Number(baseData.settings.loop).toFixed(2);
		baseData.settings.loop = baseData.settings.loop <= 0 ? .05 : baseData.settings.loop;

		for(var n=0; n<baseData.settings.speed.length; n++){
			baseData.settings.speed[n] += games_arr[gameData.gameNum].levels.speed[n];
		}
		updateObjects();
	}
}

/*!
 * 
 * MISC FUNCTION - This is the function that runs for misc function
 * 
 */
function getRadiusPos(obj, x, y, radius){
	var angle = obj.angle * Math.PI/180;
	var pos = {x:0, y:0};
	pos.x = Math.floor(x + (radius * Math.cos(angle)));
	pos.y = Math.floor(y + (radius * Math.sin(angle)));
	return pos;
}

function getDirection(obj ,toObj) {
    var radiance = 180/Math.PI;
    var direction = -(Math.atan2(toObj.x-obj.x, toObj.y-obj.y))*radiance;
    return direction + 90;
}

function getTweenSpeed(distance, speed){
	var speed = distance / (speed * 50);
	speed = speed.toFixed(2);
	return speed;
}

function increaseArrayIndex(index, array){
	index++;
	index = index > array.length-1 ? 0 : index;
	return index;
}

function decreaseArrayIndex(index, array){
	index--;
	index = index < 0 ? array.length-1 : index;
	return index;
}

function updateCount(){
	baseData.settings.count--;
	if(baseData.settings.count < 0){
		baseData.settings.count = randomIntFromInterval(baseData.settings.countData[0], baseData.settings.countData[1]);
	}
}

function setAnglePos(target, x, y, radius){
	var pos = getRadiusPos(target, x, y, radius);
	target.x = pos.x;
	target.y = pos.y;
}

function hitBounds(mc1, mc2) {
	var m1x = mc1.x + mc1.getBounds().x;
    var m1y = mc1.y + mc1.getBounds().y;
    var m1w = mc1.getBounds().width;
    var m1h = mc1.getBounds().height;
    var m2x = mc2.x + mc2.getBounds().x;
    var m2y = mc2.y + mc2.getBounds().y;
    var m2w = mc2.getBounds().width;
    var m2h = mc2.getBounds().height;

    return m1x < m2x + m2w &&
        m1x + m1w > m2x &&
        m1y < m2y + m2h &&
        m1y + m1h > m2y;
}

function findUniqueIndex(array, exludeArray){
	var randomIndex = Math.floor(Math.random() * array.length);
	for(var n=0; n<5; n++){
		if(exludeArray.indexOf(randomIndex) != -1){
			randomIndex = Math.floor(Math.random() * array.length);
		}else{
			n = 5;
		}
	}
	return randomIndex;
}

function loopTargetAngle(target, speed){
	if(baseData.settings.side){
		target.angle += speed;
	}else{
		target.angle -= speed;
	}
}