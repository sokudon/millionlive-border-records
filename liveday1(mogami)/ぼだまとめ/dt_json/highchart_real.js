$(function () { 
Highcharts.setOptions({global: { useUTC: false },
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
        numericSymbols: null   // 1000を1kと表示しない
      }

 });
    $('#container').highcharts({
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        title: {
            text: ibe_title
        },
				credits: {
				text: 'SOKUDON with highchart',
				href: 'https://docs.google.com/spreadsheet/pub?key=0ArIs57u-VlLWdHlaSk1NY2kzcnNFbjg3b2xNaXJUbnc&output=html'
				},
        subtitle: {
            text: 'グラフ内ドラックで拡大,見出しクリックで表示/非表示'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
		            millisecond: '%M分',
					second: '%M分',
					minute: '%H時%M分',
					hour: '%H時',
					day: '%B%e日',
            },
            title: {
                text: '日時'
            },
            minRange: 10*60*1000
        },
        yAxis: {
            title: {
                text: ibe_point
            },
            min: 0
        },
        tooltip: {
            headerFormat: "", //'<b>{series.name}</b><br>',
            pointFormat: dtf[dtd],
            valueSuffix: ' pt',
            crosshairs: true
        },
        series: border_data
    });    // the button action
    
    var chart = $('#container').highcharts(),
        $button1 = $('#100'),
        $button5 = $('#500'),
        $button12 = $('#1200'),
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
    $button12.click(function () {
		houji("1200位");
    });
    $buttonal.click(function () {
		houji("位");
    });
});


var dtf=[
'<b>{point.x:%B%e日 %a %H時%M分}</b><br>{series.name}:{point.y}',
'<b>{point.x:%B%e日 %a %H時%M分}</b><br>{point.x:(%p)}<br>{series.name}:{point.y}' //(経過時間有り)
];
//var dtd=1;

function rdtbl(){
}

//PM表示を改造
function GETTIMEZ(a){
a = a -ibe_kaishi-9*60*60*1000; 
var k= new Date(a);
var s= 
(k.getDate()-1) +"日目"+
(k.getHours()) +"時間" +
k.getMinutes() +"分";

return s;
}