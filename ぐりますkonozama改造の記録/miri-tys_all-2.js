(function(){
	
	var alpha = [null,
	'天海春香','如月千早','星井美希','萩原雪歩','高槻やよい','菊地真','水瀬伊織','四条貴音','秋月律子','三浦あずさ',
	'双海亜美','双海真美','我那覇響',
	'春日未来','最上静香','伊吹翼','田中琴葉','島原エレナ','佐竹美奈子','所恵美',
	'徳川まつり','箱崎星梨花','野々原茜','望月杏奈','ロコ','七尾百合子','高山紗代子','松田亜利沙','高坂海美','中谷育',
	'天空橋朋花','エミリー','北沢志保','舞浜歩','木下ひなた','矢吹可奈','横山奈緒','二階堂千鶴','馬場このみ','大神環',
	'豊川風花','宮尾美也','福田のり子','真壁瑞希','篠宮可憐','百瀬莉緒','永吉昴','北上麗花','周防桃子','ジュリア'
	];
	
	//あいどるぺーじを作製	
    var idolid = [
    			33,34,35,36,37,38,39,
    			40,41,42,43,44,45,46,47,48,49,50
    			 ];//ちーむばんごう
    			 
    var idolnamebase =[]//らんきんぐのぺーじ 1だと10位まで
    for(var i=0;i<50;i++){
    idolnamebase[i]=i+1;
    }
    
    
    var idolname=[];
    var idolidmk=[];
    var startpage=1;
    var interval=0;//ぺーじ分で折り返し
    
    //var idolnamebase=[];for(var i=0;i<interval;i++){idolnamebase[i]=i+startpage;}
    interval=idolnamebase.length;
    var total=interval*idolid.length;
    
    for(var i=0,k=0,l=0;i<total;i++,k++){
    if(k==interval){k=0;l++;}
    idolname[i]=idolnamebase[k];
    idolidmk[i]=idolid[l];
    }
    
    
	
	var eventid=  350;//いべんと番号
	var credit = "BY SKDN";
	
    var yourID= -1;//しゅとくできなかったときのだみー
    var yourName = "自分REST@RT";
	
	var num, funtext = '';
	var fundata = new Array(idolname.length);
	var ownfundata = new Array(idolname.length);
	var finishdata = '';
		
	init();
		
	function init(num) {
    if(typeof num !== 'number'){
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
  		
		var progress = load(idolname[num - 1],idolidmk[num - 1]);
  		if(num<=idolname.length && alpha[idolidmk[num - 1] ]!=undefined){
		$('#___overlay').text("ちーむ"+alpha[idolidmk[num - 1] ]+ idolname[num - 1] + '0位確認中…');
		}
		progress.done(function(data100,dataown){
     

            init(num + 1);

            fundata[num - 1] = data100;
            
            
  		
  		if(num==idolname.length){
			$('#___overlay').remove();
			for(i=0;i<idolname.length;i++){
			  //finishdata += idolname[i]+ '0位\t' + fundata[i]  +' pt\r\n';
			  finishdata +=  fundata[i];
			}
			var dd = new Date();
			finishdata += "※" + dtstring(dd) +' 集計時点のポイントです' + credit +'\r\n';
			
			finishdata = finishdata.replace("undefined","");
			
			
   var d=window.open().document;
   //d.writeln("<pre>"+finishdata +"</pre>");
   
        var
             w=window
            ,d=w.document
            ;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, dtstring(dd).replace(/[/ :\-]/g, "") +"_all");

                return false;
            }

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
	
	function dtstring(now){
	var yyyy = now.getFullYear();
	var mm = now.getMonth() + 1;
	var dd = now.getDate();
	var HH = now.getHours();
	var MM = now.getMinutes();
if (mm < 10) { mm = '0' + mm;}
if (dd < 10) { dd = '0' + dd;}
if (HH < 10) { HH = '0' + HH;}
if (MM < 10) { MM = '0' + MM;}

	return  (mm + "/" + dd + " " + HH + ":" + MM);
	}

	function load(id,idol) {
	
		var df = $.Deferred();
		
		if(num >idolname.length) {df.reject();}
		
		var page = get(id,idol);
		page.done(function(data){
			var dom = $.parseHTML(data);
			var temp = null;
			var data100 ="";
			var rank ="";
		  var dataown = null;

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
                    }                    
                    upt = temp.match(/(([0-9]+,)*[0-9]+)&nbsp/);
                    data100 = data100 + alpha[idol] +"\t"+ urank  + "\t"+ uid[1]  + "\t"+ uname[1]  + "\t"+ upt[1].replace(/,/g,"")  + "\r\n";
                }
            });
			
			if(data100 === null) {
				df.reject();
			}
			else {
			
				df.resolve(data100,dataown);
			}
		});
		return df.promise();
	}

	function get(page,team) {
		var df = $.Deferred();
		$.ajax({
		
			//http://imas.gree-apps.net/app/index.php/event/271/ranking/ula?page=1&team=1
			//url: 'http://imas.gree-apps.net/app/index.php/event/'+ eventid +'/ranking/ula?page='+ page +'&team=' +team,
			url: 'http://imas.gree-apps.net/app/index.php/event/'+ eventid +'/ranking/general?page='+ page +'&idol=' +team,
			success: function(data){
				df.resolve(data);
			}
		});
		return df.promise();
	}


})();
