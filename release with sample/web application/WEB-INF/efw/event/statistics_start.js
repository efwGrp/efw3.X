var statistics_start={};
statistics_start.name="アクセス統計情報のイベント開始";
statistics_start.outOfLogin=true;
statistics_start.paramsFormat={"eventId":null};
statistics_start.fire=function(params){
	EfwServerEvent.prototype.start(params["eventId"]);
};
