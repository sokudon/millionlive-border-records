(function(){
	
	//var alpha = [null,"ちーむA","ちーむB","ちーむC","ちーむD","ちーむE","ちーむF","ちーむG","ちーむH","ちーむI","ちーむJ"];//てーむのあるふぁべっと
	var alpha = [null,
"A,秋月律子,レジェンドデイズ",
"B,真壁瑞希,乙女ストーム",
"C,野々原茜,クレシェンドブルー",
"D,ジュリア,エターナルハーモニー",
"E,松田亜利沙,リコッタ",
"F,宮尾美也,灼熱少女",
"G,三浦あずさ,BIRTH",
"H,双海真美,ミックスナッツ",
"I,高山紗代子,ミルキーウェイ",
"J,百瀬莉緒,ARRIVE",
]
	

var member = [
["1100000000000026770","zumi@1FA"],
["1100000000000034715","akira95"],
["400000000000010120","DEKKER-P"],
["1300000000000004142",".*?どん@したらば"],
["1100000000000007246","しーどる"],
["300000000000011012","オルフェウス@同僚募集中"],
["700000000000057776","Lad"],
["500000000000057187","にょづき"],
["100000000000003471","しん"],
["800000000000099802","Suuki"],
["400000000000052323","ミリ＠踏み台P/1FA"],
["200000000000001419","T-M:翼、育、エレナ、茜他の埋め同僚募集中。出雪歩全所持、最上ほぼ所持他"],
["-1","自分対象のID"]
];
	
    var yourID= -1;
    var yourName = "自分のIDです";
	
	//ぺーじを作製	
    var idolid = [1,2,3,4,5,6,7,8,9,10];//ちーむばんごう
    var idolnamebase = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];//らんきんぐのぺーじ
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
  		if(num<=idolname.length && alpha[idolidmk[num - 1]]!=undefined){
		$('#___overlay').text(alpha[idolidmk[num - 1]]+ idolname[num - 1] + '0位確認中…');
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
var st="";

for(var i=0;i<member.length;i++){
var regexp = new RegExp('^.*?\tID'+member[i][0] + '\t(.+)', 'gm');
if(finishdata.match(regexp)!=null){
st = st + finishdata.match(regexp) + "\n";
}
else{
//st = st + member[i][1] + "さんは見つかりませんでした、1200位範囲外\r\n"
}
}
st = st.replace(/^[0-9]+([0-9]{5}位)/gm,"$1");
var s=st.split("\n");

s.sort();

st="";

for(var i =0 ; i<s.length;i++){
st = st + s[i] + "\r\n";
}
			
                var dd = new Date();
                finishdata = "ちーむめい\tらんく\tID\tプロヂューサー名\tすこあ※" + dtstring(dd) + ' 集計時点 '+ credit +'\r\n' +finishdata;
                st   += "※" + dtstring(dd) + ' 集計時点 '+ credit +'\r\n';
                finishdata =st + "\r\n"+ finishdata;
                
                alert(st);
                
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

            var urank="";
            var uid="";
            var uname="";
            var upt="";
            
            
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
                    }                    upt = temp.match(/(([0-9]+,)*[0-9]+)&nbsp/);
                    data100 = data100 +alpha[idol]+"\tRANK" +("00"+ urank).slice(-4)  + "\tID"+ uid[1]  + "\t"+ uname[1]  + "\t"+ upt[1].replace(/,/g,"")  + "\r\n";
                }
            })
			
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
