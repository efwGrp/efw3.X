<H1>Change Class</H1>

The Change class is established as one of operating classes to execute UPDATE or DELETE SQL.
You can get the count of modefied records.
<h2>Event</h2>
<pre>
	new Change("helloWorld","DeleteUser",{"country":"China"});
	var count=(new Change("delete * from table_user where country='China'")).count;
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>new Change ( groupId , sqlId , params )</td></tr>
<tr><td>new Change ( groupId , sqlId , params , jdbcResourceName )</td></tr>
<tr><td>new Change ( sql )</td></tr>
<tr><td>new Change ( sql , jdbcResourceName )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>groupId</td><td>string</td><td>The name of a SQL xml file.</td></tr>
<tr><td>sqlId</td><td>string</td><td>The id of a sql tag in a SQL xml file.</td></tr>
<tr><td>params</td><td>JSON object</td>
<td>To send values which is requried by the SQL defined in the SQL xml file. 
<pre>{"param1":value1,"param2":value2,...}</pre>
</td></tr>
<tr><td>jdbcResourceName</td><td>string</td><td>To execute SQL in another database recource, but not the default. </td></tr>
<tr><td>sql</td><td>string</td><td>To execute a pure SQL string.</td></tr>
</table>

