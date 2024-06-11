import React from 'react'
import styles from './Input.module.css'

function Input({ title, error, value, onChange }) {
	return (
		<div className={styles.input__area}>
			<h4 className={styles.input__title}>{title}</h4>
			<input
				type='text'
				className={error && styles.error__input}
				value={value}
				onChange={onChange}
			/>
			{error && <span className={styles.error__text}>Введите данные</span>}
		</div>
	)
}

export default Input
