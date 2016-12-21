/**** efw3.X Copyright 2016 efwGrp ****/
package efw.file;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import efw.efwServlet;
/**
 * アップロードとダウンロードファイルを管理するクラス。
 * @author Chang Kejun
 */
public final class FileManager {
	/**
	 * ファイルの格納パス。
	 * サーブレットから渡される。
	 */
    private static String storageFolder;
    /**
     * アップロード情報を格納するセッションキー
     */
    private static final String EFW_UPLOAD="EFW_UPLOAD";    
    
    /**
     * サーブレットから設定情報を受け取る。
     */
	public static synchronized void init(String storageFolder){
		FileManager.storageFolder=storageFolder;
	}
	/**
	 * ファイルの格納パスを取得する。
	 * @return　 ファイルの格納パス。
	 */
	public static String getStorageFolder(){
		return storageFolder;
	}
	/**
	 * 拡張子で指定相対パス内のファイル＆フォルダのリストを取得する
	 * @param path　ファイルの格納パスからの相対パス
	 * @param ext　拡張子
	 * @return　ファイルとサブフォルダのリスト
	 */
	public static File[] getListByExt(String path,String ext){
		File fl=get(path);
		ArrayList<File> temp=new ArrayList<File>();
		if(fl.exists()){//もしフォルダが存在する場合
			File[] files= fl.listFiles();
	 		for(int i=0;i<files.length;i++){
	 			if (files[i].getName().endsWith("."+ext)){
	 				temp.add(files[i]);
	 			}
	 		}
		}
 		File[] ret=new File[temp.size()];
 		for(int i=0;i<temp.size();i++){
 			ret[i]= temp.get(i);
 		}
		return ret;
	}
	public static File[] getListByExtByAbsolutePath(String absolutePath,String ext){
		File fl=new File(absolutePath);
		ArrayList<File> temp=new ArrayList<File>();
		if(fl.exists()){//もしフォルダが存在する場合
			File[] files= fl.listFiles();
	 		for(int i=0;i<files.length;i++){
	 			if (files[i].getName().endsWith("."+ext)){
	 				temp.add(files[i]);
	 			}
	 		}
		}
 		File[] ret=new File[temp.size()];
 		for(int i=0;i<temp.size();i++){
 			ret[i]= temp.get(i);
 		}
		return ret;
	}
	/**
	 * 指定相対パス内のファイル＆フォルダのリストを取得する
	 * @param path　ファイルの格納パスからの相対パス
	 * @return　ファイルとサブフォルダのリスト
	 */
	public static File[] getList(String path){
		File fl=get(path);
		return fl.listFiles();
	}
	public static File[] getListByAbsolutePath(String absolutePath){
		File fl=new File(absolutePath);
		return fl.listFiles();
	}
	public static File get(String path){
		if(path==null)path="";
		File fl=new File(storageFolder+"/"+path);
		return fl;
	}
	public static File getByAbsolutePath(String absolutePath){
		if(absolutePath==null)absolutePath="";
		File fl=new File(absolutePath);
		return fl;
	}
	
	public static long getFolderSize(File dir) {
	    long size = 0;
	    for (File file : dir.listFiles()) {
	        if (file.isFile()) {
	            System.out.println(file.getName() + " " + file.length());
	            size += file.length();
	        }
	        else
	            size += getFolderSize(file);
	    }
	    return size;
	}
	/**
	 * 
	 * @param path
	 */
	public static void remove(String path){
		_delete(get(path));
	}
    private static void _delete(File f){
        if(!f.exists()) return;	//ファイルまたはディレクトリが存在しない場合は何もしない
        else if(f.isFile()) f.delete();//ファイルの場合は削除する
        else if(f.isDirectory()){//ディレクトリの場合は、すべてのファイルを削除する
            File[] files = f.listFiles();//対象ディレクトリ内のファイルおよびディレクトリの一覧を取得
            for(int i=0; i<files.length; i++) FileManager._delete( files[i] );//ファイルおよびディレクトリをすべて削除  自身をコールし、再帰的に削除する
            f.delete();//自ディレクトリを削除する
        }
    }
    
