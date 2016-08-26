var sample_mergepdf={};
sample_mergepdf.name="PDFのマージ";
sample_mergepdf.outOfLogin=true;
sample_mergepdf.paramsFormat={};
sample_mergepdf.fire=function(params){
	efw.server.pdf.merge("","merge.pdf");
	return new Event("sample_showfiles",params);
};
