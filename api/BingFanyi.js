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
     *
     * 获取最新 cookie 的地址 http://www.bing.com/translator/
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
        'Cookie' : 'srcLang=ja; destLang=zh-CHS; smru_list=ja; dmru_list=da%2Czh-CHS; sourceDia=ja-JP; destDia=zh-CN; MUID=03D6A79C4CE2641F31E8AE9548E26749; SRCHD=AF=NOFORM; SRCHUSR=DOB=20160528; SRCHHPGUSR=CW=1270&CH=629&DPR=1.5; MUIDB=03D6A79C4CE2641F31E8AE9548E26749; SRCHUID=V=2&GUID=75BB580F9DF143B880867397F55A275D; mtstkn=rTPS06aUDHmND4kAq4dP3foufQbV2pwVggyVRAcYrTvDuQqQQN%2BjA3df7SqXUORW; _EDGE_S=SID=36B6109FECBB6A10101419CAED1A6B95; WLID=Y/CtSQWVRMmmheFSvO9hXZaZ4+vMEQR8yPvjZ1laajIo1rb0Y0GLONQLH9dG0jiO6pEtfeaERFNHTMDo+2tkp5VNRxIHaK4Y3Dha2+qfBbk=; KievRPSAuth=FABaARRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACFe7YimwsrS8GAGZsOOcLcf8c3h7f3rTbzguTVbidmStdsy0Ezhj9/jqSVQ6aw%2BLDYISax8mdF7da38DpoBprHnzY4Ms8PTz6JCOyJ2i0tTeLkbbA%2Bfvn1r2jqKZ/InMttup9cInAX92Xe0iZvaKiMH2u6b0d61FnJbBJHYkhxCQX5/DFl%2BP9gD9sV91j6ZZmzLNROVoZ1RgL5sNdLH%2BhJCswmzVZQK/I0xWmU33Koqxm9ti4aXk9zG7iWcrygCQstniq2flE8mxIBWiOGabAHbidQt7Ac2VNEGLBKqJ6xRkbBioea87ZVmuIDp5LpvsWOeH69UJBbsePkT8iU0b5xbNVKHZDK18kgch4kMy4Xdod%2Brf2Bkz3%2BavnDmBqmi9DUa7FACqb4s3KCpsPhsT1tWs/mc/FhBAGg%3D%3D; PPLState=1; ANON=A=30ECE85FEC9DC70EF27E0D78FFFFFFFF&E=1270&W=1; NAP=V=1.9&E=1216&C=FqOPuJN7iR6Sl1aZvP4B5WdsxR40aBFF5V7OYEDM-0MUBXw9yAJ5Aw&W=1; SNRHOP=I=&TS=; _SS=SID=36B6109FECBB6A10101419CAED1A6B95; _U=14NoAFVA_oCsa8AtgfZhrcGpxmwqFoGekoh4Jj_XsL5U4PG2M9JI-WiL4d2utcZ0TQqqYU0uN8xRMfuQLfR9QK1tyxTOVBNBADjrwgm6CElXl0BMdPbxPjw1lGgB4J7B8; WLS=TS=63604354776&C=88f9d8a09a3d4280&N=%e5%b0%a7%e4%b8%b0'
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
