import { useState } from 'react'
import Header from '../../components/Header'
import Main from '../../components/Main'
import Sidebar from '../../components/Sidebar'
import { Call, ChainId } from '../../types'
import Helperbar from '../../components/Helperbar'
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql
} from '@apollo/client'
import { getEndPoint } from '../../constants/endpoints'
import type { Framework } from '@superfluid-finance/js-sdk'
import { encodeCalls } from '../../helpers/callEncoder'
import { getNetwork } from '../../constants/superfluid'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

const getClient = (uri: string) =>
	new ApolloClient({ uri, cache: new InMemoryCache() })

const TOKENS = gql`
	query GetTokens {
		tokenStatistics(first: 1000, where: { totalSupply_gt: "0" }) {
			totalOutflowRate
			totalSupply
			token {
				id
				symbol
				name
				underlyingAddress
			}
		}
	}
`

interface Props {
	sf: Framework | null
	errorMessage: string
	chain: string
}

export default function Dashboard({ sf, errorMessage, chain }: Props) {
	const [calls, setCalls] = useState<Array<Call>>([])
	const { loading, error, data } = useQuery(TOKENS)

	const addCall = (call: Call) => setCalls(calls.concat(call))
	const removeCall = (call: Call) => setCalls(calls.filter(c => c !== call))
	const clearAllCalls = () => setCalls([])
	const handleExecute = async () => {
		if (sf) {
			const encoded: any[][] = encodeCalls(calls, sf)
			try {
				const hackedSf = sf as any
				await hackedSf.host.batchCall(encoded)
			} catch (error) {
				console.error({ buildABatchCall: error })
				alert('Batch Call Error.\nPlease view the console logs.')
			}
		}
	}

	console.log(sf)

	if (errorMessage) return <Error message={errorMessage} />
	if (error) return <Error message={error.message} />
	if (!sf || loading) return <Loader />

	return (
		<ApolloProvider client={getClient(getEndPoint(chain as ChainId))}>
			<Header />
			<div style={{ display: 'flex' }}>
				<Sidebar addCall={addCall} />
				<Main
					removeCall={removeCall}
					calls={calls}
					handleExecute={handleExecute}
					clearAllCalls={clearAllCalls}
				/>
				<Helperbar network={getNetwork(chain as ChainId)} data={data} />
			</div>
		</ApolloProvider>
	)
}
