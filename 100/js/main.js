
//LSystem.screen(LStage.FULL_SCREEN);

var stageWidth = 400,stageHeight = 500;

LInit(100,"legend",stageWidth,stageHeight,main);

var player;

//层
var backLayer;

//加载图片
var loadData = [
    {name:"back",path:"./img/back.jpg"},
    {name:"player",path:"./img/player.png"}
];

var datalist=[]; 

function main(){
    loadingLayer = new LoadingSample1(); 
    addChild(loadingLayer); 
    LLoadManage.load( 
        loadData, 
        function(progress){ 
            loadingLayer.setProgress(progress); 
         }, 
        function(result){
        	datalist = result; 
        	removeChild(loadingLayer); 
    		loadingLayer = null; 

    		gameInit();
        }
    );
}

function gameInit(){
	//初始化层
	initLayer();
	//背景
	addGameBack();

	initHero();

	addEvent();
}



function initLayer(){

	backLayer = new LSprite();

    addChild(backLayer);
}

function addGameBack(){
	var backBitmapdata = new LBitmapData(datalist["back"],0,0,stageWidth,stageHeight);  
	var backBitmap = new LBitmap(backBitmapdata);
	backBitmap.x = 0;
	backBitmap.y = 0;
	backLayer.addChild(backBitmap);
}

function initHero(){
		//将图片分解为装满坐标的二维数组
	var list = LGlobal.divideCoordinate(192,256,4,4);
    var data = new LBitmapData(datalist["player"],0,0,48,64);
	//添加动画类
	player = new LAnimation(backLayer,data,list);
	player.x=0;
	player.y=0;
	//调整动画
	player.setAction(1,0,1,false);
}

function addEvent(){
	//加入鼠标事件
	//backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);
	//backLayer.addEventListener(LMouseEvent.MOUSE_UP,onUp);
	//加入onframe调用
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
}

function onframe(){
	player.x+=5;
	player.y +=10;
	player.onframe();
}