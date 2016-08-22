<H1>Step By Step to Build a Running Environment</H1>

<h2>Prerequisites</h2>
<table>
<tr>
	<th>Item</th><th>Description</th><th>Notes</th>
</tr>
<tr>
	<td>JDK</td>
	<td>java JDK 1.7 or java JDK 1.8</td>
	<td>Java JDK is defferent in javascript engines to Open JDK.<br>
		*Efw is error with Open JDK 1.7.<br>
		*It has not been tested with Open JDK 1.8.
	</td>
</tr>
<tr>
	<td>Application Server</td>
	<td>Tomcat 1.7 or Tomcat 1.8 is recommended, 
		Or anything else which supports Servlet 3.X or later.<br>
		*A url for reference. 
		http://tomcat.apache.org/whichversion.html
	</td>
	<td>It is troublesome without Servlet 3.X, 
		because you must modify web.xml to add servlet defines.
	</td>
</tr>
<tr>
	<td>Browsers</td>
	<td>IE8 or later, FireFox, Chrome, Edge, etc.</td>
	<td>All browsers that can use jQuery1.12. <br>
		*If you want to use cors, please check the url. 
		http://caniuse.com/#feat=cors
	</td>
</tr>
</table>
<h2>Steps</h2>
<table>
<tr>
	<th>Step</th><th>Description</th><th>Notes</th>
</tr>
<tr>
	<td>JDK and Tomcat</td><td>See the prerequisites.</td><td></td>
</tr>
<tr>
	<td>PostgreSQL</td>
	<td>1. Download version 9.3 or later and install it. https://www.postgresql.org/download/<br>
		2. Create a database named "efwSample". </td>
	<td>The sample database is created by version 9.3 and named as "efwSample". </td>
</tr>
<tr>
	<td>Sample DB</td>
	<td>1. Download the sample DB from the url: /release with sample/sample database/<br>
		2. Restore it in your PostgreSQL. 
	</td>
	<td></td>
</tr>
<tr>
	<td>Sample App</td>
	<td>1. Download the sample app from the url: /release with sample/web application/<br>
		2. Copy the app into the folder of Tomcat/webapps/efw . 
	</td>
	<td></td>
</tr>
<tr>
	<td>DB Connection</td>
	<td>1. Open the file of efw/META-INF/context.xml to modify user name and password in the resource of jdbc/efw.</td>
	<td>The jdbc driver for postgresSQL is included in the sample app.</td>
</tr>
<tr>
	<td>Properties</td>
	<td>1. Open the file of efw/WEB-INF/classes/efw.properties to modify it.<br>
		2. Set true to efw.isdebug.<br>
		3. Set ALL to efw.logging.level.
	</td>
	<td></td>
</tr>
<tr>
	<td>Start Up</td>
	<td>1. Start up Tomcat.<br>
		2. Open the efw sample page by the url of http://localhost:8080/efw/login.jsp . </td><td></td>
</tr>
</table>




