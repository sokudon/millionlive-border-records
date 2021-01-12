(function(){
	

    var idolname =[
"1701",
"400000000000000749",
"1500000000000005373",
"100000000000005060",
"1100000000000000441",
"300000000000004806",
"300000000000005227",
"700000000000004707",
"1000000000000005146",
"500000000000005337",
"5183",
"200000000000005393",
"1500000000000005236",
"1000000000000004988",
"200000000000001168",
"200000000000005235",
"100000000000003573",
"500000000000005285",
"1000000000000004785",
"200000000000005261",
"700000000000005219",
"600000000000004925",
"500000000000000080",
"3583",
"1500000000000003961",
"400000000000004049",
"1000000000000001661",
"900000000000005056",
"1100000000000004878",
"1400000000000004882",
"400000000000004740",
"600000000000001170",
"1400000000000003630",
"1000000000000001141",
"600000000000001079",
"1200000000000005386",
"1100000000000005161",
"500000000000004977",
"1300000000000004534",
"700000000000000909",
"600000000000004924",
"4569",
"500000000000004731",
"1000000000000005059",
"300000000000005025",
"200000000000000655",
"900000000000000066",
"2285",
"700000000000000877",
"700000000000003219",
"1200000000000001457",
"600000000000002383",
"900000000000000376",
"1000000000000002719",
"400000000000000741",
"5102",
"500000000000002640",
"200000000000000302",
"700000000000001132",
"1300000000000000946",
"500000000000005327",
"103",
"1124",
"200000000000001454",
"400000000000001061",
"300000000000004692",
"1500000000000000252",
"100000000000001063",
"384",
"3704",
"300000000000001182",
"1200000000000005269",
"900000000000001329",
"200000000000001721",
"900000000000005103",
"500000000000004166",
"400000000000005285",
"1400000000000005126",
"1100000000000003553",
"400000000000004378",
"200000000000000273",
"200000000000003254",
"774",
"1400000000000000221",
"1300000000000004839",
"900000000000001214",
"1100000000000003942",
"1200000000000000622",
"100000000000004736",
"900000000000001612",
"1200000000000001065",
"200000000000000983",
"300000000000000465",
"1400000000000000239",
"1725",
"1200000000000004966",
"1400000000000004909",
"1100000000000005166",
"1300000000000003872",
"1400000000000004820",

];

var lgp =2;//らうんじメンバー一覧のぺーじ
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
			for(var w=0;w<200000000;){
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
