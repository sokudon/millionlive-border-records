(function(){
	
	var idolname = [1]; //,50,60,100,200,1000,2000,3000,1];//ULA
	
	var eventid=  270;//いべんと番号
	var credit = "BY SKDN";
	
	var uribase="http://imas.gree-apps.net/app/index.php/event/271/ula_final/selectTeam/from/top";
	
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
			  
			  finishdata += credit +'\r\n';//"※" + dtstring(dd) +' 集計時点のポイントです' + 
			  
			  
			  
   
   //var d=window.open().document;
   //d.writeln("<pre>"+finishdata +"</pre>");
   
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
			var rank ="";
		  var dataown = null;

		if(data.match(/memberStatus/) != null) {
				temp = data;
				
				var start=data.indexOf("memberStatus");
			    var end=data.indexOf("mySwiper");
			    
			    temp=temp.substring(start,end);
			    temp = temp.replace(/var.+/gm,"");
			    temp = temp.replace(/memberStatus.+/gm,"");
			    temp = temp.replace(/unitLevel.+/gm,"");
			    temp = temp.replace(/centerIdol.+/gm,"");
			    temp = temp.replace(/unitStatus.+/gm,"");
			    temp = temp.replace(/user.+/gm,"");
			    temp = temp.replace(/<.*?>/gm,"");
			    temp=temp.replace(/unitName:/gm,"");
			    temp=temp.replace(/eventRewardBorder:/gm,"");
			    temp=temp.replace(/eventRewardBorderPoint:/gm,"");
			    temp=temp.replace(/rankingTime: /gm,"");
			    temp=temp.replace(/};/gm,"");
			    temp=temp.replace(/'/gm,"");
			    temp=temp.replace(/^[ \t]+/gm,"");
			    temp=temp.replace(/^\r?\n/gm,"");
			    temp=temp.replace(/,\r?\n/gm,"\t");
			    temp=temp.replace(/&nbsp;/gm," ");
			    temp=temp.replace(/pt\t/gm,"pt\n");
			    temp=temp.replace(/(.*?)\t(.*?)\t/gm,"$2位の$1 pt\t");
				
				data100 = temp;
		}
			
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
			url: uribase,
			success: function(data){
				df.resolve(data);
			}
		});
		return df.promise();
	}


})();
