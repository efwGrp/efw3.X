var statistics_reload={};
statistics_reload.name="アクセス統計情報のイベントリロード";
statistics_reload.outOfLogin=true;
statistics_reload.paramsFormat={"eventId":null};
statistics_reload.fire=function(params){
	EfwServerEvent.prototype.reload(params["eventId"]);
};
