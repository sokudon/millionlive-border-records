(function() {

    var idolname=[];
    for(var i=0;i<121;i++){idolname[i]=i+1;}

    var eventid = 280; //いべんと番号
    var credit = '';
    
    var uribase = 'http://imas.gree-apps.net/app/index.php/event/' + eventid + '/ranking/general?page=';
    //var IDURI ="http://imas.gree-apps.net/app/index.php/friend/id_search";
    //var NAMEURI = "http://imas.gree-apps.net/app/index.php/mypage/mydata";
    
    var yourID= -1;
    var yourName = "自分のIDです";

var member = [
["1100000000000026770","zumi@1FA"],
["1100000000000034715","akira95"],
["400000000000010120","DEKKER-P"],
["1300000000000004142",".*?どん@したらば"],
["1100000000000007246","しーどる"],
["300000000000011012","オルフェウス@同僚募集中"],
["400000000000052323","ミリ＠踏み台P/1FA"],
["700000000000057776","Lad"],
["500000000000057187","にょづき"],
["100000000000003471","しん"],
["200000000000001419","T-M:翼、育、エレナ、茜他の埋め同僚募集中。出雪歩全所持、最上ほぼ所持他"],
["-1","自分対象のID"]
];


    var num, funtext = '';
    var fundata = new Array(idolname.length);
    var ownfundata = new Array(idolname.length);
    var finishdata = '';

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


            if (num > idolname.length) {
                $('#___overlay').remove();
                for (i = 0; i < idolname.length; i++) {
                    finishdata +=  fundata[i] + '\r\n';
                }
                
                
var st="";

for(var i=0;i<member.length;i++){
var regexp = new RegExp('^.*?\t'+member[i][0] + '\t(.+)', 'gm');
if(finishdata.match(regexp)!=null){
st = st + "0000" +finishdata.match(regexp) + "\n";
}
else{
//st = st + member[i][1] + "さんは見つかりませんでした、1200位範囲外\r\n"
}
}
st = st.replace(/^[0-9]+([0-9]{5}位)/gm,"$1");
var s=st.split("\n");

s.sort();

st="";

for(var i =0 ; i<s.length;i++){
st = st + s[i] + "\r\n";
}

                var dd = new Date();
                finishdata += "※" + dtstring(dd) + ' 集計時点 '+ credit +'\r\n';
                st   += "※" + dtstring(dd) + ' 集計時点 '+ credit +'\r\n';
                finishdata =st + "\r\n"+ finishdata;
                
                alert(st);

                var
                    w = window,
                    d = w.document;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, dtstring(dd).replace(/[/ :\-]/g, ""));

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

        if (num > idolname.length) {
            df.reject();
        }

        var page = get(idol, idol);
        page.done(function(data) {
            var dom = $.parseHTML(data);
            var temp = null;
            var data100 = "";
            var dataown = null;
            var urank="";
            var uid="";
            var uname="";
            var upt="";
            
                        
				
            $(dom).find('td').each(function() {            
                            temp = $(this).html();
                if (temp.match(/txt-sub2/) != null  && temp.match(/[0-9]+位/)!= null) {
                    urank = temp.match(/[0-9]+位/);
                    if(temp.match(/id\/([0-9]+)/)==null){//はいぱーりんくなしのばあい
                    uid[1]=yourID;
                    uname[1]=yourName;
                    }
                    else{                   
                    uid = temp.match(/id\/([0-9]+)/);
                    uname = temp.match(/>(.*?)</);
                    }                    upt = temp.match(/(([0-9]+,)*[0-9]+)&nbsp/);
                    data100 = data100 + urank  + "\t"+ uid[1]  + "\t"+ uname[1]  + "\t"+ upt[1].replace(/,/g,"")  + "\r\n";
                }
            })

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
            url: uribase + idol,
            success: function(data) {
                df.resolve(data);
            }
        });
        return df.promise();
    }


})();