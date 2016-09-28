<H1><A NAME="efw.event">Event Program</A></H1>
<pre>
////////////////////////////////////////
//web/WEB-INF/efw/event/myEvent.js
////////////////////////////////////////
var myEvent={};
myEvent.<b>outOfLogin</b>   = false;
myEvent.<b>paramsFormat</b> = { 
                                "#txt_teststring" : "<b>display-name</b>:Test String;<b>max-length</b>:10;",
                                "#txt_testnumber" : "<b>format</b>:#,##0.00;<b>required</b>:true;<b>display-name</b>:Test Number;<b>min</b>:-10.00;<b>max</b>:1,000.00",
                                "#txt_testdate"   : function(){
                                                        var date1=new Date();
                                                        var date2=new Date();
                                                        date2.setDate(date1.getDate()+Number(6));
                                                        return "<b>format</b>:yyyy-MM-dd;<b>required</b>:true;<b>display-name</b>:Test Date;"
                                                               +"<b>min</b>:"+efw.server.format.formatDate(date1,"yyyy-MM-dd")+";"
                                                               +"<b>max</b>:"+efw.server.format.formatDate(date2,"yyyy-MM-dd")+";" ;
                                                    },
                                ... 
                            };
myEvent.<b>fire</b>         = function ( requestParams ) {
                                return (new Result()).alert("hello world! Your entries are correct.");
                            };
</pre>
<HR>

<H3>Event Variable</H3>
The event variable must be same to the event file name. In the sample, it is "myEvent".

<H3>outOfLogin</H3>
<table>
	<tr><th>Value</th><th>Description</th></tr>
	<tr><td>false or undefined</td><td>The event must be called after login. Or SessionTimeoutException will occur.</td></tr>
	<tr><td>true</td><td>The event can be called before login.</td></tr>
</table>

<H3>paramsFormat</H3>
<table>
	<tr><th>Value</th><th>Description</th></tr>
	<tr><td></td><td></td></tr>
</table>

<H3>Check Style</H3>
<table>
	<tr><th>Item</th><th>Value</th><th>Description</th><th>Error</th></tr>
	<tr><td>display-name</td><td>String</td><td>The element name which will be shown in the check error message.</td><td></td></tr>
	<tr><td>max-length</td><td>Number</td><td>The max length for an element.</td><td>MaxLengthOverMessage</td></tr>
	<tr><td>format</td><td>String</td><td>The number format or date format expected to an element.</td><td>NumberIsReuqiredMessage or DateIsReuqiredMessage</td></tr>
	<tr><td>min</td><td>String</td><td>The min (formatted) value to an element.</td><td>MinOrMaxOverMessage or MinOverMessage</td></tr>
	<tr><td>max</td><td>String</td><td>The max (formatted) value to an element.</td><td>MinOrMaxOverMessage or MaxOverMessage</td></tr>
	<tr><td>required</td><td>Boolean</td><td>The element is must or not.</td><td>IsRequiredMessage</td></tr>
	<tr><td>accept</td><td>String</td><td>The extension file-names seperated by "," which will be accepted as uploading files. </td><td>NotAcceptMessage</td></tr>
</table>

<H3>Event Return</H3>
The event return must be void or an instance of Result.



<H3><A NAME="efw.event.fire">イベントのデータ受取り引渡し</A></H3>
<pre>
    form1_event1.paramsFormat = { ... };
    ...
    form1_event1.fire         = function ( requestParams ) {
                                    var ret=[];
                                        ...
                                    return ret;
                                };
</pre>
<DL>
<DD>
イベントのデータ受取り引渡しは、サーバーサイドのイベントjsファイルに記載する。クライアントjsに記載不要。<br>
詳細はAPIの efw.server.fire を参照。
</DL></DD>
<HR>

<H3><A NAME="efw.jsp.event">トランザクション管理</A></H3>
<pre>
</pre>
<DL>
<DD>
event.fireが実行するたび、トランザクションが発行される。<br>
イベントのfireが成功の場合、トランザクションがcommit。失敗の場合、トランザクションがrollback。<br>
詳細はAPIの efw.server.prepare と efw.server.finish を参照。<br>
トランザクションのカスタマイズは、efw.server.customize.js。
</DL></DD>
