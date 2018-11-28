<h1>CKEditor Tag</h1>
CKEditor is a famous rich text editor for web. We made a customized version from <a href="http://ckeditor.com/">CKEditor 4.6.2</a>,
and included it into Efw as a tag. It must be used after the Client tag for jQuery and jQuery UI including.<br>
<img src="addition_tag_ckeditor.png">
<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;head&gt;
	&lt;efw:Client/&gt;
&lt;/head&gt;
&lt;body&gt;
	&lt;efw:CKEditor id="ckeditor1" width="800" height="300" readonly="false" lang="ja" pattern="standard" /&gt; //or efw:ckeditor , efw:CKeditor , efw:Ckeditor , efw:ckEditor
&lt;/body&gt;
</pre>

<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>id</td><td>Yes</td><td></td><td>The identity of the CKEditor tag. </td></tr>
<tr><td>pattern</td><td>No</td><td>"standard"</td><td>The pattern of the CKEditor tag. [ basic | standard | full ]. </td></tr>
<tr><td>height</td><td>No</td><td>"400"</td><td>The height of CKEditor tag. The unit is "px".</td></tr>
<tr><td>width</td><td>No</td><td>"auto"</td><td>The width of CKEditor tag. The unit is "px". </td></tr>
<tr><td>lang</td><td>No</td><td>""</td><td>The language of CKEditor tag. It will detect the language automatically by default.</td></tr>
<tr><td>readonly</td><td>No</td><td>"false"</td><td>The CKEditor tag is for reference or not. </td></tr>
</table>

<h2>Methods</h2>
<table>
<tr><th>Calling</th><th>Returning</th><th>Description</th></tr>
<tr><td>id . setPattern ( path )</td><td>void</td><td>To set the pattern attribute.</td></tr>
<tr><td>id . setHeight ( height ) </td><td>void</td><td>To set the height attribute.</td></tr>
<tr><td>id . setWidth ( width ) </td><td>void</td><td>To set the width attribute.</td></tr>
<tr><td>id . setReadOnly ( readonly ) </td><td>void</td><td>To set the readonly attribute.</td></tr>
</table>

A hidden input with the id same to the CKEditor tag will be created to contain the CKEditor data.
<pre>
	var data = $("#ckeditor1").val();
</pre>
