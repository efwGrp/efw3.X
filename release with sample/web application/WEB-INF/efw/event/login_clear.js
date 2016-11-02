var login_clear={};
login_clear.name="クリア";
login_clear.paramsFormat={};
login_clear.fire=function(params){
	return (new Result())
	.runat()
	.withdata({"#txt_uid":"","#txt_pwd":""})
	;
};
