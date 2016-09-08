<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>efwテストアプリ--健康診断</title>

	<efw:Client/>

	<link href="mdclexam.css" rel="stylesheet">
	<script>
		//If page changing in success, it will be blocked by browsers.
		//Then you must do it in client javascript.
		function btnF8_onclick(){
			window.open("statistics.jsp","_blank");
		}
		$(function(){
			//me like jquery ui buttons, but it is not necessary
			$("#btnLogin,#btnClear,#btnF1,#btnF2,#btnF3,#btnF4,#btnF5,#btnF6,#btnF7,#btnF8,#btnF9,#btnF10").button();
		});
  	</script>
</head>
<body style="background-color:ghostwhite;" onload="Efw('sample_showfiles')">
<table style="width:100%">
<tr style="height:20px">
	<td></td>
	<td style="width:200px"></td>
	<td style="width:300px"></td>
	<td></td>
</tr>
<tr>
	<td></td>
	<td colspan="2">
	<div class="ui-helper-reset ui-widget-header ui-corner-all mytitle" style="width:500px">efwテストアプリ 健康診断閲覧へようこそ</div>
	<br>
	</td>
	<td></td>
</tr>
<tr>
	<td></td>
	<td style="text-align:right;">アカウント</td><td><input id="txt_uid" type="text"></td>
	<td></td>
</tr>
<tr>
	<td></td>
	<td style="text-align:right">パスワード</td><td><input id="txt_pwd" type="password"></td>
	<td></td>
</tr>
<tr>
	<td></td>
	<td colspan="2" style="text-align:center">
	<p>テストのため、「admin、password」を入力してください。</p>
	<input type="button" value="ログイン" 
		id="btnLogin" onclick="Efw('sample_login')">
	<input type="button" value="リセット" 
		id="btnClear" onclick="Efw('sample_clear')">
	</td>
	<td></td>
</tr>
</table>
<br><br>
<div style="text-align:center">
<div id="div_F1">
<span style="display:inline-block;width:540px;text-align:left">テスト文字：<input id="txt_testtext" type="text">5桁以内に入力してください。</span><br>
<span style="display:inline-block;width:540px;text-align:left">テスト数字：<input id="txt_testnumber" type="text" data-format="#,##0.00">-10.00～1,000.00の数字を入力してください。</span><br>
<span style="display:inline-block;width:540px;text-align:left">テスト日付：<input id="txt_testdate" type="text" data-format="yyyy年MM月dd日">今日から一週間以内の日付をyyyyMMddで入力してください。</span><br>
</div>
<br>
<input type="button" id="btnF1" style="width:150px" value="F1 入力チェックテスト" 
	data-shortcut="F1" onclick="Efw('sample_inputcheck')"><br>
<br><br>

<span style="display:inline-block;width:540px;text-align:left">アップロードファイル：<input id="txt_file1" type="file" accept=".xls"></span><br>
<span style="display:inline-block;width:540px;text-align:left">アップロードファイル：<input id="txt_file2" type="file"></span><br><br>
<input type="button" id="btnF2" style="width:150px" value="F2 アップロード" 
	data-shortcut="F2" onclick="Efw('sample_upload')">
<input type="button" id="btnF3" style="width:150px" value="F3 ダウンロード" 
	data-shortcut="F3" onclick="Efw('sample_download')">
<br>
<br>

<span style="display:inline-block;width:540px;text-align:center"><select id="cmb_download" size=5 multiple style="width:350px;height:100px;"><option value="あ.xls">あ.xls</option></select></span><br><br>
<input type="button" id="btnF4" style="width:150px" value="F4 帳票PDF作成" 
	data-shortcut="F4" onclick="Efw('sample_url2pdf')">
<input type="button" id="btnF5" style="width:150px" value="F5 PDFをﾏｰｼﾞ" 
	data-shortcut="F5" onclick="Efw('sample_mergepdf')">
<br>
<br>

<br>
<span style="display:inline-block;width:540px;text-align:left">引数1：<input type="text" id="txt_param1"></span><br>
<span style="display:inline-block;width:540px;text-align:left">引数2：<input type="text" id="txt_param2"></span><br>
<span style="display:inline-block;width:540px;text-align:left">結果-：<input type="text" id="txt_result"></span><br>
<input type="button" id="btnF6" style="width:150px" value="F6 BRMSテスト" 
	data-shortcut="F6" onclick="Efw('sample_brmstest')">
<br>
<br>


<br>
<span style="display:inline-block;width:540px;text-align:left">送信先：<input type="text" id="txt_to"></span><br>
<input type="button" id="btnF7" style="width:150px" value="F7 メール送信" 
	data-shortcut="F7" onclick="Efw('sample_sendmail')">
<br>
<br>

<br>
<input type="button" id="btnF8" style="width:150px" value="F8 統計情報" data-shortcut="F8" onclick="btnF8_onclick();">
<br>
<br>

<br>
<span style="display:inline-block;width:540px;text-align:left">テスト項目：<input type="text" id="txtF9"></span><br>
<input type="button" id="btnF9" style="width:150px" value="F9 非表示" 
	data-shortcut="F9" onclick="Efw('sample_showhide')">
<input type="button" id="btnF10" style="width:150px" value="F10 非活性" 
	data-shortcut="F10" onclick="Efw('sample_enabledisable')">
<br>
<br>

<input type="button" value="F11" data-shortcut="F11" onclick="alert('F11 is clicked!');">
<input type="button" value="F12" data-shortcut="F12" onclick="alert('F12 is clicked!');">

<input type="button" value="CTRL+A" data-shortcut="CTRL+A" onclick="alert('CTRL+A is clicked!');">
<input type="button" value="ALT+Z" data-shortcut="ALT+Z" onclick="alert('ALT+Z is clicked!');">

</div>
</body>
</html>