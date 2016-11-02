<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>efwテスト--ログイン</title>
	<efw:Client/>
	<link href="mdclexam.css" rel="stylesheet">
	<script>
		$(function(){
			//me like jquery ui buttons, but it is not necessary
			$("#btnLogin,#btnClear").button();
		});
  	</script>
</head>
<body style="background-color:ghostwhite;">
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
	<div class="ui-helper-reset ui-widget-header ui-corner-all mytitle" style="width:500px">efwテストへようこそ</div>
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
	<p>「admin、password」の権限は管理者です。全画面が見えます。</p>
	<p>「user、password」の権限は担当者です。一部画面がみえないです。</p>
	<input type="button" value="ログイン" 
		id="btnLogin" onclick="Efw('login_submit')">
	<input type="button" value="リセット" 
		id="btnClear" onclick="Efw('login_clear')">
	</td>
	<td></td>
</tr>
</table>

</body>
</html>