    /**
	 * ファイルを圧縮する。
	 * @param filename 圧縮後のファイル名。
	 * @param paths 圧縮対象のファイル配列。
	 * @throws IOException ファイルアクセスエラー。
	 */
	public static void zip(String filename, String[] paths) throws IOException{
		ZipOutputStream zos = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream(get(filename))));
		try{
			_zip(zos,paths);
		}finally{
			zos.close();
		}
	}
	
	private static void _zip(ZipOutputStream zos,String[] paths) throws IOException {
		for (String path : paths) {
			File fl=get(path);
			if(fl.isDirectory()){
				File[] f = getList(path);
				String[] paths2=new String[f.length];
			    for(int i=0;i<f.length;i++){
			    	paths2[i] = path +"/" + f[i].getName();
			    }
			    _zip(zos,paths2);
			}else{
				byte[] buf = new byte[1024];
	            InputStream is = new BufferedInputStream(new FileInputStream(fl));
	            try{
		            zos.putNextEntry(new ZipEntry(path));
		            int len = 0;
		            while ((len = is.read(buf)) != -1) {
		            	zos.write(buf, 0, len);
		            }
		            zos.closeEntry();
	            }finally{
		            is.close();
	            }
			}
        }	
	}
////////////////////////////////////////////////////////////////
	/***
	 *　アップロードされたファイルを全部相対パスで保存する。
	 * @param path　スドレジからの相対パス
	 * @throws IOException 
	 */
	public static void saveUploadFiles(String path) throws IOException{
		if (path==null||"".equals(path)){
			path=storageFolder;
		}else{
			path=storageFolder+"/"+path;
		}
		File p=new File(path);
		if (!p.exists())p.mkdirs();
		
		@SuppressWarnings("unchecked")
		HashMap<String, String> map= (HashMap<String, String>)efwServlet.getRequest().getSession().getAttribute(EFW_UPLOAD);
		if (map==null){
			return;
		}else{
			for(HashMap.Entry<String, String> entry : map.entrySet()) {
				String srcPath=entry.getValue();
				String uploadFileName=entry.getKey();
				String destPath=path+"/"+uploadFileName.substring(uploadFileName.lastIndexOf("\\") + 1);
				@SuppressWarnings("resource")
				FileChannel srcChannel = new FileInputStream(srcPath).getChannel();
		        @SuppressWarnings("resource")
				FileChannel destChannel = new FileOutputStream(destPath).getChannel();
		        try {
		            srcChannel.transferTo(0, srcChannel.size(), destChannel);
		        } finally {
		            srcChannel.close();
		            destChannel.close();
		        }
		        new File(srcPath).delete();
			}
		}
		efwServlet.getRequest().getSession().removeAttribute(EFW_UPLOAD);
	}
	/***
	 * アップロードされて一時保存中のファイルを削除する。
	 */
	public static void removeUploadFiles(){
		@SuppressWarnings("unchecked")
		HashMap<String, String> map= (HashMap<String, String>)efwServlet.getRequest().getSession().getAttribute(EFW_UPLOAD);
		if (map==null){
			return;
		}else{
			for(HashMap.Entry<String, String> entry : map.entrySet()) {
				String srcPath=entry.getValue();
		        new File(srcPath).delete();
			}
		}
		efwServlet.getRequest().getSession().removeAttribute(EFW_UPLOAD);
	}
	
	/***
	 * アッポロードファイル名と一時ファイルパスをセッションに格納する
	 * @param uploadFileName　アッポロードファイル名（クライアントパスと名称）
	 * @param tempFileAbsolutePath　一時ファイルパス（サーバ絶対パスと名称）
	 */
	public static void keepUploadFile(String uploadFileName,String tempFileAbsolutePath){
		@SuppressWarnings("unchecked")
		HashMap<String, String> map= (HashMap<String, String>)uploadServlet.getRequest().getSession().getAttribute(EFW_UPLOAD);
		if (map==null){
			map=new HashMap<String, String>();
			uploadServlet.getRequest().getSession().setAttribute(EFW_UPLOAD,map);
		}
		String oldTempFileAbsolutePath=map.get(uploadFileName);
		if (oldTempFileAbsolutePath!=null) new File(oldTempFileAbsolutePath).delete();
		map.put(uploadFileName, tempFileAbsolutePath);
	}
}
