import { FormEvent, useState } from 'react'
import {
	Call,
	CallCode,
	UpdateSubscription as UpdateSubscriptionType,
	Method
} from '../../../../types'
import { theme } from '../../../../constants/theme'
import { decimalAdjustment } from '../../../../constants/numbers'
import {
	isValidAddress,
	notEmpty,
	notZero
} from '../../../../helpers/callValidator'
import styles from '../../styles.module.css'
import { IconButton, SecondaryButton } from '../../../Button'
import { Input, Submit } from '../../../Input'
import BigNumber from 'bignumber.js'

interface Props {
	addCall: (call: Call) => void
}

const initialCall: UpdateSubscriptionType = {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT,
	method: Method.UPDATE_SUBSCRIPTION,
	token: '',
	subscriber: '',
	indexId: '',
	units: '',
	ctx: '',
	userData: ''
}

const initialErrors = {
	token: '',
	subscriber: '',
	indexId: '',
	units: ''
}

export default function UpdateSubscription({ addCall }: Props) {
	const [selected, setSelected] = useState(false)
	const [advanced, setAdvanced] = useState(false)
	const [call, setCall] = useState<UpdateSubscriptionType>(initialCall)
	const [errors, setErrors] = useState(initialErrors)

	const rotate = selected
		? { transform: 'rotateZ(45deg)' }
		: { transform: 'rotateZ(0)' }

	const handleSubmit = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault()
		const adjustedCall: Call = {
			...call,
			units: new BigNumber(call.units)
				.multipliedBy(decimalAdjustment)
				.toString()
		}
		if (!isValidAddress(adjustedCall.token)) {
			setErrors({ ...initialErrors, token: 'Invalid Address' })
			return
		}
		if (!isValidAddress(adjustedCall.subscriber)) {
			setErrors({ ...initialErrors, subscriber: 'Invalid Address' })
			return
		}
		if (!notEmpty(adjustedCall.indexId)) {
			setErrors({ ...initialErrors, indexId: 'Empty ID' })
			return
		}
		if (!notZero(adjustedCall.units)) {
			setErrors({ ...initialErrors, units: 'Invalid Units' })
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
				<p style={{ color: theme.primary }}>Update Subscription</p>
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
						name="subscriber"
						value={call.subscriber}
						onChange={e =>
							setCall({ ...call, subscriber: e.target.value })
						}
						autoComplete="off"
						error={errors.subscriber}
					/>
					<Input
						name="index id"
						value={call.indexId}
						onChange={e =>
							setCall({ ...call, indexId: e.target.value })
						}
						autoComplete="off"
						error={errors.indexId}
					/>
					<Input
						name="units"
						value={call.units}
						type="number"
						onChange={e =>
							setCall({
								...call,
								units: e.target.value
							})
						}
						autoComplete="off"
						error={errors.units}
					/>
					<p>
						{call.units !== ''
							? new BigNumber(call.units)
									.multipliedBy(decimalAdjustment)
									.toString()
							: '0'}
					</p>
					<p className={styles.subText}>adjusted</p>
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
						{advanced ? 'Close' : 'Open'} Advanced Mode
					</SecondaryButton>
				</form>
			) : null}
		</div>
	)
}
