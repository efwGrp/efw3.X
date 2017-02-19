//Efw adds setWidth setHeight setMode
CKEDITOR.editor.prototype._setReadOnly=CKEDITOR.editor.prototype.setReadOnly;
CKEDITOR.editor.prototype.setReadOnly=function(readonly){
	this.config.readOnly=readonly;
	this._setReadOnly(readonly);
};
CKEDITOR.editor.prototype.setWidth=function(width){
	this.config.width=width;
	this.resize(this.config.width,this.config.height);
};
CKEDITOR.editor.prototype.setHeight=function(height){
	this.config.height=height;
	this.resize(this.config.width,this.config.height);
};
CKEDITOR.editor.prototype.basicPattern={
	toolbarGroups:[{name:"document",groups:["mode","document","doctools"]},{name:"clipboard",groups:["clipboard","undo"]},{name:"editing",groups:["find","selection","spellchecker","editing"]},{name:"forms",groups:["forms"]},{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list","indent","blocks","align","bidi","paragraph"]},{name:"links",groups:["links"]},{name:"insert",groups:["insert"]},{name:"styles",groups:["styles"]},{name:"colors",groups:["colors"]},{name:"tools",groups:["tools"]},{name:"others",groups:["others"]},{name:"about",groups:["about"]}],
	removeButtons:"Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Redo,Undo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Maximize,ShowBlocks,BGColor,TextColor,Styles,Format,Font,FontSize,Iframe,PageBreak,SpecialChar,Smiley,HorizontalRule,Table,Image,Flash,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CreateDiv,Blockquote,CopyFormatting,Underline,Strike,Subscript,Superscript,RemoveFormat",
};
CKEDITOR.editor.prototype.standardPattern={
	toolbarGroups:[{name:"clipboard",groups:["clipboard","undo"]},{name:"editing",groups:["find","selection","spellchecker","editing"]},{name:"links",groups:["links"]},{name:"insert",groups:["insert"]},{name:"tools",groups:["tools"]},{name:"document",groups:["mode","document","doctools"]},"/",{name:"forms",groups:["forms"]},{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list","indent","blocks","align","bidi","paragraph"]},{name:"styles",groups:["styles"]},{name:"colors",groups:["colors"]},{name:"others",groups:["others"]},{name:"about",groups:["about"]}],
	removeButtons:"Save,NewPage,Preview,Print,Templates,SelectAll,Replace,Find,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Underline,Subscript,Superscript,CopyFormatting,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Font,FontSize,TextColor,BGColor",
};
CKEDITOR.editor.prototype.setPattern=function(pattern){
	this.destroy();
	if (pattern=="basic"){
		this.config.toolbarGroups=CKEDITOR.editor.prototype.basicPattern.toolbarGroups;			
		this.config.removeButtons=CKEDITOR.editor.prototype.basicPattern.removeButtons;			
	}else if (pattern=="standard"){
		this.config.toolbarGroups=CKEDITOR.editor.prototype.standardPattern.toolbarGroups;			
		this.config.removeButtons=CKEDITOR.editor.prototype.standardPattern.removeButtons;			
	}else{
		this.config.toolbarGroups=null;
		this.config.removeButtons=null;
	}
	var replacedTextareaId=this.replacedTextareaId;
	var instance=CKEDITOR.replace(replacedTextareaId,this.config);
	instance.on("change",function(){$("#"+replacedTextareaId+"").val(this.getData());});
	instance.replacedTextareaId=replacedTextareaId;
	window[replacedTextareaId]=instance;
};