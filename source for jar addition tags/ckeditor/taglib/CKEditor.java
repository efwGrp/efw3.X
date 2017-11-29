/**** efw3.X Copyright 2016 efwGrp ****/
package ckeditor.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;
/**
 * Ckeditorタグを処理するクラス。
 * <efw:Ckeditor home="" readonly="" lang="" height="" width=""/>
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
public class CKEditor extends TagSupport implements DynamicAttributes {
	
	/**
	 */
	private String id="ckeditor";
	private boolean readonly=false;
	private String lang="";// "" ja zh-cn en
	private String height="400";
	private String width="800";
	private String pattern="standard";

	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag(){
		if (this.getId()!=null){
			id=this.getId();
		}
		JspWriter out;
		try {
			out = pageContext.getOut();
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"ckeditor/ckeditor.js\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"ckeditor/additions4efw.js\"></script>");
			out.print("<textarea id=\""+id+"\" ></textarea>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\">");
			out.print("var "+id+";");
			out.print("$(function(){"+id+"=CKEDITOR.replace(\""+id+"\",{");
			if (lang!=""){
				out.print("\"language\":\""+lang+"\",");
			}
			if (readonly){
				out.print("\"readOnly\":\"true\",");
			}
			out.print("\"width\":\""+width+"\",");
			out.print("\"height\":\""+height+"\",");
			out.print("\"resize_dir\":\"both\",");
			//out.print("\"autoUpdateElement\":true,");
			
			if(pattern=="basic"){
				out.print("\"toolbarGroups\":CKEDITOR.editor.prototype.basicPattern.toolbarGroups,");
				out.print("\"removeButtons\":CKEDITOR.editor.prototype.basicPattern.removeButtons,");
				//out.print("\"toolbarGroups\":[{name:\"document\",groups:[\"mode\",\"document\",\"doctools\"]},{name:\"clipboard\",groups:[\"clipboard\",\"undo\"]},{name:\"editing\",groups:[\"find\",\"selection\",\"spellchecker\",\"editing\"]},{name:\"forms\",groups:[\"forms\"]},{name:\"basicstyles\",groups:[\"basicstyles\",\"cleanup\"]},{name:\"paragraph\",groups:[\"list\",\"indent\",\"blocks\",\"align\",\"bidi\",\"paragraph\"]},{name:\"links\",groups:[\"links\"]},{name:\"insert\",groups:[\"insert\"]},{name:\"styles\",groups:[\"styles\"]},{name:\"colors\",groups:[\"colors\"]},{name:\"tools\",groups:[\"tools\"]},{name:\"others\",groups:[\"others\"]},{name:\"about\",groups:[\"about\"]}],");
				//out.print("\"removeButtons\":\"Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Redo,Undo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Maximize,ShowBlocks,BGColor,TextColor,Styles,Format,Font,FontSize,Iframe,PageBreak,SpecialChar,Smiley,HorizontalRule,Table,Image,Flash,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CreateDiv,Blockquote,CopyFormatting,Underline,Strike,Subscript,Superscript,RemoveFormat\",");
			}else if (pattern=="standard"){
				out.print("\"toolbarGroups\":CKEDITOR.editor.prototype.standardPattern.toolbarGroups,");
				out.print("\"removeButtons\":CKEDITOR.editor.prototype.standardPattern.removeButtons,");
				//out.print("\"toolbarGroups\":[{name:\"clipboard\",groups:[\"clipboard\",\"undo\"]},{name:\"editing\",groups:[\"find\",\"selection\",\"spellchecker\",\"editing\"]},{name:\"links\",groups:[\"links\"]},{name:\"insert\",groups:[\"insert\"]},{name:\"tools\",groups:[\"tools\"]},{name:\"document\",groups:[\"mode\",\"document\",\"doctools\"]},\"/\",{name:\"forms\",groups:[\"forms\"]},{name:\"basicstyles\",groups:[\"basicstyles\",\"cleanup\"]},{name:\"paragraph\",groups:[\"list\",\"indent\",\"blocks\",\"align\",\"bidi\",\"paragraph\"]},{name:\"styles\",groups:[\"styles\"]},{name:\"colors\",groups:[\"colors\"]},{name:\"others\",groups:[\"others\"]},{name:\"about\",groups:[\"about\"]}],");
				//out.print("\"removeButtons\":\"Save,NewPage,Preview,Print,Templates,SelectAll,Replace,Find,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Underline,Subscript,Superscript,CopyFormatting,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Font,FontSize,TextColor,BGColor\",");
			}else{
				out.print("\"toolbarGroups\":null,");
				out.print("\"removeButtons\":null,");
			}
			out.print("});");
			out.print(""+id+".on(\"change\",function(){$(\"#"+id+"\").val(this.getData());});");
			out.print(""+id+".replacedTextareaId=\""+id+"\";");
			out.print("});");
			out.print("</script>");
		} catch (IOException e) {
			e.printStackTrace();
		}
		//初期値を再設定する。
		id="ckeditor";
		readonly=false;
		lang="";
		height="400";
		width="800";
		pattern="standard";
		return SKIP_BODY;
	}

	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		if(name.equalsIgnoreCase("id")){
			id=(String) value;
		}else if(name.equalsIgnoreCase("lang")){
			lang=(String) value;
		}else if(name.equalsIgnoreCase("height")){
			height=(String) value;
		}else if(name.equalsIgnoreCase("width")){
			width=(String) value;
		}else if(name.equalsIgnoreCase("readonly")){
			if(((String) value).equalsIgnoreCase("true")){
				readonly=true;
			}
		}else if (name.equalsIgnoreCase("pattern")){
			pattern=(String) value;
		}
	}

}
