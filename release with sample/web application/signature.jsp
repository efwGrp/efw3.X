<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
	<title>Signatureタグ</title>
	<efw:Client/>
</head>
<body>
<efw:Signature id="signature1" width="300" height="150"/><br>
<button onclick="Efw('signature_get')">画像を取得する</button><br>
<img id="imgDest">
</body>
</html>
