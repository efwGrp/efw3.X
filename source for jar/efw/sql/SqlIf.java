package efw.sql;

import java.io.StringWriter;

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
 * Sqlを外部化するXMLのifタグとマッピングし、1つの条件式を表すクラス。
 * @author Chang Kejun
 *
 */
final class SqlIf {
	/**
	 * ifタグから条件式オブジェクトを作成する。
	 * @param element Sql外部化XMLのifタグ。
	 * @throws efwException タグ不正のエラー。
	 */
	protected SqlIf(Element element) throws efwException{
		exists=element.getAttribute("exists");
		notExists=element.getAttribute("notexists");

		NodeList nodes=element.getChildNodes();
		for(int i=0;i<nodes.getLength();i++){
			Node node=nodes.item(i);
			if (node.getNodeType() == Node.TEXT_NODE){
				sqlText=new SqlText(node.getNodeValue());
			}
		}
		if ((Sql.isBlank(exists)&&Sql.isBlank(notExists))||
				(!Sql.isBlank(exists)&&!Sql.isBlank(notExists))){
			String information;
			try{
				StreamResult xmlOutput = new StreamResult(new StringWriter());
				Transformer transformer = TransformerFactory.newInstance().newTransformer();
				transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
				transformer.transform(new DOMSource(element), xmlOutput);
				information = xmlOutput.getWriter().toString();
			}catch(Exception e){
				information=e.getMessage();
			}
			throw new efwException(efwException.XMLTagIsNotLegalException,information);
		}
	}
	/**
	 * 存在と判断するパラメータのキー。
	 */
	private String exists;
	/**
	 * 存在と判断するパラメータのキーを取得する。
	 * @return パラメータのキー。
	 */
	protected String getExists() {
		return exists;
	}
	/**
	 * 存在しないと判断するパラメータのキー。
	 */
	private String notExists;
	/**
	 * 存在しないと判断するパラメータのキーを取得する。
	 * @return パラメータのキー。
	 */
	protected String getNotExists() {
		return notExists;
	}
	/**
	 * ifタグに囲まれるSql文部品。
	 */
	private SqlText sqlText;
	/**
	 * ifタグに囲まれるSql文部品を取得する。
	 * @return Sql文部品。
	 */
	protected SqlText getSqlText() {
		return sqlText;
	}
}
