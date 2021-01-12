(function() {

    var idolname = [0, 1, 2]; //らんきんぐのぺーじ
    var idols = [
        '天海春香', '如月千早', '星井美希', '萩原雪歩', '高槻やよい', '菊地真', '水瀬伊織', '四条貴音', '秋月律子', '三浦あずさ',
        '双海亜美', '双海真美', '我那覇響', '春日未来', '最上静香', '伊吹翼', '田中琴葉', '島原エレナ', '佐竹美奈子', '所恵美',
        '徳川まつり', '箱崎星梨花', '野々原茜', '望月杏奈', 'ロコ', '七尾百合子', '高山紗代子', '松田亜利沙', '高坂海美', '中谷育',
        '天空橋朋花', 'エミリー', '北沢志保', '舞浜歩', '木下ひなた', '矢吹可奈', '横山奈緒', '二階堂千鶴', '馬場このみ', '大神環',
        '豊川風花', '宮尾美也', '福田のり子', '真壁瑞希', '篠宮可憐', '百瀬莉緒', '永吉昴', '北上麗花', '周防桃子', 'ジュリア', '音無小鳥'
    ];
    var idolid = [];
    for (var i = 0; i < 51; i++) {
        idolid[i] = i + 1;
    }


    var eventid = ""; //いべんと番号
    var credit = "BY SKDN";
    var idolstage = [];
    var offshot = [];
    var stageuri=[];


    var num, funtext = '';
    var fundata = new Array(idolname.length);
    var ownfundata = new Array(idolname.length);
    var finishdata = '';
    var uri = ["http://imas.gree-apps.net/app/index.php/event",
        "http://imas.gree-apps.net/app/index.php/featuring/index/event/", "http://imas.gree-apps.net/app/index.php/featuring/short_story/event/"
    ]

    init();

    function init(num) {
        if (typeof num !== 'number') {
            $('<div/>').css({
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 1000,
                backgroundColor: 'rgba(0,0,0,.7)',
                color: '#fff',
                fontSize: 30,
                textAlign: 'center',
                paddingTop: '15em'
            }).attr('id', '___overlay').text('ランキング集計').appendTo('body');
            num = 1;
            //alert('開始します');
        }


        var progress = load(idolname[num - 1]);
        if (num <= idolname.length) {
            $('#___overlay').text(idolname[num - 1] + '0位確認中…');
        }
        progress.done(function(data100, dataown) {


            if (num == idolname.length) {
                $('#___overlay').remove();
                for (i = 0; i < offshot.length; i++) {
                    var max = 0;
                    var nums = [];
                    for (var k = 0; k < 3; k++) {
                        offshot[i].idol[k] = idols[offshot[i].idol[k] - 1];
                        var tmp = offshot[i].stage[k];
                        for (var j = 0; j < idolstage.length; j++) {
                            if (tmp == idolstage[j].stage) {
                                offshot[i].stage[k] = j + 1;
                                nums[k] = j + 1;
                                break;
                            }
                        }
                    }
                    nums.sort();
                    offshot[i].max = nums[2];
                    offshot[i].mid = nums[1];
                    offshot[i].min = nums[0];
                }


                for (var i = 0; i < idolstage.length; i++) {
                    for (var k = 0; k < 10; k++) {
                        temp = idolstage[i]['idol'][k];
                        for (var j = 0; j < offshot.length; j++) {
                            for (var l = 0; l < 3; l++) {
                                if (temp == offshot[j]['idol'][l]) {
                                    idolstage[i]['idol'][k] = [];
                                    idolstage[i]['idol'][k][0] = temp;
                                    idolstage[i]['idol'][k][1] = offshot[j].max;
                                    idolstage[i]['idol'][k][2] = offshot[j].mid;
                                    idolstage[i]['idol'][k][3] = offshot[j].min;
                                    break;
                                }
                            }
                        }
                    }
                    idolstage[i].idol.sort(function(val1, val2) {
                        if (val1[1] != val2[1]) {
                            return (val1[1] - val2[1]);
                        } else if (val1[2] != val2[2]) {
                            return (val1[2] - val2[2]);
                        } else if (val1[2] == val2[2]) {
                            return (val1[3] - val2[3]);
                        }
                        return 0;
                    });

                }


                offshot.sort(function(val1, val2) {
                    if (val1.max != val2.max) {
                        return (val1.max - val2.max);
                    } else if (val1.mid != val2.mid) {
                        return (val1.mid - val2.mid);
                    } else if (val1.mid == val2.mid) {
                        return (val1.min - val2.min);
                    }
                    return 0;
                });
                finishdata +="<!DOCTYPE HTML><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><title>まらそんゆうせんじゅん</title></head><body>";
                
                
				 finishdata += "<b>おふしょっと開放優先順位</b><table border=\"'1\"><tbody>";
				for(var i=0;i<offshot.length;i++){
				 finishdata += "<tr><td>" +offshot[i].name +"</td>";
				for(var k=0;k<3;k++){
				 finishdata += "<td>STAGE"+
				 + offshot[i].stage[k] //+"</td><td>"
				 + offshot[i].idol[k] +" </td>";
				 }
				 finishdata += "</tr>";
				 }
				 finishdata += "</tr></tbody><table>";
				
				for(var i=0;i<stageuri.length;i++){
				var regexp = new RegExp("(STAGE" + (i+1)+".*? )", 'gm');
				finishdata = finishdata.replace(regexp,"<a href='http://imas.gree-apps.net/app/index.php/" +stageuri[i] +"'>$1</a>");
				}
				finishdata = finishdata.replace(/STAGE/gm,"");
				
				
                finishdata += "<b>すてーじ別開放優先順位</b><table border=\"'1\"><thead><tr><th>あいどる</th><th>開放ステージ</th><th>最大</th><th>真ん中</th><th>最小</th></tr></thead><tbody>";
				for(var i=0;i<idolstage.length;i++){
				 finishdata += "<tr><td><font color=\"green\">"+ idolstage[i].stage +"</font></td></tr>"
				for(var k=0;k<10;k++){
				 finishdata += "<tr><td>"+ idolstage[i].idol[k][0] +"</td><td></td><td>"
				 +idolstage[i].idol[k][1] +"</td><td>"
				 +idolstage[i].idol[k][2] +"</td><td>"
				 +idolstage[i].idol[k][3] +"</td></tr>";
				 }}
				 finishdata += "</tbody><table>";
				
				
				 finishdata += "</body></html>";
                var
                    w = window,
                    d = w.document;
                //だうんろーどしょり   
                TextDL(finishdata , "marathon.html");

                return false;
            }

            init(num + 1);

            fundata[num - 1] = data100;

        });

    }

    function TextDL(text, name) {
        //ファイルを作成
        b = new Blob([text], {
            type: "text/plain"
        })

        //a要素を作る
        a = document.createElement('a')
            //ダウンロードする名前をセット
        a.download = name;
        //ダウンロードするファイルをセット
        a.href = window.URL.createObjectURL(b)

        //イベントを作る
        e = document.createEvent('MouseEvent')
        e.initEvent("click", true, true)
            //a要素をクリック
        a.dispatchEvent(e)
    }

    function dtstring(now) {
        var yyyy = now.getFullYear();
        var mm = now.getMonth() + 1;
        var dd = now.getDate();
        var HH = now.getHours();
        var MM = now.getMinutes();
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (HH < 10) {
            HH = '0' + HH;
        }
        if (MM < 10) {
            MM = '0' + MM;
        }

        return (mm + "/" + dd + " " + HH + ":" + MM);
    }

    function load(idol) {

        var df = $.Deferred();

        if (num == idolname.length) {
            df.reject();
        }

        var page = get(idol, idol);
        page.done(function(data) {
            var dom = $.parseHTML(data);
            var temp = null;
            var data100 = "";
            var rank = "";
            var dataown = null;
            var stage = [];
            var ct = 0;

            if (idol == 0) {
                $(dom).find('div.normal-bg').each(function() {
                    temp = $(this).html();
                    if (temp.match("btn-ranking") != null) {
                        var m = temp.match(/\/([0-9]+)\//gm);
                        eventid = m[0].replace(/\//gm, "");
                    }
                });
                $(dom).find('ul').each(function() {
                    temp = $(this).html();
                    if (temp.match("必要元気量") != null) {
                    stageuri= temp.match(/marathon\/(progress|area)\/[0-9]+/gm);//えんどれすだとarea
                    }
                });
            }
            if (idol == 1) {
                $(dom).find('div.left-arrow').each(function() {
                    temp = $(this).text();
                    stage[ct] = temp.replace("に戻る", "").replace(/[\t\r\n]/gm, "");
                    ct++;
                });
                ct = 0;
                $(dom).find('ul').each(function() {
                    temp = $(this).html();
                    if (temp.match(/idol\/[0-9]+/) != null) {
                        var ids = temp.match(/idol\/[0-9]+/gm);
                        data100 += stage[ct] + "\r\n";
                        idolstage[ct] = {};
                        idolstage[ct].stage = stage[ct];
                        idolstage[ct].idol = [];
                        for (var k = 0; k < 10; k++) {
                            data100 += ids[k].match(/[0-9]+/) + "\r\n";
                            idolstage[ct]['idol'][k] = idols[ids[k].match(/[0-9]+/) - 1];
                        }
                        ct++;
                    }
                });
            }

            if (idol == 2) {
                var ct = 0;
                $(dom).find('li').each(function() {
                    temp = $(this).html()
                    if (temp.match(/idol\/[0-9]+/) != null) {
                        var ids = temp.match(/idol\/[0-9]+/gm);
                        var stage = temp.match(/#444;\">.*? エリア/gm);
                        offshot[ct] = {};
                        offshot[ct].name = temp.match(/「.*?」/);
                        offshot[ct].stage = [];
                        offshot[ct].idol = [];
                        for (var k = 0; k < 3; k++) {
                            offshot[ct]['stage'][k] = stage[k].replace("#444;\">", "").replace(" エリア", "").replace(/<.*?>/, "");
                            offshot[ct]['idol'][k] = ids[k].match(/[0-9]+/);
                        }
                        ct++;
                    }

                });
            }

            if (data100 === null) {
                df.reject();
            } else {

                df.resolve(data100, dataown);
            }
        });
        return df.promise();
    }

    function get(idol, idol) {
        var df = $.Deferred();
        $.ajax({
            url: uri[idol] + eventid,
            success: function(data) {
                df.resolve(data);
            }
        });
        return df.promise();
    }


})();