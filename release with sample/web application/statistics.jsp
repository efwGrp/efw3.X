<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>efw Access Statistics</title>

	<efw:Client/>

	<link href="mdclexam.css" rel="stylesheet">

	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
	//stop ajax loading image in order for smooth operating
	//-------------------------------------------------------------------------
	EfwClient.prototype._displayLoading=function(){};
	EfwClient.prototype._removeLoading=function(){};
	
	//Sort Click
	//-------------------------------------------------------------------------
	var sortItem="eventId";
	var sortAction="asc";
	var lastSortItem="";
	function selectSortItem(obj,value){
		$("#tbl_statistics_head th").css("background-color","");
		$(obj).css("background-color","lightcyan");
		sortItem=value;
		if(lastSortItem==sortItem){
			if(sortAction=="asc"){
				sortAction="desc";
			}else{
				sortAction="asc";
			}
		}else{
			sortAction="asc";
		}
		lastSortItem=sortItem;
		refresh();
	}
	//Draw Chart
	//-------------------------------------------------------------------------
	var refresh_handle=null;
	var chart;
    function drawChart() {
        chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        refresh();
    }
	function refresh(){
		Efw("statistics_show",{"sortItem":sortItem,"sortAction":sortAction});
	}
	function refresh_drawChart(){
		var values=efw.result.values;
		var actions=efw.result.actions;
		$("#tbl_statistics input").button();
		var chardata=[];
		var head_data=["eventName"];
		$("#tbl_statistics_head input:checked").each(function(){
			var vl=$(this).val();
			head_data.push(vl);
		});
		var head_data_show=[];
		for(var i=0;i<head_data.length;i++){
			head_data_show.push(head_data[i].replace("event","Event ").replace("error","E ").replace("second","S "));
		};
		chardata.push(head_data_show);
		var sourceArray=values[0]["withdata"];
		for(var i=0;i<sourceArray.length;i++){
			var s=sourceArray[i];
			var d=[];
			for(var j=0;j<head_data.length;j++){
				d.push(s[head_data[j]]);
			}
			chardata.push(d);
		}
        var options = {title: "efw Access Statistics", height:"350",};
        chart.draw(google.visualization.arrayToDataTable(chardata), options);
		if(refresh_handle!=null)window.clearTimeout(refresh_handle);
		refresh_handle=window.setTimeout(refresh, 5000);
	}
	
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	
	//Operation
	//-------------------------------------------------------------------------
	function stopEvent(eventId){
		Efw("statistics_stop",{"eventId":eventId});
	}
	function startEvent(eventId){
		Efw("statistics_start",{"eventId":eventId});
	}
	function reloadEvent(eventId){
		Efw("statistics_reload",{"eventId":eventId});
	}
	
  	</script>

  	<style>
  		table.data th{text-align:center;vertical-align:middle}
  		table.data td{text-align:right;padding:5px;}
  		table.data tr.false td{background-color:red;}
  		#tbl_statistics input{padding:0px!important;padding-left:5px!important;padding-right:5px!important;}
		.content{position: absolute;width:98%;top: 395px;z-index: 1;}
		.top{width:98%;position:fixed;top:0px;background-color: ghostwhite;z-index:4;}
  	</style>
</head>
<body style="overflow-y:scroll;background-color:ghostwhite;">
<div class="top">

<div id="curve_chart"></div>

	<table class="data" id="tbl_statistics_head" border="1" style="width:100%;">
	<colgroup>
		<col width="200px">
		<col width="">
		<col width="170px">
		<col width="100px">
		<col width="70px">
		<col width="70px">
		<col width="70px">
		<col width="70px">
		<col width="100px">
		<col width="70px">
		<col width="70px">
		<col width="70px">
		<col width="70px">
	</colgroup>
	<tr>
		<th rowspan=2 style="cursor:hand" onclick="selectSortItem(this,'eventId')">Event ID</th>
		<th rowspan=2 style="cursor:hand" onclick="selectSortItem(this,'eventName')">Event Name</th>
		<th rowspan=2>Operation</th>
		<th colspan=5>Error (ms)</th>
		<th colspan=5>Success (ms)</th>
	</tr>
	<tr>
		<th style="cursor:hand" onclick="selectSortItem(this,'errorCount')"><input type="checkbox" value="errorCount" checked>Count</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'errorSum')"><input type="checkbox" value="errorSum">SUM</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'errorAvg')"><input type="checkbox" value="errorAvg">AVG</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'errorMax')"><input type="checkbox" value="errorMax">MAX</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'errorMin')"><input type="checkbox" value="errorMin">MIN</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'secondCount')"><input type="checkbox" value="secondCount" checked>Count</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'secondSum')"><input type="checkbox" value="secondSum">SUM</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'secondAvg')"><input type="checkbox" value="secondAvg">AVG</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'secondMax')"><input type="checkbox" value="secondMax">MAX</th>
		<th style="cursor:hand" onclick="selectSortItem(this,'secondMin')"><input type="checkbox" value="secondMin">MIN</th>
	</tr>
	</table>
</div>
<div class="content">
	<table class="data" id="tbl_statistics" border="1" style="width:100%">
	<colgroup>
		<col width="200px">
		<col width="">
		<col width="170px">
		<col width="100px">
		<col width="70px">
		<col width="70px">
		<col width="70px">
		<col width="70px">
		<col width="100px">
		<col width="70px">
		<col width="70px">
		<col width="70px">
		<col width="70px">
	</colgroup>
	</table>
</div>
</body>
</html>