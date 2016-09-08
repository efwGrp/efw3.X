<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="/WEB-INF/efw.tld" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>efwテストアプリ--健康診断</title>

	<efw:Client/>
	
	<link href="mdclexam.css" rel="stylesheet">
	
	<script>
		//=====================================================================
		function selectVisit(row){
			var vstdt=$("td:eq(0)",row).html();
			$("#visitlist td").css("background-color","");
			$("td",row).css("background-color","lightcyan");
			Efw("mdclexam_seekvisit",{visitdate:vstdt});
		}
		//=====================================================================
		function showFieldDialog(fieldidx){
			$("#subdata1 td").css("background-color","");
			$("#field_"+fieldidx+" td").css("background-color","lightcyan");
			Efw("mdclexam_showfielddef",{fieldindex:fieldidx});
		}
		//=====================================================================
		$(function(){
			$("#the_seek")
			.button()
			.click(function(event){Efw("mdclexam_seekuser");});
			$("#the_pre")
			.button()
			.click(function(event){Efw("mdclexam_previoususer");});
			$("#the_next")
			.button()
			.click(function(event){Efw("mdclexam_nextuser");});
			$("#btn_memory")
			.button()
			.click(function(event){Efw("mdclexam_refreshmemory");});
			$("#btn_changeDB")
			.button()
			.click(function(event){Efw("mdclexam_changedb");});
			
			$("#tabs")
			.tabs();
		});
  	</script>
</head>
<body style="background-color:ghostwhite;">
<table style="table-layout:fixed;width:1250px"><tr><td style="width:300px;vertical-align:top">
	<div class="ui-helper-reset ui-widget-header ui-corner-all mytitle">個人情報<span style="width:50px;display:inline-block;"></span><input id="btn_memory" type=button style="padding:0px;padding-left:5px;padding-right:5px;" value="メモリ常駐マスタを更新"></div>
	<table class="data" style="text-overflow:hidden;margin-left:2px;width:296px" id="userinfo">
		<colgroup>
		<col width="100px">
		<col>
		</colgroup>
		<tr><th style="vertical-align:middle">個人コード</th><td style="text-overflow:clip;vertical-align:middle">
			<input type="text" id="the_id" style="width:60px;margin-right:1px;"><input 
			type=button id="the_seek" value="検索" style="padding:0px;padding-left:5px;padding-right:5px;"><input 
			type=button id="the_pre" value="＜" style="padding:0px;padding-left:5px;padding-right:5px;"><input 
			type=button id="the_next" value="＞" style="padding:0px;padding-left:5px;padding-right:5px;"></td></tr>
		<tr><th>個人カナ氏名</th><td></td></tr>
		<tr><th>個人漢字氏名</th><td></td></tr>
		<tr><th>性別</th><td></td></tr>
		<tr><th>生年元号</th><td></td></tr>
		<tr><th>生年月日</th><td></td></tr>
		<tr><th>郵便番号</th><td></td></tr>
		<tr><th>住所</th><td></td></tr>
		<tr><th>自宅TEL</th><td></td></tr>
		<tr><th>連絡先TEL</th><td></td></tr>
		<tr><th>保険記号</th><td></td></tr>
		<tr><th>保険番号</th><td></td></tr>
		<tr><th>保険区分</th><td></td></tr>
		<tr><th>保険事務所</th><td></td></tr>
		<tr><th>その他コード１</th><td></td></tr>
		<tr><th>その他コード2</th><td></td></tr>
		<tr><th>その他コード3</th><td></td></tr>
		<tr><th>備考(※)</th><td></td></tr>
	</table>
	<div class="ui-helper-reset ui-widget-header ui-corner-all mytitle">受診情報一覧</div>
	<table class="data" style="width:296px;margin-left:2px;">
		<colgroup>
		<col width="80px">
		<col>
		<col width="70px">
		<col width="18px">
		</colgroup>
		<tr><th>受診日</th><th>コース名</th><th>状態名</th><td></td></tr>
	</table>
	<div style="overflow-y:scroll;height:180px;margin-left:2px;width:296px;background-color:snow">
	<table class="data list" style="width:100%" id="visitlist">
		<colgroup>
		<col width="80px">
		<col>
		<col width="70px">
		</colgroup>
	</table>
	</div>
