var sample_mergepdf={};
sample_mergepdf.name="PDFのマージ";
sample_mergepdf.paramsFormat={};
sample_mergepdf.fire=function(params){
	pdf.merge("","merge.pdf");
	return event.fire("sample_showfiles",params);
};
