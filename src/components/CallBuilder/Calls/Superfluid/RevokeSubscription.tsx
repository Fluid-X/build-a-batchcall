import { FormEvent, useState } from 'react'
import {
	Call,
	CallCode,
	RevokeSubscription as RevokeSubscriptionType,
	Method
} from '../../../../types'
import { theme } from '../../../../constants/theme'
import { isValidAddress, notEmpty } from '../../../../helpers/callValidator'
import styles from '../../styles.module.css'
import { IconButton, SecondaryButton } from '../../../Button'
import { Input, Submit } from '../../../Input'

interface Props {
	addCall: (call: Call) => void
}

const initialCall: RevokeSubscriptionType = {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT,
	method: Method.REVOKE_SUBSCRIPTION,
	token: '',
	publisher: '',
	indexId: '',
	ctx: '',
	userData: ''
}

const initialErrors = {
	token: '',
	publisher: '',
	indexId: ''
}

export default function RevokeSubscription({ addCall }: Props) {
	const [selected, setSelected] = useState(false)
	const [advanced, setAdvanced] = useState(false)
	const [call, setCall] = useState<RevokeSubscriptionType>(initialCall)
	const [errors, setErrors] = useState(initialErrors)

	const rotate = selected
		? { transform: 'rotateZ(45deg)' }
		: { transform: 'rotateZ(0)' }

	const handleSubmit = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault()
		if (!isValidAddress(call.token)) {
			setErrors({ ...initialErrors, token: 'Invalid Address' })
			return
		}
		if (!isValidAddress(call.publisher)) {
			setErrors({ ...initialErrors, publisher: 'Invalid Address' })
			return
		}
		if (!notEmpty(call.indexId)) {
			setErrors({ ...initialErrors, indexId: 'Empty ID' })
			return
		}
		addCall(call)
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
				<p style={{ color: theme.primary }}>Revoke Subscription</p>
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
						name="publisher"
						value={call.publisher}
						onChange={e =>
							setCall({ ...call, publisher: e.target.value })
						}
						autoComplete="off"
						error={errors.publisher}
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
