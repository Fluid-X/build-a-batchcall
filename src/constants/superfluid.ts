import { ChainId, NetworkAddresses } from '../types'

export const superfluid = {
	matic: {
		resolver: '0xe0cc76334405ee8b39213e620587d815967af39c',
		host: '0x3e14dc1b13c488a8d5d310918780c983bd5982e7',
		cfaV1: '0x6eee6060f715257b970700bc2656de21dedf074c',
		idaV1: '0xb0aabba4b2783a72c52956cdef62d438eca2d7a1',
		superTokenFactory: '0x2c90719f25b10fc5646c82da3240c76fa5bccf34',
		superfluidLoaderV1: '0x15f0ca26781c3852f8166ed2ebce5d18265cceb7'
	},
	goerli: {
		resolver: '0x3710ab3fde2b61736b8bb0ce845d6c61f667a78e',
		host: '0x22ff293e14f1ec3a09b137e9e06084afd63addf9',
		cfaV1: '0xed6bcbf6907d4feeee8a8875543249bea9d308e8',
		idaV1: '0xfddcdac21d64b639546f3ce2868c7ef06036990c',
		superTokenFactory: '0x94f26b4c8ad12b18c12f38e878618f7664bdcce2',
		superfluidLoaderV1: '0x74d860243ff08a243d5485899f343117ebda6ea8'
	}
}

export const getNetwork = (chainId: ChainId): NetworkAddresses => {
	switch (chainId) {
		case '0x5':
			return superfluid.goerli
		case '0x89':
			return superfluid.matic
		// more to come
	}
}
