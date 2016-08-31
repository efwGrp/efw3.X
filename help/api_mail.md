<H1>Mail Class</H1>

The Mail class is established as one of operating classes to send mail by templates defined in the mail xml.

<h2>Sample for Event</h2>
<pre>
	new Mail("mails","testmail",{"to":"you@abc.def","nowdate":new Date(),"username":"you"});
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>new Mail ( groupId, mailId, params )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>groupId</td><td>String</td><td>The name of a mail xml file.</td></tr>
<tr><td>mailId</td><td>String</td><td>The id of a mail tag in a mail xml file.</td></tr>
<tr><td>params</td><td>JSON Object</td>
<td>To send values which is requried by the mail defined in the mail xml file. 
<pre>{"param1":value1,"param2":value2,...}</pre>
</td></tr>
</table>

