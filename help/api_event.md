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
                                                        date2.setDate(date1.getDate()+6);
                                                        return "<b>format</b>:yyyy-MM-dd;<b>required</b>:true;<b>display-name</b>:Test Date;"
                                                               +"<b>min</b>:"+date1.format("yyyy-MM-dd")+";"
                                                               +"<b>max</b>:"+date2.format(,"yyyy-MM-dd")+";" ;
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
<pre>myEvent.paramsFormat = {
                     selector1 : null,                                          //入力チェックなしの選択キー。選択キーの規則はJQueryを参照。
                     selector2 : "<a href="#checkStyle">checkStyle</a>",                                  //チェックスタイルの選択キー。
                     selector3 : function(){ return "<a href="#checkStyle">checkStyle</a>"; },            //チェックスタイルの選択キー。イベントには関数で作成する可。
                   { selector4 : ... , },                                       //サブフォーマット。パラメーターフォーマットと同じ種類の要素の組合せ。
                 [ { selector5 : ... , } ],                                     //サブフォーマットの配列。１種類のサブフォーマットのみを格納する。
             };
</pre>
<table>
<tbody><tr>
    <th>属性種類</th>
    <th>用途</th>
    <th>正常ケース</th>
    <th>異常ケース</th>
</tr>
<tr>
    <td>selector : null</td>
    <td>単独な入力データを識別する。</td>
    <td>属性名称をセレクタとしてHTMLタグを１つ取得する。<br>タグのvalue，textなどの属性は入力データと利用する。</td>
    <td>タグを複数取得する場合エラー。</td>
</tr>
<tr>
    <td>selector : "<a href="#checkStyle">checkStyle</a>"</td>
    <td>単独な入力データを識別する。</td>
    <td>checkStyleに満足する場合、属性名称をセレクタとしてHTMLタグを１つ取得する。<br>タグのvalue，textなどの属性は入力データと利用する。<br>
    checkStyle で数字・日付の format の場合、数字・日付に変換してから取得する。
    </td>
    <td>タグを複数取得する場合エラー。<br>
    checkStyle に満足できない場合エラー。
    </td>
</tr>
<tr>
    <td>selector : function(){ return "<a href="#checkStyle">checkStyle</a>"; } </td>
    <td>単独な入力データを識別する。</td>
    <td>関数戻り値のcheckStyleに満足する場合、属性名称をセレクタとしてHTMLタグを１つ取得する。<br>タグのvalue，textなどの属性は入力データと利用する。<br>
    checkStyle で数字・日付の format の場合、数字・日付に変換してから取得する。
    </td>
    <td>タグを複数取得する場合エラー。<br>
    checkStyle に満足できない場合エラー。
    </td>
</tr>
<tr>
    <td>selector : {…}</td>
    <td>サブ入力オブジェクトを識別する。</td>
    <td>属性名称をセレクタとして，HTMLタグを１つ取得する。<br>そのタグをサブ定義処理時のコンテキストにする。</td>
    <td>タグを複数取得する場合エラー。</td>
</tr>
<tr>
    <td>selector : [{…}]</td>
    <td>サブ入力オブジェクトの配列を識別する。</td>
    <td>属性名称をセレクタとして，HTMLタグを取得する。<br>そのタグをサブ定義配列処理時のコンテキストにする。</td>
    <td>－</td>
</tr>
</tbody></table>


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
