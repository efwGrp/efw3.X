/**** efw3.X Copyright 2016 efwGrp ****/
package chart.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;
/**
 * ElFinderタグを処理するクラス。
 * <efw:ElFinder home="" readonly="" lang="" height="" width=""/>
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
public class Chart extends TagSupport implements DynamicAttributes {
	
	/**
	 */
	private String id="chart";
	private String type="column";
	private String height="400";
	private String width="auto";
	private String data="";
	private HashMap<String, String> attrs=new HashMap<String, String>();

	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag(){
		id=this.getId();
		JspWriter out;
		try {
			out = pageContext.getOut();
			String temp="";
			for(Map.Entry<String, String> e : attrs.entrySet()) {
				temp+=e.getKey()+"=\""+e.getValue()+"\" ";
			}
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"chart/googlechart4efw.js\"></script>");
			out.print("<iframe id=\"iframe_"+id+"\" name=\"iframe_"+id+"\" frameborder=\"0\" style=\"width:"+width+";height:"+height+";\" "+temp+"></iframe>");
			out.print("<script>"
					+ "var "+id+";"
					+ "$(function(){"+id+"=new EfwClientChart(\""+id+"\",\""+data+"\",\""+type+"\");"+id+".draw();});</script>");
		} catch (IOException e) {
			e.printStackTrace();
		}
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
			this.setId(id);
		}else if(name.equalsIgnoreCase("type")){
			type=(String) value;
		}else if(name.equalsIgnoreCase("height")){
			height=(String) value;
		}else if(name.equalsIgnoreCase("width")){
			width=(String) value;
		}else if(name.equalsIgnoreCase("data")){
			data=(String) value;
		}else{
			attrs.put(name, (String)value);
		}
	}

}
