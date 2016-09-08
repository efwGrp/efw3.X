var mdclexam_previoususer={};
mdclexam_previoususer.name="前のユーザ";
mdclexam_previoususer.paramsFormat={"#the_id":null};
mdclexam_previoususer.fire=function(params){
	//個人情報 の取得
	//-------------------------------------------------------------------------
	var usercd=params["#the_id"];
	if (usercd=="")nextusercd="9999999";
	var rsUserinfo=(db.select("mdclexam_user","previous",{"user_id":usercd}))
		.map({"#the_id":"個人コード"})
		.getSingle();
	if (rsUserinfo){
		//前の個人情報 の取得
		//---------------------------------------------------------------------
		return (new Result())
			.runat("#userinfo")
			.withdata(rsUserinfo)
			.concat(event.fire("mdclexam_seekuser",rsUserinfo));
	}else{
		return (new Result()).alert("前のユーザはありません。");
	}
};