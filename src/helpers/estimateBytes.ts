import { CallCode, Method, CallByteSize, Call } from '../types'

export const estimatedByteSize = (calls: Call[]) =>
	calls.reduce((sum, call) => {
		let byteSize = 0
		switch (call.code) {
			case CallCode.ERC20_APPROVE:
				byteSize = CallByteSize.ERC20_APPROVE
				break
			case CallCode.ERC20_TRANSFER_FROM:
				byteSize = CallByteSize.ERC20_TRANSFER_FROM
				break
			case CallCode.SUPERTOKEN_UPGRADE:
				byteSize = CallByteSize.SUPERTOKEN_UPGRADE
				break
			case CallCode.SUPERTOKEN_DOWNGRADE:
				byteSize = CallByteSize.SUPERTOKEN_DOWNGRADE
				break
			case CallCode.SUPERFLUID_CALL_AGREEMENT:
				switch (call.method) {
					case Method.CREATE_FLOW:
						byteSize = CallByteSize.CREATE_FLOW
						break
					case Method.UPDATE_FLOW:
						byteSize = CallByteSize.UPDATE_FLOW
						break
					case Method.DELETE_FLOW:
						byteSize = CallByteSize.DELETE_FLOW
						break
					case Method.CREATE_INDEX:
						byteSize = CallByteSize.CREATE_INDEX
						break
					case Method.UPDATE_INDEX:
						byteSize = CallByteSize.UPDATE_INDEX
						break
					case Method.DISTRIBUTE:
						byteSize = CallByteSize.DISTRIBUTE
						break
					case Method.UPDATE_SUBSCRIPTION:
						byteSize = CallByteSize.UPDATE_SUBSCRIPTION
						break
					case Method.APPROVE_SUBSCRIPTION:
						byteSize = CallByteSize.APPROVE_SUBSCRIPTION
						break
					case Method.REVOKE_SUBSCRIPTION:
						byteSize = CallByteSize.REVOKE_SUBSCRIPTION
						break
					case Method.DELETE_SUBSCRIPTION:
						byteSize = CallByteSize.DELETE_SUBSCRIPTION
						break
					case Method.CLAIM:
						byteSize = CallByteSize.CLAIM
						break
				}
		}
		return sum + byteSize
	}, 0)
