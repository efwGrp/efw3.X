var mdclexam_paintreport={};
mdclexam_paintreport.name="帳票作成";
mdclexam_paintreport.outOfLogin=true;
mdclexam_paintreport.paramsFormat={};
mdclexam_paintreport.fire=function(params){
	return (new Result())
	.runat("body")
	.withdata({"#txt_createtime":efw.server.format.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")});
};
