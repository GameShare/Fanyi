var request = require("superagent");

var baidu = function(src, callback){

    // var src = "Amazon.co.jp 公式サイト。お急ぎ便ご利用で当日・翌日にお届け。アマゾンで本, 日用品, ファッション, 食品, ベビー用品, カー用品ほか一億種の商品を\nお急ぎ便ご利用で当日・翌日にお届け。アマゾンで本";

    if(typeof src !== 'string'){
        callback(new Error("baidu : 第一个参数, 请输入字符串!"))
    }

    var postData = {
        from : 'jp',
        to : 'zh',
        query : src,
        transtype : 'translang',
        simple_means_flag : 3
    }

    /**
     * 经过测试， 貌似只有 Content-Type 是必须的。。。神奇
     */
    var HTTPHeaders = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    request.post("http://fanyi.baidu.com/v2transapi")
        .set(HTTPHeaders)
        .send(postData)
        .end(function(err, data){

            if(err) return callback(err);

            var text = '';

            var bdJson = JSON.parse(data.text);
            if(bdJson.trans_result && bdJson.trans_result.data){
                for(var i = 0; i < bdJson.trans_result.data.length; i++){
                    text += bdJson.trans_result.data[i].dst;
                    if(i !== bdJson.trans_result.data.length - 1) text += '\n';
                }
                callback(null, text)

            } else {
                callback(new Error("百度翻译翻译失败!"))
            }
        })
}




module.exports = baidu;
