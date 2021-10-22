import { FormEvent, useState } from 'react'
import { Call, CallCode, SuperTokenUpgrade } from '../../../../types'
import { theme } from '../../../../constants/theme'
import { decimalAdjustment } from '../../../../constants/numbers'
import { isValidAddress, notZero } from '../../../../helpers/callValidator'
import styles from '../../styles.module.css'
import { IconButton, SecondaryButton } from '../../../Button'
import { Input, Submit } from '../../../Input'
import BigNumber from 'bignumber.js'

interface Props {
	addCall: (call: Call) => void
}

const initialCalls: SuperTokenUpgrade = {
	code: CallCode.SUPERTOKEN_UPGRADE,
	token: '',
	amount: ''
}

const initialErrors = {
	token: '',
	amount: ''
}

export default function Upgrade({ addCall }: Props) {
	const [selected, setSelected] = useState(false)
	const [call, setCall] = useState<SuperTokenUpgrade>(initialCalls)
	const [errors, setErrors] = useState(initialErrors)

	const rotate = selected
		? { transform: 'rotateZ(45deg)' }
		: { transform: 'rotateZ(0)' }

	const handleSubmit = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault()
		const adjustedCall = {
			...call,
			amount: new BigNumber(call.amount)
				.multipliedBy(decimalAdjustment)
				.toString()
		}
		if (!isValidAddress(adjustedCall.token)) {
			setErrors({ ...initialErrors, token: 'Invalid Address' })
			return
		}
		if (!notZero(adjustedCall.amount)) {
			setErrors({ ...initialErrors, amount: 'Invalid Amount' })
			return
		}
		addCall(adjustedCall)
		setCall(initialCalls)
	}

	const handleReset = (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setCall(initialCalls)
		setErrors(initialErrors)
	}

	return (
		<div className={styles.container} style={{ background: theme.top }}>
			<header className={styles.header}>
				<p style={{ color: theme.primary }}>Upgrade</p>
				<div className={styles.buttonContainer}>
					<IconButton
						iconName="add"
						onClick={() => setSelected(!selected)}
						style={{
							transition: 'transform 0.2s',
							...rotate
						}}
					/>
				</div>
			</header>
			{selected ? (
				<form>
					<p className={styles.warning}>
						May require non-batchable approve call.
					</p>
					<Input
						name="token"
						value={call.token}
						onChange={e =>
							setCall({ ...call, token: e.target.value })
						}
						autoComplete="off"
						error={errors.token}
					/>
					<Input
						name="amount"
						value={call.amount}
						type="number"
						onChange={e =>
							setCall({
								...call,
								amount: e.target.value
							})
						}
						autoComplete="off"
						error={errors.amount}
					/>
					<p>
						{call.amount !== ''
							? new BigNumber(call.amount)
									.multipliedBy(decimalAdjustment)
									.toString()
							: '0'}
					</p>
					<p className={styles.subText}>adjusted</p>
					<Submit value="upgrade" onClick={handleSubmit} />
					<SecondaryButton preset="destructive" onClick={handleReset}>
						Reset
					</SecondaryButton>
				</form>
			) : null}
		</div>
	)
}
