(function() {

var idols = [
	'天海春香','如月千早','星井美希','萩原雪歩','高槻やよい','菊地真','水瀬伊織','四条貴音','秋月律子','三浦あずさ',
	'双海亜美','双海真美','我那覇響','春日未来','最上静香','伊吹翼','田中琴葉','島原エレナ','佐竹美奈子','所恵美',
	'徳川まつり','箱崎星梨花','野々原茜','望月杏奈','ロコ','七尾百合子','高山紗代子','松田亜利沙','高坂海美','中谷育',
	'天空橋朋花','エミリー','北沢志保','舞浜歩','木下ひなた','矢吹可奈','横山奈緒','二階堂千鶴','馬場このみ','大神環',
	'豊川風花','宮尾美也','福田のり子','真壁瑞希','篠宮可憐','百瀬莉緒','永吉昴','北上麗花','周防桃子','ジュリア','音無小鳥'
	];

    var credit = 'BY SKDN';
    
    var idolid= [];
    for(var i=0;i<51;i++){idolid[i]=i+1;}
       
    
    var idolname=[];
    var idolidmk=[];
    var startpage=1;
    var interval=10;//ぺーじ分で折り返し
    
    var idolnamebase=[];for(var i=0;i<interval;i++){idolnamebase[i]=i+startpage;}
    interval=idolnamebase.length;
    var total=interval*idolid.length;
    
    for(var i=0,k=0,l=0;i<total;i++,k++){
    if(k==interval){k=0;l++;}
    idolname[i]=idolnamebase[k];
    idolidmk[i]=idolid[l];
    }
    
	//view-source:/ranking/grow_idol/idol/33?page=1
	 var uribase = 'http://imas.gree-apps.net/app/index.php/wantlist/registable_card_list/idol/';


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
            $('#___overlay').text(idols[idolidmk[num - 1]-1] +","+ idolname[num - 1] + 'P確認中…');
        }
        progress.done(function(data100, dataown) {


			for(var w=0;w<100000000;){
			w++;
			}

            if (num > idolname.length) {
                $('#___overlay').remove();
                
                for (i = 0; i < idolname.length; i++) {
                    finishdata +=  fundata[i] ;
                }
                var dd = new Date();
                finishdata="["+finishdata.slice(0,-3)+"]";
                
                var tmpjs=JSON.parse(finishdata);
                tmpjs.sort(function(a,b){
                var x=parseInt(a[0]);
                var y=parseInt(b[0]);
    if(x<y){return -1;}
    if(x>y){return 1;}
    return 0;
		});
		var uq=[tmpjs[0]];
		for(var i=1;i<tmpjs.length;i++){
		if(tmpjs[i-1][0]!=tmpjs[i][0]){
		uq.push(tmpjs[i]);
		}
		}
		
		
		finishdata=JSON.stringify(uq).replace(/\],\[/gm,"],\r\n[");
		var tsv= finishdata.replace(/[\[\]]/gm,"").replace(/",/gm,"\t").replace(/"/gm,"");
   var d=window.open().document;
   d.writeln("<pre>"+finishdata +"</pre>");

                var
                    w = window,
                    d = w.document;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, "idcardgz_idsort.json");
                TextDL(tsv, "idcardgz_idsort.txt");


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
            var gz="";
                        
				
            $(dom).find('tbody').each(function() {
                 temp = $(this).html();
                if (temp.match(/id\/[0-9]+/)) {
                    upt = temp.replace(/<.*?\>/gm,"");
            		urank=temp.match(/id\/[0-9]+/);
            		gz=temp.match(/(\/[0-9a-zA-Z\?]+\/[0-9a-zA-Z\?]+)\" width=\"90/);
                    data100 +=  "[\""+                  
                    urank[0].replace("id/","") +"\t"
                    +gz[1]
                    +upt.replace(/[\t]/gm,"").replace(/(\r?\n)+/gm,"\t")
                    + "\"],\r\n";
                    data100=data100.replace(/\t/gm,'\",\"');
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
            url: uribase +  + id + '/rarity/0/page/'+idol,
            success: function(data) {
                df.resolve(data);
            }
        });
        return df.promise();
    }


})();