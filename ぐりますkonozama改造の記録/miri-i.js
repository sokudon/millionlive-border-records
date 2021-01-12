(function(){
	
	var idolname = [1];
	
	var eventid=  290;//いべんと番号
	var credit = "BY SKDN";
	
	var tyukan= "";
	//var tyukan= "/half";
	
	var uribase ="http://imas.gree-apps.net/app/index.php/event/"+ eventid +"/pvp/question";
	//var uribase = 'http://imas.gree-apps.net/app/index.php/event/' + eventid + '/ranking/general'+tyukan+'?page=';

	
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
			  //finishdata += idolname[i]+ '0位\t' + fundata[i]  +' pt\r\n';
			  finishdata +=  fundata[i];
			}
			var dd = new Date();
			  finishdata += "※" + dtstring(dd) +' 集計時点のほからん' + credit +'\r\n';
			//alert(finishdata);
			
			
        var
             w=window
            ,d=w.document
            ;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, "投票数");

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
			var rank ="";
		  var dataown = null;

			$(dom).find('ul.list-bg').each(function(){
				temp = $(this).text();
				//alert(temp);
				if( temp.match(/ラウンジ名/) != null) {
				rank = temp.match(/[0-9]+票/gm);
				var sum = 0;
				//alert(rank);
				for(var i=0;i<rank.length;i++){
				sum = sum + parseInt(rank[i].replace("票",""));
				}
				
				temp = temp.replace(/\t/gm,"").replace(/^\r?\n/gm,"")
          		data100 += temp+ "\r\n投票合計" +sum;
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
			url: uribase ,
			success: function(data){
				df.resolve(data);
			}
		});
		return df.promise();
	}


})();
