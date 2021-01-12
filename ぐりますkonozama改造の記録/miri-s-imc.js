(function(){
	
	var idolname = [10,50,120,130,100,1,2,30,200,300,400,500,1000,1500,2000,3000];//らんくぜんぶ
	//var idolname = [5,50,60,100,200,1000,2000,3000,1];//ULA
	
	var eventid=  291;//いべんと番号
	var credit = "BY SKDN";
	var google ="https://script.google.com/macros/s/AKfycbztpVwaHTfc13llgNbipA2LCA-LNhn9wwk4xjm4irkbcofvS8k/exec";

	
	var tyukan= "";  //"/half";
	var ranksel=["general","lounge"];
	
	var IMCE=0;
	if(IMCE == 0 ){
	 var rankim=[1,2,3,10,30,100]
	 idolname= idolname.concat(rankim);
	}
	
	var uribase = 'http://imas.gree-apps.net/app/index.php/event/';

	
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

  		if(num>idolname.length-rankim.length){
  		IMCE=1;
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
			 var ten=fundata[idolname.length-6].replace(/,/g,"").match(/ラウンジ10位\t([0-9]+)/);
			 var ele=fundata[idolname.length-5].replace(/,/g,"").match(/ラウンジ11位\t([0-9]+)/);
			
			  finishdata +=  "ラウンジ10位÷35\t" + addc((ten[1]/35).toFixed(0))
			  				+" pt\r\nラウンジ11位÷35\t" + addc((ele[1]/35).toFixed(0)) +' pt\r\n';
			  
			var dd = new Date();
			  finishdata += "※" + dtstring(dd) +' 集計時点のほからん\r\n';
			//alert(finishdata);
			
			
        var
             w=window
            ,d=w.document
            ;
                //だうんろーどしょり   
                //location.href="data:attachment/csv,charset=utf-8,download='somedata.csv'"+encodeURIComponent(finishdata)
                TextDL(finishdata, dtstring(dd).replace(/[/ :\-]/g, ""));

var js=JSON.stringify(mkjs(finishdata));
var BD= {};
BD.BD_JSON=js;

//alert(js);

request = $.ajax({
			url: google,
			type: "post",
			data: BD
		});

                return false;
            }

            init(num + 1);

            fundata[num - 1] = data100;

        });

    }
    
    

    function mkjs(s) {
    var JS={};
    var lf=s.split("\n");
    for(var i=0;i<lf.length;i++){
    var st =lf[i];
    if(st.match(/^(ラウンジ)?[0-9]+位(÷35)?/)!=null){
    var r=st.match(/^(ラウンジ)?[0-9]+位(÷35)?/);
    var m=st.match(/[0-9]+(,[0-9]+)* /);
    JS[r[0]]=m[0].replace(/,/gm ,"");
     }
     if(st.match(/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}/)!=null){
     var m=st.match(/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}/);
    JS.date=m[0];
     }
     
     }
    
    return JS;
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


function addc(a) {
    return String(a).replace(/(\d)(?=(\d\d\d)+(?!\d))/gm, '$1,');
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
		  
            var urank="";
            var uid="";
            var uname="";
            var upt="";

			$(dom).find('td').each(function(){
				temp = $(this).html();				
                if (temp.match(/txt-sub2/) != null  && temp.match(/(\t1?1|765|0|\t[1-9]999)位/)!= null) {
			     
			     urank = temp.match(/[0-9]+位/);
			     if(IMCE==1){
			     urank ="ラウンジ" + urank;
			     }
                 upt = temp.match(/(([0-9]+,)*[0-9]+)&nbsp/);
                 data100 = data100 + urank  + "\t"+  upt[1]  + " pt\r\n";
				//data100 = data100 + urank  + "\t"+  upt[1].replace(/,/g,"")  + " pt\r\n";

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
			url: uribase + eventid + '/ranking/'+ ranksel[IMCE] + tyukan+'?page=' + idol,
			success: function(data){
				df.resolve(data);
			}
		});
		return df.promise();
	}


})();
