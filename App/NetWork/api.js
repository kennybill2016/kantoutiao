
exports.HOME_PAGE = 'http://localhost:8887/content/getList.php?cid={0}&max_time={1}&min_time={2}&page={3}&deviceid={4}&tn=1&limit=8&user=temporary1493130412672&content_type=1&dtu=200';
exports.DETAIL_VIEW = 'http://localhost:8887/content/detail.php';
//home.kuaikanpian.com/content/getList.php
//fcdbd8ef62fc4ecbb2f592c9e79ac7f9
//FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments;        //如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        //如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        }
	}
    return result;
}