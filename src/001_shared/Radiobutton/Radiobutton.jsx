import React from 'react'
import styles from './Radiobutton.module.css'

function Radiobutton({ text, checked, onChange, name }) {
	return (
		<label className={styles.control + ' ' + styles.control_radio}>
			{text}
			<input type='radio' name={name} checked={checked} onChange={onChange} />
			<div className={styles.control_indicator}></div>
		</label>
	)
}

export default Radiobutton
