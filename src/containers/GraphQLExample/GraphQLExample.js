import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
	useQuery,
	useLazyQuery,
	useApolloClient,
	NetworkStatus,
	gql,
	useReactiveVar,
} from '@apollo/client';

import { charactercurrentSearchStringVar } from '../../apollo/apolloClient';
import { Loading } from '../../components/Loading';
import Button from '../../components/Button';
import { RickAndMortyCharacter } from '../../components/RickAndMortyCharacter';
import { GET_RICK_AND_MORTY_CHARACTERS, GET_CHARACTERS_CURRENT_SEARCH_STRING } from '../../graphql/queries/queries.js';

import { reactiveVariableMutations } from '../../graphql/operations/mutations';
import { charactersCurrentSearchStringVar, charactersCurrentSearchStringEVALVar } from '../../apollo/apolloClient';


const GraphQLExample = () => {

	const client = useApolloClient();
	const { setCharactersCurrentSearchStringVar } = reactiveVariableMutations;

	const inputElement = useRef(null);
	const [clientExtract, setClientExtract] = useState(null);
	const [rickAndMortyCharactersInfo, setRickAndMortyCharactersInfo] = useState(false);
	const [rickAndMortyCharactersFilterName, setRickAndMortyCharactersFilterName] = useState('');
	const [rickAndMortyCharactersCurrentPage, setRickAndMortyCharactersCurrentPage] = useState(null);
	const [rickAndMortyResults, setRickAndMortyResults] = useState(false);
	const [toggleCacheView, setToggleCacheView] = useState(false);
	const [skipUseQueryRefetch, setSkipUseQueryRefetch] = useState(false);

	const [componentDidMount, setComponentDidMount] = useState(false);
	const currentSearchStringReactiveVar = useReactiveVar(charactersCurrentSearchStringVar);

	//  const {
	//      loading: currentSearchStringLOADING, 
	//      error: currentSearchStringERROR,
	//      data: currentSearchStringDATA,
	//      previousData: currentSearchStringPreviousDATA,
	//    } = useQuery(
	//      GET_CHARACTERS_CURRENT_SEARCH_STRING,
	//  );

	const [getRickAndMortyCharacters, {
			loading: rickAndMortyCharactersLoading,
			error: rickAndMortyCharactersError,
			data: rickAndMortyCharactersDATA,
			previousData: rickAndMortyCharactersPreviousDATA,
			refetch,
			fetchMore,
			networkStatus,
			called,
		}] = useLazyQuery(
			gql`${GET_RICK_AND_MORTY_CHARACTERS}`,
			{
				notifyOnNetworkStatusChange: true,
				onCompleted: () => {
					if (rickAndMortyCharactersDATA) {
						const { characters: { info }} = rickAndMortyCharactersDATA;
						const { characters: { results }} = rickAndMortyCharactersDATA;
						if (info) {
							setRickAndMortyCharactersInfo(info);
							if (!info.prev && info.next) {
								setRickAndMortyCharactersCurrentPage(1);
							} else if (info.next && info.prev) {
								setRickAndMortyCharactersCurrentPage(info.next - 1);
							} else {
								setRickAndMortyCharactersCurrentPage(info.pages);
							}
						}
						if (results.length > 0) {
							setRickAndMortyResults(true);
						}
					}
				}
			}
	);

	useEffect(() => {
			if (!componentDidMount) {
				setComponentDidMount(true);
			}

			if (componentDidMount) {
				// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ComponentDidMount >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
			}
		},
		[componentDidMount,]
	);

	useEffect(() => {
			if (currentSearchStringReactiveVar) {
				const currentSearchStringVar = currentSearchStringReactiveVar.currentSearchString;

				if (currentSearchStringVar !== '') {
					if (!rickAndMortyCharactersDATA) {
						getRickAndMortyCharacters({ variables: { filter: {name: currentSearchStringVar }},});
					}

					if (rickAndMortyCharactersDATA) {
						refetch({ filter: {name: currentSearchStringVar }});
					}
				}
			}
		},
		[currentSearchStringReactiveVar,]
	);

	useEffect(() => {
			if (toggleCacheView) {
				setClientExtract(client.extract());
			}
		},
		[toggleCacheView, rickAndMortyCharactersDATA]
	);

	return (
		<>
			<Helmet title="GraphQL Example" />

			{/* ---------------------------------------------- */}

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">GraphQL Example</h1>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 text-break mb-5">
					<div className="mb-3">

						<div className="mb-3">
							<h5>rickAndMortyCharactersDATA Data:</h5>
						</div>

						<div className="mb-3">
							{networkStatus === NetworkStatus.refetch && (
								<b><Loading text="Refetching" /></b>
							)}

							{rickAndMortyCharactersLoading && (
								<b><Loading text="Loading" /></b>
							)}

							{rickAndMortyCharactersError && (
								<b>Query Error: {rickAndMortyCharactersError.message}</b>
							)}
						</div>

						<div>
							{rickAndMortyCharactersDATA && rickAndMortyResults && (
								<div>
									{rickAndMortyCharactersDATA.characters.results.map((character, index) => (
										<div key={index} className="mb-3 container-padding-border-radius-2">
											<RickAndMortyCharacter character={ character } />
										</div>
									))}
								</div>
							)}
							{rickAndMortyCharactersDATA && !rickAndMortyResults && (
								<div><b>Query Error: No data.</b></div>
							)}
						</div>

						{clientExtract && (
							<div className={!toggleCacheView ? 'text-overflow-ellipsis-one' : ''}>
								<h5>ApolloClient Cache:</h5>
								<div>{JSON.stringify(clientExtract)}</div>
							</div>
						)}
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-success btn-md"
							onClick={() => setToggleCacheView(!toggleCacheView)}
							buttonText={!clientExtract ? "View Apollo Cache" : "Toggle Cache View"}
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-success btn-md"
							onClick={() => {console.log(charactersCurrentSearchStringVar())} }
							buttonText={"Read RV"}
						/>
					</div>

					<div className="mb-3">
						<div className="row-flex">
							<div className="col-four">
								<input
									ref={inputElement}
									type="text"
									className="form-control"
									name="rickAndMortyCharactersFilterName"
									defaultValue={rickAndMortyCharactersFilterName}
									onChange={e => setRickAndMortyCharactersFilterName(e.target.value)}
									placeholder="Rick, Morty, Beth..."
								/>
							</div>
						</div>
					</div>

					{rickAndMortyCharactersCurrentPage && (
						<div className="mb-3">
							<b>Page {rickAndMortyCharactersCurrentPage} of {rickAndMortyCharactersInfo.pages}</b>
						</div>
					)}

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-success btn-md`}
							onClick={() => setCharactersCurrentSearchStringVar({currentSearchString: rickAndMortyCharactersFilterName})}
							buttonText="Get Characters"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-success btn-md`}
							onClick={() => setCharactersCurrentSearchStringVar({currentSearchString: 'Rick'})}
							buttonText="Get Rick"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-success btn-md`}
							onClick={() => setCharactersCurrentSearchStringVar({currentSearchString: 'Beth'})}
							buttonText="Get Beth"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className={`btn-success btn-md`}
							onClick={() => setCharactersCurrentSearchStringVar({currentSearchString: 'Morty'})}
							buttonText="Get Morty"
						/>
					</div>

					{rickAndMortyCharactersDATA && rickAndMortyCharactersInfo && (
						<div className="mb-3">
							<Button
								type="button"
								className={`btn-primary btn-md ${rickAndMortyCharactersInfo ? rickAndMortyCharactersInfo.next ? '' : 'disabled' : null}`}
								onClick={ () => {
									fetchMore({
										variables: {page: rickAndMortyCharactersInfo.next,},
									});
								}}
								buttonText="Fetch More"
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default GraphQLExample;
