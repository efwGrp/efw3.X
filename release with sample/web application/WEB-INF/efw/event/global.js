var global={};
global.name="global";
global.outOfLogin=true;
global.paramsFormat={};
global.fire=function(params){
	//ここで、アプリ起動時、なにかを実行できる
	new Master("オプションコース情報");
	new Master("検査項目情報");
	new Master("判定情報");
};
