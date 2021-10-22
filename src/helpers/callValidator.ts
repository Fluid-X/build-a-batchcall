import { Call, CallCode, Method } from '../types'
import { isAddress } from 'web3-utils'

// for strings
export const notEmpty = (str: string): boolean => str !== ''
export const notZero = (str: string): boolean => {
	const noRepeats = str.replace(/(.)(?=.*\1)/g, '').toLowerCase()
	return (
		notEmpty(str) &&
		noRepeats !== '0' &&
		noRepeats !== '0x' &&
		str !== 'NaN'
	)
}
export const isValidAddress = (str: string): boolean =>
	notZero(str) && isAddress(str)

export const validateCall = (call: Call): boolean => {
	switch (call.code) {
		case CallCode.ERC20_APPROVE:
			return (
				isValidAddress(call.token) &&
				isValidAddress(call.spender) &&
				notZero(call.amount)
			)
		case CallCode.ERC20_TRANSFER_FROM:
			return (
				isValidAddress(call.token) &&
				isValidAddress(call.sender) &&
				isValidAddress(call.recipient) &&
				notZero(call.amount)
			)
		case CallCode.SUPERTOKEN_UPGRADE:
			return isValidAddress(call.token) && notZero(call.amount)
		case CallCode.SUPERTOKEN_DOWNGRADE:
			return isValidAddress(call.token) && notZero(call.amount)
		case CallCode.SUPERFLUID_CALL_AGREEMENT:
			switch (call.method) {
				case Method.CREATE_FLOW:
					return (
						isValidAddress(call.token) &&
						isValidAddress(call.receiver) &&
						notZero(call.flowRate)
					)
				case Method.UPDATE_FLOW:
					return (
						isValidAddress(call.token) &&
						isValidAddress(call.receiver) &&
						notZero(call.flowRate)
					)
				case Method.DELETE_FLOW:
					return (
						isValidAddress(call.token) &&
						isValidAddress(call.sender) &&
						isValidAddress(call.receiver)
					)
				case Method.CREATE_INDEX:
					return isValidAddress(call.token) && notEmpty(call.indexId)
				case Method.UPDATE_INDEX:
					return (
						isValidAddress(call.token) &&
						notEmpty(call.indexId) &&
						notZero(call.indexValue)
					)
				case Method.DISTRIBUTE:
					return (
						isValidAddress(call.token) &&
						notEmpty(call.indexId) &&
						notZero(call.amount)
					)
				case Method.UPDATE_SUBSCRIPTION:
					return (
						isValidAddress(call.token) &&
						notEmpty(call.indexId) &&
						notZero(call.units)
					)
				case Method.APPROVE_SUBSCRIPTION:
					return (
						isValidAddress(call.token) &&
						isValidAddress(call.publisher) &&
						notEmpty(call.indexId)
					)
				case Method.REVOKE_SUBSCRIPTION:
					return (
						isValidAddress(call.token) &&
						isValidAddress(call.publisher) &&
						notEmpty(call.indexId)
					)
				case Method.DELETE_SUBSCRIPTION:
					return (
						isValidAddress(call.token) &&
						isValidAddress(call.publisher) &&
						notEmpty(call.indexId) &&
						isValidAddress(call.subscriber)
					)
				case Method.CLAIM:
					return (
						isValidAddress(call.token) &&
						isValidAddress(call.publisher) &&
						notEmpty(call.indexId) &&
						isValidAddress(call.subscriber)
					)
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
