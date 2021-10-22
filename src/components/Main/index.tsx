import { useState } from 'react'
import { theme } from '../../constants/theme'
import { Call, CallByteSize, CallCode } from '../../types'
import { capitalize } from '../../helpers/capWord'
import { Button, IconButton, SecondaryButton } from '../Button'
import { estimatedByteSize } from '../../helpers/estimateBytes'
import styles from './styles.module.css'

interface Props {
	calls: Call[]
	removeCall: (call: Call) => void
	handleExecute: () => Promise<void>
	clearAllCalls: () => void
}

export default function Main({
	calls,
	removeCall,
	handleExecute,
	clearAllCalls
}: Props) {
	const [showRaw, setShowRaw] = useState(false)

	const rawJSON = JSON.stringify(calls, null, 1)

	const byteEstimation = estimatedByteSize(calls)

	const renderCall = (call: Call, index: number) => {
		let content = []
		let title = ''
		for (const [key, value] of Object.entries(call)) {
			// capitalize method name, do not follow the convention below
			if (key === 'method') {
				title = capitalize(value)
				continue
			}
			if (key !== 'code')
				content.push(
					<div className={styles.data} key={`${key}-${value}`}>
						<p
							style={{ color: theme.primary }}
							className={styles.name}
						>
							{capitalize(key)}:
						</p>
						<p>{value}</p>
					</div>
				)
			else {
				// key === 'code' !
				switch (value) {
					// if not these,
					// then Superfluid agreement or Super App Action
					case CallCode.ERC20_APPROVE:
						title = 'ERC20Approve'
						break
					case CallCode.ERC20_TRANSFER_FROM:
						title = 'ERC20TransferFrom'
						break
					case CallCode.SUPERTOKEN_UPGRADE:
						title = 'SuperTokenUpgrade'
						break
					case CallCode.SUPERTOKEN_DOWNGRADE:
						title = 'SuperTokenDowngrade'
						break
				}
			}
		}

		return (
			<li
				className={styles.item}
				style={{ background: theme.high }}
				key={`id-${index}`}
			>
				<div className={styles.itemHeader}>
					<h3>Call #{index + 1}</h3>
					<IconButton
						iconName="delete"
						onClick={() => removeCall(call)}
					/>
				</div>
				<p style={{ color: theme.secondary }}>{title}</p>
				{content}
			</li>
		)
	}

	return (
		<div className={styles.main}>
			<div style={{ background: theme.low }} className={styles.container}>
				<h2 style={{ color: theme.secondary }}>Batch Call Overview</h2>
				<div className={styles.outerBar}>
					<div
						className={styles.innerBar}
						style={{
							background: theme.primary,
							width:
								byteEstimation > CallByteSize.MAX
									? 500
									: (byteEstimation / CallByteSize.MAX) * 500
						}}
					/>
				</div>
				<p className={styles.stat}>
					{byteEstimation}/{CallByteSize.MAX} bytes used
				</p>
				{byteEstimation > CallByteSize.MAX ? (
					<div style={{ marginTop: 8 }}>
						<p style={{ color: theme.warning }}>
							Batch Call may exceed byte limit for your RPC
							endpoint!
						</p>
						<p style={{ color: theme.warning }}>
							This is not a guarantee, so you're free to try this.
						</p>
						<p style={{ color: theme.warning }}>
							If this call does work, please contact jtriley.eth
							with the tx hash!
						</p>
					</div>
				) : null}
				{calls.length > 0 ? (
					<div>
						<ul className={styles.list}>{calls.map(renderCall)}</ul>
						{showRaw ? (
							<>
								<div className="divider" />
								<textarea
									readOnly
									spellCheck={false}
									className={styles.json}
									style={{ background: theme.high }}
								>
									{rawJSON}
								</textarea>
							</>
						) : null}
						<SecondaryButton onClick={() => setShowRaw(!showRaw)}>
							{showRaw ? 'Hide' : 'Show'} Raw Data
						</SecondaryButton>
						<Button onClick={handleExecute}>Execute</Button>

						<SecondaryButton
							preset="destructive"
							onClick={clearAllCalls}
						>
							Reset
						</SecondaryButton>
					</div>
				) : null}
			</div>
		</div>
	)
}
