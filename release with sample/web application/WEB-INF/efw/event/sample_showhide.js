var sample_showhide={};
sample_showhide.name="表示/非表示";
sample_showhide.paramsFormat={"#btnF8":null};
sample_showhide.fire=function(params){
	if(params["#btnF8"]=="F8 表示"){
		return (new Result)
		.runat("body")
		.withdata({"#btnF8":"F8 非表示"})
		.show("#txtF8");
	}else if(params["#btnF8"]=="F8 非表示"){
		return (new Result)
		.runat("body")
		.withdata({"#btnF8":"F8 表示"})
		.hide("#txtF8");
	}
};
