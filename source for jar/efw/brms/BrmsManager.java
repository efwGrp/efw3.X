package efw.brms;

import java.util.Iterator;
import java.util.Map;

import com.innoexpert.innorulesj.batch.initializer.ModuleInitializer;
import com.innoexpert.rulesclient.ConnectionProperties;
import com.innoexpert.rulesclient.Constants;
import com.innoexpert.rulesclient.ItemValue;
import com.innoexpert.rulesclient.ResultSet;
import com.innoexpert.rulesclient.RuleReq;
import com.innoexpert.rulesclient.RulesException;
import com.innoexpert.rulesclient.RulesInterface;

import efw.properties.PropertiesManager;

import java.util.Map.Entry;

/**
 *ルールエンジンに対する操作を行うクラス。
 * @author he.lin & tian.liang
 */
public class BrmsManager {
	/**
	 * 「ID」の定数。
	 */
	private static final String CODETYPE_ID="ID";
	/**
	 * 「NAME」の定数。
	 */
	private static final String CODETYPE_NAME="NAME";
	/**
	 * 「ALIAS」の定数。
	 */
	private static final String CODETYPE_ALIAS="ALIAS";

	/**
	 * ルールの識別子のタイプ。
	 * サーブレットから渡される。
	 */
	private static int iRuleCodeType;
    /**
     * サーブレットから設定情報を受け取る。
     * @param codeType　ルールの識別子のタイプ。
     */
	public static synchronized void init(){
		// プロパティ ファイルから、codeTypeを取得する。
		String codeType = PropertiesManager.getProperty(PropertiesManager.EFW_BRMS_CODETYPE,CODETYPE_NAME);
		int iRuleCodeType=0;
		if (codeType.equals(CODETYPE_ID))
			iRuleCodeType = Constants.CODETYPE_ID;
		else if (codeType.equals(CODETYPE_NAME))
			iRuleCodeType = Constants.CODETYPE_NAME;
		else if (codeType.equals(CODETYPE_ALIAS))
			iRuleCodeType = Constants.CODETYPE_ALIAS;
		BrmsManager.iRuleCodeType=iRuleCodeType;
	}
	/***
	 * バッチからルールを実行する前
	 * @throws Exception
	 */
	public static synchronized void initFromBatch() throws Exception{
		try{
			// プロパティ ファイルから、codeTypeを取得する。
			String codeType = PropertiesManager.getProperty(PropertiesManager.EFW_BRMS_CODETYPE,CODETYPE_NAME);
			int iRuleCodeType=0;
			if (codeType.equals(CODETYPE_ID))
				iRuleCodeType = Constants.CODETYPE_ID;
			else if (codeType.equals(CODETYPE_NAME))
				iRuleCodeType = Constants.CODETYPE_NAME;
			else if (codeType.equals(CODETYPE_ALIAS))
				iRuleCodeType = Constants.CODETYPE_ALIAS;
			BrmsManager.iRuleCodeType=iRuleCodeType;
			ModuleInitializer.initialize("innorules");
		}catch(Exception e){
			e.printStackTrace();
			throw e;
		}
	}
	/***
	 * バッチからルールを実行完了後
	 */
	public static synchronized void destroyFromBatch(){
		ModuleInitializer.destroy();
	}
	/**
	 * ルール呼び出し
	 * @param ruleIndentifier ルールの識別子
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)
	 * @param params ルール呼び出しパラメーター
	 * @return ルール実行結果
	 * @throws RulesException ルール実行エラー
	 */
	public static ResultSet execute(String ruleIndentifier, String ruleDate, Map<String, Object> params) throws RulesException {
		try {
			RuleReq req = new RuleReq();
			req.setRuleCode(ruleIndentifier);
			req.setDate(ruleDate);
			req.resetItems();
			Iterator<Entry<String, Object>> it = params.entrySet().iterator();
			while(it.hasNext()){
				Entry<String,Object> entry = (Entry<String,Object>)it.next();
				ItemValue item = new ItemValue();
				item.setCode(entry.getKey().toString());
				if(entry.getValue() instanceof String){
					item.addStrValue((String) entry.getValue());
				}
				if(entry.getValue() instanceof Double){
					item.addNumValue((Double) entry.getValue());
				}
				req.addItem(item);
			}
			RulesInterface intf = null;
			intf = ConnectionProperties.getConnection();
			ResultSet rs = null;
			try {
				rs = intf.execute(req, iRuleCodeType);
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