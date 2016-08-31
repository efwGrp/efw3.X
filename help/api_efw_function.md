<H1>Efw Function</H1>

The Efw function is established to call server events from JSP in AJAX.
It is not necessary to send params or receive results when calling server events.
The only thing you must to do is sending the event id.

<h2>JSP</h2>
<pre>
	&lt;input type=&quot;button&quot; value=&quot;Send&quot; onclick="<b>Efw('helloWorld_sendMessage')</b>"&gt;
</pre>
<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>Efw ( eventId )</td></tr>
<tr><td>Efw ( eventId , manualParams )</td></tr>
<tr><td>Efw ( eventId , success )</td></tr>
<tr><td>Efw ( eventId , manualParams , success )</td></tr>
<tr><td>Efw ( eventId , sever )</td></tr>
<tr><td>Efw ( eventId , manualParams , sever )</td></tr>
<tr><td>Efw ( eventId , success , sever )</td></tr>
<tr><td>Efw ( eventId , manualParams , success , sever )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>manualParams</td><td>JSON object</td><td>To send some values which can not be defined by JQuery selectors. <pre>{"mode":"edit"}</td></tr>
<tr><td>success</td><td>function</td><td>To run something when AJAX succeeds. <pre>function(values,actions){alert("SUCCESS");}</pre></td></tr>
<tr><td>sever</td><td>string</td><td>The url of cors connections to another web server application constructed by Efw. <pre>http://127.0.0.1:8080/efw</pre></td></tr>
</table>
