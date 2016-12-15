<H1>SQL XML</H1>

<pre>
test.xml
------------------------------------
&lt;?xml version="1.0" encoding="UTF-8"?>
&lt;sqls>
	&lt;sql id="sql1">
&lt;!-- this is comment -->
/**
	this is comment
**/
//	this is comment

SELECT field1,field2,field3 FROM table1
WHERE
field1= :param1
&lt;if exists="param2"> param2 &amp;lt; :param2&lt;/if>
&lt;if notexists="param2"> param2 &amp;lt; 500&lt;/if>
order by field3
	&lt;/sql>
	&lt;sql id="sql2">
	...
	&lt;/sql>
&lt;/sqls>

</pre>


<h3>SQL ID</h3>
Every SQL tag should have an Id. The Id must be unique in the SQL XML file.
It will be called by <a href="db.select.md">db.select</a> or <a href="db.change.md">db.change</a>.

<h3>Param</h3>
You can define params in SQL just write :param .

<h3>If</h3>
you can do deffient operation by judging whether a param is existed or not.

<h3>Commet</h3>
You can write comment in several ways.

<h4>Encode</h3>
Pay attention to the mark "&lt;". You must write it like "&amp;lt;" to match the xml diction.