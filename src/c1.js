(function(){
// let allButtons = document.getElementsByTagName('button');

let allButtons = document.querySelectorAll('button');

// console.log(allButtons);

let display = document.querySelector('.viewer');

let leftOperand, currentOperation;

for (let i=0; i<allButtons.length; i++){
    let el = allButtons[i];
    el.addEventListener('click', function() {
        if (Number.isInteger(+this.innerText)||this.innerText === '.') {
            if (+display.innerText === 0) {
                display.innerText = this.innerText;
            } else {
                display.innerText = display.innerText + this.innerText;
            }
        }
        if (this.innerText.toLowerCase() === 'c') {
            display.innerText = 0;
        }

        // Remove a char from right
        if (this.innerText.charCodeAt(0) === 8592 ) {
            if (+display.innerText.length > 1) {
                display.innerText = display.innerText.slice(0, display.innerText.length-1);
            } else {
                display.innerText = 0;
            }
        }
        if (this.innerText === '+' ||
            this.innerText === '-' ||
            this.innerText === '*' ||
            this.innerText === '/') {
             leftOperand = display.innerText;
             currentOperation = this.innerText;
             display.innerText = 0;
        }

        if (this.innerText === '=') {
            if (leftOperand) {
                eval('var result = function(){return +leftOperand ' + currentOperation + ' +display.innerText }()');
                // let result = function(){return +leftOperand + +}
                display.innerText = result;
                leftOperand = null;
                currentOperation = null;
            }
        }

    });
};
})();



// allButtons.forEach(function(el){
//     el.addEventListener('click', function() {
//         if (Number.isInteger(+this.innerText)) {
//             if (+display.innerText === 0) {
//                 display.innerText = this.innerText;
//             } else {
//                 display.innerText = display.innerText + this.innerText;
//             }
//         }
//     });
// });