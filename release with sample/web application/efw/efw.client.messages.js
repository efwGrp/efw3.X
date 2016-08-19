/**
 * The class to keep messages in client.
 * 
 * @author Chang Kejun
 */
var EfwClientMessages = function() {
};
EfwClientMessages.prototype = {
	OtherErrorException : "予想外エラーが発生しました。",
	CanNotContinueMessage : "継続処理はできません。",
	ParamsFormatErrorException : "イベントのパラメーター定義は正しくありません。",
	ShowValuesErrorException : "描画用のデータは正しくありません。",
	SuccessCallbackErrorException : "成功時コールバックは正しくありません。",
	ReturnIsNotArrayErrorException : "サーバー処理の戻り値は配列ではありません。",
	EventDisableException : "該当イベントは一時無効に設定されました。",
};

