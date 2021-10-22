import React from 'react'
import styles from './styles.module.css'

type Props = {
	children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function SecondaryButton({ children, ...props }: Props) {
	return (
		<button className={styles.primary} {...props}>
			{children}
		</button>
	)
}
