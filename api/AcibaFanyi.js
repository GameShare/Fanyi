var request = require("superagent");

var aciba = function(src, callback){

    // var src = "Amazon.co.jp 公式サイト。お急ぎ便ご利用で当日・翌日にお届け。アマゾンで本, 日用品, ファッション, 食品, ベビー用品, カー用品ほか一億種の商品を\nお急ぎ便ご利用で当日・翌日にお届け。アマゾンで本";

    if(typeof src !== 'string'){
        callback(new Error("aciba : 第一个参数, 请输入字符串!"))
    }

    var postData = {
        f : 'jp',
        t : 'zh',
        w : src
    }

    /**
     * 经过测试， 貌似只有 Content-Type 是必须的。。。神奇
     */
    var HTTPHeaders = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }


    request.post("http://fy.iciba.com/ajax.php?a=fy")
        .set(HTTPHeaders)
        .send(postData)
        .end(function(err, data){
            
            if(err) return callback(err);

            var acibaJson = JSON.parse(data.text);

            if(typeof acibaJson === 'object' && acibaJson.content.out){
                callback(null, acibaJson.content.out)
            }
        })
}



module.exports = aciba;