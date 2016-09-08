<H1>pdf.create</H1>

The create function is established to create pdf from web pages.

<h2>Sample</h2>
<pre>
	pdf.create("report.jsp?page=1","pdffolder/page1.pdf");
	pdf.create("report.jsp?page=2","pdffolder/page2.pdf");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>pdf . create ( url , savePath )</td><td>void</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>url</td><td>String</td><td>A relative url to the web application.</td></tr>
<tr><td>savePath</td><td>String</td><td>The file path and name to save the pdf.</td></tr>
</table>

