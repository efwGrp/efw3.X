<H1>data-format Attribute</H1>

"data-format" is established as one of HTML5 custom attributes to control behaviors of input elements at client.
Efw framework will add focus and blur behaviors to input elements by data-format attributes when page-loading.

<h2>JSP</h2>
<pre>
	&lt;input type=&quot;text&quot; <b>data-format="#,##0.00"</b>&gt;
	&lt;input type=&quot;text&quot; <b>data-format="0.00%"</b>&gt;
	&lt;input type=&quot;text&quot; <b>data-format="yyyy-MM-dd HH:mm:ss SSS"</b>&gt;
	&lt;input type=&quot;text&quot; <b>data-format="yy-M-d H:m:s S"</b>&gt;
</pre>

<h2>API</h2>
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

