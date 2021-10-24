import styles from './styles.module.css'
import { theme } from '../../constants/theme'
import logo from '../../assets/logo512.png'
import github from '../../assets/github.png'

export default function Header() {
	return (
		<header className={styles.header} style={{ background: theme.top }}>
			<div className={styles.titleContainer}>
				<img
					src={logo}
					alt="logo"
					style={{ width: 32, marginRight: 8 }}
				/>
				<h2>Fluid X</h2>
				<div className={styles.titleDivider} />
				<h3>Build a Batch Call (beta)</h3>
			</div>
			<a
				className={styles.link}
				href="https://github.com/Fluid-X/build-a-batchcall"
			>
				<img src={github} alt="github" width={32} />
			</a>
		</header>
	)
}
