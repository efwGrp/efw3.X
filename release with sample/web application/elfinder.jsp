<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>elfinderタグ</title>
	<efw:Client/>
</head>

<body>
<efw:elfinder id="elfinder001" home="" width="800px" height="400px" lang="jp" readonly="false"/>
<button onclick="elfinder001.setReadOnly(true);">readonly</button>
<button onclick="elfinder001.setReadOnly(false);">not readonly</button>
<button onclick="elfinder001.setWidth(800);">reset width</button>
<button onclick="elfinder001.setHeight(400);">reset height</button>
please input a sub folder relative path:
<input style="width:100px" id="newhome">
<button onclick="elfinder001.setHome($('#newhome').val());">reset home</button>

</body>
</html>
