import styles from './styles.module.css'
import React from 'react'

export default function Submit({
	value,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className={styles.group}>
			<input className={styles.submit} type="submit" {...props} />
		</div>
	)
}
