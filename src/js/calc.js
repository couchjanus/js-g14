"use strict";

document.getElementById("main").innerHTML = 
`<form style="justify-items: center; display: grid; grid-template-columns: 100px 100px 100px; grid-template-rows: 50px 50px 50px 50px;">
    <input type="text" id="res" value="" style="grid-column: 2/3; grid-row: 1 / 2;">
    <div style="justify-items: center; align-items: center; display: grid; grid-template-columns: subgrid; grid-column: 1 / 4; grid-row: 2 / 5;">
    <input type="button" value="0" id="b0" style="grid-column: 1;">
    <input type="button" value="1" id="b1" style="grid-column: 2;">
    <input type="button" value="2" id="b2" style="grid-column: 3;">
    <input type="button" value="3" id="b3" style="grid-column: 1;">
    <input type="button" value="4" id="b4" style="grid-column: 2;">
    <input type="button" value="5" id="b5" style="grid-column: 3;">
    <input type="button" value="6" id="b6" style="grid-column: 1;">
    <input type="button" value="7" id="b7" style="grid-column: 2;">
    <input type="button" value="8" id="b8" style="grid-column: 3;">
    <input type="button" value="9" id="b9" style="grid-column: 1;">
    <input type="button" value="+" id="plus" style="grid-column: 2;">
    <input type="button" value="=" id="equal" style="grid-column: 3;">
    </div>
</form>`;

function square(number) {
    return number * number;
}

function sum(number1 , number2) {
    return number1 + number2;
  }

sum(1, 2);

function calcD(a, b, c) {
    return b*b - 4*a*c;
}

var test = calcD(-4, 2, 1);
console.log(test); // 20

const squared = (a) => {
    return a * a;
};

const newSquared = squared(3);
console.log(newSquared);

var factorial = function fac(n) { 
    return n < 2 ? 1 : n * fac(n - 1); 
};
console.log(factorial(3));

// ===================calc=============================
var a, b;

var res = document.getElementById('res');
var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');
var b3 = document.getElementById('b3');
var b4 = document.getElementById('b4');
var b5 = document.getElementById('b5');
var b6 = document.getElementById('b6');
var b7 = document.getElementById('b7');
var b8 = document.getElementById('b8');
var b9 = document.getElementById('b9');
var b0 = document.getElementById('b0');

var plus = document.getElementById('plus');
var equal = document.getElementById('equal');

b1.onclick = function(){
    res.value = b1.value;
    a = parseInt(b1.value);
};

b2.onclick = function(){
    if (a===undefined){
        res.value = b2.value;
        a = parseInt(b2.value);
    } else{
        res.value += b2.value;
        b = parseInt(b2.value);
    }
};

b3.onclick = function(){
    if (a===undefined){
        res.value = b3.value;
        a = parseInt(b3.value);
    } else{
        res.value += b3.value;
        b = parseInt(b3.value);
    }
};
              
plus.onclick = function(){
    res.value += plus.value;

};

equal.onclick = function(){
    res.value = a+b;
    a = undefined;
    b = undefined;
};
