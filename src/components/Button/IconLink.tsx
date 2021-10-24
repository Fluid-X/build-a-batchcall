import React from 'react'
import styles from './styles.module.css'

type IconLinkProps = {
	iconName: string
	href: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export default function IconLink({ iconName, href, ...props }: IconLinkProps) {
	return (
		<a className={styles.iconLink} href={href} {...props}>
			<span className={styles.materialIcons}>{iconName}</span>
		</a>
	)
}
