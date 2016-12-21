var global={};
global.name="global";
global.fire=function(){
	//ここで、アプリ起動時、なにかを実行できる
	db.master("オプションコース情報");
	db.master("検査項目情報");
	db.master("判定情報");
};
