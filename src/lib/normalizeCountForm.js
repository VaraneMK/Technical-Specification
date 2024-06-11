/**
 * Функция склоняет существительные в зависимости от значения числа
 * @param {Number} number - Значение числа
 * @param {String[]} words_arr - Массив слов, например [гость, гостя, гостей]
 * @returns {String}
 */
export const normalize_count_form = (number, words_arr) => {
	number = Math.abs(number)
	if (Number.isInteger(number)) {
		let options = [2, 0, 1, 1, 1, 2]
		return words_arr[
			number % 100 > 4 && number % 100 < 20
				? 2
				: options[number % 10 < 5 ? number % 10 : 5]
		]
	}
	return words_arr[1]
}
