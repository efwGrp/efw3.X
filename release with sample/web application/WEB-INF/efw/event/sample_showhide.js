var sample_showhide={};
sample_showhide.name="表示/非表示";
sample_showhide.paramsFormat={"#btnF9":null};
sample_showhide.fire=function(params){
	if(params["#btnF9"]=="F9 表示"){
		return (new Result)
		.runat("body")
		.withdata({"#btnF9":"F9 非表示"})
		.show("#txtF9");
	}else if(params["#btnF9"]=="F9 非表示"){
		return (new Result)
		.runat("body")
		.withdata({"#btnF9":"F9 表示"})
		.hide("#txtF9");
	}
};
