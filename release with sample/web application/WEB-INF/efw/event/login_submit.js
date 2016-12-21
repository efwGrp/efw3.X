var login_submit={};
login_submit.name="ログイン";
login_submit.paramsFormat={
	"#txt_uid":"required:true;display-name:アカウント",
	"#txt_pwd":"required:true;display-name:パスワード",
};
login_submit.fire=function(params){
	if ((params["#txt_uid"]=="admin"&&params["#txt_pwd"]=="password")||
			(params["#txt_uid"]=="user"&&params["#txt_pwd"]=="password")){
		session.create();
		session.set("USER_ID", params["#txt_uid"]);
		if(params["#txt_uid"]=="admin"){
			session.set("USER_AUTH","admin");
		}else{
			session.set("USER_AUTH","user");
		}
		cookie.set("txt_uid",params["#txt_uid"]);
		return (new Result()).navigate("menu.jsp");
	}else{
		return (new Result())
		.alert("ログインできません。ユーザIDとパスワードを確認してください。")
		.focus("#txt_uid")
		.highlight("#txt_uid")
		.highlight("#txt_pwd");
	}
};
