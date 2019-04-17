/**** efw3.X Copyright 2016 efwGrp ****/
package efw.brms;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

import com.innoexpert.rulesclient.ClusterManager;
import com.innoexpert.rulesclient.Constants;
import com.innoexpert.rulesclient.Item;
import com.innoexpert.rulesclient.ResultSet;
import com.innoexpert.rulesclient.RuleInterface;
import com.innoexpert.rulesclient.RuleReq;
import com.innoexpert.rulesclient.RulesException;
import com.innorules.rrt.InitializerHelper;

import efw.log.LogManager;
import efw.properties.PropertiesManager;

import java.util.Map.Entry;
import java.util.logging.Level;

/**
 *ルールエンジンに対する操作を行うクラス。For 7.1
 * @author he.lin & tian.liang
 */
public class BrmsManager {

	/***
	 * バッチからルールを実行する前
	 * @throws Exception
	 */
	public static synchronized void initFromBatch() throws Exception{
		try{
			// プロパティ ファイルから、codeTypeを取得する。
			InitializerHelper.initialize(PropertiesManager.prop);
		}catch(Exception e){
			e.printStackTrace();
			throw e;
		}
	}
	/***
	 * バッチからルールを実行完了後
	 */
	public static synchronized void destroyFromBatch(){
		InitializerHelper.cleanup();
	}
	/**
	 * IDでルール呼び出し
	 * @param ruleIndentifier ルールの識別子
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)
	 * @param params ルール呼び出しパラメーター
	 * @return ルール実行結果
	 * @throws RulesException ルール実行エラー
	 */
	public static ResultSet getRuleById(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws RulesException{
		//もし出力可能の場合、ログファイルに出力する。
		if (LogManager.logger.getLevel().intValue() <= Level.INFO.intValue()){
			LogManager.CommDebug("BrmsManager.getRuleById req = ",createRuleParamXml(Constants.CODETYPE_ID,ruleIndentifier,ruleDate,params));
		}
		return BrmsManager.execute(Constants.CODETYPE_ID,ruleIndentifier,ruleDate,params);
	}
	/**
	 * 名称でルール呼び出し
	 * @param ruleIndentifier ルールの識別子
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)
	 * @param params ルール呼び出しパラメーター
	 * @return ルール実行結果
	 * @throws RulesException ルール実行エラー
	 */
	public static ResultSet getRuleByName(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws RulesException{
		//もし出力可能の場合、ログファイルに出力する。
		if (LogManager.logger.getLevel().intValue() <= Level.INFO.intValue()){
			LogManager.CommDebug("BrmsManager.getRuleByName req = ",createRuleParamXml(Constants.CODETYPE_NAME,ruleIndentifier,ruleDate,params));
		}
		return BrmsManager.execute(Constants.CODETYPE_NAME,ruleIndentifier,ruleDate,params);
	}
	/**
	 * ALIASでルール呼び出し
	 * @param ruleIndentifier ルールの識別子
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)
	 * @param params ルール呼び出しパラメーター
	 * @return ルール実行結果
	 * @throws RulesException ルール実行エラー
	 */
	public static ResultSet getRuleByAlias(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws RulesException{
		//もし出力可能の場合、ログファイルに出力する。
		if (LogManager.logger.getLevel().intValue() <= Level.INFO.intValue()){
			LogManager.CommDebug("BrmsManager.getRuleByAlias req = ",createRuleParamXml(Constants.CODETYPE_ALIAS,ruleIndentifier,ruleDate,params));
		}
		return BrmsManager.execute(Constants.CODETYPE_ALIAS,ruleIndentifier,ruleDate,params);
	}
	/**
	 * ルール呼び出し
	 * @param codeType コードタイプ
	 * @param ruleIndentifier ルールの識別子
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)
	 * @param params ルール呼び出しパラメーター
	 * @return ルール実行結果
	 * @throws RulesException ルール実行エラー
	 */
	@SuppressWarnings("rawtypes")
	private static ResultSet execute(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params) throws RulesException {
		try {
			RuleReq req = new RuleReq();
			req.setRuleCode(ruleIndentifier);
			req.setDate(ruleDate);
			req.resetItems();
			Iterator<Entry<String, Object>> it = params.entrySet().iterator();
			while(it.hasNext()){
				Entry<String,Object> entry = (Entry<String,Object>)it.next();
				String key=entry.getKey().toString();
				Object value=entry.getValue();
				
				if (value==null){
					req.addStringItem(key).add(null);
				}else if(value instanceof String){
					req.addStringItem(key).add((String) value);
				}else if(value instanceof Double){
					req.addNumberItem(key).add((Double) value);
				}else if(value instanceof ArrayList){
					ArrayList ary=(ArrayList)value;
					Item item=null;
					for(int i=0;i<ary.size();i++){
						Object subValue=ary.get(i);
						if (i==0){
							if (subValue==null){
								item=req.addStringItem(key);
							}else if (subValue instanceof String){
								item=req.addStringItem(key);
							}else if(subValue instanceof Double){
								item=req.addNumberItem(key);
							}
						}
						if (subValue==null){
							item.add(null);
						}else if (subValue instanceof String){
							item.add((String)subValue);
						}else if(subValue instanceof Double){
							item.add((Double)subValue);
						}
						
					}
				}
			}
			RuleInterface intf = ClusterManager.getInterface();
			ResultSet rs = null;
			try {
				rs = intf.execute(req, codeType);
			} finally {
				intf.close();
			}
			return rs;
		} catch (RulesException re) {
			re.printStackTrace();
			throw re;
		}
	}
	

	/**
	 * XMLファイルを作成
	 * 
	 * @param codeType        コードタイプ
	 * @param ruleIndentifier ルールの識別子
	 * @param ruleDate		     ルール呼び出し基準日(yyyy-MM-dd)
	 * @param params          ルール呼び出しパラメーター
	 * @throws Exception 実行エラー
	 */
	@SuppressWarnings("rawtypes")
	private static String createRuleParamXml(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params){
		//-----------------------
		StringBuilder ret=new StringBuilder();
		ret.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		//-----------------------
		ret.append("<ruleparameter codetype=\"");
		if (codeType==Constants.CODETYPE_ID){
			ret.append("id");
		}else if (codeType==Constants.CODETYPE_NAME){
			ret.append("name");
		}else if (codeType==Constants.CODETYPE_ALIAS){
			ret.append("alias");
		}
		ret.append("\" date=\"");
		ret.append(ruleDate);
		ret.append("\">");
		//-----------------------
		ret.append("<rule code=\"");
		ret.append(ruleIndentifier);
		ret.append("\"/>");
		//-----------------------
		ret.append("<items>");
		//-----------------------
		Iterator<Entry<String, Object>> it = params.entrySet().iterator();
		while (it.hasNext()) {
			Entry<String, Object> entry = (Entry<String, Object>) it.next();
			String key = entry.getKey().toString();
			Object value = entry.getValue();
			ret.append("<item code=\"");
			ret.append(key);
			ret.append("\"");
			if (value == null) {
				ret.append("><value></value>");
			} else if (value instanceof String) {
				ret.append(" type=\"string\"><value>");
				ret.append(value);
				ret.append("</value>");
			} else if (value instanceof Double) {
				ret.append(" type=\"number\"><value>");
				ret.append(value);
				ret.append("</value>");
			} else if (value instanceof ArrayList) {
				ArrayList ary=(ArrayList)value;
				for(int i=0;i<ary.size();i++){
					Object subValue=ary.get(i);
					if (i==0){
						if (subValue==null){
							ret.append(">");
						}else if (subValue instanceof String){
							ret.append(" type=\"string\">");
						}else if(subValue instanceof Double){
							ret.append(" type=\"number\">");
						}
					}
					if (subValue==null){
						ret.append("<value></value>");
					}else if (subValue instanceof String){
						ret.append("<value>");
						ret.append(subValue);
						ret.append("</value>");
					}else if(subValue instanceof Double){
						ret.append("<value>");
						ret.append(subValue);
						ret.append("</value>");
					}
				}
			}
			ret.append("</item>");
		}		
		ret.append("</items></ruleparameter>");
		return ret.toString();
	}
}