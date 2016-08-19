var mdclexam_brmstest={};
mdclexam_brmstest.name="ルールテスト";
mdclexam_brmstest.outOfLogin=true;
mdclexam_brmstest.paramsFormat={
		"#txt_param1":null,
		"#txt_param2":null,
};
mdclexam_brmstest.fire=function(params){
	var data=(new Rule("brmstest",{
			"param1":params["#txt_param1"],
			"param2":params["#txt_param2"],
		}))
		.map({"#txt_result":"result1"})
		.getSingle();
	
	return (new Result())
	.runat("body")
	.withdata(data);
};
