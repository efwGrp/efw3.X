var mdclexam_login={};
mdclexam_login.name="ログイン";
mdclexam_login.outOfLogin=true;
mdclexam_login.paramsFormat={
	"#txt_uid":"required:true;display-name:アカウント",
	"#txt_pwd":"required:true;display-name:パスワード",
};
mdclexam_login.fire=function(params){
	if (params["#txt_uid"]=="admin"&&params["#txt_pwd"]=="password"){
		efw.server.session.set("USER_ID", params["#txt_uid"]);
		return;
	}else{
		return (new Alert("ログインできません。ユーザIDとパスワードを確認してください。"))
			.focusTo("#txt_uid")
			.highlight("#txt_uid")
			.highlight("#txt_pwd");
	}
};
