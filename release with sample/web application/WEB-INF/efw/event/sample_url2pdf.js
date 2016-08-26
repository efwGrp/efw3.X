var sample_url2pdf={};
sample_url2pdf.name="URLからPDFへの変換";
sample_url2pdf.outOfLogin=true;
sample_url2pdf.paramsFormat={};
sample_url2pdf.fire=function(params){
	//you can send some data by url
	efw.server.pdf.url2Pdf("report.jsp",efw.server.format.formatDate(new Date(), "GyMMddHHmmss")+".pdf");
	return new Event("sample_showfiles",params);
};
