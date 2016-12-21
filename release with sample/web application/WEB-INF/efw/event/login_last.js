var login_last={};
login_last.name="前回ログイン情報";
login_last.paramsFormat={};
login_last.fire=function(params){
	return (new Result())
	.runat()
	.withdata({"#txt_uid":cookie.get("txt_uid"),"#txt_pwd":""})
	;
};
