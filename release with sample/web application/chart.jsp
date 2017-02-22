<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Chartタグ</title>
	<efw:Client/>
	<style>
		td{text-align:right}
	</style>
</head>
<body>

<button onclick="chart001.setType('column')">column</button>
<button onclick="chart001.setType('stackedcolumn')">stacked column</button>
<button onclick="chart001.setType('line')">line</button>
<button onclick="chart001.setType('pie')">pie</button>
<button onclick="chart001.setType('bar')">bar</button>
<button onclick="chart001.setType('stackedbar')">stacked bar</button>
<button onclick="chart001.setType('area')">area</button>
<button onclick="chart001.setType('stackedarea')">stacked area</button>
<button onclick="chart001.setType('scatter')">scatter</button>
<button onclick="chart001.setType('donut')">donut</button>
&nbsp;&nbsp;
<button onclick="chart001.setWidth('600px')">set width</button>
<button onclick="chart001.setHeight('600px')">set height</button>
<br>
<efw:Chart id="chart001" data="chart001_data" type="column" width="400" height="250"/>
<efw:Chart id="chart002" data="chart001_data" type="stackedcolumn" width="400" height="250"/>
<efw:Chart id="chart003" data="chart001_data" type="line" width="400" height="250"/>
<efw:Chart id="chart004" data="chart001_data" type="pie" width="400" height="250"/>
<efw:Chart id="chart010" data="chart001_data" type="donut" width="400" height="250"/>
<efw:Chart id="chart005" data="chart001_data" type="bar" width="400" height="250"/>
<efw:Chart id="chart006" data="chart001_data" type="stackedbar" width="400" height="250"/>
<efw:Chart id="chart007" data="chart001_data" type="area" width="400" height="250"/>
<efw:Chart id="chart008" data="chart001_data" type="stackedarea" width="400" height="250"/>
<efw:Chart id="chart009" data="chart001_data" type="scatter" width="400" height="250"/>

<br>

<br>
<table border=1 id="chart001_data">
<caption>会社業績</caption>
	<tr><th>年度</th><th>売上高</th><th>営業利益</th><th>経常利益</th></tr>
	<tr><td>2004 年</td><td>1000</td><td>400</td><td>380</td></tr>
	<tr><td>2005 年</td><td>1170</td><td>460</td><td>400</td></tr>
	<tr><td>2006 年</td><td>660</td><td>1120</td><td>900</td></tr>
	<tr><td>2007 年</td><td>1030</td><td>540</td><td>480</td></tr>
	<tr><td>2008 年</td><td>1350</td><td>750</td><td>800</td></tr>
</table>
</body>