(function() {

var idols = [
	'天海春香','如月千早','星井美希','萩原雪歩','高槻やよい','菊池真','水瀬伊織','四条貴音','秋月律子','三浦あずさ',
	'双海亜美','双海真美','我那覇響','春日未来','最上静香','伊吹翼','田中琴葉','島原エレナ','佐竹美奈子','所恵美',
	'徳川まつり','箱崎星梨花','野々原茜','望月杏奈','ロコ','七尾百合子','高山紗代子','松田亜利沙','高坂海美','中谷育',
	'天空橋朋花','エミリー','北沢志保','舞浜歩','木下ひなた','矢吹可奈','横山奈緒','二階堂千鶴','馬場このみ','大神環',
	'豊川風花','宮尾美也','福田のり子','真壁瑞希','篠宮可憐','百瀬莉緒','永吉昴','北上麗花','周防桃子','ジュリア'
	];

    var eventid = 281; //いべんと番号
    var credit = 'BY SKDN';
    
    var decideidol=["北沢志保","望月杏奈","福田のり子"];
    var idolid= [];
        for(var i=0;i<decideidol.length;i++){
        for(var k=0;k<idols.length;k++){
    if(decideidol[i]==idols[k]){idolid[i]=k+1;}}
    }
    
    var idolname=[];
    var idolidmk=[];
    var startpage=1;
    var interval=11;//ぺーじ分で折り返し
    
    var idolnamebase = [1,10];//らんきんぐのぺーじ
    //var idolnamebase=[];for(var i=0;i<interval;i++){idolnamebase[i]=i+startpage;}
    interval=idolnamebase.length;
    var total=interval*idolid.length;
    
    for(var i=0,k=0,l=0;i<total;i++,k++){
    if(k==interval){k=0;l++;}
    idolname[i]=idolnamebase[k];
    idolidmk[i]=idolid[l];
    }
    
	//view-source:/ranking/grow_idol/idol/33?page=1
	 var uribase = 'http://imas.gree-apps.net/app/index.php/event/' + eventid + '/ranking/grow_idol/idol/';

    //var uribase = 'http://imas.gree-apps.net/app/index.php/event/' + eventid + '/ranking/general?page=';
    //var IDURI ="http://imas.gree-apps.net/app/index.php/friend/id_search";
    //var NAMEURI = "http://imas.gree-apps.net/app/index.php/mypage/mydata";
    
    var yourID= "-1";   //-1;
    var yourName = "自分REST@RT";//"自分REST@RT";
    
//http://imas.gree-apps.net/app/index.php/event/258/ranking/general?page=
//http://imas.gree-apps.net/app/index.php/event/258/ranking/friend/?page=
//http://imas.gree-apps.net/app/index.php/event/258/ranking/lounge_member/?page=
//http://imas.gree-apps.net/app/index.php/ranking/lounge/segment/2/rank_page/1

    var num, funtext = '';
    var fundata = new Array(idolname.length);
    var ownfundata = new Array(idolname.length);
    var finishdata = '';

    init();

    function init(num) {
        if (typeof num !== 'number') {
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


        var progress = load(idolidmk[num - 1],idolname[num - 1]);
        if (num <= idolname.length) {
            $('#___overlay').text(idols[idolidmk[num - 1]-1] +","+ idolname[num - 1] + '0位確認中…');
        }
        progress.done(function(data100, dataown) {


            if (num > idolname.length) {
                $('#___overlay').remove();
                for (i = 0; i < idolname.length; i++) {
                    finishdata +=  fundata[i] ;
                }
                var dd = new Date();
                finishdata += "※" + dtstring(dd) + ' 集計時点 '+ credit +'\r\n';
                //alert(finishdata);

var html ="<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"ja\" lang=\"ja\"><meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\"><meta http-equiv=\"Content-Script-Type\" content=\"text/javascript\"><STYLE type=\"text/css\"><!--textarea {max-width:400px;max-height:200px;resize: none;}--></STYLE><title>みりますRTB計算_あんりみてっど(LVDON)</title></head><body><script type=\"text/javascript\" src=\"./LIB/google.js\"></script><!--日付変更にmomentjisを使用、ろーかるで動かすにはhttp://momentjs.com/　が必要--><script type=\"text/javascript\" src=\"./LIB/moment-with-locales.js\"></script><script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js\"></script><script type=\"text/javascript\" src=\"./LIB/xdomain.js\"></script><script type=\"text/javascript\"><!--function stringfilter(text){var RTB = [];//１日分なら配列1500ぐらい,いべ最大13日*24時間*60分=配列18720var rt= document.trg.event.options[document.trg.event.selectedIndex].text;var tf=document.tt.time.options[document.tt.time.selectedIndex].text;var day_index=document.DD.dy.selectedIndex;var tz=document.tzone.owata.options[document.tzone.owata.selectedIndex].text;var BYEAR=document.YN.yn.options[document.YN.yn.selectedIndex].text;var BYEARN=\"\";var headyear =text.match(/\[(201[0-9])\]/);if(headyear!=null){BYEAR=headyear[1];}var detectday =[\"\",\"ddd\",\"dddd\",\"dddJ\",\"(ddd)J\",\"（ddd）J\",\"ddddJ\",\"(dddd)J\",\"（dddd）J\"];var tosikosi=false;if(text.indexOf(\"※12/31\")>0 && text.indexOf(\"※01/01\")>0 ){tosikosi = true;}var tzm =tz.match(/-?\d+/g);var t_offset=0;var t_offset_min=0;if(tzm!=null){t_offset=parseInt(tzm[0]);if(tzm[1]!=null){t_offset_min=(parseInt(tzm[1]));if(t_offset<0){t_offset_min=-t_offset_min;}var bym =BYEAR.match(/-?\d+/);if(bym!=null){var y=parseInt(bym[0]);BYEARN=String(y+1);}var TYEAR=BYEAR+\"/\";if(tf==null){tf=\"YYYY/MM/DD HH:mm\"}tf=tf.replace(\"2014\",\"YYYY\").replace(\"14\",\"YY\").replace(\"H\",\"[H]\").replace(\"26\",\"Ｈ\").replace(\"02\",\"MM\").replace(\"27\",\"DD\").replace(\"17:00\",\"HH:mm\").replace(\"17時00分\",\"HH時mm分\");moment.lang(\"en\");if(document.DD.dy.selectedIndex>0){var tfs= tf.split(\"HH\");tf=tfs[0]+detectday[document.DD.dy.selectedIndex]+\" HH\"+tfs[1];if(tf.indexOf(\"J\")>0){tf=tf.replace(\"J\",\"\");moment.lang(\"ja\");}var t_of=document.output.elements[6].checked;if(t_of){rt= rt.replace(\"[1-46-9]\",\"[02-57-9]\").replace(\"[1-9])\",\"[02-9])\");}if(document.trg.event.selectedIndex>0){text=text.replace(new RegExp(rt, \"g\"), \"XX:XX\");}text=text.replace(new RegExp(\"[2-9]位\",\"gm\"),\"\");text=text.replace(new RegExp(\"91位\",\"gm\"),\"\");text=text.replace(new RegExp(\"$2	$1	\",\"gm\"),\"\");text=text.replace(new RegExp(\"\$2	\$1	\",\"gm\"),\"\");text=text.replace(new RegExp(\"\\$2	\\$1	\",\"gm\"),\"\");var num_lf = new RegExp(\"([0-9][ 　\t]+pt)[ 　\t]+\", \"g\");text=text.replace(num_lf,\"$1 \n\").replace(new RegExp(\"[ 　\t]+([0-9]+位)\",\"gm\"),\"$1\")//.replace(new RegExp(\"^[ 　\t]+\",\"gm\"),\"\").replace(new RegExp(\"\n+\",\"gm\"),\"\n\");var lf = text.split(\"\n\");var str =\"\";var btmp=[];var head=[\"1位\",\"100位\",\"1200位\",undefined,undefined,undefined];var mkhead=[\"idol\",\"idol2\",\"idol3\",\"idol4\",\"idol5\",\"idol6\",\"idol7\",\"idol8\",\"idol9\"]var regrank = new RegExp(\"(.*?(1|10|100))位\t([0-9]+\.[0-9]+)\");var regownpace = new RegExp(\".*?pt[ 　\t]+([0-9]+(,[0-9]{3})*)[ 　\t]+pt\");var regdt = new RegExp(\"※([0-9]{1,2}/[0-9]{1,2}).*?([0-9]{1,2}:[0-9]{1,2}) 集計時点\");var k=0,t=0;var MAXLEN=12;for(var i=0;r<MAXLEN;i++){btmp[i]=0;}//なんとか位を拾うvar mm=text.match(/(.*?)(1|10|100)位\t([0-9]+\.[0-9]+)/gm);if(mm !=null){for(var i=0;i<MAXLEN;i++){var ml=mm[i].match(/(.*?)(1|10|100)位/);head[i]=ml[0];if(i>0){if(head[0]==ml[0]){head[i]=undefined;break;}}}MAXLEN=head.length;var seek_DB=document.getElementById(\"seek\").checked;var hd=document.output.elements[7].checked;for( var i = 0 , l = lf.length; i < l ; i++ ){str= lf[i];if(str.match(regrank)!=null){var xx = str.match(regrank);if(t<MAXLEN){if(seek_DB){for(var j=0;j<9;j++){if(head[j]==xx[1]+\"位\"){break;}else if(head[j]==\"NULL\"){head[j]=xx[1]+\"位\";}btmp[j]=xx[3];}else{btmp[t]=xx[3];}if(hd){head[t]=xx[1]+\"位\";}t++;}else if(str.match(regownpace)!=null){var xx = str.match(regownpace);btmp[MAXLEN-1]=rmc(xx[1]);}else if(str.match(regdt)!=null){var xx = str.match(regdt);if(tosikosi==true){if(str.indexOf(\"※01/01\")>=0){TYEAR=BYEARN+\"/\";}else if(str.indexOf(\"※12/31\")>=0){TYEAR=BYEAR+\"/\";}RTB[k] = [];RTB[k][0]=TYEAR+xx[1]+\" \"+xx[2];for(var r=1;r<MAXLEN;r++){RTB[k][r]=btmp[r-1];btmp[r-1]=undefined;}if(k==0){k++;}else if(RTB[k][0]!=RTB[k-1][0]){k++;}t=0;}else if(str!=null){t=0;}if(k>0 && RTB[RTB.length-1][0]==RTB[RTB.length-2][0]){RTB.length--;}var swap=document.tsort.event.selectedIndex;if(document.tsort.event.selectedIndex>0){RTB.sort(cmp_dt2);}else{RTB.sort(cmp_dt);}var st=\"\";var l=1;var sheet=document.TZ.db.options[document.TZ.db.selectedIndex].text;for(var k=0;k<RTB.length;k++){st += \"\\"name\\" : \\"\" +\"きずな\" +\"\\",\r\n\"+\"\\"date\\" : \\"\" + RTB[k][0] +\"\\",\r\n\";for(var i=1;i<MAXLEN;i++){st += \"\\"\" + mkhead[i-1] + \"\\":\" + RTB[k][i] + \",\";}st += \"},{\";}st=st.slice(0,-4);st = st.replace(new RegExp(\",}\", \"gm\"), \"}\");st = st.replace(new RegExp(\"undefined\", \"gm\"), \"null\");st = \"[{\r\n\" + st +\"}]\";document.getElementById(\"BD_JSON\").value = st;return false;}function cmp_idol(a, b) {if( a.a < b.a ) return -1;if( a.a > b.a ) return 1;return (moment(a,\"YYYY/MM/DD HH:mm\") - moment(a,\"YYYY/MM/DD HH:mm\"));}function cmp_dt(ldt, rdt) {return moment(ldt,\"YYYY/MM/DD HH:mm\") - moment(rdt,\"YYYY/MM/DD HH:mm\");}function cmp_dt2(ldt, rdt) {return moment(rdt,\"YYYY/MM/DD HH:mm\") - moment(ldt,\"YYYY/MM/DD HH:mm\");}function swap_cal(c,a){return (c)?-a:a;}var cmsuuji=function(c,d){return  (c!=true) ? d : addc(d);}function addc(a){return String(a).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, \"$1,\" );}function rmc(a){return parseInt(a.replace(new RegExp(\",\", \"g\"), \"\"));}function PADLEFT(s,r,k,pt){var n=String(s).length;if(pt){if(n<k){for(var i=0;i<k;i++){s= r+s;}if(s.length>k){if(s.indexOf(\"-\")>=0){s=\"-\"+s.replace(\"-\",\"\");}if(s.indexOf(\"nbsp\")>0){s=s.slice(-n-(k-n)*6);}else{s=s.slice(-k);}return s;}function tmcv(dt,tf,t_offset,t_offset_min){var m = moment(dt,\"YYYY/MM/DD HH:mm\");	if(t_offset!=9 || t_offset_min!=0){m.add(\"hours\",-9);m.add(\"hours\",t_offset);m.add(\"minutes\",t_offset_min);}if(tf.indexOf(\"d\")>=0){var day= tf.match(/d+/g);if(day!=null){tf=tf.replace(new RegExp(day[0],\"g\"),\"[\"+m.format(day[0])+\"]\");}if(tf.indexOf(\"Ｈ\")>=0){tf=tf.replace(\"Ｈ\",\"YY\");m.add(\"years\", 12);}return m.format(tf);}function rmhtml(a){a=a.replace(new RegExp(\"\</td\>\", \"gm\"), \"\t\").replace(new RegExp(\"\<br/?\>\", \"gm\"), \"\n\").replace(new RegExp(\"\</p\>\", \"gm\"), \"\n\").replace(new RegExp(\"\</tr\>\", \"gm\"), \"\n\").replace(new RegExp(\"\<.*?\>\", \"gm\"), \"\");return a;}function fix_url(a){if(a.indexOf(\"http\")>=0){}else if(a.indexOf(\"ttp\")>=0){a = \"h\"+a;}else{a= \"http\"+a;}return a;}function parseData(data){stringfilter(rmhtml(data));}function getweb(urls){var local= new RegExp(\"(\.\/[a-zA-Z0-9_\-]+)\.txt\");var uri= new RegExp(\"(h?ttps?)?(:\/\/[-_.!~*\\"()a-zA-Z0-9;\/?:\@&=+\$,%#]+)\");var lcmm=urls.match(local);var urlm=urls.match(uri);var text=\"\";var your_url=\"\";if(lcmm!=null){your_url=lcmm[0];$.get(your_url,parseData);}else if(urlm!=null){your_url=fix_url(urlm[0]);text =\"\";$.ajax({url: your_url,type: \"GET\",timeout: 10000,success: function(res) {text = res.responseText;stringfilter(rmhtml(text));}});}return false;}function checkJSON(){try {var JSON_OK= JSON.parse(document.getElementById(\"BD_JSON\").value);return confirm(\"送信しても良いですか？\");} catch(e){alert(e);return false;}}--></script><a href=\"./index.html\">TOP</a><br><H1>みりますRTB計算(LVDON)</H1><p>いべとっぷのぼだすこあ部分を貼り付け,<a href=\"#BR\">動作確認済ブラウザ</a><br>ぼだ：「個人ランキング獲得ポイント～集計時点のポイント」　まで<br>自速:「個人ステータス～集計時点の順位」　まで<br></p><form name=\"YN\"><b>開始年</b><br><select name=\"yn\"><option value=\"\">2016</option><option value=\"\">2015</option><option value=\"\">2014</option></select></form><form name=\"tt\"><b>日付時刻表記</b><br><select name=\"time\"><!-- みります1周年 --><option selected=\"selected\" value=\"\">2014/02/27 17:00</option><option value=\"\">02/27 17:00</option><option value=\"\">17:00</option><option value=\"\">2014-02-27 17:00</option><option value=\"\">2014年02月27日 17時00分</option><option value=\"\">2014/27/02 17:00</option><option value=\"\">2014-27-02 17:00</option><option value=\"\">14/02/27 17:00</option><option value=\"\">14-02-27 17:00</option><option value=\"\">26/02/27 17:00</option><option value=\"\">26-02-27 17:00</option><option value=\"\">H26/02/27 17:00</option><option value=\"\">H26-02-27 17:00</option><option value=\"\">14/27/02 17:00</option><option value=\"\">14-27-02 17:00</option><option value=\"\">26/27/02 17:00</option><option value=\"\">26-27-02 17:00</option><option value=\"\">H26/27/02 17:00</option><option value=\"\">H26-27-02 17:00</option><option value=\"\">14年02月27日 17時00分</option><option value=\"\">H26年02月27日 17時00分</option><option value=\"\">平成26年02月27日 17時00分</option><option value=\"\">02/27/2014 17:00</option><option value=\"\">02-27-2014 17:00</option><option value=\"\">27/02/2014 17:00</option><option value=\"\">27-02-2014 17:00</option><option value=\"\">02/27/14 17:00</option><option value=\"\">02-27-14 17:00</option><option value=\"\">02/27/26 17:00</option><option value=\"\">02-27-26 17:00</option><option value=\"\">02/27/H26 17:00</option><option value=\"\">02-27-H26 17:00</option><option value=\"\">27/02/14 17:00</option><option value=\"\">27-02-14 17:00</option><option value=\"\">27/02/26 17:00</option><option value=\"\">27-02-26 17:00</option><option value=\"\">27/02/H26 17:00</option><option value=\"\">27-02-H26 17:00</option><option value=\"\">02/27 17:00</option><option value=\"\">02-27 17:00</option><option value=\"\">02月27日 17時00分</option><option value=\"\">27/02 17:00</option><option value=\"\">27-02 17:00</option><option value=\"\">17時00分</option></select></form><form name=\"DD\"><b>曜日表記</b><br><select name=\"dy\"><option selected=\"selected\" value=\"\"></option><option value=\"\">Thu</option><option value=\"\">Thursday</option><option value=\"\">木</option><option value=\"\">(木)</option><option value=\"\">（木）</option><option value=\"\">木曜日</option><option value=\"\">(木曜日)</option><option value=\"\">（木曜日）</option></select></form><form name=\"tzone\"><!--http://support.microsoft.com/kb/973627/jaM$より機械翻訳とはいえマーシャル諸島します。。ニュージーランドがきになる--><b>タイムゾーン</b><br><select name=\"owata\"><option value=\"\">UTC -12:00　国際日付変更線西側</option><option value=\"\">UTC -11:00　ミッドウェー島</option><option value=\"\">UTC -10:00　ハワイ</option><option value=\"\">UTC -09:00　アラスカ</option><option value=\"\">UTC -08:00　(米国およびカナダ　; ティファナティファナ</option><option value=\"\">UTC -07:00　山岳部標準時:(米国およびカナダ　</option><option value=\"\">UTC -07:00　チワワ、ラパス、マサトラン</option><option value=\"\">UTC -07:00　アリゾナ州</option><option value=\"\">UTC -06:00　中部標準:(米国およびカナダ　</option><option value=\"\">UTC -06:00　サスカチェワン</option><option value=\"\">UTC -06:00　グアダラハラ、メキシコシティ、モンテレー</option><option value=\"\">UTC -06:00　中央アメリカ</option><option value=\"\">UTC -05:00　(米国およびカナダ）、東部標準時</option><option value=\"\">UTC -05:00　インディアナ (東部　</option><option value=\"\">UTC -05:00　ボゴタ、リマ、Quito</option><option value=\"\">UTC -04:00　大西洋標準:(カナダ　</option><option value=\"\">UTC -04:00　ジョージタウン、ラパス、サンフアン</option><option value=\"\">UTC -04:00　サンティアゴ</option><option value=\"\">UTC -03:30　ニューファンドランド</option><option value=\"\">UTC -03:00　ブラジリア</option><option value=\"\">UTC -03:00　ジョージタウン</option><option value=\"\">UTC -03:00　グリーンランド</option><option value=\"\">UTC -02:00　中央大西洋</option><option value=\"\">UTC -01:00　アゾレス諸島</option><option value=\"\">UTC -01:00　カーボベルデ諸島</option><option value=\"\">UTC　ダブリン、エジンバラ、リスボン、ロンドン、グリニッジ標準時、世界協定時刻</option><option value=\"\">UTC　モンロビア、レイキャビク</option><option value=\"\">UTC +1:00　サニーベイル, カリフォルニア州、ブラチスラバ、ブダペスト、Ljubljana、プラハ</option><option value=\"\">UTC +1:00　サラエボ、Skopje、ワルシャワ、Zagreb</option><option value=\"\">UTC +1:00　ブリュッセル、コペンハーゲン、マドリッド、パリ</option><option value=\"\">UTC +1:00　アムステルダム、ベルリン、ベルン、ローマ、ストックホルム、ウィーン</option><option value=\"\">UTC +1:00　西中央アフリカ</option><option value=\"\">UTC +02:00　ミンスク</option><option value=\"\">UTC +02:00　カイロ</option><option value=\"\">UTC +02:00　ヘルシンキ、キエフ、リガ、ソフィア、Tallinn、Vilnius</option><option value=\"\">UTC +02:00　アテネ、ブカレスト、イスタンブール</option><option value=\"\">UTC +02:00　エルサレム</option><option value=\"\">UTC +02:00　ハラレ、プレトリア</option><option value=\"\">UTC +03:00　モスクワ、サンクト ペテルスブルグ、ボルゴグラード</option><option value=\"\">UTC +03:00　クウェート、リヤド</option><option value=\"\">UTC +03:00　ナイロビ</option><option value=\"\">UTC +03:00　バグダッド</option><option value=\"\">UTC +03:30　テヘラン</option><option value=\"\">UTC +04:00　アブダビ、マスカット</option><option value=\"\">UTC +04:00　バクー、トビリシ、エレバン</option><option value=\"\">UTC +04:30　カブール</option><option value=\"\">UTC +05:00　エカテリンブルク</option><option value=\"\">UTC +05:00　タシケント</option><option value=\"\">UTC +05:30　チェンナイ、カルカッタ、ムンバイ、ニューデリー</option><option value=\"\">UTC +05:45　カトマンズ</option><option value=\"\">UTC +06:00　アスタナ、ダッカ</option><option value=\"\">UTC +06:00　スリジャヤワルダナプラコッテ</option><option value=\"\">UTC +06:00　アルマアトイ、ノボシビルスク</option><option value=\"\">UTC +06:30　ヤンゴン (ラングーン　</option><option value=\"\">UTC +07:00　バンコク、ハノイ、ジャカルタ</option><option value=\"\">UTC +07:00　クラスノヤルスク</option><option value=\"\">UTC +08:00　北京、重慶、ホンコン、ウルムチ</option><option value=\"\">UTC +08:00　マレーシア. クアラルンプール、シンガポール</option><option value=\"\">UTC +08:00　台北</option><option value=\"\">UTC +08:00　パース</option><option value=\"\">UTC +08:00　イルクーツク、ウランバートル</option><option value=\"\">UTC +09:00　ソウル</option><option selected=\"selected\" value=\"\">UTC +09:00　大阪、札幌、東京</option><option value=\"\">UTC +09:00　ヤクーツク</option><option value=\"\">UTC +09:30　ダーウィン</option><option value=\"\">UTC +09:30　アデレード</option><option value=\"\">UTC +10:00　キャンベラ、メルボルン、シドニー</option><option value=\"\">UTC +10:00　ブリスベン</option><option value=\"\">UTC +10:00　ホバート</option><option value=\"\">UTC +10:00　ウラジオ ストック</option><option value=\"\">UTC +10:00　グアム、ポートモレスビー</option><option value=\"\">UTC +11:00　マガダン、ソロモン諸島、ニューカレドニア</option><option value=\"\">UTC +12:00　フィジー、カムチャツカ、マーシャル諸島</option><option value=\"\">UTC +12:00　オークランド、ウェリントン</option><option value=\"\">UTC +13:00　キリバス、サモア、トケラウ、トンガ、ニュージーランド夏、フィジー夏</option><option value=\"\">UTC +14:00　サモア夏</option></select></form><form name=\"trg\"><b>時刻正規マッチ</b><br><select name=\"event\"><option value=\"\">(※指定なし,上限まで)?</option><option value=\"\">(※5分毎)?[0-9]{2}:[0-5][1-46-9]</option><option value=\"\">(※10分毎)?[0-9]{2}:([0-5][1-9])</option><option value=\"\">(※20分毎)?[0-9]{2}:([135][0-9]|[024][1-9])</option><option value=\"\">(※30分毎)?[0-9]{2}:([1245][0-9]|[03][1-9])</option><option  value=\"\">(※1時間毎)?[0-9]{2}:([1-5][0-9]|0[1-9])</option><option value=\"\">(※24時間毎,17時起点)?((0[0-9]|1[0-689]|2[0-4]):[0-9][0-9]|17:([1-9][0-9]|0[1-9]))</option><option value=\"\">(※24時間毎,0時起点)?((0[1-9]|1[0-9]|2[0-4]):[0-9][0-9]|00:([1-9][0-9]|0[1-9]))</option></select></form><form name=\"tsort\"><b>時刻ソート</b><br><select name=\"event\"><option selected=\"selected\" value=\"\">昇順(古→新)</option><option value=\"\">降順(新→古)</option></select></form><form name=\"chbox\"><b>出力対象(必須)</b><br><div id=\"out\"><label for=\"R1\"><input type=\"checkbox\"  checked=\"checked\" value=\"S1\" id=\"R1\"><div id=\"L1\" style=\"display: inline-block; _display: inline;\">ランク1</div></label><label for=\"R2\"><input type=\"checkbox\" checked=\"checked\" value=\"S2\" id=\"R2\"><div id=\"L2\" style=\"display: inline-block; _display: inline;\">ランク2</div></label><label for=\"R3\"><input type=\"checkbox\" checked=\"checked\" value=\"S3\" id=\"R3\"><div id=\"L3\" style=\"display: inline-block; _display: inline;\">ランク3</div></label><label for=\"R4\"><input type=\"checkbox\" checked=\"checked\" value=\"S4\" id=\"R4\"><div id=\"L4\"style=\"display: inline-block; _display: inline;\">ランク4</div><br></label><label for=\"R5\"><input type=\"checkbox\" checked=\"checked\" value=\"S5\" id=\"R5\"><div id=\"L5\"style=\"display: inline-block; _display: inline;\">ランク5</div></label></div><br><label for=\"OW\"><input type=\"checkbox\" value=\"OWN\" id=\"OW\">自速<br></label></form><form name=\"output\"><b>出力オプション</b><br><label for=\"lim\">出力行数制限<a href=\"#outlim\">※</a>:<input type=\"text\" id=\"lim\" value=\"0\"><br></label><label for=\"COM\"><input type=\"checkbox\" checked=\"checked\" value=\"ADDC\" id=\"COM\">カンマ付き数字<br></label><label for=\"PAD\"><input type=\"checkbox\" value=\"ADDC\" id=\"PAD\">数字桁揃え </label><select name=\"padval\"><option value=\"\">半角スペース</option><option value=\"\">&amp;nbsp(non-breaking space)</option><option value=\"\">0(ゼロ)</option><option  selected=\"selected\" value=\"\">*(アスタリスク)</option><option value=\"\">#(シャープ)</option></select>ぼだ桁数:<input type=\"text\" id=\"padnum\" value=\"10\">速度桁数:<input type=\"text\" id=\"padnum2\" value=\"0\"><br><label for=\"OF\"><input type=\"checkbox\" checked=\"checked\" value=\"NEW\" id=\"OF\">時刻正規オフセット+1<br></label><label for=\"HD\"><input type=\"checkbox\"  value=\"NEW\" id=\"HD\">ヘッダー抽出最後まで<br></label><label for=\"seek\"><input type=\"checkbox\" checked=\"checked\" value=\"NEW\" id=\"seek\">追加順位振り分け<br></label><label for=\"zero\"><input type=\"checkbox\" value=\"\" id=\"zero\">0速度非表示<br></label></form><br><form name=\"rtbcode\"><textarea name=\"r_text\" rows=\"10\" cols=\"200\">GETJSON</textarea><br><input type=\"Submit\" value=\"Convert\" Generate\" onclick=\"stringfilter(document.rtbcode.r_text.value);return false\"></form><form name=\"TZ\"><b>時刻テーブルから選択</b><br><select name=\"db\" id=\"TZ_SEL\"\"><option value=\"\">きずな</option></select></form><form id=\"formID\" action=\"https://script.google.com/macros/s/AKfycbwiKFvX_V-sR4y7Fc9GHQ_cRMsW7LYRNamnkqHn--qtQKwDolU_/exec\" method=\"post\" onSubmit=\"return checkJSON()\"><form name=\"BD__JS\">JSONでーた(認証後だれでも送信可能,JSONは一番上のいべとっぷぼだ部分／DBでも作成可能)<br>)：<br><textarea rows=\"5\" cols=\"40\" name=\"BD_JSON\" id=\"BD_JSON\"></textarea><br><input type=\"submit\" value=\"すぷれっどしーとへ一括送信\"></form></body></html>"

   var d=window.open().document;
   d.writeln(html.replace("GETJSON",finishdata));
   
   
                var
                    w = window,
                    d = w.document;
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

    function load(id,idol) {

        var df = $.Deferred();

        if (num > idolname.length) {
            df.reject();
        }

        var page = get(id, idol);
        page.done(function(data) {
            var dom = $.parseHTML(data);
            var temp = null;
            var data100 = "";
            var dataown = null;
            var urank="";
            var upt="";
            
                        
				
            $(dom).find('td').each(function() {            
                            temp = $(this).html();
                if (temp.match(/txt-sub2/) != null  && temp.match(/\t1?0?0?位/)!= null) {
                    urank = temp.match(/[0-9]+位/);
                    upt = temp.match(/>絆.*?([0-9]+)/gm)
                    data100 = data100 
                    + idols[id-1]  
                    + urank  + "\t"
                    + upt[0].match(/[0-9]+/)+ "."
                    + upt[1].match(/[0-9]+/)  
                    + "\r\n";
                }
            })

            if (data100 === null) {
                df.reject();
            } else {

                df.resolve(data100, dataown);
            }
        });
        return df.promise();
    }

    function get(id, idol) {
        var df = $.Deferred();
        $.ajax({
            url: uribase +  + id + '?page='+idol,
            success: function(data) {
                df.resolve(data);
            }
        });
        return df.promise();
    }


})();