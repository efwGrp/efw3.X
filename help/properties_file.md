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
	<th>Run Mode</th>
	<td>efw.isdebug</td>
	<td>false</td>
	<td>If the value is true, any changing to the program will be loaded into memory in real time. </td>
</tr>
<tr>
	<th>Database Resource</th>
	<td>efw.jdbc.resource</td>
	<td>jdbc/efw</td>
	<td>The default jdbc resource name, which must be defined in /META-INF/context.xml. If your server is not tomcat, you can define it by jndi name. Example: java:xxx/yyy/zzz  or  [java:comp/env/]jdbc/efw</td>
</tr>
<tr>
	<th rowspan=2>Innorules Setting</th>
	<td>efw.brms.import</td>
	<td>false</td>
	<td>If the value is true, efw will try to link innorules system and you must setup innorules beforehand.</td>
</tr>
<tr>
	<td>efw.brms.codetype</td>
	<td>NAME</td>
	<td>To set the code type which identifies rules in innorules system. It can be set to ID, NAME or ALIAS . </td>
</tr>
<tr>
	<th rowspan=5>Folder</th>
	<td>efw.server.folder</td>
	<td>/WEB-INF/efw/server</td>
	<td>The folder for efw server program. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
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
	<td>efw.mail.folder</td>
	<td>/WEB-INF/efw/mail</td>
	<td>The folder for web application mail template. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<td>efw.storage.folder</td>
	<td>/WEB-INF/efw/storage</td>
	<td>The folder for Web application IO. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<th rowspan=6>Login Check</th>
	<td>efw.login.check</td>
	<td>false</td>
	<td>The flag indicating whether the web application does the login check.</td>
</tr>
<tr>
	<td>efw.login.key</td>
	<td>USER_ID</td>
	<td>The session key for login check. </td>
</tr>
<tr>
	<td>efw.login.url</td>
	<td>login.jsp</td>
	<td>The page to login.If any access without logining, this page will be shown.</td>
</tr>
<tr>
	<td>efw.system.error.url</td>
	<td>error.jsp</td>
	<td>The page to show system error.</td>
</tr>
<tr>
	<td>efw.outoflogin.<br>url.pattern</td>
	<td></td>
	<td>The regexp to set pages which are out of logining check. </td>
</tr>
<tr>
	<td>efw.outoflogin.<br>eventid.pattern</td>
	<td></td>
	<td>The regexp to set events which are out of logining check. </td>
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
	<th rowspan=3>Pdf</th>
	<td>efw.pdf.wkhtmltopdf</td>
	<td>C:/Program Files/wkhtmltopdf/bin/<br>wkhtmltopdf.exe</td>
	<td>The path to wkhtmltopdf.exe. You can download the soft from http://wkhtmltopdf.org/ . </td>
</tr>

<tr>
	<td>efw.pdf.pdftk</td>
	<td>C:/Program Files/PDFtk Server/bin/pdftk.exe</td>
	<td>The path to pdftk.exe. You can download the soft from https://www.pdflabs.com/tools/pdftk-server/ . </td>
</tr>

<tr>
	<td>efw.pdf.baseurl</td>
	<td>http://localhost:8080/efw/</td>
	<td>The url for pdf generating to access the web appication from the web server itself . </td>
</tr>

<tr>
	<th rowspan=2>Mail</th>
	<td>efw.mail.import</td>
	<td>false</td>
	<td>If the value is true, efw will try to use mail functions and you must setup the mail resource beforehand .</td>
</tr>

<tr>
	<td>efw.mail.resource</td>
	<td>mail/efw</td>
	<td>The default mail resource name, which must be defined in /META-INF/context.xml. If your server is not tomcat, you can define it by jndi name. Example: java:xxx/yyy/zzz  or  [java:comp/env/]mail/efw</td>
</tr>


</table>
</DL></DD>
