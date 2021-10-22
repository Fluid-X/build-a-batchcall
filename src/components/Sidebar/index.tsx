import styles from './styles.module.css'
import { theme } from '../../constants/theme'
import { Call } from '../../types'
import {
	Approve,
	ApproveSubscription,
	Claim,
	CreateFlow,
	CreateIndex,
	DeleteFlow,
	DeleteSubscription,
	Distribute,
	Downgrade,
	RevokeSubscription,
	TransferFrom,
	UpdateFlow,
	UpdateIndex,
	UpdateSubscription,
	Upgrade
} from '../CallBuilder'

interface Props {
	addCall: (call: Call) => void
}

export default function Sidebar({ addCall }: Props) {
	return (
		<div className={styles.sidebar} style={{ background: theme.mid }}>
			<h3 className={styles.title}>ERC20 Calls</h3>
			<Approve addCall={addCall} />
			<TransferFrom addCall={addCall} />
			<h3 className={styles.title}>Super Token Calls</h3>
			<Downgrade addCall={addCall} />
			<Upgrade addCall={addCall} />
			<h3 className={styles.title}>Superfluid Calls</h3>
			<CreateFlow addCall={addCall} />
			<UpdateFlow addCall={addCall} />
			<DeleteFlow addCall={addCall} />
			<CreateIndex addCall={addCall} />
			<UpdateIndex addCall={addCall} />
			<Distribute addCall={addCall} />
			<UpdateSubscription addCall={addCall} />
			<ApproveSubscription addCall={addCall} />
			<RevokeSubscription addCall={addCall} />
			<DeleteSubscription addCall={addCall} />
			<Claim addCall={addCall} />
		</div>
	)
}
