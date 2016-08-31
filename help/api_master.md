<H1>Master Class</H1>

The Master class is established as one of operating classes to store the data from a master table into the memory.
It inherited functions from the <a href="api_record.md">Record</a> class, so you can operate records of the master.
The first calling to a master means to load it into the memory, and the second calling means to get records from memory.
<h2>Event</h2>
<pre>
	var array1 = (new Master("user"))
				.sort("years","asc");
	var array2 = new Master("user",true);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>new Master ( masterId )</td></tr>
<tr><td>new Master ( masterId , reload )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>masterId</td><td>string</td><td>The name of a master table.</td></tr>
<tr><td>reload</td><td>boolean</td><td>The flag to load the master again event it has been loaded.</td></tr>
</table>

