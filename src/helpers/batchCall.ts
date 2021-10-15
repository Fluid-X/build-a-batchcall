// import { Framework } from '@superfluid-finance/js-sdk'
import { AbiCoder } from 'web3-eth-abi'
import { Call, CallCode, Method } from '../types'

const abi = new AbiCoder()

// sf should be Framework, but methods are hella busted.
export const encodeCall = (
	call: Call,
	sf: any
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
									.encodeAbi(),
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
									.encodeAbi(),
								call.userData
							]
						)
					]
				case Method.DELETE_FLOW:
				// TODO because I need a fucking break from this for a bit.
			}

		// throws on CALL_APP_ACTION, as it:
		// has unpredictable gas,
		// will need to be tailored to each app
		// is beyond the scope of the current project
		default:
			throw new Error('Call not yet supported ¯\\_(ツ)_/¯')
	}
}
