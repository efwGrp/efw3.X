<H1>Efw Tag</H1>

To programming with Efw, it is required to import several .js files and .css files into JSP because of JQuery and JQuery UI.
You can use the Efw Tag to make the importing easy.

<h2>JSP</h2>
<pre>
...
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
...
&lt;efw:Client/&gt;
...
</pre>

<h2>HTML</h2>
<pre>
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
</pre>
