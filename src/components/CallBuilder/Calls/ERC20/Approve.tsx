import { FormEvent, useState } from 'react'
import { Call, CallCode, Erc20Approve } from '../../../../types'
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

const initialCalls: Erc20Approve = {
	code: CallCode.ERC20_APPROVE,
	token: '',
	amount: '',
	spender: ''
}

const initialErrors = {
	token: '',
	amount: '',
	spender: ''
}

export default function Approve({ addCall }: Props) {
	const [selected, setSelected] = useState(false)
	const [call, setCall] = useState<Erc20Approve>(initialCalls)
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
				.toFixed()
		}
		if (!isValidAddress(adjustedCall.token)) {
			setErrors({ ...initialErrors, token: 'Invalid Address' })
			return
		}
		if (!isValidAddress(adjustedCall.spender)) {
			setErrors({ ...initialErrors, spender: 'Invalid Address' })
			return
		}
		if (!notZero(adjustedCall.amount)) {
			setErrors({ ...initialErrors, amount: 'Invalid Amount' })
			return
		}
		console.log({ adjustedCall })
		console.log(typeof adjustedCall.amount)
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
				<p style={{ color: theme.primary }}>Approve</p>
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
						name="spender"
						value={call.spender}
						onChange={e =>
							setCall({
								...call,
								spender: e.target.value
							})
						}
						autoComplete="off"
						error={errors.spender}
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
					<Submit value="approve" onClick={handleSubmit} />
					<SecondaryButton preset="destructive" onClick={handleReset}>
						Reset
					</SecondaryButton>
				</form>
			) : null}
		</div>
	)
}
