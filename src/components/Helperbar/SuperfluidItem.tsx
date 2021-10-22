import { useState } from 'react'
import { theme } from '../../constants/theme'
import { IconButton } from '../Button'
import styles from './styles.module.css'
import { capitalize } from '../../helpers/capWord'

interface Props {
	entryKey: string
	value: string
}

export default function SuperfluidItem({ entryKey, value }: Props) {
	const [isCopied, setIsCopied] = useState(false)

	const copyToClipboard = async (text: string) => {
		if ('clipboard' in navigator)
			return await navigator.clipboard.writeText(text)
		else throw new Error('Clipboard Unsupported in This Browser')
	}

	const handleCopyClip = () => {
		copyToClipboard(value)
			.then(() => {
				setIsCopied(true)
				setTimeout(() => setIsCopied(false), 1500)
			})
			.catch(e => alert(e))
	}

	return (
		<div className={styles.item} style={{ background: theme.high }}>
			<p style={{ color: theme.primary }}>{capitalize(entryKey)}</p>
			<p>{value}</p>
			<div className={styles.row}>
				<div style={{ flex: 1 }} />
				<p style={{ marginRight: 8 }}>
					{isCopied ? 'Copied!' : 'Copy'}
				</p>
				<IconButton iconName="content_copy" onClick={handleCopyClip} />
			</div>
		</div>
	)
}
