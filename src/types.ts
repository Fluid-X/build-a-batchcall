export enum CallCode {
	ERC20_APPROVE = 1,
	ERC20_TRANSFER_FROM = 2,
	SUPERTOKEN_UPGRADE = 101,
	SUPERTOKEN_DOWNGRADE = 102,
	SUPERFLUID_CALL_AGREEMENT = 201,
	CALL_APP_ACTION = 202
}

export enum Agreement {
	CFA = 'cfa',
	IDA = 'ida'
}

export enum Method {
	CREATE_FLOW = 'createFlow',
	UPDATE_FLOW = 'updateFlow',
	DELETE_FLOW = 'deleteFlow',
	CREATE_INDEX = 'createIndex',
	UPDATE_INDEX = 'updateIndex',
	DISTRIBUTE = 'distribute',
	UPDATE_SUBSCRIPTION = 'updateSubscription',
	APPROVE_SUBSCRIPTION = 'approveSubscription',
	REVOKE_SUBSCRIPTION = 'revokeSubscription',
	DELETE_SUBSCRIPTION = 'deleteSubscription',
	CLAIM = 'claim'
}

export enum Bytes {
	BASE = 68,
	ERC20_APPROVE = 224,
	ERC20_TRANSFER_FROM = 0,
	SUPERTOKEN_UPGRADE = 0,
	SUPERTOKEN_DOWNGRADE = 0,
	SUPERFLUID_CALL_AGREEMENT = 0,
	CALL_APP_ACTION = 0
}

interface Erc20Approve {
	code: CallCode.ERC20_APPROVE
	token: string
	spender: string
	amount: string
}

interface Erc20TransferFrom {
	code: CallCode.ERC20_TRANSFER_FROM
	token: string
	sender: string
	recipient: string
	amount: string
}

interface SuperTokenUpgrade {
	code: CallCode.SUPERTOKEN_UPGRADE
	token: string
	amount: string
}

interface SuperTokenDowngrade {
	code: CallCode.SUPERTOKEN_DOWNGRADE
	token: string
	amount: string
}

interface CreateFlow {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.CREATE_FLOW
	token: string
	receiver: string
	flowRate: string
	ctx: string
	userData: string
}

interface UpdateFlow {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.UPDATE_FLOW
	token: string
	receiver: string
	flowRate: string
	ctx: string
	userData: string
}

interface DeleteFlow {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.DELETE_FLOW
	token: string
	receiver: string
	flowRate: string
	ctx: string
	userData: string
}

interface CreateIndex {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.CREATE_INDEX
	token: string
	indexId: string
	ctx: string
	userData: string
}

interface UpdateIndex {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.UPDATE_INDEX
	token: string
	indexId: string
	indexValue: string
	ctx: string
	userData: string
}

interface Distribute {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.DISTRIBUTE
	token: string
	indexId: string
	amount: string
	ctx: string
	userData: string
}

interface UpdateSubscription {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.UPDATE_SUBSCRIPTION
	token: string
	indexId: string
	subscriber: string
	units: string
	ctx: string
	userData: string
}

interface ApproveSubscription {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.APPROVE_SUBSCRIPTION
	token: string
	publisher: string
	indexId: string
	ctx: string
	userData: string
}

interface RevokeSubscription {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.REVOKE_SUBSCRIPTION
	token: string
	publisher: string
	indexId: string
	ctx: string
	userData: string
}

interface DeleteSubscription {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.DELETE_SUBSCRIPTION
	token: string
	publisher: string
	indexId: string
	ctx: string
	userData: string
}

interface Claim {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.CLAIM
	token: string
	publisher: string
	indexId: string
	subscriber: string
	ctx: string
	userData: string
}

export type Call =
	| Erc20Approve
	| Erc20TransferFrom
	| SuperTokenUpgrade
	| SuperTokenDowngrade
	| CreateFlow
	| UpdateFlow
	| DeleteFlow
	| CreateIndex
	| UpdateIndex
	| Distribute
	| UpdateSubscription
	| ApproveSubscription
	| RevokeSubscription
	| DeleteSubscription
	| Claim
