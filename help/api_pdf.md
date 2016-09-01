<H1>Pdf Class</H1>

The Pdf class is established as one of operating classes to create pdf from web pages, 
and you can merge several pdfs in a folder.

<h2>Sample for Event</h2>
<pre>
	(new Pdf())
	.create("report.jsp?page=1","pdffolder/page1.pdf");
	.create("report.jsp?page=2","pdffolder/page2.pdf");
	.merge("pdffolder","report.pdf");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>new Pdf ( )</td></tr>
<tr><td>.create ( url , savePath )</td></tr>
<tr><td>.merge ( folder , savePath )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>url</td><td>String</td><td>A relative url to the web application.</td></tr>
<tr><td>folder</td><td>String</td>td><A relative folder path to the storage folder.</td></tr>
<tr><td>savePath</td><td>String</td><td>The file path and name to save the pdf will be created.</td></tr>
</table>

