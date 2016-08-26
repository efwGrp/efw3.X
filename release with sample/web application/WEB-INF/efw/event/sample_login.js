var sample_login={};
sample_login.name="ログイン";
sample_login.outOfLogin=true;
sample_login.paramsFormat={
	"#txt_uid":"required:true;display-name:アカウント",
	"#txt_pwd":"required:true;display-name:パスワード",
};
sample_login.fire=function(params){
	if (params["#txt_uid"]=="admin"&&params["#txt_pwd"]=="password"){
		efw.server.session.set("USER_ID", params["#txt_uid"]);
		return (new Result()).navigate("mdclexam.jsp");
	}else{
		return (new Result())
		.alert("ログインできません。ユーザIDとパスワードを確認してください。")
		.focus("#txt_uid")
		.highlight("#txt_uid")
		.highlight("#txt_pwd");
	}
};
