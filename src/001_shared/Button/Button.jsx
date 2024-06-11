import React from 'react'
import styles from './Button.module.css'
import { getClassName } from '../../lib/getClassName'

function Button({
	variant = 'primary',
	color = 'blue',
	width,
	height,
	text,
	onClick,
}) {
	return (
		<button
			style={{ width: width, height: height }}
			className={`${getClassName(styles, [color, variant])} ${styles.button}`}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

export default Button
