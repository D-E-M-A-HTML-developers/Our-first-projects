// Получение необходимых селекторов
const labelSum = document.querySelector(".sum-credit__label");
const labelTerm = document.querySelector(".term-credit__label");
const sumSlider = document.querySelector(".sum-credit");
const termSlider = document.querySelector(".term-credit");
const sumProgress = document.querySelector(".sum-credit__progress");
const termProgress = document.querySelector(".term-credit__progress");
const sumCreditTake = document.querySelector(".sum-credit-take");
const date = document.querySelector(".date-return");

// Ширина ползунка - 21px
const thumbWidth = 21;

// Вычисление ширины заливки слайдеров при загрузке страницы
sumProgress.style.width = widthProgress(sumSlider) + "px";
termProgress.style.width = widthProgress(termSlider) + "px";

// Вывод на экран выбранных значений лейблов при загрузке страницы
labelSum.textContent = sumSlider.value + " 000 ₽";
sumCreditTake.textContent = labelSum.textContent;
date.textContent = getReturnDate(termSlider.value);

// Вычисление положения лейблов при загрузке страницы
labelSum.style.left = positionLabel(labelSum, sumSlider, sumProgress) + "px";
labelTerm.style.left = positionLabel(labelTerm, termSlider, termProgress) + "px";

// Вызываемое событие при перемещении ползунка
sumSlider.oninput = function () {
	// Вывод на экран выбранной суммы
	labelSum.textContent = this.value + " 000 ₽";
	sumCreditTake.textContent = labelSum.textContent;

	// Вычисление ширины заливки слайдера sumProgress
	sumProgress.style.width = widthProgress(sumSlider) + "px";

	// Вычисление положения labelSum (сумма)
	labelSum.style.left = positionLabel(labelSum, sumSlider, sumProgress) + "px";

	// Вычисление разницы в положении от левой границы страницы для sumSlider и labelSum
	// Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию
	// относительно viewport(часть страницы, показанная на экране, и которую мы видим).
	const delta =
		sumSlider.getBoundingClientRect().left -
		labelSum.getBoundingClientRect().left;
	
	// Если больше 0px
	if (delta > 0) {
		// прилипаем к левому краю слайдера
		labelSum.style.left = "-150px";
	} else if (delta < -300)
		// если меньше -300px, прилипаем к правому краю слайдера
		labelSum.style.left = "140px";
};

// Вызываемое событие при перемещении ползунка
termSlider.oninput = function () {
	// Получение значения выбранного срока
	let textTerm = this.value;

	// Вывод на экран даты окончания срока кредитования
	date.textContent = getReturnDate(textTerm);

	// Проверка на соответствие 'день/дня/дней'
	if (textTerm == 1 || textTerm == 21) {
		textTerm += " день";
	} else if (
		(this.value >= 2 && this.value <= 4) ||
		(this.value >= 22 && this.value <= 24)
	) {
		textTerm += " дня";
	} else {
		textTerm += " дней";
	}

	// Вывод на экран выбранного срока
	labelTerm.textContent = textTerm;

	// Вычисление ширины заливки слайдера termProgress
	termProgress.style.width = widthProgress(termSlider) + "px";

	// Вычисление положения labelTerm (срок)
	labelTerm.style.left = positionLabel(labelTerm, termSlider, termProgress) + "px";

	// Вычисление разницы в положении от левой границы страницы termSlider и labelTerm
	// Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию
	// относительно viewport(часть страницы, показанная на экране, и которую мы видим).
	const delta =
		termSlider.getBoundingClientRect().left -
		labelTerm.getBoundingClientRect().left;
	// если больше 0px
	if (delta > 0) {
		// прилипаем к левому краю слайдера
		labelTerm.style.left = "-160px";
	} else if (delta < -300)
		// если меньше -300px
		// прилипаем к Правому краю слайдера
		labelTerm.style.left = "145px";
};

// Вычисление ширины заливки
function widthProgress(slider) {
	// Вычисление ширины заливки слайдера от начала до положения ползунка
	// ((<значение_слайдера> - <min_значение>) / (<max_значение> - <min_значение>)) *
	// (<ширина_слайдера> - <ширина_ползунка>)
	const width = ((slider.value - slider.min) /
		(slider.max - slider.min)) *
		(slider.offsetWidth - thumbWidth);
	return width;
}

// Вычисление позиции лейбла
function positionLabel(label, slider, progress) {
	// Масштабный коэффициент для центрирования лейбла относительно ползунка
	const scale = 6;

	// Так как 'label' имеет свойство 'position: relative', то для него
	// нулевая точка (точка отсчета = 0px) находится в середине родительского
	// блока - 'form'. Вычисление нулевой точки для 'label', которая является
	// половиной ширины слайдера:
	// <ширина_слайдера> / 2
	const zeroPoint = slider.offsetWidth / 2;

	// Задание положения 'label' в блоке 'form'
	// <ширина_заливки> - zeroPoint + (<ширина_лейбла> / <масштабный_коэффициент>)
	const position = progress.offsetWidth - zeroPoint + (label.offsetWidth / scale)
	return position;
}

// Вычисление даты возврата на основе текущей
function getReturnDate(numDay) {
	// Получение текущей даты
	const today = new Date();

	// Вычисление нового числа для возврата кредита
	// <текущее_число> + <срок_кредита>, 
	const day = today.getDate() + Number.parseInt(numDay);

	// Установка даты возврата, если 'day' превышает кол-во дней в месяце,
	// то JS автоматически откорректирует результат. 
	today.setDate(day);

	// Получение месяца в текстовом виде
	let month = today.toLocaleDateString('default', { month: 'long' })

	// Изменение окончания для месяца (январь -> 0, февраль -> 1, и т. д.)
	if (today.getMonth() === 2 || // март
		today.getMonth() === 7)   // август
	{ // Если март или август, просто добавляем в конец "а"
		month += "а";
	}
	else { // Для остальных месяцев заменяем последнюю букву на "я"
		month = month.slice(0, -1); // удаляем последнюю букву
		month += "я"								// добавляем в конец "я"
	}

	// Сборка строки даты возврата для вывода (например: 10 июля 2023)
	const dateString = today.getDate() + " " + month + " " + today.getFullYear();
	return dateString;
}
