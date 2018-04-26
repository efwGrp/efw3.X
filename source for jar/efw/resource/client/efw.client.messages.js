/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * The class to keep messages in client.
 * 
 * @author Chang Kejun
 */
var EfwClientMessages = function() {
};
EfwClientMessages.prototype = {
	OtherErrorException : "予想外エラーが発生しました。",
	CommunicationErrorException : "通信エラーが発生しました。リトライしますか。",
	RuntimeErrorException : "実行時エラーが発生しました。\n\neventId={eventId}\nmessage={message}",
	ParamsFormatErrorException : "イベントのパラメータ定義は正しくありません。\n\neventId={eventId}",
	ResultValuesErrorException : "描画用のデータは正しくありません。\n\neventId={eventId}",
	ResultActionsErrorException : "動作用のデータは正しくありません。\n\neventId={eventId}",
	SuccessCallbackErrorException : "成功時コールバックは正しくありません。\n\neventId={eventId}",
};
