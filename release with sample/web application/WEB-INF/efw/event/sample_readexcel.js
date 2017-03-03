var sample_readexcel={};
sample_readexcel.name="Excel読込み";
sample_readexcel.paramsFormat={"#txt_excel":"required:true;display-name:ファイル１;accept:xls,xlsx;"};
sample_readexcel.fire=function(params){
	file.saveUploadFiles("");
	var flnm=file.list("")[0].name;
	var ex= new Excel(flnm);
	file.remove(flnm);
	//get data  from row 1 to row 3, if the cell is encircled by a shape, show it in red.
	var data=ex.getArray("Sheet1",1, 3,
		{
		"data1":"A",
		"data2":"B",
		"data3":["C","yyyy/MM/dd"],
		"AIsEncircled":function(row){
			if (ex.isEncircled("Sheet1", "A"+row))return "red";
			return "";
		},
		"BIsEncircled":function(row){
			if (ex.isEncircled("Sheet1", "B"+row))return "red";
			return "";
		},
		"CIsEncircled":function(row){
			if (ex.isEncircled("Sheet1", "C"+row))return "red";
			return "";
		}
	});

	
	ex.createSheet("newSheet")
	.setSheetOrder("newSheet", 1)
	.setActiveSheet("newSheet")
	.setCell("newSheet", "D5", "this is string", "テンプレート", "A2")
	.setCell("newSheet", "D6", 10,"テンプレート", "B2")
	.setCell("newSheet", "D7", 10.1,"テンプレート", "B2")
	.setCell("newSheet", "D8", true, "テンプレート", "A2")
	.setCell("newSheet", "D9", null, "テンプレート", "A2")
	.setCell("newSheet", "D10", new Date(), "テンプレート", "C2")
	.setCell("newSheet", "F6", null,"テンプレート", "D2")
	.setCell("newSheet", "F7", null,"テンプレート", "D2")
	.encircle("newSheet", "F3", "Sheet1", "abc",0.5,0.5,0.5,0.5)
	;
	ex.save("my.xlsx");
	
	return (new Result)
		.runat("#tbl_readexcel")
		.remove("tr")
		.append("<tr><td style='background-color:{AIsEncircled}'>{data1}</td><td style='background-color:{BIsEncircled}'>{data2}</td><td style='background-color:{CIsEncircled}'>{data3}</td></tr>")
		.withdata(data)
		.attach("my.xlsx")
		.deleteAfterDownload();

};
