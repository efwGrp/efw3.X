<H1>Excel Class</H1>

The Excel class is established to operate excel files.

<h2>Sample</h2>
<pre>

</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th><th>Description</th></tr>
<tr><td>new Excel ( path )</td><td rowspan=12>Excel</td><td>To open a existed excel file.</td></tr>
<tr><td>save ( path )</td><td>To save the excel object into a file.</td></tr>
<tr><td>createSheet( sheetName )</td><td>To create a new sheet.</td></tr>
<tr><td>createSheet( sheetName, copyFrom )</td><td>To clone an existed sheet.</td></tr>
<tr><td>removeSheet ( )</td><td>To delete a sheet.</td></tr>
<tr><td>setSheetOrder ( sheetName, order )</td><td>To move a sheet's position.</td></tr>
<tr><td>setActiveSheet ( sheetName )</td><td>To set a sheet to be active.</td></tr>
<tr><td>setCell ( sheetName, position, value )</td><td>to set a value into a cell.</td></tr>
<tr><td>setCell ( sheetName, position, value, templateSheetName, templatePosition )</td><td>to set a value and style etc into a cell.</td></tr>
<tr><td>encircle ( sheetName, position, templateSheetName, templateShapeName )</td><td>To create a shape by coping to encircle a point in a cell.</td></tr>
<tr><td>encircle ( sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate )</td><td>To create a shape by coping to encircle a point in a cell.</td></tr>
<tr><td>encircle ( sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate, shapeWidthRate, shapeHeightRate)</td><td>To create a shape by coping to encircle a point in a cell.</td></tr>
<tr><td>remove</td><td></td><td>To close the excel object and to delete the original file.</td></tr>
<tr><td>close</td><td></td><td>To close the excel object.</td></tr>
<tr><td>getMaxRow ( sheetName )</td><td>Number</td><td>To get the max number from used rows.</td></tr>
<tr><td>getMaxCol ( sheetName )</td><td>Number</td><td>To get the max number from used cols.</td></tr>
<tr><td>getArray ( sheetName, startRow, endCondition, positionRowMaps)</td><td>Array</td><td>To get several fields as an array from one sheet.</td></tr>
<tr><td>getSingle ( sheetName, positionMap )</td><td>Object</td><td></td></tr>
<tr><td>getValue ( sheetName, position, formatter, rounder )</td><td>String | Number | Date</td><td>To get the value from one cell.</td></tr>
<tr><td>getSheetNames ( )</td><td>Array</td><td>To get the Array of sheet names.</td></tr>
<tr><td>isEncircled ( sheetName, position )</td><td>Boolean</td><td>To judge where the center of a cell is encircled by a shape or not.</td></tr>
<tr><td>isEncircled ( sheetName, position, checkpointXRate, checkpointYRate)</td><td>Boolean</td><td>To judge where a point in a cell is encircled by a shape or not.</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>