import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
	useQuery,
	useLazyQuery,
	useApolloClient,
	NetworkStatus,
	useReactiveVar,
	gql,
} from '@apollo/client';

import Button from '../../components/Button';
import { GoogleBookBook, } from '../../components/GoogleBookBook';
import { GET_GOOGLE_BOOKS, GET_GOOGLE_BOOK, GET_GOOGLE_BOOKS_CURRENT_SEARCH_STRING } from '../../graphql/queries/queries.js';
import { reactiveVariableMutations } from '../../graphql/operations/mutations';
import { googleBooksCurrentSearchStringVar } from '../../apollo/apolloClient';

const RESTfulExample = () => {

	const client = useApolloClient();
	const [clientExtract, setClientExtract] = useState(null);
	const [toggleCacheView, setToggleCacheView] = useState(false);

	const { setGoogleBooksCurrentSearchStringVar } = reactiveVariableMutations;
	const [googleBooksSearchInput, setGoogleBooksSearchInput] = useState('');
	const [componentDidMount, setComponentDidMount] = useState(false);
	const currentSearchStringReactiveVar = useReactiveVar(googleBooksCurrentSearchStringVar);

	//  const {
	//      loading: currentSearchStringLOADING, 
	//      error: currentSearchStringERROR,
	//      data: currentSearchStringDATA,
	//      previousData: currentSearchStringPreviousDATA,
	//    } = useQuery(
	//      GET_GOOGLE_BOOKS_CURRENT_SEARCH_STRING,
	//  );

	const onCompleted = () => {
		//console.log('>>>>>>>>>>>>>>>>>>>>>>>> RESTfulExample > QUERY > Completed ++++++++++++++++++++');
	};

	const [getGoogleBooks, {
			loading, 
			error,
			data: googleBooksDATA,
			previousData: googleBooksPreviousData,
			refetch,
			fetchMore: fetchMore,
			networkStatus,
			called,
		}] = useLazyQuery(
			GET_GOOGLE_BOOKS,
			{
				variables: {
					orderBy: 'newest',
				},
				notifyOnNetworkStatusChange: true,
				onCompleted,
			}
	);

	const [getGoogleBook, {
			loading: googleBookLoading, 
			error: googleBookError,
			data: googleBookDATA,
		}] = useLazyQuery(
			GET_GOOGLE_BOOK,
	);

	useEffect(() => {
			if (!componentDidMount) {
				setComponentDidMount(true);
			}

			if (componentDidMount) {
				// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ComponentDidMount >>>>>>>>>>>>>>>>>>>>');
			}
		},
		[componentDidMount,]
	);

	useEffect(() => {
			if (currentSearchStringReactiveVar) {
				const currentSearchStringVar = currentSearchStringReactiveVar.currentSearchString;

				if (currentSearchStringVar !== '') {
					if (!googleBooksDATA) {
						getGoogleBooks({ variables: { searchString: currentSearchStringVar },});
					}

					if (googleBooksDATA) {
						refetch({ searchString: currentSearchStringVar });
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
		[toggleCacheView, googleBooksDATA]
	);

	return (
		<>
			<Helmet title="REST Example" />

			{/* ---------------------------------------------- */}

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">REST Example</h1>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 text-break mb-5">
					<div className="mb-3">

						<div className="mb-3">
							<h5>getGoogleBooks Data:</h5>
						</div>

						{networkStatus === NetworkStatus.refetch && (
							<p>
								Refetching...
							</p>
						)}

						{loading && (
							<p>
								Loading...
							</p>
						)}

						{googleBookLoading && (
							<p>
								Loading...
							</p>
						)}

						{error && (
							<b>
								Query Error: {error.message}
							</b>
						)}

						{googleBookError && (
							<b>
								Query Error: {googleBookError.message}
							</b>
						)}

						{googleBooksDATA && (
							<div>
								{googleBooksDATA.googleBooks.books.map((book, index) => (
									<div key={index} className="mb-3 container-padding-border-radius-2">
										<GoogleBookBook book={ book } />
									</div>
								))}
							</div>
						)}

						{googleBookDATA && googleBookDATA.googleBook && (
							<div>
								<div className="mb-3">
									<h5>getGoogleBook Data:</h5>
								</div>
									<div key={googleBookDATA.googleBook.id} className="mb-3 container-padding-border-radius-2">
										<GoogleBookBook book={ googleBookDATA.googleBook } />
									</div>
							</div>
						)}

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

					{googleBooksDATA && (
						<div className="mb-3">
							<Button
								type="button"
								className="btn-success btn-md"
								onClick={() => refetch()}
								buttonText="RefetchQueryResults"
							/>
						</div>
					)}

					<div className="mb-3">
						<Button
							type="button"
							className="btn-success btn-md"
							onClick={ () => getGoogleBook({ variables: { id: 'uW_zzQEACAAJ' }}) }
							buttonText="Get Book ID: uW_zzQEACAAJ"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-success btn-md"
							onClick={() => {console.log(googleBooksCurrentSearchStringVar())} }
							buttonText="Reade RV"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-success btn-md"
							onClick={() => setGoogleBooksCurrentSearchStringVar({currentSearchString: 'kaplan usmle'})}
							buttonText="RV usmle"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-success btn-md"
							onClick={() => setGoogleBooksCurrentSearchStringVar({currentSearchString: 'kaplan mcat'})}
							buttonText="RV mcat"
						/>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-success btn-md"
							onClick={() => setGoogleBooksCurrentSearchStringVar({currentSearchString: 'kaplan lsat'})}
							buttonText="RV lsat"
						/>
					</div>

					<div className="mb-3">
						<div className="row-flex">
							<div className="col-four">
								<input
									type="text"
									className="form-control"
									name="googleBooksSearchInput"
									value={googleBooksSearchInput}
									onChange={e => setGoogleBooksSearchInput(e.target.value)}
									placeholder="Search Google Books"
								/>
							</div>
						</div>
					</div>

					<div className="mb-3">
						<Button
							type="button"
							className="btn-success btn-md"
							onClick={() => setGoogleBooksCurrentSearchStringVar({currentSearchString: googleBooksSearchInput})}
							buttonText="Get Google Books"
						/>
					</div>

					{googleBooksDATA && (
						<div className="mb-3">
							<Button
								type="button"
								className="btn-primary btn-md"
								onClick={ async () => {
									await fetchMore({
										variables: {
											after: googleBooksDATA.googleBooks.cursor,
										},
									});
								}}
								buttonText="fetchMore Google Books"
							/>
						</div>
					)}

				</div>
			</div>
		</>
	);
};

export default RESTfulExample;
