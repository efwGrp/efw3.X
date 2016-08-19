package efw.sql;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import efw.efwException;
/**
 * Sql外部化XMLファイルを管理するクラス。
 * @author Chang Kejun
 *
 */
public final class SqlManager {
	/**
	 * Sqlを外部化するXMLファイルの格納パス。
	 * サーブレットから渡される。
	 */
    private static String sqlFolder;
    /**
     * デバッグモードを制御するフラグ。
	 * サーブレットから渡される。
     */
    private static boolean isDebug;
    /**
     * サーブレットから設定情報を受け取り、Sql外部化XMLファイルをロードする。
     * @param sqlFolder　Sql外部化XMLファイルの格納パス。
     * @param isDebug　デバッグモード制御フラグ。
     * @throws efwException　Sql外部化XMLファイルの読み取りエラー。
     */
	public synchronized static void init(String sqlFolder,boolean isDebug) throws efwException{
		SqlManager.sqlFolder=sqlFolder;
		SqlManager.isDebug=isDebug;
		
    	//keep the Sqls folder in local param.
    	//seek xml in the folder
		File dir = new File(SqlManager.sqlFolder);
		File[] files = dir.listFiles(
			new FilenameFilter() {  
				public boolean accept(File file, String name) {  
					boolean ret = name.endsWith(".xml");   
					return ret;  
				}
			}
		);
		for (File fl:files){
			//the file name is group id
			String fileName=fl.getName();
		    String groupId=fileName.substring(0, fileName.lastIndexOf("."));
			//load it to local param aryData
			load(groupId);
		}
	}
	/**
	 * ひとつのSqlオブジェクトを取得する。
	 * デバッグモードの場合、最終更新日時により再ロードするか否か判断する。
	 * 通常モードの場合、予めロード済みデータから、Sqlオブジェクトを探す。
	 * @param groupId Sql外部化XMLファイルのファイル名（拡張子を除く）。
	 * @param sqlId　sqlタグに定義するid。
	 * @return　Sqlオブジェクト。
	 * @throws efwException　Sql外部化XMLファイルの定義エラーか、存在しないエラーか。
	 */
	public static synchronized Sql get(String groupId,String sqlId) throws efwException{
		//if it is debug mode,check the updating and reload xml if it is needed.
		if (SqlManager.isDebug){
			if(checkModifyTime(groupId)){
				groups.remove(groupId);
				load(groupId);
			}
		}
		//get group
		HashMap<String,Sql> group=groups.get(groupId);
		//if group is not exists, it is wrong group id
		if (group==null){
			throw new efwException(efwException.SqlGroupIdIsNotExistsException,groupId);
		}else{
			//get sql
			Sql sql=group.get(sqlId);
			//if sql is not exists, it is wrong sql id
			if(sql==null){
				throw new efwException(efwException.SqlIdIsNotExistsException,sqlId);
			}else{
				return sql;
			}
		}
	}
	/**
	 * 予めロード済みデータのSqlオブジェクトの最終更新日時は、実ファイルと同じか否かをチェックする。
	 * @param groupId Sql外部化XMLファイルのファイル名（拡張子を除く）。
	 * @return 最終更新日時が変更なしの場合 true　。
	 */
	private static synchronized boolean checkModifyTime(String groupId){
		HashMap<String,Sql> group=groups.get(groupId);
		if (group==null){
			return true;//xml file is not in memory,so it is need to reload
		}else{
			for(String key:group.keySet()){
				Sql sql=group.get(key);
				Date sqlLastModifytime=sql.getLastModifytime();
				Date fileLastModifytime = new Date(new File(SqlManager.sqlFolder+"/"+groupId+".xml").lastModified());
				if (!sqlLastModifytime.equals(fileLastModifytime)){
					return true;//xml file is modified, so it is need to reload
				}else{
					return false;//xml file is not modified
				}
			}
			return true;//sql is not exists ,so it is need to reload
		}
	}
	/**
	 * Sql外部化XMLファイルのファイル名によりロードする。
	 * @param groupId Sql外部化XMLファイルのファイル名（拡張子を除く）。
	 */
	///////////////////////////////////////////////////////////////////////////
	private static synchronized void load(String groupId) throws efwException{
		String filename=SqlManager.sqlFolder+"/"+groupId+".xml";
		File fl=new File(filename);
		Date lastModifytime=new Date(fl.lastModified());
		//add a new map by file name in aryData 
		groups.put(groupId,new HashMap<String,Sql>());
		//read xml to get Sqls 
		NodeList sqls;
		try {
			sqls = DocumentBuilderFactory.newInstance().newDocumentBuilder()
								.parse(fl)
								.getDocumentElement()
								.getElementsByTagName("sql");
		} catch (SAXException e) {
			throw new efwException(efwException.XMLFileIsNotLegalException,filename);
		} catch (IOException e) {
			throw new efwException(efwException.XMLFileIsNotLegalException,filename);
		} catch (ParserConfigurationException e) {
			throw new efwException(efwException.XMLFileIsNotLegalException,filename);
		}
		//get sql from element
		for(int i=0;i<sqls.getLength();i++){
			Node node = sqls.item(i);
			if (node.getNodeType() == Node.ELEMENT_NODE){
				Element element= (Element)node;
				String sqlId=element.getAttribute("id");
				if (groups.get(groupId).get(sqlId)==null){
					groups.get(groupId).put(sqlId, new Sql(element,lastModifytime));
				}else{
					throw new efwException(efwException.SqlIdIsDuplicateException,sqlId);
				}
			}
		}
	}
	/**
	 * ロードするSql外部化XMLファイルを格納するオブジェクト。
	 */
	private static HashMap<String,HashMap<String,Sql>> groups=new HashMap<String,HashMap<String,Sql>>();
}
