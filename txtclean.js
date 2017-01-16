(function(){
	/*
		Данная функция ищет и возвращает слово,
		которое имеет максимальное количество вхождений в массив.
	*/
	function findTheWordWithMaxEntry(arrOfWords) {

		var word = '';
		var entries = 0;
		var wordObj = {
			maxEntires: 0,
			value: '',
			wordDetectingProblem: false // указывает, если найдены два слова с одинаковым количеством вхождений
		};
		
		console.log('-- arrOfWords --');
		console.log (arrOfWords);

		arrOfWords.forEach(function(element) {
			entries = arrOfWords.count(element);
			if (wordObj.maxEntires < entries) {
				wordObj.maxEntires = entries;
				wordObj.value = element;
			} 
			console.log('entries=' + entries);
			console.log('element=' + element);
			console.log ('max= ' + wordObj.value + ' ' + wordObj.maxEntires);
			console.log('wordObj.wordDetectingProblem = ' + wordObj.wordDetectingProblem);
			console.log('---');
		});
		
		/*
			После того, как максимальное количество вхождений уже определено,
			проходим по массиву еще раз, чтобы убедиться в том, что мы нашли единственное максимальное значение.
			Если максимальных значений два, то поднимаем флаг ошибки.
		*/
		arrOfWords.forEach(function(element) {
			entries = arrOfWords.count(element);
			if ((wordObj.maxEntires === entries) && (wordObj.value != element)){
					wordObj.wordDetectingProblem = true;
				}
		});
		console.log ('Максимум: ' + wordObj.value + ' ' + wordObj.maxEntires);
		return wordObj;
	}

	function cleanText() {
		var helpWords = ['noun', 'adjective', 'verb', 'adverb', 'preposition', 'abbreviation', 'phrase', 'pronoun', 'interjection', 'particle', 'auxiliary verb', 'conjunction'];
		var helpWordsRu = ['сущ.', 'прилаг.', 'глаг.', 'нареч.', 'предлог', 'аббревиатура', 'фраза', 'местоимение', 'междометие', 'частица', 'вспомогат. глаг.', 'союз'];
		var engWords; // Массив всех английских слов, найденных в тексте
		var sourceEngWord = {};

		var resultTxt = document.getElementById('textToClean').value;

		// Проходим по всем элементам массива и, если находим названия частей речи, то переводим их на русский язык
		helpWords.forEach(function(element, index) {
			var reg=new RegExp('^'+element+'$','gm');
			if (resultTxt.match(reg)) {

				/*
				 	Если строка является частью речи, 
					то делаем замену агнлийского на русский
					с добавлением разделительных символов
				*/
				console.log('resultTxt.match(reg)=',resultTxt.match(reg));
				resultTxt = resultTxt.replace(reg, '; ' + helpWordsRu[index] + ':');
			}
			
		}); ////////////////////////////////////////////////
		
		// Подсчитываем, какое слово встречается наиболее часто
		engWords = resultTxt.match(/\w+/gim);
		sourceEngWord = findTheWordWithMaxEntry(engWords);
		console.log('Максимум(внеш):' + sourceEngWord.value + ' ' + sourceEngWord.maxEntires);
		console.log ('wordDetectingProblem = ', sourceEngWord.wordDetectingProblem);

		resultTxt = resultTxt.replace(/[a-zA-Z]+[,|']*\s*\n*/gm, '$').replace(/\s\$+/gm, ', ').replace(/,\s(?=;)/gm,'').replace(/^;/,'').replace(/\,\s$/g,'');

		// выводим текст в html
		
		if (!sourceEngWord.wordDetectingProblem) {
			
			document.getElementById('autodetectedword').innerHTML = 'Автоматически определенное слово: <span style="color:#03A9F4">' + sourceEngWord.value + '</span> ('+sourceEngWord.maxEntires +' вхождений)';
			resultTxt = sourceEngWord.value + ' - ' + resultTxt;
		}
		else {
			document.getElementById('autodetectedword').innerHTML = '<span style="color:red">Невозможно определить слово!</span>';	
		}
		
		document.getElementById('restxt').innerHTML = resultTxt;
		

	} // function cleanText()

	Sugar.extend();
	document.getElementById('cleanTextButton').addEventListener('click', cleanText);

})();