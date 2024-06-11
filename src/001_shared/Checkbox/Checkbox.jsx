import React from 'react'
import styles from './Checkbox.module.css'

function Checkbox({ text, checked, onChange, name }) {
	return (
		<label className={styles.control + ' ' + styles.control_checkbox}>
			{text}
			<input
				type='checkbox'
				checked={checked}
				onChange={onChange}
				name={name}
			/>
			<div className={styles.control_indicator}></div>
		</label>
	)
}

export default Checkbox
