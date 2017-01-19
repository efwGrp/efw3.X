<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
    <title>バーコード識別</title>
    <efw:Client />
    <style>
      html, body {
          text-align: center;
      }
    </style>
</head>
<body>
	<h3>バーコード識別テスト</h3>
	<br><br><br><br>
	<input type="file" accept="image/*" capture="camera" id="file_image" 
	onchange="Efw('camera_decodebar')" style="display:none">
	<button style="width:300px;height:100px;font-size:40px" onclick="$('#file_image').click()">起動</button>
	<br><br><br><br>
	<textarea style="width:300px;height:100px;font-size:20px"></textarea><br>
iPhoneの場合、<br>横向きで写真を撮ってください。
  </body>
</html>