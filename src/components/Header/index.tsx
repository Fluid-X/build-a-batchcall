import styles from './styles.module.css'
import { theme } from '../../constants/theme'
import logo from '../../assets/logo512.png'

export default function Header() {
	return (
		<header className={styles.header} style={{ background: theme.top }}>
			<img src={logo} alt="logo" style={{ width: 32, marginRight: 8 }} />
			<h2>Fluid X</h2>
			<div className={styles.titleDivider} />
			<h3>Build a BatchCall Beta</h3>
		</header>
	)
}
