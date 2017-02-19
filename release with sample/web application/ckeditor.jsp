<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>CKEditorタグ</title>
	<efw:Client/>
</head>
<body>
<efw:CKEditor id="ckeditor001" width="800" height="150" readonly="false" lang="ja" mode="basic" />
<button onclick="ckeditor001.setReadOnly(true)">readonly</button>
<button onclick="ckeditor001.setReadOnly(false)">not readonly</button>
<button onclick="ckeditor001.setWidth(500);">reset width</button>
<button onclick="ckeditor001.setHeight(200);">reset height</button>
<button onclick="alert($('#ckeditor001').val());">show value</button>
<button onclick="ckeditor001.setPattern('basic')">basic pattern</button>
<button onclick="ckeditor001.setPattern('standard')">standard pattern</button>
<button onclick="ckeditor001.setPattern('full')">full pattern</button>
</body>