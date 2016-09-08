<H1>pdf.merge</H1>

The merge function is established to merge several pdfs in a folder.

<h2>Sample</h2>
<pre>
	pdf.create("report.jsp?page=1","pdffolder/page1.pdf");
	pdf.create("report.jsp?page=2","pdffolder/page2.pdf");
	pdf.merge("pdffolder","report.pdf");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>pdf . merge ( folder , savePath )</td><td>void</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>folder</td><td>String</td>td><A relative folder path to the storage folder.</td></tr>
<tr><td>savePath</td><td>String</td><td>The file path and name to save the pdf which will be created.</td></tr>
</table>

