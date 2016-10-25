var statistics_start={};
statistics_start.name="アクセス統計情報のイベント開始";
statistics_start.paramsFormat={"eventId":null};
statistics_start.fire=function(params){
	EfwServerEvent.prototype._start(params["eventId"]);
	return (new Result()).eval("refresh()");
};
