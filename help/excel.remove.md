<H1>Excel.remove</H1>

The remove function is established to close the excel object and to delete the original file.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	excel.save("my.xlsx").remove();		// test.xlsx will be deleted.
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . remove ( )</td><td>void</td></tr>
</table>



