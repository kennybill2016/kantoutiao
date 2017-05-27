
exports.HOME_PAGE = 'http://localhost:8887/content/getList.php?cid={0}&max_time={1}&min_time={2}&page={3}&deviceid=fcdbd8ef62fc4ecbb2f592c9e79ac7f9&tn=1&limit=8&user=temporary1493130412672&content_type=1&dtu=200';
exports.HOME_PAGE_DEFAULT = 'http://localhost:8887/content/getList.php??cid={0}&n=1&page=1&limit=8&user=temporary1493130412672&max_time={1}&content_type=1&dtu=200';
exports.DETAIL_VIEW = 'http://home.kuaikanpian.com/content/detail.php';
//home.kuaikanpian.com/content/getList.php

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