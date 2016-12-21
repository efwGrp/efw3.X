/**** efw3.X Copyright 2016 efwGrp ****/
package efw.db;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Date;
import java.util.Map;

import efw.efwException;
import efw.log.LogManager;
import efw.sql.Sql;
import efw.sql.SqlManager;

/**
 * データーベースに対する操作を行うクラス。
 * @author Chang Kejun
 */
public final class Database {
	/**
	 * データベースの接続。
	 */
	private Connection mConn;
	/**
	 * SQL実行するステートメントを格納する配列。
	 */
	private ArrayList<CallableStatement> mStmtAry;
	/**
	 * DatabaseManagerのopenにより初期化される。直接新規作成をしない。
	 * @param mConn データベース接続。
	 * @throws SQLException データベースアクセスエラー。
	 */
    protected Database(Connection mConn) throws SQLException {
    	this.mConn=mConn;
    	this.mConn.setAutoCommit(false);
    	mStmtAry=new ArrayList<CallableStatement>();
    }
    /**
     * 単一の ResultSetオブジェクトを返すSqlを実行する。
     * 
     * @param groupId　Sqlを外部化するXMLのファイル名（拡張子を除く）。
     * @param sqlId SqlXMLファイルのsqlタグに定義されるId。
     * @param params　Sqlに利用される引数を格納するマップ。
     * @return　指定されたクエリーによって作成されたデータを含む ResultSet オブジェクト。null にはならない。
     * @throws efwException フレームワークの実行時エラー。
     * @throws SQLException データベースアクセスエラー。
     */
    public ResultSet executeQuery(String groupId,String sqlId,Map<String,Object> params) throws efwException, SQLException{
    	try{
    		Sql sql=SqlManager.get(groupId, sqlId);
    		String sqlString=sql.getSqlString(params);
    		ArrayList<Object> sqlParams=sql.getSqlParams(params);
    		
    	    LogManager.CommDebug("sql =" , sqlString);
    	    CallableStatement mStmt = mConn.prepareCall(sqlString);
    	    mStmtAry.add(mStmt);
    	    setSQLParams(mStmt, sqlParams);
    	    ResultSet rs = mStmt.executeQuery();
    	    LogManager.CommDebug("Database.executeQuery");
    	    return rs;
    	}catch(efwException e){
    		throw e;
    	}catch(SQLException e){
    		throw e;
    	}
	}
    /**
     * クエリを閉じる
     * 必ず必要ではない。データベースを閉じる際、クエリは閉じられる。
     * ただし、大量クエリ（数百回）が発生する場合、リソースのためクエリを閉じる必要。
     * @throws SQLException データベースアクセスエラー。
     */
    public void closeQuery() throws SQLException{
        try{
             if (!mConn.isClosed()) {
                 if (null != mStmtAry) {
                     if (mStmtAry.size() > 0) {
                    	 CallableStatement mStmt = mStmtAry.get(mStmtAry.size()-1);
                         mStmt.close();
                         mStmtAry.remove(mStmtAry.size()-1);
                     }
                 }
             }
        }catch(SQLException e){
           throw e;
        }
     }    
    /**
     * INSERT文、UPDATE文、DELETE文を実行する。
     * @param groupId　Sqlを外部化するXMLのファイル名（拡張子を除く）。
     * @param sqlId SqlXMLファイルのsqlタグに定義されるId。
     * @param params　Sqlに利用される引数を格納するマップ。
     * @return　実行された行数を戻す。 
     * @throws efwException フレームワークの実行時エラー。
     * @throws SQLException データベースアクセスエラー。
     */
    public int executeUpdate(String groupId,String sqlId,Map<String,Object> params) throws efwException, SQLException{
    	CallableStatement mStmt=null;
    	try{
        	Sql sql=SqlManager.get(groupId, sqlId);
        	String sqlString=sql.getSqlString(params);
        	ArrayList<Object> sqlParams=sql.getSqlParams(params);
        	
            LogManager.CommDebug("sql =" , sqlString);
            mStmt = mConn.prepareCall(sqlString);
            setSQLParams(mStmt, sqlParams);
            int cnt = mStmt.executeUpdate();
            LogManager.CommDebug("Database.executeUpdate　cnt="+cnt);
            
            return cnt;
    	}catch(efwException e){
    		throw e;
    	}catch(SQLException e){
    		throw e;
    	}finally{
    		if(mStmt!=null)mStmt.close();
    	}
    }
    /**
     * 任意のSQL文を実行する。
     * @param groupId　Sqlを外部化するXMLのファイル名（拡張子を除く）。
     * @param sqlId SqlXMLファイルのsqlタグに定義されるId。
     * @param params　Sqlに利用される引数を格納するマップ。
     * @throws efwException フレームワークの実行時エラー。
     * @throws SQLException データベースアクセスエラー。
     */
    public void execute(String groupId,String sqlId,Map<String,Object> params) throws efwException, SQLException{
    	CallableStatement mStmt=null;
    	try{
        	Sql sql=SqlManager.get(groupId, sqlId);
        	String sqlString=sql.getSqlString(params);
        	ArrayList<Object> sqlParams=sql.getSqlParams(params);
            LogManager.CommDebug("sql =" , sqlString);
            mStmt = mConn.prepareCall(sqlString);
            setSQLParams(mStmt, sqlParams);
            mStmt.execute();
            LogManager.CommDebug("Database.execute");
    	}catch(efwException e){
    		throw e;
    	}catch(SQLException e){
    		throw e;
    	}finally{
    		if(mStmt!=null)mStmt.close();
    	}
    }
    /**
     * データベースへの更新を無効とし、 データベース接続が保持するデータベースロックをすべて解除する。
     * @throws SQLException データベースアクセスエラー。
     */
    public void rollback() throws SQLException{
    	try{
            if (null != mConn) {
                if (!mConn.isClosed()) {
                    mConn.rollback();
                }
            }
    	}catch(SQLException e){
    		throw e;
    	}
    }
    /**
     * データベースへの更新を有効とし、 データベース接続が保持するデータベースロックをすべて解除する。
     * @throws SQLException データベースアクセスエラー。
     */
    public void commit() throws SQLException{
    	try{
            if (null != mConn) {
                if (!mConn.isClosed()) {
                    mConn.commit();
                }
            }
    	}catch(SQLException e){
    		throw e;
    	}
    }
    /**
     * ステートメントを全部閉じて、データベース接続をコミットして、閉じる。
     * @throws SQLException データベースアクセスエラー。
     */
    public void close() throws SQLException{
    	try{
            if (!mConn.isClosed()) {
                if (null != mStmtAry) {
                    CallableStatement mStmt = null;
                    for (int i=0; i<mStmtAry.size(); i++) {
                        mStmt = mStmtAry.get(i);
                        mStmt.close();
                    }
                    while (mStmtAry.size() > 0) {
                        mStmtAry.remove(0);
                    }
                    mConn.commit();
                }
                mConn.close();
            }
    	}catch(SQLException e){
    		throw e;
    	}
    }
    /**
     * Sqlパラメータを配列から設定する。
     * @param mStmt ステートメント。
     * @param prms 配列に格納するパラメータ。
     * @throws SQLException データベースアクセスエラー。
     */
    private void setSQLParams(CallableStatement mStmt, ArrayList<Object> prms) throws SQLException {
        if (null != prms) {
        	StringBuffer bf=new StringBuffer();
            for (int i=0; i<prms.size(); i++) {
            	if (i>0)bf.append(",");
            	Object vl=prms.get(i);
            	if(vl!=null){
            		if("java.sql.Date".equals(vl.getClass().getName())){
                        mStmt.setDate(i+1, (Date)vl);
            		}else{
                        mStmt.setObject(i+1, vl);
            		}
            	}else{
                    mStmt.setObject(i+1, vl);
            	}
            	bf.append(vl);
            }
            LogManager.CommDebug("params = " , bf.toString());
        }
    }
    
    
    /**
     * 単一の ResultSetオブジェクトを返すSqlを直接実行する。
     * 
     * @param sql　実行されるsql。
     * @return　指定されたクエリーによって作成されたデータを含む ResultSet オブジェクト。null にはならない。
     * @throws SQLException データベースアクセスエラー。
     */
    public ResultSet executeQuerySql(String sql) throws SQLException{
    	try{
    	    LogManager.CommDebug("sql =" , sql);
    	    CallableStatement mStmt = mConn.prepareCall(sql);
    	    mStmtAry.add(mStmt);
    	    ResultSet rs = mStmt.executeQuery();
    	    LogManager.CommDebug("Database.executeQuery");
    	    return rs;
    	}catch(SQLException e){
    		throw e;
    	}
	}
    /**
     * INSERT文、UPDATE文、DELETE文を直接実行する。
     * @param sql　実行されるsql。
     * @return　実行された行数を戻す。 
     * @throws SQLException データベースアクセスエラー。
     */
    public int executeUpdateSql(String sql) throws SQLException{
    	CallableStatement mStmt=null;
    	try{
            LogManager.CommDebug("sql =" , sql);
            mStmt = mConn.prepareCall(sql);
            int cnt = mStmt.executeUpdate();
            LogManager.CommDebug("Database.executeUpdate");
            
            return cnt;
    	}catch(SQLException e){
    		throw e;
    	}finally{
    		if(mStmt!=null)mStmt.close();
    	}
    }
    /**
     * 任意のSQL文を直接実行する。
     * @param groupId　Sqlを外部化するXMLのファイル名（拡張子を除く）。
     * @param sqlId SqlXMLファイルのsqlタグに定義されるId。
     * @param params　Sqlに利用される引数を格納するマップ。
     * @throws efwException フレームワークの実行時エラー。
     * @throws SQLException データベースアクセスエラー。
     */
    public void executeSql(String sql) throws SQLException{
    	CallableStatement mStmt=null;
    	try{
            LogManager.CommDebug("sql =" , sql);
            mStmt = mConn.prepareCall(sql);
            mStmt.execute();
            LogManager.CommDebug("Database.execute");
    	}catch(SQLException e){
    		throw e;
    	}finally{
    		if(mStmt!=null)mStmt.close();
    	}
    }    
}
