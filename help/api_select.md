<H1>Select Class</H1>

The Select class is established as one of operating classes to execute SELECT SQL.
It inherited functions from the <a href="api_record.md">Record</a> class, so you can operate result records of the SELECT SQL.

<h2>Event</h2>
<pre>
	var array1=(new Select("helloWorld","selectUser",{"country":"China"}))
						.sort("years","asc");
	var array2=(new Select("select * from table_user where country='China' order years asc"));
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>new Select ( groupId , sqlId , params )</td></tr>
<tr><td>new Select ( groupId , sqlId , params , jdbcResourceName )</td></tr>
<tr><td>new Select ( sql )</td></tr>
<tr><td>new Select ( sql , jdbcResourceName )</td></tr>
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

