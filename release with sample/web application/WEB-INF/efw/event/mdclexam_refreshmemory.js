var mdclexam_refreshmemory={};
mdclexam_refreshmemory.name="メモリ常駐マスタ更新";
mdclexam_refreshmemory.outOfLogin=true;
mdclexam_refreshmemory.paramsFormat={};
mdclexam_refreshmemory.fire=function(params){
	new Master("オプションコース情報",true);
	new Master("検査項目情報",true);
	new Master("判定情報",true);
};
