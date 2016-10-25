var sample_inputcheck={};
sample_inputcheck.name="入力チェック";
sample_inputcheck.paramsFormat={
	"#txt_testtext":"required:true;display-name:テスト文字;max-length:5",
	"#txt_testnumber":"format:#,##0.00;required:true;display-name:テスト数字;min:-10.00;max:1,000.00",
	"#txt_testdate":
		function(){
			var date1=new Date();
			var date2=new Date();
			date2.setDate(date1.getDate()+6);
			return "format:yyyy年MM月dd日;required:true;display-name:テスト日付;"
				+"min:"+date1.format("yyyy年MM月dd日")+";"
				+"max:"+date2.format("yyyy年MM月dd日")+";"
			;
		},
};
sample_inputcheck.fire=function(params){
	return (new Result()).alert("入力は正しいです。"+Number.parse((123214).format("あ#,000.0"),"あ#,000.0"));
//	return (new Result()).alert("入力は正しいです。"+Date.parse((new Date()).format("yyyy年MM月dd日"),"yyyy年MM月dd日"));
//	return (new Result()).alert("入力は正しいです。"+Date.parse(""+(new Date())));
};
