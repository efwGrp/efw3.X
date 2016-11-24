var menu_statistics={};
menu_statistics.name="統計情報へ";
menu_statistics.paramsFormat={};
menu_statistics.fire=function(params){
	return (new Result())
	.navigate("statistics.jsp");
};
