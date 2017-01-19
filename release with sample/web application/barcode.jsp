<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>efwテスト--バーコード</title>
	<efw:Client/>
	<link href="mdclexam.css" rel="stylesheet">
	<script>
		function funcQrTest(){
			var value=$("textarea").val();
			value="drawServlet?type=qrcode&msg="+encodeURIComponent(value);
			$("#tdQrTest").html("<img style='width:200px' src=\""+value+"\">");
		}
	</script>
</head>
<body style="background-color:ghostwhite;">
<table border=1 style="width:100%;">
	<tr style="height:210px">
		<td>QR Codeテスト</td>
		<td><textarea style="width:300px;height:150px"></textarea><button onclick="funcQrTest()">作成</button></td>
		<td id="tdQrTest"></td>
	</tr>
	<tr>
		<td>QR Code</td>
		<td>drawServlet?type=qrcode&msg=https://github.com/efwGrp/efw3.X</td>
		<td><img style="height:200px" src="drawServlet?type=qrcode&msg=https://github.com/efwGrp/efw3.X"></td>
	</tr>
	<tr>
		<td>Codabar</td>
		<td>drawServlet?type=codabar&msg=0123456789</td>
		<td><img style="height:100px" src="drawServlet?type=codabar&msg=0123456789"></td>
	</tr>
	<tr>
		<td>Code 39</td>
		<td>drawServlet?type=code39&msg=0123456789</td>
		<td><img style="height:100px" src="drawServlet?type=code39&msg=0123456789"></td>
	</tr>
	<tr>
		<td>Code 128</td>
		<td>drawServlet?type=code128&msg=0123456789</td>
		<td><img style="height:100px" src="drawServlet?type=code128&msg=0123456789"></td>
	</tr>
	<tr>
		<td>Interleaved 2 of 5</td>
		<td>drawServlet?type=2of5&msg=0123456789</td>
		<td><img style="height:100px" src="drawServlet?type=2of5&msg=0123456789"></td>
	</tr>
	<tr>
		<td>ITF-14</td>
		<td>drawServlet?type=itf14&msg=0123456789123</td>
		<td><img style="height:100px" src="drawServlet?type=itf14&msg=0123456789123"></td>
	</tr>
	<tr>
		<td>EAN-13</td>
		<td>drawServlet?type=ean13&msg=1234567890128</td>
		<td><img style="height:100px" src="drawServlet?type=ean13&msg=1234567890128"></td>
	</tr>
	<tr>
		<td>EAN-8</td>
		<td>drawServlet?type=ean8&msg=12345670</td>
		<td><img style="height:100px" src="drawServlet?type=ean8&msg=12345670"></td>
	</tr>
	<tr>
		<td>UPC-A</td>
		<td>drawServlet?type=upca&msg=012345678905</td>
		<td><img style="height:100px" src="drawServlet?type=upca&msg=012345678905"></td>
	</tr>
	<tr>
		<td>UPC-E</td>
		<td>drawServlet?type=upce&msg=01234565</td>
		<td><img style="height:100px" src="drawServlet?type=upce&msg=01234565"></td>
	</tr>
	<tr>
		<td>POSTNET</td>
		<td>drawServlet?type=postnet&msg=0123456789</td>
		<td><img style="width:400px" src="drawServlet?type=postnet&msg=0123456789"></td>
	</tr>
	<tr>
		<td>Royal Mail Customer Barcode</td>
		<td>drawServlet?type=rmcbc&msg=0123456789</td>
		<td><img style="width:400px" src="drawServlet?type=rmcbc&msg=0123456789"></td>
	</tr>
	<tr>
		<td>USPS Intelligent Mail</td>
		<td>drawServlet?type=usps4cb&msg=0123456709498765432101234567891</td>
		<td><img style="width:400px" src="drawServlet?type=usps4cb&msg=0123456709498765432101234567891"></td>
	</tr>
	<tr>
		<td>PDF417</td>
		<td>drawServlet?type=pdf417&msg=0123456789</td>
		<td><img style="width:400px" src="drawServlet?type=pdf417&msg=0123456789"></td>
	</tr>
	<tr>
		<td>DataMatrix</td>
		<td>drawServlet?type=datamatrix&msg=0123456789</td>
		<td><img style="height:100px" src="drawServlet?type=datamatrix&msg=0123456789"></td>
	</tr>
</table>
</body>
</html>