import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import papa from 'papaparse';
import * as Styles from './styles';
import fetch from 'isomorphic-fetch';


const AboutCSV = () => {

	const [fetchPLANS, setFetchPLANS] = useState(null);
	const [fetchZIPS, setFetchZIPS] = useState(null);
	const [fetchSLCSP, setFetchSLCSP] = useState(null);
	const [calculatedSLCSP, setCalculatedSLCSP] = useState(null);

	useEffect(() => {

			function filterRow(row) {
				return row.metal_level === 'Silver';
			}

			function filterData(data) {
				return data.filter(filterRow);
			};

			// below works with the complete 'zips.csv' and 'plans.csv'

			//	if (!fetchSLCSP) {
			//		fetch('/plans.csv')
			//			.then(res => {
			//				return res.text()
			//			})
			//			.then(textPlans  => {
			//				papa.parse(textPlans, {
			//					delimiter: ',',
			//					header: true,
			//					complete: (res) => {
			//						const filterPlans = filterData(res.data);
			//						setFetchPLANS(filterPlans);
			//					}
			//				});
			//				return fetch('/zips.csv')
			//			})
			//			.then(res => res.text())
			//			.then(textZips  => {
			//				papa.parse(textZips, { delimiter: ',', header: true, complete: (res) => setFetchZIPS(res.data) });
			//				return fetch('/slcsp.csv')
			//			})
			//			.then(res => res.text())
			//			.then(textSlcsp  => {
			//				papa.parse(textSlcsp, { delimiter: ',', header: true, complete: (res) => setFetchSLCSP(res.data) });
			//			})
			//			.catch(error => {
			//				console.error(error)
			//			})
			//	}
			//	if (fetchSLCSP) {
			//		fetchSLCSP.forEach(calculateSLCSP);
			//		function calculateSLCSP(value, index, array) {

			//			// Have to find ZIP info for EACH ZIP
			//			const slcspZipInfo = fetchZIPS.find(e => e.zipcode === value.zipcode);

			//			// for Each slcspZipInfo, Find any/all matching "state" & "rate_area" in "PLANS.csv"
			//			const slcspArayOfStateRateAreas = fetchPLANS.filter(calculateStateRateAreas);

			//			function calculateStateRateAreas(value, index) {
			//				return (value.state === slcspZipInfo.state) && (value.rate_area === slcspZipInfo.rate_area);
			//			}

			//			if (slcspArayOfStateRateAreas.length > 2) {
			//				slcspArayOfStateRateAreas.sort((a, b) => a.rate - b.rate);
			//				const jp = JSON.parse(slcspArayOfStateRateAreas[1].rate)
			//				const tf = jp.toFixed(2);
			//				value.rate = tf;
			//			}
			//		}
			//		const calcSLCSP = papa.unparse(fetchSLCSP);
			//		//	console.log('-------------------')
			//		//	console.log(calcSLCSP);
			//		setCalculatedSLCSP(calcSLCSP);
			//	}

			//  due to 'zips.csv' and 'plans.csv' file size, using placeholder 'calculatedSLCSP.csv'
			//  not placing 'zips.csv' and 'plans.csv' on S3 and too big for Heroku
			if (!fetchSLCSP) {
				fetch('https://sleepy-wave-92667.herokuapp.com/calculatedSLCSP.csv')
					.then(res => res.text())
					.then(data  => {
						setFetchSLCSP(data)
					})
					.catch(error => {
						console.error(error)
					})
			}
		},
		[fetchSLCSP,]
	);

	return (
		<>
			<Helmet title="About CSV" />

			{/* ---------------------------------------------- */}

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">
					AboutCSV
				</h1>

				<h2 className="mb-3">
					Calculate the second lowest cost silver plan
				</h2>

				<h3 className="mb-3">
					Determine the second lowest cost silver plan (SLCSP) for a group of ZIP codes.
				</h3>

				<div className="mb-3">

					<p>
						CSV file "slcsp.csv" contains ZIP codes in the first column. Fill in the second column with the rate of the corresponding SLCSP and emit the rate as a CSV.
					</p>
					<p>
						The order of the rows as emitted stay the same as how they appeared in the original "slcsp.csv". The first row is the column headers: "zipcode,rate" The remaining lines output unquoted values with two digits after the decimal place of the rates, for example: "64148,245.20".
					</p>
					<p>
						It may not be possible to determine a SLCSP for every ZIP code given; for example, if there is only one silver plan available, there is no _second_ lowest cost plan. Where a definitive rate cannot be found,  those cells are left blank in the output CSV (no quotes or zeroes or other text). For example, "40813,".
					</p>
				</div>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 text-break mb-5">

					{fetchSLCSP && (
						<div>
							<div>
								{/* <pre>{calculatedSLCSP}</pre> */}
								<pre>{fetchSLCSP}</pre>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default AboutCSV;
