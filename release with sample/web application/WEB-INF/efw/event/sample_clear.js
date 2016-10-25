var sample_clear={};
sample_clear.name="クリア";
sample_clear.paramsFormat={};
sample_clear.fire=function(params){
	return (new Result())
	.runat()
	.withdata({"#txt_uid":"","#txt_pwd":""})
	;
};
