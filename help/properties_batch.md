<H1>Properties File</H1>
the file /WEB-INF/classes/efw.properties is established to set the framework. If everything is default, it is not needed.
<table>
<tr>
	<th>Group</th>
	<th>Key</th>
	<th>Default Value</th>
	<th>Description</th>
</tr>
<tr>
	<th rowspan=3>Folder</th>
	<td>efw.event.folder</td>
	<td>/WEB-INF/efw/event</td>
	<td>The folder for web application events program. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<td>efw.sql.folder</td>
	<td>/WEB-INF/efw/sql</td>
	<td>The folder for web application outside sql. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<td>efw.storage.folder</td>
	<td>/WEB-INF/efw/<br>storage</td>
	<td>The folder for Web application IO. It can be set in a relative or absolute path of the web application.</td>
</tr>

<tr>
	<th rowspan=4>Database Resource</th>
	<td>efw.jdbc.resource[.n]</td>
	<td></td>
	<td>The default jdbc resource name. You can define multi by add [.n] . Example: jdbc/efw</td>
</tr>
<tr>
	<td>efw.jdbc.resource.url[.n]</td>
	<td></td>
	<td>Example: jdbc:postgresql://127.0.0.1:5432/efwSample</td>
</tr>
<tr>
	<td>efw.jdbc.resource.username[.n]</td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>efw.jdbc.resource.password[.n]</td>
	<td></td>
	<td></td>
</tr>

<tr>
	<th rowspan=5>Logging</th>
	<td>efw.logging.path</td>
	<td>/logs</td>
	<td>The path of efw log. Absolute path.</td>
</tr>
<tr>
	<td>efw.logging.name</td>
	<td>efwlog%g.txt</td>
	<td>The file name of efw log. </td>
</tr>
<tr>
	<td>efw.logging.limit</td>
	<td>10485760</td>
	<td>The limit of efw log. </td>
</tr>
<tr>
	<td>efw.logging.num</td>
	<td>5</td>
	<td>The file count of efw log. </td>
</tr>
<tr>
	<td>efw.logging.level</td>
	<td>WARNING</td>
	<td>The output level of efw log. ALL,FINEST,FINER,FINE,CONFIG,INFO,WARNING,SEVERE,OFF</td>
</tr>
<tr>
	<th>Cors</th>
	<td>efw.cors</td>
	<td>*</td>
	<td>Cross-domain communication settings. It controls whether the events of this site can be used from the Web page of the other sites.<br>
	* : Allow all, null : Reject all, http://0.0.0.0:8080,http://9.9.9.9 : Specified permission. </td>
</tr>

<tr>
	<th rowspan=4>Pdf</th>
	<td>efw.pdf.<br>wkhtmltopdf</td>
	<td>C:/Program Files/wkhtmltopdf/<br>bin/<br>wkhtmltopdf.exe</td>
	<td>The path to wkhtmltopdf.exe. You can download the soft from http://wkhtmltopdf.org/ . </td>
</tr>

<tr>
	<td>efw.pdf.pdftk</td>
	<td>C:/Program Files/PDFtk Server/bin/pdftk.exe</td>
	<td>The path to pdftk.exe. You can download the soft from https://www.pdflabs.com/tools/pdftk-server/ . </td>
</tr>

<tr>
	<td>efw.openoffice.port</td>
	<td>8100</td>
	<td>The port of the OpenOffice service. You can download the soft from https://www.openoffice.org/ja/download/ . </td>
</tr>

<tr>
	<td>efw.pdf.baseurl</td>
	<td>http://localhost:8080/<br>efw/</td>
	<td>The url for pdf generating to access the web appication from the web server itself . </td>
</tr>


</table>
</DL></DD>
