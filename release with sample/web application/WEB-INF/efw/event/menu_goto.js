var menu_goto={};
menu_goto.name="メニュー遷移";
menu_goto.paramsFormat={page:null};
menu_goto.fire=function(params){
	return (new Result())
	.navigate(params["page"]);
};
