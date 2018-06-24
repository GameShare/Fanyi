var request = require("superagent");

var TKK = eval('((function(){var a\x3d251394996;var b\x3d3532267575;return 407959+\x27.\x27+(a+b)})())');

var Br = function(a) {
        return function() {
            return a
        }
    },
    Cr = function(a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2),
                d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d),
                d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
        }
        return a
    },
    Dr = null,
    Er = function(a) {
        var b;
        if (null !== Dr) b = Dr;
        else {
            b = Br(String.fromCharCode(84));
            var c = Br(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = TKK
        }
        var d = Br(String.fromCharCode(116)),
            c = Br(String.fromCharCode(107)),
            d = [d(), d()];
        d[1] = c();
        c = "&" + d.join("") +
            "=";
        d = b.split(".");
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, g = 0; g < a.length; g++) {
            var l = a.charCodeAt(g);
            128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : (55296 == (l & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023), e[f++] = l >> 18 | 240, e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224, e[f++] = l >> 6 & 63 | 128), e[f++] = l & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++) a += e[f], a = Cr(a, "+-a^+6");
        a = Cr(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return c + (a.toString() + "." +
            (a ^ b))
    };


var HTTPHearders = {
    "Accept" : "*/*",
    "Accept-Encoding" : "gzip, deflate, sdch",
    "Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.6",
    "Cache-Control" : "no-cache",
    "Connection" : "keep-alive",
    "Host" : "translate.google.cn",
    "Pragma" : "no-cache",
    "Referer" : "http://translate.google.cn/?ie=GBK",
}

// A 是原本的语言, B 是要翻译成的语言
// 日语 ja   英语 en   中文 zh-CN
var google = function(src, A, B, callback){

    // var src = "小悪魔発育チュ～！";

    if(typeof src !== 'string'){
        callback(new Error("Google : 第一个参数, 请输入字符串!"))
    }

    // request.get("http://translate.google.cn/translate_a/single?client=t&sl=ja&tl=zh-CN&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&srcrom=1&ssel=0&tsel=0&kc=0" + Er(src) + "&q=" + encodeURIComponent(src))
    request.get("http://translate.google.cn/translate_a/single?client=t&sl=" + A + "&tl=" + B + "&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&srcrom=1&ssel=0&tsel=0&kc=0" + Er(src) + "&q=" + encodeURIComponent(src))
        .set(HTTPHearders)
        .end(function(err, data){
            var t = JSON.parse(data.text);
            var text = "";

            for(let i = 0; i < t[0].length - 1; i++) {
                text += t[0][i][0]
            }


            callback(null, text)
            
        })
}


var googleThroughEn = function (src, callback) {

    // 第一步 日语 翻译成 英文
    google(src, "ja", "en", (err, dataEn) => {
        if (err) return callback(err);

        // console.log(dataEn);

        // 第一步 英文 翻译成 中文
        google(dataEn, "en", "zh-CN", (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        })
    })
}


module.exports = googleThroughEn;

// googleThroughEn("その少女の生い立ちは不幸そのものだった。殻に閉じこもる性格のせいで友だちなどいない。性格を治すために母に入れられた施設では、大人たちに虐待される日々。嫌なこと、痛いこと……。痛いこと、痛いこと、痛いこと、痛いこと。そして歪む運命。それが南沢泉理という少女だった。", function(err, data){
//     if(err) throw err;
//     console.log(data)
// })