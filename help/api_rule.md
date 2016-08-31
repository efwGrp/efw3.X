<H1>Rule Class</H1>

The Rule class is established as one of operating classes to execute rules in the BRMS of <a href="https://www.escco.co.jp/innorules/">innorules</a>.
It inherited functions from the <a href="api_record.md">Record</a> class, so you can operate results records from the rule calling.
<h2>Sample for Event</h2>
<pre>
	var array = (new Rule("ChineseFavorites",{"lessThan":30}))
				.sort("years","asc");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>new Rule ( ruleId , params  )</td></tr>
<tr><td>new Rule ( ruleId , params , ruleDate )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>ruleId</td><td>string</td><td>The name of a rule stored in BRMS.</td></tr>
<tr><td>params</td><td>JSON object</td>
<td>To send values which is requried by the rule. 
<pre>{"param1":value1,"param2":value2,...}</pre>
<tr><td>ruleDate</td><td>date</td><td>The calling date. Default is the system date.</td></tr>
</table>

