'use strict';

// получаем объект формы
var form = document.forms.product;
// прикрепляем обработчик кнопки
form.submit.addEventListener("click", sendRequest);
 
// обработчик нажатия
function sendRequest(event){
	event.preventDefault();
	
	var formData = new FormData(form);
	var res = '';
	
	formData.forEach((value,key) => {
		console.log(key+" "+value)
		res += key+": "+value;
  	});
	
	document.getElementById("printResult").innerHTML=res;

	var request = new XMLHttpRequest();
    request.open("POST", form.action);
     
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200)
            document.getElementById("printResult").innerHTML=request.responseText;
    }
    request.send(formData);
}
