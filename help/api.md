<H1>API</H1>

<h2>JSP</h2>
<li><a href="api_efw_tag.md">Efw Tags</a></li>
<li><a href="api_efw_function.md">Efw Function</a></li>
<li><a href="api_data_format.md">data-format Attribute</a></li>
<li><a href="api_data_shortcut.md">data-shortcut Attribute</a></li>
<li><a href="api_draw_barcode.md">To Draw Barcode</a></li>

<h2>Event JS</h2>
<li><a href="api_event.md">Event Programming</a></li>
<li><a href="api_global.md">About Global Event</a></li>


<h2>Outside SQL</h2>
<li><a href="api_sql.md">SQL XML</a></li>
<h2>Outside Mail</h2>
<li><a href="api_mail.md">Mail XML</a></li>


<h3>Global</h3>
<table>
<tr><th>Varieties</th><th>Functions</th></tr>
<tr><td>csv</td><td>...</td></tr>
<tr><td>file</td><td><a href="file.get.md">get</a></td><td><a href="file.list.md">list</a></td><td><a href="file.isFile.md">isFile</a></td><td><a href="file.isFolder.md">isFolder</a></td></td><td><a href="file.makeFile.md">makeFile</a></td></tr>
<tr><td><td><a href="file.exists.md">exists</a></td><td><a href="file.duplicate.md">duplicate</a></td><td><a href="file.rename.md">rename</a></td><td><a href="file.remove.md">remove</a></td><td><a href="file.makeDir.md">makeDir</a></td></tr>
<tr><td></td><td><a href="file.readAllLines.md">readAllLines</a></td><td><a href="file.writeAllLines.md">writeAllLines</a></td><td><a href="file.getStorageFolder.md">getStorageFolder</a></td><td><a href="file.saveUploadFiles.md">saveUploadFiles</a></td><td><a href="file.saveSingleUploadFile.md">saveSingleUploadFile</a></td></tr>
<tr><td>absfile</td><td colspan=5>All APIs are the same as the file object, except that the path param is an absolute one.</td></tr>
<tr><td>barcode</td><td><a href="barcode.decode.md">decode</a></td></tr>
<tr><td>brms</td><td><a href="brms.getRuleById.md">getRuleById</a></td><td><a href="brms.getRuleByName.md">getRuleByName</a></td><td><a href="brms.getRuleByAlias.md">getRuleByAlias</a></td></tr>
<tr><td>event</td><td><a href="event.fire.md">fire</a></td></tr>
<tr><td>db</td><td><a href="db.select.md">select</a></td><td><a href="db.change.md">change</a></td><td><a href="db.master.md">master</a></td></tr>
<tr><td>mail</td><td><a href="mail.send.md">send</a></td></tr>
<tr><td>pdf</td><td><a href="pdf.create.md">create</a></td><td><a href="pdf.merge.md">merge</a></td></tr>
<tr><td>properties</td><td><a href="properties.get.md">get</a></td></tr>
<tr><td>session</td><td><a href="session.get.md">get</a></td><td><a href="session.set.md">set</a></td><td><a href="session.create.md">create</a></td><td><a href="session.invalidate.md">invalidate</a></td></tr>
<tr><td>cookie</td><td><a href="cookie.get.md">get</a></td><td><a href="cookie.set.md">set</a></td></tr>
<tr><td>{ any }</td><td><a href="any.debug.md">debug</a></td><td><a href="any.format.md">format</a></td><td><a href="any.parse.md">parse</a></td></tr>
<tr><td>{ Date }</td><td><a href="Date.getYears.md">getYears</a></td></tr>
<tr><td>{ String }</td><td><a href="String.base64Encode.md">base64Encode</a></td><td><a href="String.base64EncodeURI.md">base64EncodeURI</a></td><td><a href="String.base64Decode.md">base64Decode</a></td></tr>

</table>
<h3>Classes</h3>
<table>
<tr><th>Classes</th><th>Functions</th></tr>

<tr><td>Excel</td>
<td><a href="excel.new.md">new</a></td>
<td><a href="excel.save.md">save</a></td>
<td><a href="excel.close.md">close</a></td>
</tr>
<tr><td></td>
<td><a href="excel.createSheet.md">createSheet</a></td>
<td><a href="excel.removeSheet.md">removeSheet</a></td>
<td><a href="excel.setSheetOrder.md">setSheetOrder</a></td>
<td><a href="excel.setActiveSheet.md">setActiveSheet</a></td>
</tr>
<tr><td></td>
<td><a href="excel.setCell.md">setCell</a></td>
<td><a href="excel.encircle.md">encircle</a></td>
</tr>
<tr><td></td>
<td><a href="excel.getArray.md">getArray</a></td>
<td><a href="excel.getSingle.md">getSingle</a></td>
<td><a href="excel.getValue.md">getValue</a></td>
<td><a href="excel.getMaxRow.md">getMaxRow</a></td>
</tr>
<tr><td></td>
<td><a href="excel.getMaxCol.md">getMaxCol</a></td>
<td><a href="excel.isEncircled.md">isEncircled</a></td>
<td><a href="excel.getSheetNames.md">getSheetNames</a></td>
</tr>

<tr><td>Record</td>
<td><a href="record.new.md">new</a></td>
</tr>
<tr><td></td>
<td><a href="record.seek.md">seek</a></td>
<td><a href="record.sort.md">sort</a></td>
<td><a href="record.map.md">map</a></td>
</tr>
<tr><td></td>
<td><a href="record.getArray.md">getArray</a></td>
<td><a href="record.getSingle.md">getSingle</a></td>
<td><a href="record.getValue.md">getValue</a></td>
<td><a href="record.length.md">length</a></td>
</tr>
<tr><td>Result</td>
<td><a href="result.new.md">new</a></td>
<td><a href="result.concat.md">concat</a></td>
</tr>
<tr><td></td>
<td><a href="result.runat.md">runat</a></td>
<td><a href="result.remove.md">remove</a></td>
<td><a href="result.append.md">append</a></td>
<td><a href="result.withdata.md">withdata</a></td>
</tr>
<tr><td></td>
<!--<td><a href="result.error.md">error</a></td>-->
<td><a href="result.show.md">show</a></td>
<td><a href="result.hide.md">hide</a></td>
<td><a href="result.enable.md">enable</a></td>
<td><a href="result.disable.md">disable</a></td>
</tr>
<tr><td></td>
<td><a href="result.highlight.md">highlight</a></td>
<td><a href="result.attach.md">attach</a></td>
<td><a href="result.deleteAfterDownload.md">deleteAfterDownload</a></td>
<td><a href="result.confirm.md">confirm</a></td>
</tr>
<tr><td></td>
<td><a href="result.alert.md">alert</a></td>
<td><a href="result.eval.md">eval</a></td>
<td><a href="result.focus.md">focus</a></td>
<td><a href="result.navigate.md">navigate</a></td>
</tr>

</table>
