$(function () { Highcharts.setOptions({global: { useUTC: false },
// http://architect-wat.hatenablog.jp/entry/20130320/1363786174　日本語化ここを参考
      lang: {  // 言語設定
        rangeSelectorZoom: '表示範囲',
        resetZoom: '表示期間をリセット',
        resetZoomTitle: '表示期間をリセット',
        rangeSelectorFrom: '表示期間',
        rangeSelectorTo: '〜',
        //printButtonTitle: 'チャートを印刷',
        printChart : 'チャートを印刷',
        exportButtonTitle: '画像としてダウンロード',
        downloadJPEG: 'JPEG画像でダウンロード',
        downloadPDF: 'PDF文書でダウンロード',
        downloadPNG: 'PNG画像でダウンロード',
        downloadSVG: 'SVG形式でダウンロード',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['日', '月', '火', '水', '木', '金', '土'],
        numericSymbols: null,   // 1000を1kと表示しない        
        thousandsSep: ","
      }

 });
    $('#container').highcharts({
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        title: {
            text: '<b>' +ibe_type + 'のこりじかんひかく'
        },
        subtitle: {
            text: 'グラフ内ドラックで拡大,見出しクリックで表示/非表示'
        },
				credits: {
				text: 'SOKUDON with highchart',
				href: 'https://docs.google.com/spreadsheet/pub?key=0ArIs57u-VlLWdHlaSk1NY2kzcnNFbjg3b2xNaXJUbnc&output=html'
				},
       xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    return GETTIMEx(this.value);
                }
            },
            title: {
                text: '残り時間　日時分(day hour:minutes)'
            },
		    plotLines: [{
	        color: '#FF0000',
    	    width: 1,
        	 value: ibe_owari //Date.UTC(2014,0,7,7,0)+15*3600*1000
            }],
            minrange : 10*60*1000
        },
        yAxis: {
            title: {
                text: 'ぼだ pt'
            },
            min: 0
        },
        tooltip: {
            enabled: true,
            formatter:function(){
                  return GETTIME(this.x,this.series.name,this.y);
                },
            crosshairs: true
        },
		series: border_data
    });
    
   
    var chart = $('#container').highcharts(),
        $button1 = $('#100'),
        $button5 = $('#500'),
        $button50 = $('#50'),
        $button12 = $('#1200'),
        $buttonmd = $('#md'),
        $buttonal = $('#all');
		
	function houji(d){
	    for(var i=0;i<chart.series.length;i++){
        if(chart.series[i].name.indexOf(d)<0){
            chart.series[i].hide();
        }
        else if(!chart.series[i].visible){
            chart.series[i].show();
        }}
    return false;
    }
        
    $button1.click(function (){
		houji("100位");
    });
    $button5.click(function () {
		houji("500位");
    });
    $button50.click(function () {
		houji("50位");
    });
    $button12.click(function () {
		houji("1200位");
    });
    $buttonal.click(function () {
		houji("位");
    });
    $buttonmd.click(function () {
    var st=document.getElementById('seek_n').value;
    var m=st.match("^/(.+)/$");
	if(m!=null){
	var l=m[0].match("^/(.+)/$");
	var rg = st.replace(st,l[1]);
	    for(var i=0;i<chart.series.length;i++){
        if(chart.series[i].name.match(rg)==null){
            chart.series[i].hide();
        }
        else if(!chart.series[i].visible){
            chart.series[i].show();
        }}
	}
	else{
	houji(st);
	}
    });
});


var dtf=[
'{point.x:%e日目%H時間%M分}: {point.y}',
'{point.x:%e日目%H時間%M分}: {point.y}<br>{point.x:(%p)}' //YYYMMDDHHmm有り
];
//dtd=1;

var youbi =['日', '月', '火', '水', '木', '金', '土'];

function GETTIMEx(a){
var k= new Date(a);
var d=(k.getDate()-1);
var h=(k.getHours());
var m=k.getMinutes();
if(m){return m+"分";}
if(h){return h+"時";}

return d+"日";
}

//PM表示を改造
function GETTIME(a,name,pt){

var k= new Date(a);
var d=(k.getDate()-1);
var h=(k.getHours());
var m=k.getMinutes();
var jikan= d+"日目";
if(h){jikan += h+"時";}
if(m){jikan += m+"分";}



a =ibe_kaishi+ibe_owari-a-9*3600*1000;

var k= new Date(a);
var now= 
(k.getMonth()+1) +"月"+
(k.getDate()) +"日 "+
youbi[k.getDay()] +" "+
(k.getHours()) +"時" +
k.getMinutes() +"分";

var output="<b>"+name+"</b><br>"
+jikan +"\t"+pt+" pt<br>("
+now+")";

return output;
}

function convert_left_time(bd){

var end = ibe_owari;
var ini = Date.UTC(2014,0,1,-9,0);
for(var j=0;j< bd.length;j++){
if(bd[j].name.match(/[a-z\-\/]+/)!=null){
end = bd[j].data[bd[j].data.length-1][0]
-bd[j].data[0][0]+ini;}
for(var i=0;i< bd[j].data.length;i++){
bd[j].data[i][0] = end - bd[j].data[i][0] + ini;
}}

for(var j=0;j< bd.length;j++){
bd_qs=bd[j].data;
bd_qs.sort(
function(a,b){
if( a[0] > b[0] ) return 1;
if( a[0] < b[0] ) return -1;
return 0;
});
}
return bd;
}
