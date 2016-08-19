package efw.sql;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import efw.efwException;

/**
 * Sqlを外部化するXMLのsqlタグとマッピングし、1つのSqlを表すクラス。
 * @author Chang Kejun
 *
 */
public final class Sql {
	/**
	 * SqlタグからSqlオブジェクトを作成する。
	 * @param element　Sql外部化XMLのsqlタグ
	 * @param lastModifytime　最終更新日時
	 * @throws efwException　タグ不正のエラー。
	 */
	protected Sql(Element element,Date lastModifytime) throws efwException{
		String tmpParamPrefix=element.getAttribute("paramPrefix");
		//もしSQLに:がある場合、paramPrefixを別文字に設定するようにできる
		if(tmpParamPrefix!=null&&tmpParamPrefix.length()>0)paramPrefix=tmpParamPrefix;
		
		this.lastModifytime=lastModifytime;
		NodeList nodes=element.getChildNodes();
		for(int i=0;i<nodes.getLength();i++){
			Node node=nodes.item(i);
			if (node.getNodeType() == Node.ELEMENT_NODE){
				Element step= (Element)node;
				if (step.getTagName().equals("if")){
					steps.add(new SqlIf(step));
				}else{
					String information;
					try{
						StreamResult xmlOutput = new StreamResult(new StringWriter());
						Transformer transformer = TransformerFactory.newInstance().newTransformer();
						transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
						transformer.transform(new DOMSource(node), xmlOutput);
						information = xmlOutput.getWriter().toString();
					}catch(Exception e){
						information=e.getMessage();
					}
					throw new efwException(efwException.XMLTagIsNotLegalException,information);
				}
			}else if(node.getNodeType()==Node.TEXT_NODE){
				String step= node.getNodeValue();
				steps.add(new SqlText(step));
			}
		}
	}	
	/**
	 * Sqlにパラメータを識別するための頭文字
	 */
	private String paramPrefix=":";
	protected String getParamPrefix(){
		return paramPrefix;
	}
	
	/**
	 * 最終更新日時。
	 */
	private Date lastModifytime;
	protected Date getLastModifytime() {
		return lastModifytime;
	}
	/**
	 * 文字列Sql文を作成する。
	 * @param params Sqlパラメータのマップ。
	 * @return　文字列のSql文を返す。
	 */
	public String getSqlString(Map<String,Object> params){
		StringBuffer bf=new StringBuffer();
		for(int i=0;i<steps.size();i++){
			Object obj=steps.get(i);
			if (obj.getClass().getName().equals("efw.sql.SqlText")){
				SqlText sqltext=(SqlText)obj;
				bf.append(sqltext.getSQL(paramPrefix));
			}else if(obj.getClass().getName().equals("efw.sql.SqlIf")){
				SqlIf sqlif=(SqlIf)obj;
				SqlText sqltext=sqlif.getSqlText();
				if (!isBlank(sqlif.getExists())){
					if (!isBlank(params,sqlif.getExists())){
						bf.append(sqltext.getSQL(paramPrefix));
					}	
				}
				if (!isBlank(sqlif.getNotExists())){
					if (isBlank(params,sqlif.getNotExists())){
						bf.append(sqltext.getSQL(paramPrefix));
					}
				}
			}
		}
		return bf.toString();		
	}
	/**
	 * Sqlパラメータのマップから、Sql文にパラメータの順番により値の配列を作る。
	 * もし存在しないパラメータがあったら、nullを代入する。
	 * @param params Sqlパラメータのマップ。
	 * @return Sqlパラメータ値の配列。
	 */
	public ArrayList<Object> getSqlParams(Map<String,Object> params){
		ArrayList<String> paramKeys=new ArrayList<String>();
		
		for(int i=0;i<steps.size();i++){
			Object obj=steps.get(i);
			if (obj.getClass().getName().equals("efw.sql.SqlText")){
				SqlText sqltext=(SqlText)obj;
				paramKeys.addAll(sqltext.getParamKeys(paramPrefix));
			}else if(obj.getClass().getName().equals("efw.sql.SqlIf")){
				SqlIf sqlif=(SqlIf)obj;
				SqlText sqltext=sqlif.getSqlText();
				if (!isBlank(sqlif.getExists())){
					if (!isBlank(params,sqlif.getExists())){
						paramKeys.addAll(sqltext.getParamKeys(paramPrefix));
					}	
				}
				if (!isBlank(sqlif.getNotExists())){
					if (isBlank(params,sqlif.getNotExists())){
						paramKeys.addAll(sqltext.getParamKeys(paramPrefix));
					}
				}
			}
		}
		ArrayList<Object> ret=new ArrayList<Object>();
        for(int i=0;i<paramKeys.size();i++){
        	String key=paramKeys.get(i);
        	if (params.containsKey(key)){
        		ret.add(params.get(key));
        	}else{
        		ret.add(null);
        	}
        }
        
		return ret;
	}
	/**
	 * sqlタグの中に、ifタグにより、分割される部品を格納する。
	 */
	private ArrayList<Object> steps=new ArrayList<Object>();
	/**
	 * パラメータマップに指定キーのパラメータが空白か否か判断する。
	 * 指定キーのパラメータが存在しない場合、true。
	 * 指定キーのパラメータがnullの場合、true。
	 * 指摘キーのパラメータが""の場合、true。
	 * @param params　パラメータマップ。
	 * @param key　指定キー。
	 * @return　判断結果。
	 */
    private static boolean isBlank(Map<String,Object> params,String key){
    	if (isBlank(key)){
    		return true;
    	}else{
    		if (!params.containsKey(key)){
    			return true;
    		}else{
    			if (isBlank(params.get(key))){
    				return true;
    			}else{
    				return false;
    			}
    		}
    	}
    }
    /**
     * 指定値は空白か否か判断する。
     * nullの場合、true。
     * ""の場合、true。
     * @param value　指定値。
     * @return　判断結果。
     */
    protected static boolean isBlank(Object value){
    	if (value==null){
    		return true;
    	}else if("".equals(value)){
    		return true;
    	}else{
    		return false;
    	}
    }
}
