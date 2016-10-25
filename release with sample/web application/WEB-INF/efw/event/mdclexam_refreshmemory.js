var mdclexam_refreshmemory={};
mdclexam_refreshmemory.name="メモリ常駐マスタ更新";
mdclexam_refreshmemory.paramsFormat={};
mdclexam_refreshmemory.fire=function(params){
	db.master("オプションコース情報",true);
	db.master("検査項目情報",true);
	db.master("判定情報",true);
	return (new Result()).alert("メモリ常駐マスタをリロードしました。");
};
