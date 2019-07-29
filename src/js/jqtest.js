'use strict';

import $ from 'jquery';

window.jQuery = window.$ = $;

$('.btnGo').on('click', function () {

  // ==============Создаём запрос====================
	$.ajax({
			url: 'http://jsonplaceholder.typicode.com/',
		})
		.done(function (data) {
			$('#console').html('<div class="alert alert-success" role="alert">4: Обмен завершен!</div>');
			if (console && console.log) {
				console.log("Sample of data:", data.slice(0, 100));
			}
		});
});

$('.btnGo1').on('click', function () {
	// ==============Создаём запрос====================
	$.ajax({
			url: 'http://jsonplaceholder.typicode.com/',
			beforeSend: function () {
				$('#console').html('<div class="alert alert-secondary" role="alert">1: Подготовка к отправке...</div>');
			}
		})
		.fail(function (xhr, statusText) {
			$('#console').html('<div class="alert alert-danger" role="alert">Ошибка: сервер вернул статус: ' + statusText + '</div>');
			$("#printResult").html("<b>Error: " + statusText + "</b>");
		})
		.done(function (data) {
			var text = $('#console').html();
			$('#console').html(text + '<div class="alert alert-success" role="alert">4: Обмен завершен!</div>');
			$("#printResult").html("<b>Прибыли данные: </b>" + data);
			if (console && console.log) {
				console.log("Sample of data:", data.slice(0, 100));
			}
		})
		.always(function () {
			var text = $('#console').html();
			$('#console').html(text + '<div class="alert alert-success" role="alert">5: All Done!</div>');
		});

});


$('.btnGo2').on('click', function () {
	fetch('https://api.myjson.com/bins/zrs3y')
		.then(
			function (response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' +
						response.status);
					return;
				}
				response.json().then(function (data) {
					var text = $('#console').html();
					$('#console').html(text + '<div class="alert alert-success" role="alert">4: Обмен завершен!</div>');
					$("#printResult").html("<b>Прибыли данные: </b>" + data);
					console.log(data);
				});
			})
		.catch(function (err) {
			console.log('Fetch Error :-S', err);
		});
});