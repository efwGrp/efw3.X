<H1>Record Class</H1>

The Record class is established as one of operating classes to operate an array.
<h2>Sample for Event</h2>
<pre>
	var source=[
		{"name":"Wang","country":"China","years":20},
		{"name":"Zhang","country":"China","years":30},
		{"name":"Tanaka","country":"Japan","years":40}
	];
	var record1 = (new Record(source)
				.sort("years","asc");
	var array =record1.getArray();
	var youngest =record1.getSingle();
	var youngestName =record1.getValue("name");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Return</th></tr>
<tr><td>new Record ( array )</td><th>Record</th></tr>
<tr><td>.seek( field , action , value )</td><th>Record</th></tr>
<tr><td>.sort( field , action )</td><th>Record</th></tr>
<tr><td>.map( mapping )</td><th>Record</th></tr>
<tr><td>.getSingle()</td><th>Object</th></tr>
<tr><td>.getArray()</td><th>Array</th></tr>
<tr><td>.getValue()</td><th> String | Number | Date | Boolean </th></tr>

</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>array</td><td>Array</td><td>The array of JSON objects. </td></tr>
<tr><td>field</td><td>String</td><td>The name of an attribute to JSON objects in the array.</td></tr>
<tr><td>action</td><td>String</td>
<td>The type to control methods.<br>
For seek method: [ eq | gt | lt | like | !eq | !gt | !lt | !like ]<br>
For sort method: [ asc | desc ]
</td></tr>
<tr><td>mapping</td><td>JSON Object</td><td>
The map of the old field name and the new field name.
<pre>{ fieldnew1 : fieldold1 , fieldnew2 : fieldold2 ,...}</pre>
</td></tr>
</table>

