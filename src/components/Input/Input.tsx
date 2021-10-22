import React from 'react'
import styles from './styles.module.css'
import { capitalize } from '../../helpers/capWord'
import { theme } from '../../constants/theme'

type Props = {
	name: string
	error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ name, error = '', ...props }: Props) {
	return (
		<div className={styles.group}>
			<label htmlFor={name}>{capitalize(name)}</label>
			<input
				className={styles.input}
				name={name}
				style={error ? { borderColor: theme.error } : undefined}
				{...props}
			/>
			<p className={styles.error}>{error}</p>
		</div>
	)
}
