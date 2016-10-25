var sample_url2pdf={};
sample_url2pdf.name="URLからPDFへの変換";
sample_url2pdf.paramsFormat={};
sample_url2pdf.fire=function(params){
	//you can send some data by url
	pdf.create("report.jsp",(new Date()).format("GyMMddHHmmss")+".pdf");
	return event.fire("sample_showfiles",params);
};
