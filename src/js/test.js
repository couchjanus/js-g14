// Доступ к свойствам осуществляется по имени свойства (по ключу).

console.log(document.body); // BODY
console.log(document.title); // title

// ================nodeType==========================
console.log("тип узла: " + document.nodeType);
// тип узла: 9

// ================nodeName==========================
console.log("Имя узла: " + document.nodeName);
// Имя узла: #document

// ================nodeValue==========================
console.log("значение узла: " + document.nodeValue);
// значение узла: null

// Любой доступ и изменения DOM происходит через объект document.
// ================Доступ к элементам==========================
console.log("Document Element: " + document.documentElement);
// Document Element: [object HTMLHtmlElement]

// В случае корректной HTML-страницы, это будет <html>.
console.log("Body Element: " + document.body);
// Body Element: [object HTMLBodyElement], если есть в документе (обязан быть).

// Все дочерние элементы, включая текстовые находятся в массиве childNodes.
console.log('Все дочерние элементы ', document.body.childNodes);

// Атрибут tagName есть у элементов и содержит имя тага в верхнем регистре, только для чтения.
// имя тага
console.log(document.body.tagName); // BODY


// Можно поменять цвет BODY: -->
document.body.style.backgroundColor = 'red';

// Можно поменять цвет текста:
document.body.style.color = 'white';


// Можно вернуть обратно:
document.body.style.backgroundColor = '';
document.body.style.color = '';

// innerHTML
// Свойство innerHTML – позволяет получать и изменять полностью всё содержимое, лежащее между открывающим и закрывающим тегами объекта.
// Свойство innerHTML применяется, в основном, для динамического изменения содержания страницы, например:
// document.body.innerHTML = '<h1 id="bye">Bye! See ya!</h1>';

// getElementById
// document.getElementById("bye").style.color ="yellow";


// document.getElementById("main").innerHTML = '<h1 id="bye" class="see">Bye! See ya!</h1><div id="content-holder"><div id="content">Элемент</div></div>';
// document.getElementById("bye").style.color ="red";

// document.getElementById('content').innerHTML = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero tempore necessitatibus obcaecati accusamus ullam autem ut iste, vel suscipit adipisci officiis doloribus dolores quasi minus pariatur ex omnis modi neque?';
// document.getElementById('content-holder').style.color ="blue";

// getElementsByTagName
// document.body.getElementsByTagName('h1')[0].innerHTML="Hello world";

// Свойство textContent используется для получения и установки текста узла.

// document.getElementsByTagName('h1')[0].textContent = 'Hello Text Content!';

// querySelectorAll
// document.querySelectorAll('h1')[0].textContent = 'Hello querySelectorAll Text Content!';

// querySelector
// document.querySelector('h1').textContent = 'Hello JavaScript!';

// Метод getElementsByClassName находит массив объектов определенного класса.
// getElementsByClassName
// document.getElementsByClassName('see')[0].innerHTML = 'Hello JavaScript ClassName!';


function showMessage() {
    alert( 'Привет всем присутствующим!' );
}

// showMessage();

function square(number) {
    return number * number;
}

function sum(number1 , number2) {
    return number1 + number2;
  }
sum(1, 2);

function hiMessage() {
    var message = 'Привет!'; // локальная переменная
    alert( message );
}
// hiMessage(); // 'Привет!'

var userName = 'Jhon';
   function showMessageUser() {
       var message = 'Привет ' + userName;
       alert(message);
   }
// showMessageUser(); // Привет Jhon

function heyMessage(from, text) {
    if (text === undefined) {
        text = 'текст не передан';
    }
    // text = text || 'текст не передан';

    alert( from + ": " + text );
}

