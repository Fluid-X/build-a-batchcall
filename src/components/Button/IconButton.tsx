import React from 'react'
import styles from './styles.module.css'

type IconButtonProps = {
	iconName: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function IconButton({ iconName, ...props }: IconButtonProps) {
	return (
		<button className={styles.iconButton} {...props}>
			<span className={styles.materialIcons}>{iconName}</span>
		</button>
	)
}
