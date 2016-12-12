<H1>Excel.getArray</H1>

The getArray function is established to get several fields as an array from one sheet.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	var ary1 = excel.getArray("Sheet1", 1, 3, {"data1":"A", "data2":"B", "data3":"C"});
	var ary2 = excel.getArray("Sheet1", 1, 
		function(row){
			if (excel.getValue("Sheet1","A"+row)!=""){
				return true;
			}else{
				return false;
			}
		}
	, {"data1":"A", "data2":"B", "data3":
		function(row){
			return excel.getValue("Sheet1","C"+row)+excel.getValue("Sheet1","D"+row);
		}
	});
	var ary3 = excel.getArray{"Sheet1", 1, 4,[{"data1":"A"},{"data2":"A"}]};
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . getArray ( sheetName , startRow , endCondition , positionRowMaps )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>startRow</td><td>Number</td><td>The start row for looping at the sheet.</td></tr>
<tr><td>endCondition</td><td>Number | Function</td><td>The end condition for looping at the sheet. 
It is a number or a function.
<pre>function ( row ) {return true;}</pre>
</td></tr>
<tr><td>positionRowMaps</td><td>Object | Array</td><td>
Object: The map for getting data from a row.<br>
Array: The maps for getting data from several rows.<br>
<pre>
	{data1:col, data2:col, data3:function(row){ return String|Number|Date|Boolean;} }

	[
		{data1:col, data2:col },
		{data3:col, data4:function(row){ return String|Number|Date|Boolean;} }
	]
</pre>
</td></tr>

</table>

