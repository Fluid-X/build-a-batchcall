import { FormEvent, useState } from 'react'
import {
	Call,
	CallCode,
	DeleteFlow as DeleteFlowType,
	Method
} from '../../../../types'
import { theme } from '../../../../constants/theme'
import { isValidAddress } from '../../../../helpers/callValidator'
import styles from '../../styles.module.css'
import { IconButton, SecondaryButton } from '../../../Button'
import { Input, Submit } from '../../../Input'

interface Props {
	addCall: (call: Call) => void
}

const initialCall: DeleteFlowType = {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT,
	method: Method.DELETE_FLOW,
	token: '',
	sender: '',
	receiver: '',
	ctx: '',
	userData: ''
}

const initialErrors = {
	token: '',
	sender: '',
	receiver: ''
}

export default function DeleteFlow({ addCall }: Props) {
	const [selected, setSelected] = useState(false)
	const [advanced, setAdvanced] = useState(false)
	const [call, setCall] = useState<DeleteFlowType>(initialCall)
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
		if (!isValidAddress(call.sender)) {
			setErrors({ ...initialErrors, sender: 'Invalid Address' })
			return
		}
		if (!isValidAddress(call.receiver)) {
			setErrors({ ...initialErrors, receiver: 'Invalid Address' })
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
				<p style={{ color: theme.primary }}>Delete Flow</p>
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
						name="sender"
						value={call.sender}
						onChange={e =>
							setCall({ ...call, sender: e.target.value })
						}
						autoComplete="off"
						error={errors.sender}
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
