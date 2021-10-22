import Web3 from 'web3'
import { Call, CallCode, Method } from '../types'

const web3 = new Web3((window as any).ethereum)
const abi = web3.eth.abi

export const encodeCalls = (calls: Array<Call>, sf: any): any[][] => {
	return calls.map(call => encodeCall(call, sf))
}

// sf should be Framework, but methods are hella busted.
export const encodeCall = (
	call: Call,
	sf: any // it should be framework, but it's broken atm.
) /*: [CallCode, string, string] */ => {
	switch (call.code) {
		case CallCode.ERC20_APPROVE:
			return [
				call.code,
				call.token,
				abi.encodeParameters(
					['address', 'uint256'],
					[call.spender, call.amount]
				)
			]
		case CallCode.ERC20_TRANSFER_FROM:
			return [
				call.code,
				call.token,
				abi.encodeParameters(
					['address', 'address', 'uint256'],
					[call.sender, call.recipient, call.amount]
				)
			]
		case CallCode.SUPERTOKEN_UPGRADE:
			return [
				call.code,
				call.token,
				abi.encodeParameters(['uint256'], [call.amount])
			]
		case CallCode.SUPERTOKEN_DOWNGRADE:
			return [
				call.code,
				call.token,
				abi.encodeParameters(['uint256'], [call.amount])
			]
		case CallCode.SUPERFLUID_CALL_AGREEMENT:
			call.userData = call.userData || '0x'
			call.ctx = call.ctx || '0x'
			// dang look at that, a nested switch :(
			switch (call.method) {
				case Method.CREATE_FLOW:
					return [
						call.code,
						sf.agreements.cfa.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.cfa.contract.methods
									.createFlow(
										call.token,
										call.receiver,
										call.flowRate,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.UPDATE_FLOW:
					return [
						call.code,
						sf.agreements.cfa.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.cfa.contract.methods
									.updateFlow(
										call.token,
										call.receiver,
										call.flowRate,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.DELETE_FLOW:
					return [
						call.code,
						sf.agreements.cfa.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.cfa.contract.methods
									.deleteFlow(
										call.token,
										call.sender,
										call.receiver,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.CREATE_INDEX:
					return [
						call.code,
						sf.agreements.ida.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.ida.contract.methods
									.createIndex(
										call.token,
										call.indexId,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.UPDATE_INDEX:
					return [
						call.code,
						sf.agreements.ida.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.ida.contract.methods
									.updateIndex(
										call.token,
										call.indexId,
										call.indexValue,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.DISTRIBUTE:
					return [
						call.code,
						sf.agreements.ida.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.ida.contract.methods
									.distribute(
										call.token,
										call.indexId,
										call.amount,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.UPDATE_SUBSCRIPTION:
					return [
						call.code,
						sf.agreements.ida.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.ida.contract.methods
									.updateSubscription(
										call.token,
										call.indexId,
										call.subscriber,
										call.units,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.APPROVE_SUBSCRIPTION:
					return [
						call.code,
						sf.agreements.ida.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.ida.contract.methods
									.approveSubscription(
										call.token,
										call.publisher,
										call.indexId,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.REVOKE_SUBSCRIPTION:
					return [
						call.code,
						sf.agreements.ida.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.ida.contract.methods
									.revokeSubscription(
										call.token,
										call.publisher,
										call.indexId,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.DELETE_SUBSCRIPTION:
					return [
						call.code,
						sf.agreements.ida.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.ida.contract.methods
									.deleteSubscription(
										call.token,
										call.publisher,
										call.indexId,
										call.subscriber,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				case Method.CLAIM:
					return [
						call.code,
						sf.agreements.ida.address,
						abi.encodeParameters(
							['bytes', 'bytes'],
							[
								sf.agreements.ida.contract.methods
									.claim(
										call.token,
										call.publisher,
										call.indexId,
										call.subscriber,
										call.ctx
									)
									.encodeABI(),
								call.userData
							]
						)
					]
				default:
					throw new Error('Unrecognized Agreement Call')
			}

		// throws on CALL_APP_ACTION, as it:
		// has unpredictable gas,
		// will need to be tailored to each app
		// is beyond the scope of the current project
		default:
			throw new Error('Call not yet supported ¯\\_(ツ)_/¯')
	}
}
