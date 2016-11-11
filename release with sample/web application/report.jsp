<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="ja" />
<title>請求書</title>
<efw:Client/>
<style>

body {
	font-size:3.5mm;
	font-family:sans-serif;
}
table {
	border-collapse:collapse;
}
th {
	text-align:center;
}
.main {
	margin:0mm;
}
/* 請求書 */
h1 {
	margin:0px;
	margin-bottom:1mm;
	font-size:5mm;
	font-weight:bold;
	text-align:center;
	text-decoration:underline;
}
/* 社名等 */
h2 {
	font-size:150%;
	margin-bottom:10px;
}

#uriage {
	margin:0mm;
	height:80mm;
}
#nohin {
	margin:5mm 0mm 5mm 0mm;
	height:99mm;
}
#juryo {
	margin:0mm;
}

.r {text-align:right;}
.c {text-align:center;}
.l {text-align:left;}

tr.bbtb td, tr.bbtb th {
	border-top:0.5mm solid #000000;
	border-bottom:0.5mm solid #000000;
}

.atena {
	width:100%;
	border:0mm none;
}
.atena .customer {}
.mado {
	padding-left:10mm;
}
.atena .company {
	text-align:right;
}

.outline {
	margin:0mm;
	width:100%;
	border:0.5mm solid #000000;
}
.outline th {
	font-size:3mm;
	background:#eeeeee;
	border:1px solid #000000;
}
.outline td{
	border:1px solid #000000;
	text-align:center;
}

.meisai {
	width:100%;
	margin:1mm 0mm 1mm auto;
	border:0.5mm solid #000000;
}
.meisai th {
	font-size:3mm;
	padding:0.5mm;
	background:#eeeeee;
	border:1px solid #000000;
}
.meisai td{
	padding:0.5mm;
	border:1px solid #000000;
}




.fixtext {
	width:100%;
	border:0mm none;
}
.fixtext .hidari {

}
.fixtext .migi {
	text-align:right;
}

td.juryoin {
	text-align:center;
	vertical-align:top;
}
td.juryoin p{
	background:#eeeeee;
	border-bottom:1px solid #000000;
}

p {
	margin:0px;
	padding:0px;
}
.hidariyose {
	text-align:left;
}

.migiyose {
	text-align:right;
}


.colorLine0 td {
background:#eeeeee;
}
.colorLine1 td {
}

hr {
	page-break-after:always;
	height:0;
	border:0 none #ffffff;
	color:#ffffff;
}
@media print {
	hr {
	/*	display:none;*/
	}
}
@media screen {
	hr {
		border-top:2px dashed #999999;
		border-bottom:2px dashed #999999;
		margin:30px;
	}
}


</style>
</head>
<body onload="Efw('report_paint')">

<div class="page">

<p class="migiyose" id="txt_createtime">9999-99-99 99:99:99</p>

<h1>請 求 書</h1>

<table class="atena">
	<tr>
		<td class="customer">
			<p class="mado">
				〒169-0072<br />
				東京都新宿区大久保2-2-12<br />
				<br />
				エスコ・ジャパン株式会社 御中<br />
				<br />
				TEL 03-3204-2485<br />
				FAX 03-3204-2486<br />
			</p>
			<br />
			<br />
			いつもありがとうございます。<br />
			下記の通りご請求申し上げます。<br />
			</td>
			<td></td>
			<td class="company"><h2>エスコ・ジャパン株式会社</h2><p style="margin:-9px 0px 10px 0px;">エスコ太郎</p>
			〒169-0072 東京都新宿区大久保2-2-12<br />
			TEL 03-3204-2485　FAX 03-3204-2486<br />
			<br />
			振込は下記口座までお願い致します<br />
			東京新宿大久保銀行 インターネット支店 普通 88888888<br />
			大久保信用金庫 西早稲田支店 普通 77777777<br />
		</td>
	</tr>
</table>

<table class="outline">
	<tr>
		<th width="14%">前回御請求額</th>
		<th width="14%">今回御入金額</th>
		<th width="14%">繰越金額</th>
		<th width="14%">御買上額</th>
		<th width="14%">消費税額</th>
		<th width="14%">御買上額計</th>
		<th width="14%">今回御請求額</th>
	</tr>
	<tr>
		<td>000,000</td>
		<td>000,000</td>
		<td>000,000</td>
		<td>000,000</td>
		<td>000,000</td>
		<td>000,000</td>
		<td>000,000</td>
	</tr>
</table>
<p class="migiyose">単位：円</p>

<table class="meisai">
	<colgroup>
		<col style="width: 13%; text-align:center;" />
		<col style="width: 12%; text-align:right;" />
		<col style="width: 35%; text-align:left;" />
		<col style="width: 15%; text-align:right;" />
		<col style="width: 10%; text-align:left;" />
		<col style="width: 15%; text-align:right;" />
	</colgroup>

	<tr class="bbtb">
		<th>日付</th>
		<th>コード</th>
		<th>商品名</th>
		<th>単価</th>
		<th>数量</th>
		<th>金額</th>
	</tr>

<tr class="colorLine1">
	<td class="c">9999-99-99</td>
	<td>99</td>
	<td>＃＃＃＃＃＃</td>
	<td class="r">9999</td>
	<td class="r">99個</td>
	<td class="r">&#160;99,999</td>
</tr>

<tr class="colorLine0">
	<td class="c">9999-99-99</td>
	<td>99</td>
	<td>＃＃＃＃＃＃</td>
	<td class="r">9999</td>
	<td class="r">99個</td>
	<td class="r">&#160;99,999</td>
</tr>

<tr class="colorLine1">
	<td class="c">9999-99-99</td>
	<td>99</td>
	<td>＃＃＃＃＃＃</td>
	<td class="r">9999</td>
	<td class="r">99個</td>
	<td class="r">&#160;99,999</td>
</tr>

<tr class="colorLine0">
	<td class="c">9999-99-99</td>
	<td>99</td>
	<td>＃＃＃＃＃＃</td>
	<td class="r">9999</td>
	<td class="r">99個</td>
	<td class="r">&#160;99,999</td>
</tr>

<tr class="colorLine1">
	<td class="c">9999-99-99</td>
	<td>99</td>
	<td>＃＃＃＃＃＃</td>
	<td class="r">9999</td>
	<td class="r">99個</td>
	<td class="r">&#160;99,999</td>
</tr>

<tr class="colorLine0">
	<td class="c">9999-99-99</td>
	<td>99</td>
	<td>＃＃＃＃＃＃</td>
	<td class="r">9999</td>
	<td class="r">99個</td>
	<td class="r">&#160;99,999</td>
</tr>

</table>
</div>


</body>
</html>