var sample_brmstest={};
sample_brmstest.name="ルールテスト";
sample_brmstest.paramsFormat={
		"#txt_param1":null,
		"#txt_param2":null,
};
sample_brmstest.fire=function(params){
	var data=(brms.getRuleByName("brmstest",{
			"param1":params["#txt_param1"],
			"param2":params["#txt_param2"],
		}))
		.map({"#txt_result":"result1"})
		.getSingle();
	
	return (new Result())
	.runat("body")
	.withdata(data);
};
