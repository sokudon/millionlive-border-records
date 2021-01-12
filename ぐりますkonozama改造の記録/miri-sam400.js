(function(){
//var subw=window.open('http://imas.gree-apps.net/app/index.php/ranking/producer_idol/segment/2/idol/'+num+'/rank_page/10').document;
//http://imas.gree-apps.net/app/index.php/ranking/producer_idol/segment/2/idol/50/rank_page/10
	var idolname = [
	'天海春香','如月千早','星井美希','萩原雪歩','高槻やよい','菊地真','水瀬伊織','四条貴音','秋月律子','三浦あずさ',
	'双海亜美','双海真美','我那覇響','春日未来','最上静香','伊吹翼','田中琴葉','島原エレナ','佐竹美奈子','所恵美',
	'徳川まつり','箱崎星梨花','野々原茜','望月杏奈','ロコ','七尾百合子','高山紗代子','松田亜利沙','高坂海美','中谷育',
	'天空橋朋花','エミリー','北沢志保','舞浜歩','木下ひなた','矢吹可奈','横山奈緒','二階堂千鶴','馬場このみ','大神環',
	'豊川風花','宮尾美也','福田のり子','真壁瑞希','篠宮可憐','百瀬莉緒','永吉昴','北上麗花','周防桃子','ジュリア'
	,'最終'
	];
	var num, funtext = 'とりあえず';
	var fundata = new Array(50);
	var ownfundata = new Array(50);
	var finishdata = '';
//	var test = 'aa';
	
		
	function init(num) {
//		num = window.prompt('アイドル番号を入力してください\n(1春香-50ジュリアまで)', '10');
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
			}).attr('id', '___overlay').text('アイドルちゃんランキング400位集計').appendTo('body');
      num = 1;
      //alert('開始します');
    }

		var progress = load(num);
		$('#___overlay').text(idolname[num-1]+'の400位確認中…');
		progress.done(function(data100,dataown){
//			total[year] += price;
			init(num+1);
//			$('#___overlay').remove();
  		fundata[num-1] = data100;
  		if(dataown === null) dataown = 0;
  		ownfundata[num-1] = dataown;
//  		alert(num+':'+fundata[num-1]+'/'+dataown);
//      init(num+1);
		}).fail(function(){
			//test
			$('#___overlay').remove();
			for(i=0;i<50;i++){
			  txt = ':未達:';
			  //if(Number(fundata[i]) < Number(ownfundata[i]) ) txt = '★クリア済み:';
			  finishdata += idolname[i]+ '400位\t' + fundata[i]  + ownfundata[i] +'\n';
			}
			//alert(finishdata);
			
                var dd = new Date();
                finishdata += "※" + dtstring(dd) + ' 集計時点 ' +'\r\n';
			
			     var
                    w = window,
                    d = w.document;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, "fan400");

		});
//		alert(idolname[num-1]+funtext);
	}

	function load(idol) {
		var df = $.Deferred();
		var page = get(idol, 40);
		page.done(function(data){
			var dom = $.parseHTML(data);
			var temp = null;
			var data100 = null;
		  var dataown = null;
			$(dom).find('td.user-list-st').each(function(){
				temp = $(this).text();
				if(temp.match(/400位/) != null) {
//					alert('success:2');
					temp = temp.match(/ファン数\/週.*[0-9]人/);
//					test = idolname[idol-1] + '100位の' + temp ;
//					alert(test);
//					test = temp;
          temp = new String(temp).replace(/,/g, "");
          data100 = temp.match(/[0-9]+/);
				} else if(temp.match(/39[789]位/) != null) {
					temp = temp.match(/ファン数\/週.*[0-9]人/);
          temp = new String(temp).replace(/,/g, "");
          data100 = temp.match(/[0-9]+/);
				}
			});
			$(dom).find('table.pd-all').each(function(){
//			  alert('table.pd-all');
			  temp = $(this).text();
				if(temp.match(/ファン獲得数/) != null) {
//					alert('success:2');
					temp = temp.match(/ファン獲得数.*人/);
//					alert(temp);
          temp = new String(temp).replace(/,/g, "");
          dataown = temp.match(/[0-9]+/);
				}
			});
			
			if(data100 === null) {
				df.reject();
//					alert('success:reject');
			} else {
//					alert('success:resolve:'+temp+test+data100);
				df.resolve(data100,dataown);
			}
		});
		return df.promise();
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

	function get(idol,page) {
		var df = $.Deferred();
		$.ajax({
			url: 'http://imas.gree-apps.net/app/index.php/ranking/producer_idol/segment/2/idol/'+idol+'/rank_page/'+page,
			success: function(data){
				df.resolve(data);
//				alert('success:1');
			}
		});
		return df.promise();
	}

//	if(typeof $ !== 'function') {
//		var d=document;
//		var s=d.createElement('script');
//		s.src='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
//		s.onload=init;
//		d.body.appendChild(s);
//	} else {
		init();
//	}

})();
