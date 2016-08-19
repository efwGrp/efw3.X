var mdclexam_nextuser={};
mdclexam_nextuser.name="次のユーザ";
mdclexam_nextuser.paramsFormat={"#the_id":null};
mdclexam_nextuser.fire=function(params){
	//個人情報 の取得
	//-------------------------------------------------------------------------
	var usercd=params["#the_id"];
	if (usercd=="")nextusercd="0000000";
	var rsUserinfo=(new Select("mdclexam_user","next",{"user_id":usercd}))
		.map({"#the_id":"個人コード"})
		.getSingle();
	if (rsUserinfo){
		//次の個人情報 の取得
		//---------------------------------------------------------------------
		return (new Result())
			.runat("#userinfo")
			.withdata(rsUserinfo)
			.concat(new Event("mdclexam_seekuser",rsUserinfo));
	}else{
		return new Alert("次のユーザはありません。");
	}
};