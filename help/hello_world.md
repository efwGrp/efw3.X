<H1>Hello World</H1>

Efw is easy to start web programming if you know Javascript & JQuery.

<h2>JSP</h2>
Create a file named as "helloworld.jsp" in your web application folder with the next codes.
<pre>
&lt;%@ page language=&quot;java&quot; contentType=&quot;text/html; charset=UTF-8&quot; pageEncoding=&quot;UTF-8&quot;%&gt;
<b>&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;</b>
&lt;html&gt;
&lt;head&gt;
	&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=UTF-8&quot;&gt;
	&lt;title&gt;Hello World&lt;/title&gt;
	<b>&lt;efw:Client/&gt;</b>
&lt;/head&gt;
&lt;body&gt;
	&lt;input type=text id=&quot;txtMessage&quot;&gt;
	&lt;input type=button value=&quot;Send&quot; <b>onclick="Efw('helloWorld_sendMessage')"&gt;</b>
	&lt;fieldset&gt;&lt;legend&gt;Messages&lt;/legend&gt;&lt;/fieldset&gt;
&lt;/body&gt;
</pre>

you will see the next image, if you call it from a web browser.<br>
<img src="hello_world_jsp1.png">
<h2>Server Event</h2>