</td><td style="vertical-align:top">
	<div id="visitinfohead" class="ui-helper-reset ui-widget-header ui-corner-all mytitle">受診情報</div>
	<table class="data" style="width:936px;margin-left:2px" id="visitinfo">
		<colgroup>
		<col width="80px">
		<col width="80px">
		<col width="90px">
		<col width="80px">
		<col width="65px">
		<col width="80px">
		<col width="65px">
		<col width="80px">
		<col width="160px">
		<col>
		</colgroup>
		<tr>
			<th>受診日</th><td></td>
			<th>コース名</th><td colspan=3></td>
			<th>状態名</th><td></td>
			<th>備考(※)</th><th>メモ</th>
		</tr>
		<tr>
			<th>保険区分名</th><td></td>
			<th>治療中</th><td colspan=3></td>
			<th>総合判定</th><td></td>
			<td rowspan=5 style="white-space:normal;"><div style="width:100%;height:100px"></div></td><td style="white-space:normal;" rowspan=5><div style="width:100%;height:100px"></div></td>
		</tr>
		<tr>
			<th>整理番号</th><td></td>
			<th>保険事務所</th><td></td>
			<th>保険記号</th><td></td>
			<td colspan=2 rowspan=4></td>
		</tr>
		<tr>
			<th>保険番号</th><td></td>
			<th>団体漢字名称</th><td colspan=3></td>
		</tr>
		<tr>
			<th colspan=3>請求金額（団体、個人、割引）</th>
			<th colspan=2>税額（団体、個人）</th>
			<td></td>
		</tr>
		<tr>
			<td style="text-align:right"></td>
			<td style="text-align:right"></td>
			<td style="text-align:right"></td>
			<td style="text-align:right"></td>
			<td style="text-align:right"></td>
			<td>&nbsp;</td>
		</tr>
	</table>

<div id="tabs" style="padding:0px;margin:0px;margin-top:5px;border:none">  
	<ul style="padding:0px;padding-left:5px;margin:0px">    
		<li style="height:20px"><a href="#subarea1" style="padding-top:0px;padding-bottom:0px;font-weight:bold">受診結果</a></li>    
		<li style="height:20px"><a href="#subarea2" style="padding-top:0px;padding-bottom:0px;font-weight:bold">その他</a></li>    
	</ul>
	<div id="subarea1" style="padding-left:2px;padding-top:5px;padding-bottom:5px;">    
		<table class="data" style="width:936px;">
			<colgroup>
			<col width="100px">
			<col>
			<col width="100px">
			<col width="100px">
			<col width="18px">
			</colgroup>
			<tr>
				<th>検査項目番号</th>
				<th>項目名称</th>
				<th>結果</th>
				<th>判定区分</th>
				<td></td>
			</tr>
		</table>
		<div style="width:936px;overflow-y:scroll;height:415px;background-color:snow;">
			<table class="data list" id="subdata1">
				<colgroup>
				<col width="100px">
				<col>
				<col width="100px">
				<col width="100px">
				</colgroup>
			</table>
		</div>
	</div>
	<div id="subarea2" style="padding-left:0px;padding-top:2px;padding-bottom:3px;height:100px;">
		<table>
			<tr><td style="vertical-align:top">
				<table class="data" style="width:300px"><tr><th>オプション受診歴</th></tr></table>
				<table class="data list" style="width:300px" id="optioninfo">
					<colgroup>
					<col>
					</colgroup>
					<tr><td></td></tr>
					<tr><td></td></tr>
					<tr><td></td></tr>
					<tr><td></td></tr>
					<tr><td></td></tr>
					<tr><td></td></tr>
					<tr><td></td></tr>
					<tr><td></td></tr>
					<tr><td></td></tr>
					<tr><td></td></tr>
				</table>
			</td><td style="vertical-align:top">
				<table class="data" style="width:631px">
					<colgroup>
					<col>
					<col width="18px">
					</colgroup>
					<tr><th>指示指導情報</th><td></td></tr>
				</table>
				<div  style="width:631px;overflow-y:scroll;height:418px;background-color:snow;">
					<table class="data list" style="width:614px" id="instructionlist">
						<colgroup>
						<col width="50px">
						<col width="200px">
						<col>
						</colgroup>
					</table>
				</div>			
			</td></tr>
		</table>
	</div>
	
</div>

</td></tr></table>

<div id="fielddialog" style="display:none">
<div class="ui-overlay"><div class="ui-widget-overlay" onclick="$('#fielddialog').hide()"></div></div>
<div class="ui-widget ui-widget-content ui-corner-all"
style="position: absolute; width: 800px; left: 430px; top: 10px; padding: 10px;" >

	<table class="data" id="fielddefinfo">
		<colgroup>
		<col width="80px">
		<col width="80px">
		<col width="80px">
		<col width="80px">
		<col width="80px">
		<col width="190px">
		<col>
		</colgroup>
		<tr>
			<th>項目コード</th>
			<td></td>
			<th>項目名</th>
			<td colspan=3></td>
			<td><input id="btn_changeDB" style="padding:0px;padding-left:5px;padding-right:5px;" type=button value="項目名DB変更(メモリ更新せず)"></td>
		</tr>
		<tr>
			<th>男性・下限</th>
			<th>男性・上限</th>
			<th>女性・下限</th>
			<th>女性・上限</th>
			<th>判定区分</th>
			<th>コメント</th>
			<th>指示コメント</th>
		</tr>
	</table>

	<table class="data list" id="fielddeflist">
		<colgroup>
		<col width="80px">
		<col width="80px">
		<col width="80px">
		<col width="80px">
		<col width="80px">
		<col width="190px">
		<col>
		</colgroup>
		
	</table>
</div>
</div>
</body>
</html>