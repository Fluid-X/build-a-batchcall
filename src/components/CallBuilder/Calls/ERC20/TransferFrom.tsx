import { useState, FormEvent } from 'react'
import { Call, CallCode, Erc20TransferFrom } from '../../../../types'
import { theme } from '../../../../constants/theme'
import { decimalAdjustment } from '../../../../constants/numbers'
import { IconButton } from '../../../Button'
import styles from '../../styles.module.css'
import { Input, Submit } from '../../../Input'
import { isValidAddress, notZero } from '../../../../helpers/callValidator'
import { SecondaryButton } from '../../../Button'
import BigNumber from 'bignumber.js'

interface Props {
	addCall: (call: Call) => void
}

const initialCalls: Erc20TransferFrom = {
	code: CallCode.ERC20_TRANSFER_FROM,
	token: '',
	sender: '',
	recipient: '',
	amount: ''
}

const initialErrors = {
	token: '',
	sender: '',
	recipient: '',
	amount: ''
}

export default function TransferFrom({ addCall }: Props) {
	const [selected, setSelected] = useState(false)
	const [call, setCall] = useState<Erc20TransferFrom>(initialCalls)
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
		if (!isValidAddress(adjustedCall.sender)) {
			setErrors({ ...initialErrors, sender: 'Invalid Address' })
			return
		}
		if (!isValidAddress(adjustedCall.recipient)) {
			setErrors({ ...initialErrors, recipient: 'Invalid Address' })
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
				<p style={{ color: theme.primary }}>Transfer From</p>
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
						May require sender's approval.
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
						name="sender"
						value={call.sender}
						onChange={e =>
							setCall({
								...call,
								sender: e.target.value
							})
						}
						autoComplete="off"
						error={errors.sender}
					/>
					<Input
						name="recipient"
						value={call.recipient}
						onChange={e =>
							setCall({
								...call,
								recipient: e.target.value
							})
						}
						autoComplete="off"
						error={errors.recipient}
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
					<Submit value="transfer from" onClick={handleSubmit} />
					<SecondaryButton preset="destructive" onClick={handleReset}>
						Reset
					</SecondaryButton>
				</form>
			) : null}
		</div>
	)
}
