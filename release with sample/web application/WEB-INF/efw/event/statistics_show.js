var statistics_show={};
statistics_show.name="アクセス統計情報表示";
statistics_show.paramsFormat={"sortItem":null,"sortAction":null};
statistics_show.fire=function(params){
	var data=EfwServerEvent.prototype._getStatistics();
	data=(new Record(data))
	.sort(params["sortItem"],params["sortAction"])
	.map({
		"eventId":"eventId",
		"enable":"enable",
		"eventName":"eventName",
		"errorCount":"errorCount",
		"errorSum":"errorSum",
		"errorAvg":"errorAvg",
		"errorMax":"errorMax",
		"errorMin":"errorMin",
		"secondCount":"secondCount",
		"secondSum":"secondSum",
		"secondAvg":"secondAvg",
		"secondMax":"secondMax",
		"secondMin":"secondMin",
		"errorCountForShow":["errorCount","###,##0"],
		"errorSumForShow":["errorSum","###,##0.0"],
		"errorAvgForShow":["errorAvg","###,##0.0"],
		"errorMaxForShow":["errorMax","###,##0.0"],
		"errorMinForShow":["errorMin","###,##0.0"],
		"secondCountForShow":["secondCount","###,##0"],
		"secondSumForShow":["secondSum","###,##0.0"],
		"secondAvgForShow":["secondAvg","###,##0.0"],
		"secondMaxForShow":["secondMax","###,##0.0"],
		"secondMinForShow":["secondMin","###,##0.0"],
	})
	.seek("eventId","!like","statistics_%")
	.seek("eventId","!eq","global")
	.getArray();
	//<button>Stop</button><button>Start</button><button>Reload</button>
	return (new Result())
	.runat("#tbl_statistics")
	.remove("tr.data")
	.append("<tr class=\"data {enable}\">"
			+"<td style=\"text-align:left\">{eventId}</td>"
			+"<td style=\"text-align:left\">{eventName}</td>"
			+"<td style=\"text-align:center\">"
				+"<input type=button value=\"Stop\" onclick=\"stopEvent('{eventId}')\">"
				+"<input type=button value=\"Start\" onclick=\"startEvent('{eventId}')\">"
				+"<input type=button value=\"Reload\" onclick=\"reloadEvent('{eventId}')\"></td>"
			+"<td>{errorCountForShow}</td>"
			+"<td>{errorSumForShow}</td>"
			+"<td>{errorAvgForShow}</td>"
			+"<td>{errorMaxForShow}</td>"
			+"<td>{errorMinForShow}</td>"
			+"<td>{secondCountForShow}</td>"
			+"<td>{secondSumForShow}</td>"
			+"<td>{secondAvgForShow}</td>"
			+"<td>{secondMaxForShow}</td>"
			+"<td>{secondMinForShow}</td>"
			+"</tr>")
	.withdata(data)
	.eval("refresh_drawChart()");
};
