<H1>Files List</H1>

<pre>
myWebApp											//The application folder. 
├─myPage.jsp
├─...
├─efw												//Efw client folder
│  ├─<a href="../../release%20with%20sample/web%20application/efw/efw.client.messages.js">efw.client.messages.js</a>
│  ├─<a href="../../release%20with%20sample/web%20application/efw/efw.css">efw.css</a>
│  └─...
├─META-INF
│  └─<a href="../../release%20with%20sample/web%20application/META-INF/context.xml">context.xml</a>
└─WEB-INF
    ├─classes
    │  └─<b><a href="properties_file.md">efw.properties</a></b>
    ├─efw
    │  ├─event									//Efw event folder
    │  │  ├─<b><a href="api_event.md">myEvent.js</a></b>
    │  │  └─...
    │  ├─mail									//Outside mail folder
    │  │  ├─<b><a href="file_list/myEvent.js.md">mails.xml</a></b>
    │  │  └─...
    │  ├─server									//Efw server folder
    │  │  ├─<a href="../../release%20with%20sample/web%20application/WEB-INF/efw/server/efw.server.messages.js">efw.server.messages.js</a>
    │  │  └─...
    │  ├─sql										//Outside sql folder
    │  │  ├─<b><a href="file_list/mySqlGroup.xml.md">mySqlGroup.xml</a></b>
    │  │  └─...
    │  └─storage									//Storage folder
    │      └─...
    └─lib											//Lib folder
        ├─efw-3.#.###.jar
        ├─jdbc.XXXXXX.jar
        └─poi_3.15_allinone.jar
</pre>

<h3>Application Folder</h3>
You can put jsp files here. It is not recommended to create sub jsp folder. If you do it, please remember to put a base tag in you jsp head, or the &lt;efw:Client> will be wrong.
<pre>
&lt;base href="/myWebApp/">
</pre>

<h3>Efw Client Folder</h3>
The efw client javascript libraries. You can customize messages and css in this folder.

<h3>Efw Server Folder</h3>
The efw server javascript libraries. You can customize messages in this folder.

<h3>Efw Event Folder</h3>
You should add your event files here.

<h3>Outside SQL Folder</h3>
You should add your sql defines here.

<h3>Outside Mail Folder</h3>
You should add your mail defines here.

<h3>Context File</h3>
The context file contains the db resource define and the mail resource define.

<h3>Properties File</h3>
The properties file contains the setting to the web application.

<h3>Storage Folder</h3>
All files your application needs should be placed here. In your event programs, file and folder operating is relatived to the storage folder.

<h3>Lib Folder</h3>
All jars are here. You can put or replace the jars.