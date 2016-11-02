var menu_helloworld={};
menu_helloworld.name="HelloWorldへ";
menu_helloworld.paramsFormat={};
menu_helloworld.fire=function(params){
	return (new Result())
	.navigate("helloworld.jsp");
};
