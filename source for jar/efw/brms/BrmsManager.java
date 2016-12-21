/**** efw3.X Copyright 2016 efwGrp ****/
package efw.brms;

import java.util.Iterator;
import java.util.Map;

import com.innoexpert.rulesclient.ClusterManager;
import com.innoexpert.rulesclient.Constants;
import com.innoexpert.rulesclient.ResultSet;
import com.innoexpert.rulesclient.RuleInterface;
import com.innoexpert.rulesclient.RuleReq;
import com.innoexpert.rulesclient.RulesException;

import java.util.Map.Entry;

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
//			ModuleInitializer.initialize("innorules");
		}catch(Exception e){
			e.printStackTrace();
			throw e;
		}
	}
	/***
	 * バッチからルールを実行完了後
	 */
	public static synchronized void destroyFromBatch(){
	//	ModuleInitializer.destroy();
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
	private static ResultSet execute(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params) throws RulesException {
		try {
			RuleReq req = new RuleReq();
			req.setRuleCode(ruleIndentifier);
			req.setDate(ruleDate);
			req.resetItems();
			Iterator<Entry<String, Object>> it = params.entrySet().iterator();
			while(it.hasNext()){
				Entry<String,Object> entry = (Entry<String,Object>)it.next();
				if(entry.getValue() instanceof String){
					req.addStringItem(entry.getKey().toString()).add((String) entry.getValue());
				}
				if(entry.getValue() instanceof Double){
					req.addNumberItem(entry.getKey().toString()).add((Double) entry.getValue());
				}
			}
			RuleInterface intf = ClusterManager.getInterface();
			ResultSet rs = null;
			try {
				rs = intf.execute(req, codeType);//Constants.CODETYPE_ALIAS
			} finally {
				intf.close();
			}
			return rs;
		} catch (RulesException re) {
			re.printStackTrace();
			throw re;
		}
	}
}