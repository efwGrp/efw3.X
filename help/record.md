<H1>Record Class</H1>

The Record class is established as one of operating classes to operate an array.
<h2>Sample</h2>
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
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>new Record ( array )</td><td>Record</td></tr>
<tr><td>.seek( field , action , value )</td><td>Record</td></tr>
<tr><td>.sort( field , action )</td><td>Record</td></tr>
<tr><td>.map( mapping )</td><td>Record</td></tr>
<tr><td>.getSingle( )</td><td>Object</td></tr>
<tr><td>.getArray( )</td><td>Array</td></tr>
<tr><td>.getValue( )</td><td> String | Number | Date | Boolean </td></tr>

</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
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

