var fun = function (x){
    var y = 100;
    return y+=1;
};

console.log(fun(5));

console.log(123);

var haha = "I want to eat";
console.log(haha.length)//顯示值

var obj = {};
obj.fopp = 526;

console.log(obj.fopp)

var nihao = 'hello'.toUpperCase();
console.log(nihao);//運用invoke 讓英文文字大寫

var obj1 = {};
var obj2 = {};
console.log(obj1 === obj2 );
console.log(obj1 === obj1);//每個物件都有一個唯一的識別身分，並且(嚴格地)與自身相關

var prim1 = 123;
var prim2 = 123;
console.log(prim1 ===prim2);



console.log(typeof 123);//typeof 用於基本型別值


const map = new Map() ;
console.log(map instanceof Map);
console.log( null instanceof Object );

console.log(Boolean(null));
console.log(true  || 123 );

var str = ["abcdefg","eeee","eeee"];
console.log(str[2]);//利用方括號存取字元

//字串運算子
var str = "";
messagecount = 3;
str = "你有"+ messagecount +"則訊息";
console.log(str)

//條件式

var number = function(x){
    if ( x >= 0){
        return Math.pow(2,x)
    }
    else if (x < 0){
        return "不得小於0"
    }
    else {
        return "甚麼都沒有"
    }
};
console.log(number(2));


//迴圈練習
//for
var arr1 = ["樹木","蝴蝶","睡褲","可怕","哭阿"];
for (var i=0; i<arr1.length ;i++){
    console.log(arr1[i])
};
console.log(i);

var arr = "vwhwieufewhfuohofhcohaljh"
for (var i=0;i<arr.length;i++){
    console.log(arr[i]);
}
console.log(i);

//while
var i = 0;
while (i<arr.length){
    console.log(arr[i]);
    i++
};
console.log(i);


//add
function add(a,b){
    return a+b
};
console.log(add(5,50))

//選擇性參數
function pair (x,y){
    x = x || 0;
    y = y || 0 ;
    return [x,y];
};
console.log(pair());
console.log(pair(500,500));


//Booleans 
console.log(typeof(true));
//numbers
console.log(typeof(1));
//strings
console.log(typeof("哭阿"));
//plain object
console.log(typeof({firstname:"jonathan"}));
//arrays
console.log(typeof(["water","mud","haha"]));

// //範例
//兩個斜線(slashes)起始一個單行註解
function foo(x,y){
    "use strict";//以參數'x'跟'y'呼叫函式'foo' 
var x; //宣告一個變數(variable)
var y ;
return x+y ; //回傳'x' 'y' 算式 
};
console.log(foo(5,5.255))

// //一個條件是述句(conditional statement)
// let x = 0
// if (x===0){ //'x'等於零嗎? 
//     x=123;
// };
// console.log(x);

// let x = 5;
// let y = 50;
// let z = 0;
// sum:
// while (x,y){
//     z=x++;
//     if (x>=y){
//         break sum;
//     }
//     console.log(x)
// }
// console.log(z);

var foo1 = 'New String';
console.log(typeof(foo1));
var foo2 = new String('str');
console.log(typeof(foo2));

var boo;
console.log(boo);

function  f(x){ return x };
console.log(f());

var obj = {};
console.log(obj.foo);

function f(){}
console.log(f());

var c = NaN;
console.log(c+10)

console.log(Object.getPrototypeOf(Object.prototype));

console.log( /n/.exec('aaa'))

//x是一個非值(non-value)嗎?
function test(x){
    if (x === undefined || x===null){
        return "x是一個非值";     
    };
    
    } ;

console.log(test());

// //x有值嗎
// function test(x){
//     if (x !== undefined && x !==null){
//         return "x有值";     
//     };
    
//     } ;
// console.log(test());


// var obj3 = 52;

// if( 52 >25){
//     return 2;
// };

// var a1 = 50;
// var a2 = 51;

// if (a1>a2){
//     console.log("50比較大") 
// }else{
//     console.log("50比較小") 
// }

// var n = 11=== Number || 55  || 50;
// console.log(n);


console.log(11+NaN);
console.log(5+null);
console.log(5+undefined);

console.log(typeof new String("asd"));
console.log(typeof("abc"))
console.log(new String("ABC")==="ABC");

console.log(typeof(String(1128)))

function plus(x,y){
    if (x>0 && y>0){
        return x*y
    }
    if (x<0 || y<0){
        return "請輸入正整數"+"不要亂打"
    }
  
};
console.log(plus(5,-6));

console.log(undefined===undefined)
console.log(null===null)
var x = 50
console.log(x===x)
console.log(8===8)
console.log("這是文字"==="這是文字")

var a = {},c = {};
a = {object:"這是植物"} ;
console.log(a.object);
console.log(a===a);
console.log(a===c);