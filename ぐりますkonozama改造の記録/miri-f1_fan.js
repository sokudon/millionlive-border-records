(function(){
	
	//var idolname = [10,50,120];//らんきんぐのぺーじ
	
	//var idolname = [10,30,50,120,130,100];//ぼだ
	//var idolname = [10,50,120,130,100,1,2];//mb
	//var idolname = [5,50,100,200,1000,2000,3000];//ULA
	//var idolname = [1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000];//あくてぃぶ
	
	var idolname=[];
	for(var i=0;i<40;i++){idolname[i]=1001+100*i;}
	
	var eventid=  275;//いべんと番号
	var credit = "BY SKDN";
	
	//http://imas.gree-apps.net/app/index.php/ranking/producer/segment/1/rank_page/1000
	
	
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

  		
		var progress = load(idolname[num-1]);
  		if(num<=idolname.length){
		$('#___overlay').text(idolname[num-1]+'0位確認中…');
		}
		progress.done(function(data100,dataown){
		
		
  		if(num>idolname.length){
			$('#___overlay').remove();
			for(i=0;i<idolname.length;i++){
			  finishdata += idolname[i]+ '0位\t' + fundata[i]  +' pt\r\n';
			}
			var dd = new Date();
			  finishdata += "※" + dtstring(dd) +' 集計時点のふぁんすう' + credit +'\r\n';
			alert(finishdata);
			
			
        var
             w=window
            ,d=w.document
            ;
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
		
		if(num >idolname.length) {df.reject();}
		
		var page = get(idol,idol);
		page.done(function(data){
			var dom = $.parseHTML(data);
			var temp = null;
			var data100 ="";
		  var dataown = null;

			$(dom).find('td.user-list-st').each(function(){
				temp = $(this).text();				
				//alert(temp)
				if( temp.match(/週.*?人/) != null) {
				temp = temp.match(/(.*?)人/);
          		temp = new String(temp).replace(/,/g, "");
          		data100 = temp.match(/[0-9]+/);
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
			url: 'http://imas.gree-apps.net/app/index.php/ranking/producer/segment/1/rank_page/' + idol,
			success: function(data){
				df.resolve(data);
			}
		});
		return df.promise();
	}


})();
