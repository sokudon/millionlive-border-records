(function() {

var idols = [
	'天海春香','如月千早','星井美希','萩原雪歩','高槻やよい','菊地真','水瀬伊織','四条貴音','秋月律子','三浦あずさ',
	'双海亜美','双海真美','我那覇響','春日未来','最上静香','伊吹翼','田中琴葉','島原エレナ','佐竹美奈子','所恵美',
	'徳川まつり','箱崎星梨花','野々原茜','望月杏奈','ロコ','七尾百合子','高山紗代子','松田亜利沙','高坂海美','中谷育',
	'天空橋朋花','エミリー','北沢志保','舞浜歩','木下ひなた','矢吹可奈','横山奈緒','二階堂千鶴','馬場このみ','大神環',
	'豊川風花','宮尾美也','福田のり子','真壁瑞希','篠宮可憐','百瀬莉緒','永吉昴','北上麗花','周防桃子','ジュリア'
	];

    var eventid = 374; //いべんと番号
    var credit = 'BY SKDN';
    
    var decideidol=idols;
    var google ="https://script.google.com/macros/s/AKfycbyUJ0JWzqe8dehYmX2L3Ctm8HlAFND0W6lD1_M4oyLikPmqkuWH/exec";

    
    var idolid= [];
        for(var i=0;i<decideidol.length;i++){//<1;i++){  //
        for(var k=0;k<idols.length;k++){
    if(decideidol[i]==idols[k]){idolid[i]=k+1;}}
    }
    
    var idolname=[];
    var idolidmk=[];
    var startpage=1;
    var interval=11;//ぺーじ分で折り返し
    
    var idolnamebase = [1,2,3,10,40];//らんきんぐのぺーじ
    //var idolnamebase=[];for(var i=0;i<interval;i++){idolnamebase[i]=i+startpage;}
    interval=idolnamebase.length;
    var total=interval*idolid.length;
    
    for(var i=0,k=0,l=0;i<total;i++,k++){
    if(k==interval){k=0;l++;}
    idolname[i]=idolnamebase[k];
    idolidmk[i]=idolid[l];
    }
    
    
    idolname[i]=0;
    idolidmk[i]=0;

    
	//view-source:/ranking/grow_idol/idol/33?page=1
	// var uribase = 'http://imas.gree-apps.net/app/index.php/event/' + eventid + '/ranking/grow_idol/idol/';

	var uribase="http://imas.gree-apps.net/app/index.php/ranking/producer_idol/segment/2/idol/";
    //var uribase = 'http://imas.gree-apps.net/app/index.php/event/' + eventid + '/ranking/general?page=';
    //var IDURI ="http://imas.gree-apps.net/app/index.php/friend/id_search";
    //var NAMEURI = "http://imas.gree-apps.net/app/index.php/mypage/mydata";
    
    var yourID= "-1";   //-1;
    var yourName = "自分REST@RT";//"自分REST@RT";
    
//http://imas.gree-apps.net/app/index.php/event/258/ranking/general?page=
//http://imas.gree-apps.net/app/index.php/event/258/ranking/friend/?page=
//http://imas.gree-apps.net/app/index.php/event/258/ranking/lounge_member/?page=
//http://imas.gree-apps.net/app/index.php/ranking/lounge/segment/2/rank_page/1

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


        var progress = load(idolidmk[num - 1],idolname[num - 1]);
        if (num <= idolname.length) {
            $('#___overlay').text(idols[idolidmk[num - 1]-1] +","+ idolname[num - 1] + '0位確認中…');
        }
        progress.done(function(data100, dataown) {


            if (num >= idolname.length) {
                $('#___overlay').remove();
                for (i = 0; i < idolname.length; i++) {
                    finishdata +=  fundata[i] ;
                }
                var dd = new Date();
                finishdata += "※" + dtstring(dd) + ' 集計時点 rankfix'+ credit +'\r\n';
                finishdata = finishdata.replace(/undefined/gm,"");
                //alert(finishdata);

   //var d=window.open().document;
  // d.writeln("<pre>"+finishdata +"</pre>");

                var
                    w = window,
                    d = w.document;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, "fan-"+dtstring(dd).replace(/[/ :\-]/g, ""));

var js=JSON.stringify(mkjs(finishdata));
var BD= {};
BD.BD_JSON=js;

//alert(js);

request = $.ajax({
			url: google,
			type: "post",
			data: BD
		});


                return false;
            }

            init(num + 1);

            fundata[num - 1] = data100;

        });

    }
    
        function mkjs(s) {
    var JS={};
    var lf=s.split("\n");
    for(var i=0;i<lf.length;i++){
    var st =lf[i];
    if(st.match(/^.*?[0-9]+位/)!=null){
    var r=st.match(/^.*?[0-9]+位/);
    var m=st.match(/\t[0-9]+/);
    JS[r]=m[0].replace("\t","");
     }
     if(st.match(/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}/)!=null){
     var m=st.match(/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}/);
    JS.date=m[0];
     }
     
     }
    
    return JS;
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

    function load(id,idol) {

        var df = $.Deferred();

        if (num > idolname.length) {
            df.reject();
        }

        var page = get(id, idol);
        page.done(function(data) {
            var dom = $.parseHTML(data);
            var temp = null;
            var data100 = "";
            var dataown = null;
            var urank="";
            var upt="";
            var rankfix = (idol*10) -9;
                        
				
            $(dom).find('td.user-list-st').each(function() {            
                temp = $(this).html();
                if (temp.match(/txt-sub2/) != null  && temp.match(/位/)!= null&& temp.match(/href/)!= null) {
                
                var rankst = rankfix.toString();
                   if(rankst.match(/(^1?1|0)$/) !=null){//1位,10位
                   
                    urank = temp.match(/[0-9]+位/);
                    upt = temp.replace(/,/gm,"").match(/span>([0-9]+)人/gm);
                    
                    //if(temp.match(/id\/([0-9]+)/)==null){//はいぱーりんくなしのばあい
                    //uid[1]=yourID;
                    //uname[1]=yourName;
                    //}
                    //else{                   
                    //uid = temp.match(/id\/([0-9]+)/);
                    //uname = temp.match(/>(.*?)</);
                    //}                    
                    
                    data100 = data100
                    + idols[id-1]  
                    + rankfix+"位(" + urank + ")\t"
                    //+ uid[1] + "\t"
                    //+ uname[1] + "\t"
                    + upt[0].match(/[0-9]+/)
                    + "\r\n";
                    
                   }
                   
                   rankfix++;
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

    function get(id, idol) {
        var df = $.Deferred();
        $.ajax({
            //url: uribase +   id + '?page='+idol+"/past/1",
            url: uribase + id +'/rank_page/'+idol,
            success: function(data) {
                df.resolve(data);
            }
        });
        return df.promise();
    }


})();