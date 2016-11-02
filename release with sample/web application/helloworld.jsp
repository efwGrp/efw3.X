<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Hello World</title>
	<efw:Client/>
</head>
<body>
	<input type=text id="txtMessage">
	<input type=button value="Send" onclick="Efw('helloworld_send')">
	<fieldset><legend>Messages</legend></fieldset>

</body>