var mdclexam_paintreport={};
mdclexam_paintreport.name="帳票作成";
mdclexam_paintreport.paramsFormat={};
mdclexam_paintreport.fire=function(params){
	return (new Result())
	.runat("body")
	.withdata({"#txt_createtime":(new Date()).format("yyyy-MM-dd HH:mm:ss")});
};
