import { FormEvent, useState } from 'react'
import {
	Call,
	CallCode,
	UpdateIndex as UpdateIndexType,
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

const intialCall: UpdateIndexType = {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT,
	method: Method.UPDATE_INDEX,
	token: '',
	indexId: '',
	indexValue: '',
	ctx: '',
	userData: ''
}

const initialError = {
	token: '',
	indexId: '',
	indexValue: ''
}

export default function UpdateIndex({ addCall }: Props) {
	const [selected, setSelected] = useState(false)
	const [advanced, setAdvanced] = useState(false)
	const [call, setCall] = useState<UpdateIndexType>(intialCall)
	const [errors, setErrors] = useState(initialError)

	const rotate = selected
		? { transform: 'rotateZ(45deg)' }
		: { transform: 'rotateZ(0)' }

	const handleSubmit = (event: FormEvent<HTMLInputElement>) => {
		event.preventDefault()
		const adjustedCall: Call = {
			...call,
			indexValue: new BigNumber(call.indexValue)
				.multipliedBy(decimalAdjustment)
				.toString()
		}
		if (!isValidAddress(adjustedCall.token)) {
			setErrors({ ...initialError, token: 'Invalid Address' })
			return
		}
		if (!notEmpty(adjustedCall.indexId)) {
			setErrors({ ...initialError, indexId: 'Empty ID' })
			return
		}
		if (!notZero(adjustedCall.indexValue)) {
			setErrors({ ...initialError, indexValue: 'Invalid Index Value' })
			return
		}
		addCall(adjustedCall)
		setCall(intialCall)
	}

	const handleReset = (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setCall(intialCall)
		setErrors(initialError)
	}

	const handleAdvanced = (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setAdvanced(!advanced)
	}

	return (
		<div className={styles.container} style={{ background: theme.top }}>
			<header className={styles.header}>
				<p style={{ color: theme.primary }}>Update Index</p>
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
						May require prior approve call.
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
						name="index id"
						value={call.indexId}
						onChange={e =>
							setCall({ ...call, indexId: e.target.value })
						}
						autoComplete="off"
						error={errors.indexId}
					/>
					<Input
						name="index value"
						value={call.indexValue}
						type="number"
						onChange={e =>
							setCall({
								...call,
								indexValue: e.target.value
							})
						}
						autoComplete="off"
						error={errors.indexValue}
					/>
					<p>
						{call.indexValue !== ''
							? new BigNumber(call.indexValue)
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
