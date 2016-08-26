var sample_enabledisable={};
sample_enabledisable.name="活性/非活性";
sample_enabledisable.outOfLogin=true;
sample_enabledisable.paramsFormat={"#btnF10":null};
sample_enabledisable.fire=function(params){
	if(params["#btnF10"]=="F10 活性"){
		return (new Result())
		.runat("body")
		.withdata({"#btnF10":"F10 非活性"})
		.enable("#txtF9");
	}else if(params["#btnF10"]=="F10 非活性"){
		return (new Result())
		.runat("body")
		.withdata({"#btnF10":"F10 活性"})
		.disable("#txtF9");
	}
};
