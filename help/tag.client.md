<H1>Client Tag</H1>
To programming with Efw, it is required to import several .js files and .css files into JSP because of JQuery and JQuery UI.
You can use the Efw Tag to make the importing easy.

<pre>
...
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;head&gt;
...
&lt;efw:Client baseurl="/appfolder" /&gt;		//efw:client or efw:CLIENT
...
&lt;/head&gt;
</pre>

<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>baseurl</td><td>No</td><td>"."</td><td>The web application base url. If your page is not in the base folder, it is must.</td></tr>
</table>

