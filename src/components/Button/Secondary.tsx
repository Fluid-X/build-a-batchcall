import React from 'react'
import styles from './styles.module.css'

type Props = {
	children?: React.ReactNode
	preset?: 'destructive'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function SecondaryButton({ children, preset, ...props }: Props) {
	const presetClassName = preset === 'destructive' ? styles.destructive : ''
	return (
		<button className={`${styles.secondary} ${presetClassName}`} {...props}>
			{children}
		</button>
	)
}
