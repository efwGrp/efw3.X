var statistics_stop={};
statistics_stop.name="アクセス統計情報のイベント停止";
statistics_stop.paramsFormat={"eventId":null};
statistics_stop.fire=function(params){
	EfwServerEvent.prototype._stop(params["eventId"]);
	return (new Result()).eval("refresh()");
};
