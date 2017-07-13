<H1>Excel.setPrintArea</H1>

The setPrintArea function is established to set a sheet's printarea.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	excel.setPrintArea("mySheet",0,10,0,100);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . setPrintArea ( sheetName , startRow , endRow , startCol , endCol )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>order</td><td>Number</td><td>The position of the sheet.Starting from 1.</td></tr>
</table>

