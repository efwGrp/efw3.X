<H1>pdf.convert</H1>

The convert function is established to convert an excel object to a pdf, 
and save it as the relative path to the storage folder.<br>
To use it, OpenOffice Service is required.

<h2>Sample</h2>
<pre>
	var excel=new Excel("excel/test.xlsx");
	pdf.convert(excel,"pdffolder/page1.pdf");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>pdf . convert ( excel , savePath )</td><td>void</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>excel</td><td>Excel</td><td>The excel object.</td></tr>
<tr><td>savePath</td><td>String</td><td>The file path and name to save the pdf.</td></tr>
</table>

