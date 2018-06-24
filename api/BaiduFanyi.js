var request = require("superagent");

var baidu = function(src, callback){

    // var src = "主人公『大蔵遊星(おおくらゆうせい)』は、日本の財界を代表する“華麗なる一族”大蔵家の末端に、望まれぬ子として生を受けた。　優秀な親族や家庭教師のもとで厳しく育てられた遊星は、多芸に秀でた万能家であったが、いうなれば籠の中の鳥であり、およそ人並みの夢や希望などとは無縁の生涯だった。";

    if(typeof src !== 'string'){
        callback(new Error("baidu : 第一个参数, 请输入字符串!"))
    }

    var postData = {
        from : 'jp',
        to : 'zh',
        query : src,
        transtype : 'translang',
        simple_means_flag : 3,
        sign : getSign(src),
        token : "94ea85e5300077a9a251e9c32aba94bb"
    }

    /**
     * 经过测试， 貌似只有 Content-Type 是必须的。。。神奇
     */
    var HTTPHeaders = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie' : 'BAIDUID=9513765AD6FF9C5FEFCECA18CE5EA80A:FG=1; BIDUPSID=9513765AD6FF9C5FEFCECA18CE5EA80A; PSTM=1529808067; H_PS_PSSID=1422_21095_20928; PSINO=1; locale=zh; to_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; from_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%2C%7B%22value%22%3A%22jp%22%2C%22text%22%3A%22%u65E5%u8BED%22%7D%5D; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1529808068,1529809156,1529809158,1529809161; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1529809161'
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

//#region  百度翻译的辅助函数

/**
 * 根据给定的字符串获取 sign ，sign是在发送请求时必须要附带的内容
 * @param {String} r 要参与生成 sign 的字符串
 */
function getSign (r) {
    var o = r.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g);
    if (null === o) {
        var t = r.length;
        t > 30 && (r = "" + r.substr(0, 10) + r.substr(Math.floor(t / 2) - 5, 10) + r.substr(-10, 10))
    } else {
        for (var e = r.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/), C = 0, h = e.length, f = []; h > C; C++)
            "" !== e[C] && f.push.apply(f, a(e[C].split(""))),
            C !== h - 1 && f.push(o[C]);
        var g = f.length;
        g > 30 && (r = f.slice(0, 10).join("") + f.slice(Math.floor(g / 2) - 5, Math.floor(g / 2) + 5).join("") + f.slice(-10).join(""))
    }
    var u = void 0
      , l = "" + String.fromCharCode(103) + String.fromCharCode(116) + String.fromCharCode(107);
    u = '320305.131321201';
    for (var d = u.split("."), m = Number(d[0]) || 0, s = Number(d[1]) || 0, S = [], c = 0, v = 0; v < r.length; v++) {
        var A = r.charCodeAt(v);
        128 > A ? S[c++] = A : (2048 > A ? S[c++] = A >> 6 | 192 : (55296 === (64512 & A) && v + 1 < r.length && 56320 === (64512 & r.charCodeAt(v + 1)) ? (A = 65536 + ((1023 & A) << 10) + (1023 & r.charCodeAt(++v)),
        S[c++] = A >> 18 | 240,
        S[c++] = A >> 12 & 63 | 128) : S[c++] = A >> 12 | 224,
        S[c++] = A >> 6 & 63 | 128),
        S[c++] = 63 & A | 128)
    }
    for (var p = m, F = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(97) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(54)), D = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(51) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(98)) + ("" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(102)), b = 0; b < S.length; b++)
        p += S[b],
        p = n(p, F);
    return p = n(p, D),
    p ^= s,
    0 > p && (p = (2147483647 & p) + 2147483648),
    p %= 1e6,
    p.toString() + "." + (p ^ m)
}

/**
 * 在求解 sign 过程中的辅助函数
 */
function n(r, o) {
    for (var t = 0; t < o.length - 2; t += 3) {
        var a = o.charAt(t + 2);
        a = a >= "a" ? a.charCodeAt(0) - 87 : Number(a),
        a = "+" === o.charAt(t + 1) ? r >>> a : r << a,
        r = "+" === o.charAt(t) ? r + a & 4294967295 : r ^ a
    }
    return r
}


//#endregion

module.exports = baidu;
