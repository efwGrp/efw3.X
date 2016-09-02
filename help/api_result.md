<H1>Result Class</H1>

The Result class is established as one of returning classes to send values or actions to client.

<h2>Sample for Event</h2>
<pre>
	var data={"#txtUser":"Wang"};
	return (new Result())
			.runat("body")
			.withdata({"#txtUser":"Wang"})
			.alert("hello world!")
			.concat(new Event("subEvent",data));
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Description</th></tr>
<tr><td>new Result ( )</td>				<td></td></tr>
<tr><td>.concat ( result )</td>			<td>To include another result.</td></tr>
<tr><th>Calling for Values</th><th></th></tr>
<tr><td>.runat ( selector )</td>		<td>To set the parent element for selector params to the next functions for values.</td></tr>
<tr><td>&nbsp; .remove ( selector )</td><td></td></tr>
<tr><td>&nbsp; .append ( mask )</td>	<td></td></tr>
<tr><td>&nbsp; .withdata ( data )</td>	<td></td></tr>
<tr><th>Calling for Actions</th><th>Muliti-calling</th></tr>
<tr><td>.show ( selector )</td>			<td>OK</td></tr>
<tr><td>.hide ( selector )</td>			<td>OK</td></tr>
<tr><td>.disable ( selector )</td>		<td>OK</td></tr>
<tr><td>.enable ( selector )</td>		<td>OK</td></tr>
<tr><td>.navigate ( url )</td>	<td>NG</td></tr>
<tr><td>.navigate ( url , params )</td>	<td>NG</td></tr>
<tr><td>.attach ( path )</td>			<td>OK</td></tr>
<tr><td>.deleteAfterDownload (  )</td>	<td>NG</td></tr>
<tr><td>.alert ( message )</td><td>OK</td></tr>
<tr><td>.alert ( message , params )</td><td>OK</td></tr>
<tr><td>.highlight ( selector )</td>	<td>OK</td></tr>
<tr><td>.focus ( selector )</td>		<td>NG</td></tr>
<tr><td>.error ( clientMessageId )</td><td>NG</td></tr>
<tr><td>.error ( clientMessageId , params )</td><td>NG</td></tr>
<tr><td>.confirm ( message , buttons , params )</td><td>NG</td></tr>
<tr><td>.confirm ( message , buttons )</td><td>NG</td></tr>
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
</table>
