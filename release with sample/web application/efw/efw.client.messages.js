/**
 * The class to keep messages in client.
 * 
 * @author Chang Kejun
 */
var EfwClientMessages = function() {
};
EfwClientMessages.prototype = {
	OtherErrorException : "Unexpected error has occurred.",
	CommunicationErrorException : "Communication error has occurred.\n\neventId={eventId}",
	RuntimeErrorException : "Run-time error has occurred.\n\neventId={eventId}\nmessage={message}",
	ParamsFormatErrorException : "The paramsFormat is not correct.\n\neventId={eventId}",
	ResultValuesErrorException : "The result values are not correct.\n\neventId={eventId}",
	ResultActionsErrorException : "The result actions are not correct.\n\neventId={eventId}",
	SuccessCallbackErrorException : "The success callback is not correct.\n\neventId={eventId}",
};
/*
EfwClientMessages.prototype = {
	OtherErrorException : "予想外エラーが発生しました。",
	CommunicationErrorException : "通信エラーが発生しました。\n\neventId={eventId}",
	RuntimeErrorException : "実行時エラーが発生しました。\n\neventId={eventId}\nmessage={message}",
	ParamsFormatErrorException : "イベントのパラメータ定義は正しくありません。\n\neventId={eventId}",
	ResultValuesErrorException : "描画用のデータは正しくありません。\n\neventId={eventId}",
	ResultActionsErrorException : "動作用のデータは正しくありません。\n\neventId={eventId}",
	SuccessCallbackErrorException : "成功時コールバックは正しくありません。\n\neventId={eventId}",
};
*/