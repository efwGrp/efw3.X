var mdclexam_url2pdf={};
mdclexam_url2pdf.name="URLからPDFへの変換";
mdclexam_url2pdf.outOfLogin=true;
mdclexam_url2pdf.paramsFormat={};
mdclexam_url2pdf.fire=function(params){
	//you can send some data by url
	efw.server.pdf.url2Pdf("report.jsp",efw.server.format.formatDate(new Date(), "GyMMddHHmmss")+".pdf");
	return mdclexam_showfiles.fire(params);
};
