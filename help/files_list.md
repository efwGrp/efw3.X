<H1>Files List</H1>

<pre>
webapp							//The application folder. 
├─<b>myPage.jsp</b>
├─...
├─efw						//efw client folder
│  ├─<a href="../../release%20with%20sample/web%20application/efw/efw.client.messages.js">efw.client.messages.js</a>			&nbsp;&nbsp;&nbsp;//efw client messages which are customizable
│  ├─<a href="../../release%20with%20sample/web%20application/efw/efw.css">efw.css</a>							//efw style sheet which is customizable
│  └─...
├─META-INF
│  └─<a href="../../release%20with%20sample/web%20application/META-INF/context.xml">context.xml</a>						&nbsp;//context.xml which contains the db resource define and the mail resource define.
└─WEB-INF
    ├─classes
    │  └─<b><a href="properties_file.md">efw.properties</a></b>				&nbsp;&nbsp;&nbsp;//efw properties
    ├─efw
    │  ├─event					&nbsp;//application event
    │  │  └─<b><a href="api_event.md">myEvent.js</a></b>
    │  ├─mail					&nbsp;//application event
    │  │  └─<b><a href="file_list/myEvent.js.md">mails.xml</a></b>
    │  ├─server		//efw server mesages which are customizable
    │  │  └─<a href="../../release%20with%20sample/web%20application/WEB-INF/efw/server/efw.server.messages.js">efw.server.messages.js</a>
    │  ├─sql			&nbsp;&nbsp;&nbsp;//application outside sql
    │  │  └─<b><a href="file_list/mySqlGroup.xml.md">mySqlGroup.xml</a></b>
    │  └─storage
    └─lib
        ├─jdbc.XXXXXX.jar				//jdbc driver, desided by the type and version of the DB which will be connected
        └─poi_3.15_allinone.jar
</pre>

<h3>Application Folder</h3>
You can put jsp files here. It is not recommended to create sub jsp folder. If you do it, please remember to put a base tag in you jsp or the &lt;efw:Client> will be wrong.
<pre>
&lt;base href="/webapp/">
</pre>