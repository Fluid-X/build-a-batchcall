import styles from './styles.module.css'
import { theme } from '../../constants/theme'

interface Props {
	message: string
}

export default function Error({ message }: Props) {
	return (
		<div className={styles.error} style={{ background: theme.low }}>
			<div className={styles.box} style={{ background: theme.high }}>
				<div>
					<span className={styles.materialIcons}>{'error'}</span>
				</div>
				<p className={styles.message}>{message}</p>
			</div>
		</div>
	)
}
