import { ChainId } from '../types'
// export const xdai = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-xdai'
// export const mumbai = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-mumbai'
// export const goerli = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-goerli'
// export const ropsten = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-ropsten'
// export const kovan = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-kovan'
// export const rinkeby = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-rinkeby'
// export const matic = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-matic'

// only the feature for now, it has better insights for token visibility
export const matic =
	'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-feature-matic'
export const goerli =
	'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-feature-goerli'

export const getEndPoint = (chainId: ChainId) => {
	switch (chainId) {
		case '0x5':
			return goerli
		case '0x89':
			return matic
		// more to come? :shrug:
	}
}
