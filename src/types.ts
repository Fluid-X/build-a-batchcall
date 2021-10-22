// Helpers
export enum CallByteSize {
	BASE = 68,
	ERC20_APPROVE = 224,
	ERC20_TRANSFER_FROM = 256,
	SUPERTOKEN_UPGRADE = 192,
	SUPERTOKEN_DOWNGRADE = 192,
	CREATE_FLOW = 548,
	UPDATE_FLOW = 548,
	DELETE_FLOW = 548,
	CREATE_INDEX = 516,
	UPDATE_INDEX = 548,
	DISTRIBUTE = 548,
	UPDATE_SUBSCRIPTION = 580,
	APPROVE_SUBSCRIPTION = 548,
	REVOKE_SUBSCRIPTION = 548,
	DELETE_SUBSCRIPTION = 580,
	CLAIM = 580,
	MAX = 130884
}

export type ChainId = '0x5' | '0x89'

export interface NetworkAddresses {
	resolver: string
	host: string
	cfaV1: string
	idaV1: string
	superTokenFactory: string
	superfluidLoaderV1: string
}

// Calls
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

export interface Erc20Approve {
	code: CallCode.ERC20_APPROVE
	token: string
	spender: string
	amount: string
}

export interface Erc20TransferFrom {
	code: CallCode.ERC20_TRANSFER_FROM
	token: string
	sender: string
	recipient: string
	amount: string
}

export interface SuperTokenUpgrade {
	code: CallCode.SUPERTOKEN_UPGRADE
	token: string
	amount: string
}

export interface SuperTokenDowngrade {
	code: CallCode.SUPERTOKEN_DOWNGRADE
	token: string
	amount: string
}

export interface CreateFlow {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.CREATE_FLOW
	token: string
	receiver: string
	flowRate: string
	ctx: string
	userData: string
}

export interface UpdateFlow {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.UPDATE_FLOW
	token: string
	receiver: string
	flowRate: string
	ctx: string
	userData: string
}

export interface DeleteFlow {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.DELETE_FLOW
	token: string
	sender: string
	receiver: string
	ctx: string
	userData: string
}

export interface CreateIndex {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.CREATE_INDEX
	token: string
	indexId: string
	ctx: string
	userData: string
}

export interface UpdateIndex {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.UPDATE_INDEX
	token: string
	indexId: string
	indexValue: string
	ctx: string
	userData: string
}

export interface Distribute {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.DISTRIBUTE
	token: string
	indexId: string
	amount: string
	ctx: string
	userData: string
}

export interface UpdateSubscription {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.UPDATE_SUBSCRIPTION
	token: string
	indexId: string
	subscriber: string
	units: string
	ctx: string
	userData: string
}

export interface ApproveSubscription {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.APPROVE_SUBSCRIPTION
	token: string
	publisher: string
	indexId: string
	ctx: string
	userData: string
}

export interface RevokeSubscription {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.REVOKE_SUBSCRIPTION
	token: string
	publisher: string
	indexId: string
	ctx: string
	userData: string
}

export interface DeleteSubscription {
	code: CallCode.SUPERFLUID_CALL_AGREEMENT
	method: Method.DELETE_SUBSCRIPTION
	token: string
	publisher: string
	subscriber: string
	indexId: string
	ctx: string
	userData: string
}

export interface Claim {
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

// Subgraph Token Statistics
export interface Token {
	id: string
	name: string
	symbol: string
	underlyingAddress: string
}

export interface TokenStatistic {
	totalOutflowRate: string
	totalSupply: string
	token: Token
}
