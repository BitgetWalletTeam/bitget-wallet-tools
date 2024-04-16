//var md5 = require('md5')

function numberFormat(n){
    //1000 == 1.00K, >1000000 == 1.00M
    if(!n || n < 0){
        return 0;
    }
    let d = n > 0 ? '' : '-';
    n = Math.abs(n);
    if(n >= 1000000000){
        return d + '9999M';
    }if(n >= 1000000){
        return d +  Math.ceil(n/10000)/100 + 'M';
    }else if(n >= 1000){
        return d + Math.ceil(n/10)/100 + 'K';
    }else{
        return d + Math.ceil(n);
    }
}

function dateFormat(date, fmt) {
    fmt = fmt || 'yyyy/MM/dd hh:mm:ss';
    var dateObj;
    if(date){
        dateObj = new Date(date);
    }else{
        return '';
    }

    var o = {
        "M+" : dateObj.getMonth()+1,                 
        "d+" : dateObj.getDate(),                    
        "h+" : dateObj.getHours(),                   
        "m+" : dateObj.getMinutes(),                 
        "s+" : dateObj.getSeconds(),                 
        "q+" : Math.floor((dateObj.getMonth()+3)/3), 
        "S"  : dateObj.getMilliseconds()             
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (dateObj.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

function subs(temp, data, regexp){
    if(!(Object.prototype.toString.call(data) === "[object Array]")) data = [data];
    var ret = [];
    for (var i = 0, j = data.length; i < j; i++) {
        ret.push(replaceAction(data[i]));
    }
    return ret.join("");
    function replaceAction(object){
        return temp.replace(regexp || (/\\?\{([^}]+)\}/g), function(match, name){
            if (match.charAt(0) == '\\') return match.slice(1);
            return (object[name] != undefined) ? object[name] : '';
        });
    }
}

function getStringLength(str) {  
    str = str || '';
    var len = 0;    
    for (var i=0; i<str.length; i++) {    
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {    
             len += 2;    
         } else {    
             len ++;    
         }    
     }    
    return len;    
}    

function shortHash(str, number) {
    let arrL = str.substring(0, number);    
    let arrR = str.substring(str.length - number, str.length);
    return arrL + '....' + arrR;    
}    

function isEmailType(v){
    let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(v);
}

function firstUpperCase(str){
  return str ? LowerCase(str).replace(/( |^)[a-z]/g, L => UpperCase(L)) : ''
}

function isJson(arg){
  var parsed;

  arg = filterJsonStr(arg)
  if (!_.isString(arg)) {
    return false
  }
  try {
    parsed = JSON.parse(arg)
  } catch (e) {
    return false
  }
  if (typeof parsed === 'object') {
    return true
  }
  return false
}

function isHex(value = '') {
  // if (!_.isString(value)) {
  //   return false;
  // }
  // return /^[0-9a-fA-F]+$/.test(value);
  return /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i.test(value)
}

function stringToHex(str) {
  let hex = ''
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i).toString(16)
    hex += charCode.length < 2 ? '0' + charCode : charCode
  }
  return hex
}

function hextoString(hex = '') {
  try {
    if (hex.startsWith('0x')) {
      hex = hex.substr(2)
    }
  } catch (error) {
    console.log('error____', error)
  }
  var arr = hex.split('')
  var out = ''
  for (var i = 0; i < arr.length / 2; i++) {
    var tmp = '0x' + arr[i * 2] + arr[i * 2 + 1]
    var charValue = String.fromCharCode(tmp)
    out += charValue
  }
  return out
}

export {
    dateFormat,
    numberFormat,
    subs,
    getStringLength,
    shortHash,
    hextoString,
    isEmailType
}
