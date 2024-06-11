export const getClassName = (styles, classNames) => {
	let str = ''

	classNames.map(el => {
		str += `${styles[el]} `
	})

	return str
}
