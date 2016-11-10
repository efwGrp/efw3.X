var mdclexam_nextuser={};
mdclexam_nextuser.name="次のユーザ";
mdclexam_nextuser.paramsFormat={"#the_id":null};
mdclexam_nextuser.fire=function(params){
	//個人情報 の取得
	//-------------------------------------------------------------------------
	var usercd=params["#the_id"];
	if (usercd=="")nextusercd="0000000";
	var rsUserinfo=(db.select("mdclexam_user","next",{"user_id":usercd}))
		.map({"#the_id":"個人コード"});
	if (rsUserinfo.length>0){
		//次の個人情報 の取得
		//---------------------------------------------------------------------
		return (new Result())
			.runat("#userinfo")
			.withdata(rsUserinfo.getSingle())
			.concat(event.fire("mdclexam_seekuser",rsUserinfo.getSingle()));
	}else{
		return (new Result()).alert("次のユーザはありません。");
	}
};