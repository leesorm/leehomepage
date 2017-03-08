// by zhangxinxu welcome to visit my personal website http://www.zhangxinxu.com/
// 2010-03-12 v1.0.0
//十六进制颜色值域RGB格式颜色值之间的相互转换

//-------------------------------------
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function(){
	var that = this;
	if(/^(rgb|RGB)/.test(that)){
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
		var strHex = "#";
		for(var i=0; i<aColor.length; i++){
			var hex = Number(aColor[i]).toString(16);
			if(hex === "0"){
				hex += hex;	
			}
			strHex += hex;
		}
		if(strHex.length !== 7){
			strHex = that;	
		}
		return strHex;
	}else if(reg.test(that)){
		var aNum = that.replace(/#/,"").split("");
		if(aNum.length === 6){
			return that;	
		}else if(aNum.length === 3){
			var numHex = "#";
			for(var i=0; i<aNum.length; i+=1){
				numHex += (aNum[i]+aNum[i]);
			}
			return numHex;
		}
	}else{
		return that;	
	}
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function(){
	var sColor = this.toLowerCase();
	if(sColor && reg.test(sColor)){
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));	
		}
		return "rgb(" + sColorChange.join(",") + ")";
		//return sColorChange.join(",");
	}else{
		return sColor;	
	}
};



//颜色取反方法
function reverseColor(rgbColor) {//205,15,20
// console.log(rgbColor);
rgbColor = rgbColor.replace(/\s/g, "");
var arrRGB = new Array(3);
if (rgbColor.indexOf("rgb") > -1) {
var colorReg = /\s*\d+,\s*\d+,\s*\d+/i;
var t = colorReg.exec(rgbColor)[0].split(",");

for (var i = 0; i < arrRGB.length; i++) {

var m = 0.299*t[0] + 0.587 * t[1] + 0.114*t[2];
if(m>210){m=120;}else{m=250}
arrRGB[i] = m
}
}
else if (rgbColor.indexOf("#") > -1) {
if (rgbColor.length > 4)//"#fc0,#ffcc00"
{
var j = 1;
for (var i = 0; i < arrRGB.length; i++) {
arrRGB[i] =  m;
j += 1;
}
} else {
for (var i = 0; i < arrRGB.length; i++) {
var t = rgbColor.substr((i + 1), 1);
t = t + t;
arrRGB[i] = m;
}
}
}
return "rgb(" + arrRGB.join(",") + ")";
}



// function reverseColor(rgbColor) {//205,15,20
// // console.log(rgbColor);
// rgbColor = rgbColor.replace(/\s/g, "");
// var arrRGB = new Array(3);
// if (rgbColor.indexOf("rgb") > -1) {
// var colorReg = /\s*\d+,\s*\d+,\s*\d+/i;
// var t = colorReg.exec(rgbColor)[0].split(",");

// for (var i = 0; i < arrRGB.length; i++) {
// arrRGB[i] = 255 - t[i];
// }
// }
// else if (rgbColor.indexOf("#") > -1) {
// if (rgbColor.length > 4)//"#fc0,#ffcc00"
// {
// var j = 1;
// for (var i = 0; i < arrRGB.length; i++) {
// arrRGB[i] = 255 - parseInt(rgbColor.substr((i + j), 2), 16);
// j += 1;
// }
// } else {
// for (var i = 0; i < arrRGB.length; i++) {
// var t = rgbColor.substr((i + 1), 1);
// t = t + t;
// arrRGB[i] = 255 - parseInt(t, 16);
// }
// }
// }
// return "rgb(" + arrRGB.join(",") + ")";
// }