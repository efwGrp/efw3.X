var statistics_reload={};
statistics_reload.name="アクセス統計情報のイベントリロード";
statistics_reload.paramsFormat={"eventId":null};
statistics_reload.fire=function(params){
	EfwServerEvent.prototype._reload(params["eventId"]);
	return (new Result()).eval("refresh()");
};
