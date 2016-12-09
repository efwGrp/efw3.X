<H1>Record Class</H1>

The Record class is established as one of operating classes to operate an array.
<h2>Sample</h2>
<pre>
	var source = [ {
		"name" : "Wang",
		"country" : "China",
		"years" : 20
	}, {
		"name" : "Zhang",
		"country" : "China",
		"years" : 30
	}, {
		"name" : "Tanaka",
		"country" : "Japan",
		"years" : 40
	} ];
	var record1 = (new Record(source)).sort("years", "asc");
	var array = record1.getArray();
	var youngest = record1.getSingle();
	var youngestName = record1.getValue("name");
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
<tr><td>.getValue( field )</td><td> String | Number | Date | Boolean </td></tr>
<tr><td>.length</td><td> Number </td></tr>

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
<pre>{ fieldnew1 : fieldold1 , fieldnew2 : fieldold2 ,...}
{
	fieldnew1 : fieldold1 ,
	fieldnew2 : [ Datefield , formatter ] ,             //To format the date field before mapping.
	fieldnew3 : [ Numberfield , formatter , rounder ] , //To format the number field before mapping.And you can set the rounder if it is needed.
	fieldnew4 : function(rs){ ... },   //To calculate the mapping value by a function.
},
</pre>
</td></tr>
</table>

<table>
<tr><th>Number Formatter</th></tr>
<tr><td>0</td></tr>
<tr><td>#</td></tr>
<tr><td>,</td></tr>
<tr><td>.</td></tr>
<tr><td>%</td></tr>
</table>

<table>
<tr><th>Date Formatter</th></tr>
<tr><td>GGGG</td><td>Japanese WAREKI</td></tr>
<tr><td>G</td><td>Japanese WAREKI</td></tr>
<tr><td>yyyy</td></tr>
<tr><td>yy</td></tr>
<tr><td>MM</td></tr>
<tr><td>M</td></tr>
<tr><td>dd</td></tr>
<tr><td>d</td></tr>
<tr><td>HH</td></tr>
<tr><td>H</td></tr>
<tr><td>mm</td></tr>
<tr><td>m</td></tr>
<tr><td>ss</td></tr>
<tr><td>s</td></tr>
<tr><td>SSS</td></tr>
<tr><td>S</td></tr>
</table>

<table>
<tr><th rowspan=2>Number Rounder</th><th colspan=10>Sample</th></tr>
<tr BGCOLOR="#CCCCFF" CLASS="TableHeadingColor">
	<td>5.5</td><td>2.5</td><td>1.6</td><td>1.1</td><td>1.0</td><td>-1.0</td><td>-1.1</td><td>-1.6</td><td>-2.5</td><td>-5.5</td>
</tr>
<tr><td>UP</td>		<td>5.5</td><td>2.5</td><td>1.6</td><td>1.1</td><td>1.0</td><td>-1.0</td><td>-1.1</td><td>-1.6</td><td>-2.5</td><td>-5.5</td>	</tr>
<tr><td>DOWN</td>	<td>5</td><td>2</td><td>1</td><td>1</td><td>1</td><td>-1</td><td>-1</td><td>-1</td><td>-2</td><td>-5</td>	</tr>
<tr><td>CEILING</td>	<td>6</td><td>3</td><td>2</td><td>2</td><td>1</td><td>-1</td><td>-1</td><td>-1</td><td>-2</td><td>-5</td>	</tr>
<tr><td>FLOOR</td>	<td>5</td><td>2</td><td>1</td><td>1</td><td>1</td><td>-1</td><td>-2</td><td>-2</td><td>-3</td><td>-6</td>	</tr>
<tr><td>HALF_UP</td>	<td>6</td><td>3</td><td>2</td><td>1</td><td>1</td><td>-1</td><td>-1</td><td>-2</td><td>-3</td><td>-6</td>	</tr>
<tr><td>HALF_DOWN</td>	<td>5</td><td>2</td><td>2</td><td>1</td><td>1</td><td>-1</td><td>-1</td><td>-2</td><td>-2</td><td>-5</td>	</tr>
<tr><td>HALF_EVEN</td>	<td>6</td><td>2</td><td>2</td><td>1</td><td>1</td><td>-1</td><td>-1</td><td>-2</td><td>-2</td><td>-6</td>	</tr>

</table>


