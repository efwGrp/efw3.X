var sample_enabledisable={};
sample_enabledisable.name="活性/非活性";
sample_enabledisable.paramsFormat={"#btnF9":null};
sample_enabledisable.fire=function(params){
	if(params["#btnF9"]=="F9 活性"){
		return (new Result())
		.runat("body")
		.withdata({"#btnF9":"F9 非活性"})
		.enable("#txtF8");
	}else if(params["#btnF9"]=="F9 非活性"){
		return (new Result())
		.runat("body")
		.withdata({"#btnF9":"F9 活性"})
		.disable("#txtF8");
	}
};
