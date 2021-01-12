(function() {

    var idname = [2,1];//ID,名前の頁

	//var page=[1093,100,120];
	//var page = [10,50,120];//らんきんぐのぺーじ
    var page = [1,2,3,4,5]; //らんきんぐのぺーじ 2まんなし
    //var page=[];for(var i=0;i<2000;i++){page[i]=i+1;}
	
	var idolname = idname.concat(page);

    var eventid = 392; //いべんと番号
    var credit = 'BY SKDN';
    
    var onece=0;
    
	var tyukan= "";
	//var tyukan= "/half";

    var google ="https://script.google.com/macros/s/AKfycbyJTwUaSHDgu6KDndb2fFBW-Ysgkc7ejt4ynMWENS8XW0jAbKaL/exec"
    
    var uribase = [ "",
    "http://imas.gree-apps.net/app/index.php/mypage/mydata/"    ,
    "http://imas.gree-apps.net/app/index.php/ranking/history/type/",
	//'http://imas.gree-apps.net/app/index.php/event/' + eventid + '/ranking/general'+tyukan+'?page='
	'http://imas.gree-apps.net/app/index.php/ranking/lounge/segment/2/rank_page/'
	]
    
    var yourID= -1;//しゅとくできなかったときのだみー
    var yourName = "自分REST@RT";
    

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
            }).attr('id', '___overlay').text(tyukan+'ランキング集計').appendTo('body');
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
                var dd = new Date();
                finishdata += "※" + dtstring(dd) + ' 集計時点 '+ credit +'\r\n';
                //alert(finishdata);

                var
                    w = window,
                    d = w.document;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, dtstring(dd).replace(/[/ :\-]/g, "")+"-lg");

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

    function load(idol) {

        var df = $.Deferred();

        if (num > idolname.length) {
            df.reject();
        }
        mode=idol;
        if(onece){
        mode=3;
        }

        var page = get(idol, mode);
        page.done(function(data) {
            var dom = $.parseHTML(data);
            var temp = null;
            var data100 = "";
            var dataown = null;
            var urank="";
            var uid="";
            var uname="";
            var upt="";            
            var rankfix = (idol*10) -9;
                        
			if(mode==2 && onece==0){
			  $(dom).find('ul.clearfix').each(function() {            
                            temp = $(this).html();
                            if(temp.match(/user_id/)!=null){
                            var idtemp =temp.match(/id\/([0-9]+)/);
                            yourID=idtemp[1];
            			    //alert(idtemp);
                            }
            });
			}
			else if(mode==1 && onece==0){
			  $(dom).find('div').each(function() {            
                            temp = $(this).text();
							if(temp.match(/さんのステータス/)!=null){
                            var tm=temp.match(/(.*?)さんのステータス/);
                            yourName=tm[1].replace(/[ 　\t]+/gm,"");
                            onece=1;
                            }
            });
			}
			else{
            $(dom).find('td').each(function() {            
                temp = $(this).html();
                if (temp.match(/txt-sub2/) != null  && temp.match(/[0-9]+位/)!= null&& temp.match(/href/)!= null) {
                
                var rankst = rankfix.toString();
                   if(rankst.match(/(^1?1|0)$/) !=null){//1位,10位
                   
                   
                    urank = temp.match(/[0-9]+位/);
                    //if(temp.match(/id\/([0-9]+)/)==null){//はいぱーりんくなしのばあい
                    //uid[1]=yourID;
                    //uname[1]=yourName;
                    //}
                    //else{                   
                    //uid = temp.match(/id\/([0-9]+)/);
                    //uname = temp.match(/>(.*?)</);
                    //}                    
                    upt = temp.replace(/,/gm,"").match(/span>([0-9]+)人/gm);
                    data100 = data100 
                    + rankfix+"位(" + urank + ")\t"
                    //+ uid[1]  + "\t"
                    //+ uname[1]  + "\t"
                    + upt[0].match(/[0-9]+/)
                    + "\r\n";
                    }
                    rankfix++;
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

    function get(idol, mode) {
        var df = $.Deferred();
        $.ajax({
            url: uribase[mode] + idol+"/past/1",
            success: function(data) {
                df.resolve(data);
            }
        });
        return df.promise();
    }


})();