var request = require("superagent");

var bing = function(src, callback){

    // var src = "公式サイトAmazon.co.jp 公式サイト。お急ぎ便ご利用で当日・翌日にお届け。アマゾンで本, 1日用品, ファッション, 食品, ベビー用品, カー用品ほか一億種の商品を\nお急ぎ便ご利用で当日・翌日にお届け。アマゾンで本";

    if(typeof src !== 'string'){
        callback(new Error("bing : 第一个参数, 请输入字符串!"))
    }

    var postData = [
        {
            id : -1910809632,
            text : src
        }
    ]

    /**
     * Bing 的里面 cookie 是必须的...但不知道有效期是多久...就先拿这先用吧
     * 反正 Bing 的翻译质量是最差的...
     */
    var HTTPHeaders = {
        'Accept' : 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding' : 'gzip, deflate',
        'Accept-Language' : 'zh-CN,zh;q=0.8,zh-TW;q=0.6',
        'Cache-Control'   : 'no-cache',
        'Connection' : 'keep-alive',
        'Content-Type' : 'application/json; charset=UTF-8',
        'Host' : 'www.bing.com',
        'Origin' : 'http://www.bing.com',
        'Pragma' : 'no-cache',
        'Referer' : 'http://www.bing.com/translator/',
        'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/51.0.2704.79 Chrome/51.0.2704.79 Safari/537.36',
        'X-Requested-With' : 'XMLHttpRequest',
        'Cookie' : 'srcLang=ja; smru_list=ja; sourceDia=ja-JP; destLang=zh-CHS; dmru_list=da%2Czh-CHS; destDia=zh-CN; MUID=03D6A79C4CE2641F31E8AE9548E26749; SRCHD=AF=NOFORM; SRCHUSR=DOB=20160528; SRCHHPGUSR=CW=1270&CH=629&DPR=1.5; MUIDB=03D6A79C4CE2641F31E8AE9548E26749; SRCHUID=V=2&GUID=75BB580F9DF143B880867397F55A275D; mtstkn=rTPS06aUDHmND4kAq4dP3foufQbV2pwVggyVRAcYrTtNTdly5u7uB7msNzJslgye; _EDGE_S=SID=2C1F173855856BD23DFD1E6C54246A76; KievRPSAuth=FABaARRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACIMVRviS2fl2GAGmN7ZIB1OxIffTSwI6qlf/9c5F29ToiUBQCYI2uQIkIMXwTsQRHHEqc3apxM7NAmr/dw04Wm3YcC9Qk1JP0uRTtrI9orH9S5kscIyO0F3WdMKfbH7JCTHEcqRZ1myAPs7/Vn3ju1AK41Nd4loNJsBmZIvcZcTNydsuSGNIZdSv2qLpkgT6OZfNFk1iGZovfmhfC5INBKiOO8k/i7Ogcq9HfuT%2BSHQexNTT1fVWZgCjpHbSKYVzfBxe2zsAQjB7DgNW2vXLhqD0r9nH8QzE8VpnVo4wvojqspA8I08kkzqEBVmsKB5JGqKQGCgzDjHa9l0tJKV/ybuLkGa3tMPnsmTEiUuBjxxn/VPeiMjmvd6yZuRvAT0RRXXeFABSceen8mm5mHrT0I/AeCiLDwZUFw%3D%3D; PPLState=1; ANON=A=30ECE85FEC9DC70EF27E0D78FFFFFFFF&E=1270&W=1; NAP=V=1.9&E=1216&C=FqOPuJN7iR6Sl1aZvP4B5WdsxR40aBFF5V7OYEDM-0MUBXw9yAJ5Aw&W=1; SNRHOP=I=&TS=; _SS=SID=2C1F173855856BD23DFD1E6C54246A76; _U=1OpPSNE76d_bRyqMRgtcmGpPMWQlLMU9J8Y8WalPnV87JzOln03cLoQ5QGHMRfnSVtju9FHZspd1HnVOI7xwCBysg6FC-ABzBxFpwOZKO1gFqQmiN7Lt8b-rSKUEvUbqU; WLS=TS=63604236897&C=88f9d8a09a3d4280&N=%e5%b0%a7%e4%b8%b0'
    }

    request.post("http://www.bing.com/translator/api/Translate/TranslateArray?from=ja&to=zh-CHS")
        .set(HTTPHeaders)
        .send(postData)
        .end(function(err, data){

            if(err) return callback(err);

            var bingJson = JSON.parse(data.text);
            if(typeof bingJson === 'object' && bingJson.items){
                callback(null, bingJson.items[0].text)
            }
        })
}


module.exports = bing;
