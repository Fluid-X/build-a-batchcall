import { FormEvent, useState } from 'react'
import {
	Call,
	CallCode,
	UpdateFlow as UpdateFlowType,
	Method
} from '../../../../types'
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

const initialCall: UpdateFlowType = {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT,
	method: Method.UPDATE_FLOW,
	token: '',
	receiver: '',
	flowRate: '',
	ctx: '',
	userData: ''
}

const initialErrors = {
	token: '',
	receiver: '',
	flowRate: ''
}

export default function UpdateFlow({ addCall }: Props) {
	const [selected, setSelected] = useState(false)
	const [advanced, setAdvanced] = useState(false)
	const [call, setCall] = useState<UpdateFlowType>(initialCall)
	const [errors, setErrors] = useState(initialErrors)

	const rotate = selected
		? { transform: 'rotateZ(45deg)' }
		: { transform: 'rotateZ(0)' }

	const handleSubmit = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault()
		const adjustedCall: Call = {
			...call,
			flowRate: new BigNumber(call.flowRate)
				.multipliedBy(decimalAdjustment)
				.toString()
		}
		if (!isValidAddress(adjustedCall.token)) {
			setErrors({ ...initialErrors, token: 'Invalid Address' })
			return
		}
		if (!isValidAddress(adjustedCall.receiver)) {
			setErrors({ ...initialErrors, receiver: 'Invalid Address' })
			return
		}
		if (!notZero(adjustedCall.flowRate)) {
			setErrors({ ...initialErrors, flowRate: 'Invalid Address' })
			return
		}
		addCall(adjustedCall)
		setCall(initialCall)
	}

	const handleReset = (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setCall(initialCall)
		setErrors(initialErrors)
	}

	const handleAdvanced = (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setAdvanced(!advanced)
	}

	return (
		<div className={styles.container} style={{ background: theme.top }}>
			<header className={styles.header}>
				<p style={{ color: theme.primary }}>Update Flow</p>
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
						name="receiver"
						value={call.receiver}
						onChange={e =>
							setCall({ ...call, receiver: e.target.value })
						}
						autoComplete="off"
						error={errors.receiver}
					/>
					<Input
						name="flowrate"
						value={call.flowRate}
						type="number"
						onChange={e =>
							setCall({
								...call,
								flowRate: e.target.value
							})
						}
						autoComplete="off"
						error={errors.flowRate}
					/>
					<p>
						{call.flowRate !== ''
							? new BigNumber(call.flowRate)
									.multipliedBy(decimalAdjustment)
									.toString()
							: '0'}
					</p>
					{advanced ? (
						<>
							<div className="divider" />
							<Input
								name="user data"
								value={call.userData}
								onChange={e =>
									setCall({
										...call,
										userData: e.target.value
									})
								}
								autoComplete="off"
							/>
							<Input
								name="context"
								value={call.ctx}
								onChange={e =>
									setCall({ ...call, ctx: e.target.value })
								}
								autoComplete="off"
							/>
						</>
					) : null}
					<Submit onClick={handleSubmit} />
					<SecondaryButton preset="destructive" onClick={handleReset}>
						Reset
					</SecondaryButton>
					<SecondaryButton onClick={handleAdvanced}>
						Advanced Mode
					</SecondaryButton>
				</form>
			) : null}
		</div>
	)
}
