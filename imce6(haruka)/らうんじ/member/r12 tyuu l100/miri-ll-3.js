(function(){
	
//R12
    var idolname =[
["400000000000000749"],
["900000000000000066"],
["1300000000000001529"],
["200000000000001454"],
["1500000000000005236"],
["700000000000005293"],
["200000000000000623"],
["700000000000004707"],
["1100000000000003942"],
["1100000000000000441"],
["1701"],
["200000000000000655"],
["500000000000005337"],
["1500000000000004612"],
["500000000000005285"],
["1000000000000004988"],
["5183"],
["900000000000000466"],
["1300000000000004000"],
["1500000000000003422"],
["500000000000004836"],
["600000000000004924"],
["400000000000004740"],
["1500000000000004429"],
["1000000000000005146"],
["100000000000003573"],
["700000000000000877"],
["1000000000000004785"],
["8"],
["3583"],
["600000000000000108"],
["500000000000004731"],
["800000000000000197"],
["1000000000000001661"],
["700000000000005166"],
["1100000000000005161"],
["1100000000000004878"],
["600000000000005167"],
["400000000000005309"],
["700000000000000909"],
["1200000000000001065"],
["400000000000004988"],
["700000000000005219"],
["1300000000000004534"],
["1500000000000003961"],
["200000000000005235"],
["1200000000000005269"],
["1400000000000003630"],
["100000000000000087"],
["1500000000000005117"],
["1000000000000001141"],
["1500000000000004754"],
["400000000000004378"],
["100000000000001063"],
["500000000000000080"],
["600000000000004688"],
["1200000000000004966"],
["200000000000005261"],
["400000000000001061"],
["1000000000000005059"],
["200000000000001168"],
["400000000000005285"],
["1300000000000001517"],
["400000000000004049"],
["1300000000000003177"],
["900000000000005056"],
["500000000000005327"],
["900000000000005103"],
["1400000000000000733"],
["1124"],
["400000000000000946"],
["900000000000001329"],
["600000000000001170"],
["200000000000000273"],
["400000000000001798"],
["200000000000005258"],
["200000000000005200"],
["1400000000000000239"],
["100000000000000861"],
["300000000000001182"],
["800000000000003230"],
["400000000000001425"],
["900000000000000376"],
["400000000000000741"],
["1400000000000004315"],
["200000000000000245"],
["1100000000000005166"],
["1000000000000004549"],
["200000000000000460"],
["100000000000004736"],
["300000000000005025"],
["400000000000000967"],
["100000000000003113"],
["600000000000001079"],
["774"],
["1000000000000002719"],
["1725"],
["103"],
["200000000000001721"],
["200000000000000983"]

];


var lgp =7;//らうんじメンバー一覧のぺーじ
	var credit = "BY SKDN";
	
	var len=idolname.length;
	var offset=0;//1000 * 8  ; //+ (1000 -len);
	
	var num, funtext = '';
	
	var fundata = new Array(len);
	var ownfundata = new Array(len);
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

  		
			//ウェイトショリ,ぼだとってるほう　おそめ
			for(var w=0;w<300000000;){
			w++;
			}
			
		var progress = load(idolname[offset+num-1]);
  		if(num<=len){
		$('#___overlay').text(idolname[offset+num-1]+ ','+num +'番' + lgp +'ページ確認中…');
		}
		progress.done(function(data100,dataown){
		
		
  		if(num>len){
			$('#___overlay').remove();
			for(i=0;i<len;i++){
			  finishdata +=  fundata[i]  +'\r\n';
			}
			var dd = new Date();
			  finishdata += "※" + dtstring(dd) +' 集計時点のポイントです' + credit +'\r\n';
			//alert(finishdata);
			
			
        var
             w=window
            ,d=w.document
            ;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, dtstring(dd).replace(/[/ :\-]/g, "") +"-p"+ lgp+"-"+ (offset+1)+"-"+ (offset+1+len));
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

	function load(idol) {
	
		var df = $.Deferred();
		
		if(num >len) {df.reject();}
		
		var page = get(idol,idol);
		page.done(function(data){
			var dom = $.parseHTML(data);
			var temp = null;
			var data100 ="";
			var dataown="";
			var uid ="";
			var uname ="";
			
			$(dom).find('td').each(function(){
				temp = $(this).html();
				if( temp.match(/user/) != null  && temp.match(/>(.*?)</) !=null) {
				uid = temp.match(/id\/([0-9]+)"/);
				uname = temp.match(/>(.*?)</)
          		data100 = data100
          		+ 'LID;' + idol + '\tID;' 
          		+ uid[1] + "\t"
          		+ uname[1]  + "\r\n";
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

	function get(idol,idol) {
		var df = $.Deferred();
		$.ajax({
			url: 'http://imas.gree-apps.net/app/index.php/lounge/memberlist/id/' + idol + '/sort/11/page/'+ lgp,
			success: function(data){
				df.resolve(data);
			}
		});
		return df.promise();
	}


})();
