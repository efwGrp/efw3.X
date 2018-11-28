<h1>Signature Tag</h1>
JQuery UI Signature is a famous handwritten sign tool for web.We made a customized version from <a href="http://keith-wood.name/signature.html">jQuery UI Signature 1.1.2</a>,
and included it into Efw as a tag. It must be used after the Client tag for jQuery and jQuery UI including.<br>
<img src="addition_tag_signature.png">
<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;head&gt;
	&lt;efw:Client/&gt;
&lt;/head&gt;
&lt;body&gt;
	&lt;efw:Signature id="signature1" width="400" height="200" /&gt; //or efw:signature , efw:SIGNATURE 
&lt;/body&gt;
</pre>

<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>id</td><td>Yes</td><td></td><td>The identity of the Signature tag. </td></tr>
<tr><td>height</td><td>No</td><td>"200"</td><td>The height of Signature tag. The unit is "px".</td></tr>
<tr><td>width</td><td>No</td><td>"400"</td><td>The width of Signature tag. The unit is "px". </td></tr>
</table>

A hidden input with the id same to the signature tag will be created to contain the image data.
<pre>
	var data = $("#signature1").val();
</pre>
