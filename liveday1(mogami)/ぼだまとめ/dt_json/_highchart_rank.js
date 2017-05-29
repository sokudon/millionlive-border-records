$(function () { 
Highcharts.setOptions({global: { useUTC: false },
// http://architect-wat.hatenablog.jp/entry/20130320/1363786174　日本語化ここを参考


      lang: {  // 言語設定
        rangeSelectorZoom: '表示範囲',
        resetZoom: '表示期間をリセット',
        resetZoomTitle: '表示期間をリセット',
        rangeSelectorFrom: '表示期間',
        rangeSelectorTo: '〜',
        printChart : 'チャートを印刷',
        exportButtonTitle: '画像としてダウンロード',
        downloadJPEG: 'JPEG画像でダウンロード',
        downloadPDF: 'PDF文書でダウンロード',
        downloadPNG: 'PNG画像でダウンロード',
        downloadSVG: 'SVG形式でダウンロード',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['日', '月', '火', '水', '木', '金', '土'],
        numericSymbols: null,   // 1000を1kと表示しない,
        thousandsSep: ","
      }

 });
 
 
    $('#container').highcharts({
        chart: {
            type: 'spline',
            zoomType: 'x',
              events: {
              redraw: function () {
               rdtbl();
              }
              }
        },
				credits: {
				text: 'SOKUDON with highchart',
				href: 'https://docs.google.com/spreadsheet/pub?key=0ArIs57u-VlLWdHlaSk1NY2kzcnNFbjg3b2xNaXJUbnc&output=html'
				},
        title: {
            text: ibe_title
        },
        subtitle: {
            text: 'グラフ内ドラックで拡大,見出しクリックで表示/非表示'
        },
         xAxis: [{minRange: 1
        }],
        yAxis: [{
            labels: {
                format: '{value}',
            },
        	min: 0
        }],
        tooltip: {
             //headerFormat: '<b>{series.name}</b><br>',
            //pointFormat: '{point.x:%B%e日%H時%M分}: {point.y}',
            formatter: function () {
                return GETTIMEZ(this);
                },
            crosshairs: true
        }, 
        exporting: {
        csv: {
            dateFormat: '%Y-%m-%d %H:%M'
        }},
        series: border_data
    });
      
    
    
    var chart = $('#container').highcharts();
    
    $('#gettbl').click(function () {
	CSV_VISIBLE(2,null);
	});
    $('#gettbl2').click(function () {
	CSV_VISIBLE(1,null);
	});
	
});

var dtf=[
'{point.x}: {point.y}',
'{point.x}: {point.y}'
];
dtd=1;

var table_enable=0;

var youbi =['日', '月', '火', '水', '木', '金', '土'];

//PM表示を改造
function GETTIMEZ(chart){
var a=chart.x;
s= "<b>"+chart.series.name +"</b><br>"+a +"位\t";
s+=addc(chart.y) +"pt<br>";


var syoujun=document.getElementById("SHOJUN").checked;
if(syoujun){
CSV_VISIBLE(table_enable,chart.x)
}

return s;
}

function rdtbl(){
  if(table_enable){
        CSV_VISIBLE(table_enable);
  }
  return false;
}


	function CSV_VISIBLE(JISOKU,pointer){
	
JISOKU=JISOKU&1;

var csv = [];
var sj=[];
var chart = $('#container').highcharts();
var series = chart.series[0];
var lm=document.NZ.NM.options[document.NZ.NM.selectedIndex].text
var limit =lm.match(/[0-9]+/);


for (var j = 0,k=0; j < series.data.length; j++) {
if(series.data[j].y!=null){
sj[k]=j;
k++;
}}

if(sj.length>0){
for (j = 0; j < sj.length; j++) {
var extreme=series.data[sj[j]].series.xAxis.min ;
if(pointer>series.data[sj[j]].series.xAxis.min){extreme=pointer;}
if (series.data[sj[j]] != undefined && series.data[sj[j]].x >= extreme && series.data[sj[j]].x <= series.xAxis.max) {
csv[j] ="<td>"+ ("00000"+series.data[sj[j]].x).slice(-5) + '</td>';
for (var i = 0; i < chart.series.length; i++) {
if(chart.series[i].visible){
csv[j] = csv[j]  + "<td>"+ addc(chart.series[i].data[sj[j]].y) +"</td>";
if(JISOKU){
if(j>0){
csv[j] = csv[j]  + "<td>"+ addc((chart.series[i].data[sj[j]].y-chart.series[i].data[sj[j-1]].y)) +"</td>";
}
else{csv[j] = csv[j]  + "<td></td>";}
}
}}}}}

var mktbl = "";
var mkth = "<th>順位</th>";
for (var i = 0; i < chart.series.length; i++) {
if(chart.series[i].visible){
mkth = mkth + "<th>"+ chart.series[i].name +"</th>";
if(JISOKU){
mkth = mkth + "<th>差</th>";
}
}}


var syoujun=document.getElementById("SHOJUN").checked;
if(syoujun){
csv.sort(
function(a,b){
if( a < b ) return -1;
if( a > b ) return 1;
return 0;
});
}
else{
csv.sort(
function(a,b){
if( a < b ) return 1;
if( a > b ) return -1;
return 0;
});
}

if(sj.length<limit){
limit =sj.length;
}

for (var j = 0; j < limit; j++) {
if(csv[j]==undefined){break;}
mktbl = mktbl +
csv[j] +
"</tr>";
}
mkth = "<tr>"+ mkth +"</tr>";
mktbl= "<table class=\"border\">" + mkth +mktbl + "</table>";

table_enable=JISOKU+2;

document.getElementById("tbl").innerHTML=mktbl;
//document.getElementById("container")+=mktbl;


//alert(csv);
return false;
}


//小数以外は正規でカンマつける
function addc(a){
	if(haveFraction(a)){
	return a.toFixed(5);
	}
	return String(a).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,'$1,');
}


function haveFraction (number) {
return (Math.ceil(number)>number);
}
