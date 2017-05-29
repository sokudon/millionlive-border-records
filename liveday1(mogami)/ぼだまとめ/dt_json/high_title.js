
var ibe_title = "<b>ミリオンシアターライブ Day1ぼだ</b>";
var ibe_rank = "<b>--</b>";
var ibe_fes = ibe_title;
var display300 =false;

var ibe_point = 'pt';

//var ibe_type = 'きずならいぶ/ふぇすぼだ';
//var ibe_type ='ULAぼだ';
var ibe_type = "はこゆれ/きゃらばん/すたーらいぶぼだ";
//var ibe_type = 'あいどるどうぼだ';
//var ibe_type = 'ちょこまらそんぼだ';
//var ibe_type = 'ますたーずかっぷぼだ';
//var ibe_type = 'ICEえぼぼだ';



//highstockりあるたいむよう　おぷしょん
var tosikosi=false;//年こし数字補正用、年末時はtrue

var base_year=2017;//ぼだ開始年
var BYEAR="2017";
var BYEARN="";


var ibe_kaishi	=Date.UTC(2017,4,18,12,0);//いべんと開始日時 月-1
var ibe_end		=Date.UTC(2017,4,29, 0,0);//いべんと終了日時 月-1

var ibe_owari=ibe_end - ibe_kaishi+Date.UTC(2014,0,1,-9,0);


var dtd=1;//つーるちっぷ;０でいべんと日付のみ　こんぺあは経過時間のみ、1で両方表示
