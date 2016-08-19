/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
String.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return ""+this;
};
Number.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return 0+this;
};
Boolean.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return true && this;
};
Date.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return new Date(this.getTime());
};
Array.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an array.");
	java.lang.System.out.println(JSON.stringify(this));
	return this;
};
Function.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is a function.");
	return this;
};
Object.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an object.");
	java.lang.System.out.println(JSON.stringify(this));
	return this;
};
///////////////////////////////////////////////////////////////////////////////
Change.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Change class.");
	java.lang.System.out.println("groupId:"+this.groupId);
	java.lang.System.out.println("sqlId:"+this.sqlId);
	java.lang.System.out.println("sql:"+this.sql);
	java.lang.System.out.println("params:"+JSON.stringify(this.params));
	java.lang.System.out.println("jdbcResourceName:"+this.jdbcResourceName);
	java.lang.System.out.println("count:"+this.count);
	return this;
};
Mail.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Mail class.");
	java.lang.System.out.println("groupId:"+this.groupId);
	java.lang.System.out.println("mailId:"+this.mailId);
	java.lang.System.out.println("params:"+JSON.stringify(this.params));
	return this;
};
Master.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Master class.");
	java.lang.System.out.println("masterId:"+this.masterId);
	java.lang.System.out.println("records:"+JSON.stringify(this._array));
	return this;
};
Record.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Record class.");
	java.lang.System.out.println("records:"+JSON.stringify(this._array));
	return this;
};
Rule.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Rule class.");
	java.lang.System.out.println("ruleCode:"+this.ruleCode);
	java.lang.System.out.println("params:"+JSON.stringify(this.params));
	java.lang.System.out.println("ruleDate:"+this.ruleDate);
	java.lang.System.out.println("records:"+JSON.stringify(this._array));
	return this;
};
Select.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Select class.");
	java.lang.System.out.println("groupId:"+this.groupId);
	java.lang.System.out.println("sqlId:"+this.sqlId);
	java.lang.System.out.println("sql:"+this.sql);
	java.lang.System.out.println("params:"+JSON.stringify(this.params));
	java.lang.System.out.println("jdbcResourceName:"+this.jdbcResourceName);
	java.lang.System.out.println("records:"+JSON.stringify(this._array));
	return this;
};
Alert.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Alert class.");
	java.lang.System.out.println("object:"+JSON.stringify(this._object));
	return this;
};
Download.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Download class.");
	java.lang.System.out.println("object:"+JSON.stringify(this._object));
	return this;
};
Event.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Event class.");
	java.lang.System.out.println("eventId:"+this.eventId);
	java.lang.System.out.println("params:"+JSON.stringify(this.params));
	java.lang.System.out.println("result:"+JSON.stringify(this._array));
	return this;
};
Result.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Result class.");
	java.lang.System.out.println("result:"+JSON.stringify(this._array));
	return this;
};
