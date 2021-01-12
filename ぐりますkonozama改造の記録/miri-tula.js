(function(){
	
	var alpha = [null,"A","B","C","D","E","F","G","H","I","J"];//てーむのあるふぁべっと
	
	//ぺーじを作製	
    var idolid = [1,2,3,4,5,6,7,8,9,10];//ちーむばんごう
    var idolnamebase = [14,15,16];//5,10,15,20,25,30];//らんきんぐのぺーじ 1だと10位まで
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
    
    
	
	var eventid=  271;//いべんと番号
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
   d.writeln("<pre>"+finishdata +"</pre>");
   
        var
             w=window
            ,d=w.document
            ;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, dtstring(dd).replace(/[/ :\-]/g, ""));

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

			$(dom).find('td.user-list-st').each(function(){
				temp = $(this).text();				
				if( temp.match(/位/) != null) {
				rank = temp.match(/[0-9]+位/);
				temp = temp.match(/pt(.*?)pt/);
          		temp = new String(temp).replace(/,/g, "");
          		data100 += "チーム" +alpha[idol] + rank + "\t"
          				+temp.match(/[0-9]+/)
          				+ " pt\r\n"	;
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
			url: 'http://imas.gree-apps.net/app/index.php/event/'+ eventid +'/ranking/ula?page='+ page +'&team=' +team,
			success: function(data){
				df.resolve(data);
			}
		});
		return df.promise();
	}


})();
