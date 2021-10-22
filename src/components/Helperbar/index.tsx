import { theme } from '../../constants/theme'
import TokenItem from './TokenItem'
import BigNumber from 'bignumber.js'
import styles from './styles.module.css'
import { TokenStatistic } from '../../types'
import SuperfluidItem from './SuperfluidItem'

interface Props {
	data: any
	network: any
}

export default function Helperbar({ data, network }: Props) {
	// sort by (flowRate / totalSupply)
	const compare = (a: TokenStatistic, b: TokenStatistic) => {
		const ratioA = new BigNumber(a.totalOutflowRate).dividedBy(
			new BigNumber(a.totalSupply)
		)
		const ratioB = new BigNumber(b.totalOutflowRate).dividedBy(
			new BigNumber(b.totalSupply)
		)
		return ratioB.minus(ratioA).toNumber()
	}

	const sorted = [...data.tokenStatistics].sort(compare)
	return (
		<div className={styles.helperBar} style={{ background: theme.mid }}>
			<h2 className={styles.title}>Superfluid Addresses</h2>
			{Object.entries(network).map(([key, value]) => (
				<SuperfluidItem
					key={`${key}-${value}`}
					entryKey={key}
					value={value as string}
				/>
			))}
			<h2 className={styles.title}>Super Tokens</h2>
			{sorted
				? sorted.map((stat: TokenStatistic) => (
						<TokenItem key={stat.token.id} token={stat.token} />
				  ))
				: null}
		</div>
	)
}
