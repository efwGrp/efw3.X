/**
 * The class to keep messages in server.
 * 
 * @author Chang Kejun
 */
var EfwServerMessages = function() {
};
EfwServerMessages.prototype = {
	NumberType : "numbers",
	DateType : "dates",
	StringType : "strings",
	SessionTimeoutException : "Now in session timeout. Please log in again.",
	NumberIsReuqiredMessage : "Please enter {display-name} correctly in numbers.",
	DateIsReuqiredMessage : "Please enter {display-name} correctly in dates.",
	IsRequiredMessage : "Please enter {display-name}.",
	MaxLengthOverMessage : "Please enter {display-name} in strings less than {max-length} bytes.",
	MinOrMaxOverMessage : "Please enter {display-name} in {data-type}, more than {min} and less than {max}.",
	MinOverMessage : "Please enter {display-name} in {data-type}, more than {min}.",
	MaxOverMessage : "Please enter {display-name} in {data-type}, less than {max}.",
	NotAcceptMessage : "Please select a correct file in {display-name}.",
	EventDisableMessage : "The event is disable temporarily.\n\neventId={eventId}",
};
/*
EfwServerMessages.prototype = {
		NumberType : "数字",
		DateType : "日付",
		StringType : "文字",
		SessionTimeoutException : "セッションタイムアウトになりました。再ログインしてください。",
		NumberIsReuqiredMessage : "{display-name}を数字で正しく入力してください。",
		DateIsReuqiredMessage : "{display-name}を日付で正しく入力してください。",
		IsRequiredMessage : "{display-name}を入力してください。",
		MaxLengthOverMessage : "{display-name}を{max-length}文字以内で入力してください。",
		MinOrMaxOverMessage : "{display-name}を{min}以上{max}以内の{data-type}で入力してください。",
		MinOverMessage : "{display-name}を{min}以上の{data-type}で入力してください。",
		MaxOverMessage : "{display-name}を{max}以内の{data-type}で入力してください。",
		NotAcceptMessage : "{display-name}に正しいファイルを選択してください。",
		EventDisableMessage : "該当イベントは一時無効に設定されました。\n\neventId={eventId}",
	};
*/