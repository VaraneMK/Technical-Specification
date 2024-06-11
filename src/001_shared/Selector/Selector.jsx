import React from 'react'
import styles from './Selector.module.css'

function Selector({ select, setSelect }) {
	return (
		<div className={styles.selector}>
			<button
				onClick={() => setSelect(true)}
				className={
					select ? styles.selector__side_active : styles.selector__side
				}
			>
				Разработка сайта с нуля
			</button>
			<button
				onClick={() => setSelect(false)}
				className={
					!select ? styles.selector__side_active : styles.selector__side
				}
			>
				Редизайн сайта
			</button>
			<div className={styles.selector__graph}>
				<div
					className={
						select
							? styles.slide__left + ' ' + styles.selector__slide
							: styles.slide__right + ' ' + styles.selector__slide
					}
				></div>
			</div>
		</div>
	)
}

export default Selector
