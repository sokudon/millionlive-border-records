(function(){
	

	var idolname=[1];
	//for(var i=0;i<130;i++){idolname[i]=i+1;}
	
	var credit = "BY SKDN";
	

	
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
		$('#___overlay').text(idolname[num-1]+'頁あるばむ確認中…');
		}
		progress.done(function(data100,dataown){
		
		
			for(var w=0;w<100000000;){
			w++;
			}
			
  		if(num>idolname.length){
			$('#___overlay').remove();
			for(i=0;i<idolname.length;i++){
			  finishdata +=  fundata[i];
			}
			var dd = new Date();
        var
             w=window
            ,d=w.document
            ;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, "ml_have");

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

			if(idol==1){
			$(dom).find('ul.clearfix').each(function(){
				temp = $(this).html();
				//alert(temp);
				if( temp.match(/page\/[0-9]+/) != null) {
				var al = temp.match(/page\/[0-9]+/gm);
				var len = al[al.length-1].match(/[0-9]+/);
				for(var i=0;i<len;i++){idolname[i]=i+1;}
				alert(al);
				}
			});
			
			}
			$(dom).find('div.list-bg').each(function(){
				temp = $(this).html();
				//alert(temp);
				if( temp.match(/id\/[0-9]+/) != null) {
				var al = temp.match(/id\/[0-9]+/gm);				
				for(var i=0;i<al.length;i++){
          		data100 += al[i].match(/[0-9]+/) +"\r\n";
          		}
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
			url: 'http://imas.gree-apps.net/app/index.php/album/all_card_select/attribute/0/rare/0/page/'+idol,
			success: function(data){
				df.resolve(data);
			}
		});
		return df.promise();
	}


})();
