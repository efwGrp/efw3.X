<H1>Result Class</H1>

The Result class is established to send values or actions to client.

<h2>Sample</h2>
<pre>
	var data = {
		"#txtUser" : "Wang"
	};
	return (new Result()).runat("body").withdata({
		"#txtUser" : "Wang"
	}).alert("hello world!").concat(event.fire("subEvent", data));
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th><th>Description</th></tr>
<tr><td>new Result ( )</td>				<td rowspan=26>Result</td><td></td></tr>
<tr><td>.concat ( result )</td>			<td>To include another result.</td></tr>
<tr><th>Calling for Values</th><th></th></tr>
<tr><td>.runat ( )</td>		<td>To mean the body is the parent element for selector params in the next functions for values.</td></tr>
<tr><td>.runat ( selector )</td>		<td>To set the parent element for selector params in the next functions for values.</td></tr>
<tr><td>&nbsp; .remove ( selector )</td><td>To remove elements by the selector from the parent element. First calling is effective in one runat.</td></tr>
<tr><td>&nbsp; .append ( mask )</td>	<td>To add rows defined by the mask to the parent element. First calling is effective in one runat.</td></tr>
<tr><td>&nbsp; .withdata ( data )</td>	<td>To show data as value or html to elements in the parent element ,or to replace keys in the mask to data. First calling is effective in one runat.</td></tr>
<tr><th>Calling for Actions</th><th></th></tr>
<tr><td>.show ( selector )</td>			<td>To display elements by the selector.</td></tr>
<tr><td>.hide ( selector )</td>			<td>To hide elements by the selector.</td></tr>
<tr><td>.disable ( selector )</td>		<td>To disable elements by the selector.</td></tr>
<tr><td>.enable ( selector )</td>		<td>To enable elements by the selector.</td></tr>
<tr><td>.navigate ( url )</td>			<td>To navigate to the url. First calling is effective.</td></tr>
<tr><td>.navigate ( url , params )</td>	<td>To navigate to the url, and send the params to it. First calling is effective.</td></tr>
<tr><td>.attach ( path )</td>			<td>To attach a file or a folder by the path for downloading. Zipping when multi files.</td></tr>
<tr><td>.deleteAfterDownload (  )</td>	<td>To delete the orgin from the server after downloading. First calling is effective.</td></tr>
<tr><td>.alert ( message )</td>			<td>To show a message. </td></tr>
<tr><td>.alert ( message , params )</td><td>To show a message which is replaced by the params. </td></tr>
<tr><td>.highlight ( selector )</td>	<td>To highlight elements by the selector.</td></tr>
<tr><td>.focus ( selector )</td>		<td>To focus in an element by the selector. First calling is effective.</td></tr>
<tr><td>.error ( clientMessageId )</td><td>To show an error message defined in the client.</td></tr>
<tr><td>.error ( clientMessageId , params )</td><td>To show an error message defined in the client. The params value will be replaced in the message.</td></tr>
<tr><td>.confirm ( message , buttons , params )</td><td>To confirm a message which is replaced by the params. First calling is effective.</td></tr>
<tr><td>.confirm ( message , buttons )</td><td>To confirm a message. First calling is effective.</td></tr>
<tr><td>.eval ( script )</td>			<td>To execute a script string.</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>result</td><td>Result</td><td></td></tr>
<tr><td>selector</td><td>String</td><td></td></tr>
<tr><td>mask</td><td>String</td><td></td></tr>
<tr><td>data</td><td>JSON Object (Without mask calling) or Array (With mask calling)</td><td>To send values to client.
{"selector1":value1,"selector1":value2,...}</td></tr>
<tr><td>url</td><td>String</td><td>A relative url to the web application.</td></tr>
<tr><td>params</td><td>JSON Object</td><td>
To send values to functions.
{"param1":value1,"param2":value2,...}</td></tr>
<tr><td>path</td><td>String</td><td>The relative path of a file or a folder to the storage folder.</td></tr>
<tr><td>message</td><td>String</td><td>A string with params. <pre>"Hello Mr. {familyName} !"</pre></td></tr>
<tr><td>clientMessageId</td><td>String</td><td>The message id defined in client.messages.js .</td></tr>
<tr><td>buttons</td><td>String</td><td>To define buttons in the confirm box and the client script for click events. <pre>{"YES":"alert('Yes world!')", "NO","alert('No world!')"}</pre></td></tr>
<tr><td>script</td><td>String</td><td>"alert('hello world!')"</td></tr>
</table>
