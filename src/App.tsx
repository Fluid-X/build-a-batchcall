import { useEffect, useState } from 'react'
import { ChainId } from './types'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { getEndPoint } from './constants/endpoints'
import { ethers } from 'ethers'
import SuperfluidSDK, { Framework } from '@superfluid-finance/js-sdk'
import Dashboard from './components/Dashboard'

const getClient = (uri: string) =>
	new ApolloClient({ uri, cache: new InMemoryCache() })

export default function App() {
	const [sf, setSf] = useState<Framework | null>(null)
	const [chain, setChain] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const initialize = async () => {
		try {
			const windowWeb3 = window as any
			const chainId = await windowWeb3.ethereum.request({
				method: 'eth_chainId'
			})
			if (chainId !== '0x89' && chainId !== '0x5') {
				setErrorMessage(
					'Invalid Chain, Please Switch to Matic or Goerli'
				)
				return
			} else {
				setChain(chainId)
			}
			const provider = new ethers.providers.Web3Provider(
				windowWeb3.ethereum
			)
			const framework = new SuperfluidSDK.Framework({ ethers: provider })
			await framework.initialize()
			setSf(framework)
		} catch (error) {
			const message =
				typeof error === 'string' ? error : (error as Error).message
			setErrorMessage(message)
		}
	}

	useEffect(() => {
		initialize().then(() => console.log('initialized'))
	}, [])

	return (
		<ApolloProvider client={getClient(getEndPoint(chain as ChainId))}>
			<Dashboard sf={sf} errorMessage={errorMessage} chain={chain} />
		</ApolloProvider>
	)
}
