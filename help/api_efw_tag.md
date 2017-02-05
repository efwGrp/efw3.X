<H1>Efw Tags</H1>

<h2>Client Tag</h2>
To programming with Efw, it is required to import several .js files and .css files into JSP because of JQuery and JQuery UI.
You can use the Efw Tag to make the importing easy.

<pre>
...
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;head&gt;
...
&lt;efw:Client/&gt;		//efw:client or efw:CLIENT
...
&lt;/head&gt;
</pre>
The Client tag will be replaced like the next.

<pre>
&lt;head&gt;
...
&lt;link href=&quot;./efw/efw.css&quot; rel=&quot;stylesheet&quot;&gt;
&lt;link href=&quot;./efw/jquery-ui.min.css&quot; rel=&quot;stylesheet&quot;&gt;
&lt;link href=&quot;./efw/jquery-ui.structure.min.css&quot; rel=&quot;stylesheet&quot;&gt;
&lt;link href=&quot;./efw/jquery-ui.theme.min.css&quot; rel=&quot;stylesheet&quot;&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;UTF-8&quot; src=&quot;./efw/jquery-min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;UTF-8&quot; src=&quot;./efw/jquery-ui.min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;UTF-8&quot; src=&quot;./efw/js.cookie.min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;UTF-8&quot; src=&quot;./efw/efw.client.messages.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;UTF-8&quot; src=&quot;./efw/efw.client.format.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;UTF-8&quot; src=&quot;./efw/efw.client.inputbehavior.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;UTF-8&quot; src=&quot;./efw/efw.client.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;UTF-8&quot; src=&quot;./efw/efw.js&quot;&gt;&lt;/script&gt;
...
&lt;/head&gt;
</pre>

<h2>Part Tag</h2>
It will be more easy using Part tag to include a common page part made by JSP in your own JSP.
<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;body&gt;
...
&lt;efw:Part path="part.jsp" param1="####" param2="####" /&gt;		//efw:part or efw:PART
...
&lt;/body&gt;
</pre>

You can get the params in the part jsp by request.getAttribute like the next.

<pre>
<%=request.getAttribute("param1")%>
<%=request.getAttribute("param2")%>
</pre>

<h2>elFinder Tag</h2>
ElFinder is a famous file manager for web. We made a customized version from <a href="https://studio-42.github.io/elFinder/">https://studio-42.github.io/elFinder/">elFinder 2.1.10</a>,
and included it into Efw as a tag. It must be used after the Client tag for jQuery and jQuery UI including.<br>

<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;head&gt;
	&lt;efw:Client/&gt;
&lt;/head&gt;
&lt;body&gt;
	&lt;efw:elFinder id="elFinder1" home="homefolder" height="400" width="800" lang="en" readonly="false" /&gt;
&lt;/body&gt;
</pre>

<b>id</b>: The identity of the elFinder window. You can use it as the instance of the elFinder.<br>
<b>home</b>: A relative path to the storage folder(/WEB-INF/storage). You can set <a href="properties_file.md">the properties file</a> to change the storage folder to your own folder.<br>
<b>height</b>: The height of elFinder window. The unit is "px". The default value is 400.<br>
<b>width</b>: The width of elFinder window. The unit is "px". The deufault is "auto" means 100%.<br>
<b>lang</b>: The language of elFinder window. The default value is "en". You can set it "en", "zh_CN", "jp". If you need other languages please copy it from <a href="https://studio-42.github.io/elFinder/">the official website</a>.<br>
<b>readonly</b>: The elFinder window is for reference or not. The default value is false.<br>

To use elFinder by Efw, the smallist constitution is the next.<br>
<pre>
    elfinderApp
    ├─elfinderPage.jsp
    └─WEB-INF
        └─lib
            ├─efw-3.#.###.jar
            └─juniversalchardet-1.0.3.jar
</pre>