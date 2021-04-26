import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import papa from 'papaparse';
import fetch from 'isomorphic-fetch';
//  import { S3Client, GetObjectCommand, } from '@aws-sdk/client-s3'; // ListBucketsCommand, ListObjectsCommand
//  import { ReadableStream } from 'readable-stream';
//  import config from '../../../config.json';
import * as Styles from './styles';

//	https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html
//	https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/s3.html#getobject
//	https://nodejs.org/api/stream.html
//	https://nodejs.org/api/all.html#util_textdecoder_decode_input_options
//	https://github.com/nodejs/readable-stream
//	stream.Readable: node
//	ReadableStream: browser

const AboutCSV = () => {

	const [responsePLANS, setResponsePLANS] = useState(null);
	const [responseZIPS, setResponseZIPS] = useState(null);
	const [responseSLCSP, setResponseSLCSP] = useState('');
	const [calculatedSLCSP, setCalculatedSLCSP] = useState('');

	//  const client = new S3Client({
	//    credentials: {
	//      accessKeyId: config.aws.aws_access_key_id,
	//      secretAccessKey: config.aws.aws_secret_access_key,
	//    },
	//    region: config.aws.aws_region,
	//  });

	//  const commandPlans = new GetObjectCommand({ Bucket: config.aws.aws_bucket, Key: 'plans.csv' });
	//  const commandZips = new GetObjectCommand({ Bucket: config.aws.aws_bucket, Key: 'zips.csv' });
	//  const commandSlcsp = new GetObjectCommand({ Bucket: config.aws.aws_bucket, Key: 'slcsp.csv' });

	function streamToString(stream) {
		return new Promise((resolve, reject) => {
			if (stream instanceof ReadableStream === false) {
				reject('>>>>>>>>>> streamToString Promise rejected');
			}

			let text = '';
			const decoder = new TextDecoder('utf-8');
			const reader = stream.getReader();

			const processRead = ({ done, value }) => {
				if (done) {
					console.log('>>>>>>>>>> streamToString > done');
					resolve(text);
					return;
				}

				// decodes the input (encoded data) and returns a string
				text += decoder.decode(value);
				reader.read().then(processRead);
			};

			reader.read().then(processRead);
		});
	};

	function filterRow(row) {
		return row.metal_level === 'Silver';
	}

	function filterData(data) {
		return data.filter(filterRow);
	}

	// =======================================================

	//  useEffect(() => {
	//      //  below works requesting CSVs from AWS S3
	//      async function promiseAllReturnString(dataPlansBody, dataZipsBody, dataSlcspBody) {

	//        const [dataPlansString, dataZipsString, dataSlcspString] = await Promise.all([
	//          streamToString(dataPlansBody),
	//          streamToString(dataZipsBody),
	//          streamToString(dataSlcspBody),
	//        ]);

	//        await papa.parse(dataPlansString, {
	//          delimiter: ',',
	//          header: true,
	//          complete: (res) => {
	//            const filterPlans = filterData(res.data);
	//            setResponsePLANS(filterPlans);
	//          }
	//        });

	//        await papa.parse(dataZipsString, { 
	//          delimiter: ',',
	//          header: true,
	//          complete: (res) => {
	//            setResponseZIPS(res.data);
	//          }
	//        });

	//        await papa.parse(dataSlcspString, { 
	//          delimiter: ',',
	//          header: true,
	//          complete: (res) => {
	//            setResponseSLCSP(res.data);
	//          }
	//        });
	//      }

	//      async function promiseAllInitialClientSend() {

	//        const [dataPlans, dataZips, dataSlcsp] = await Promise.all([
	//          client.send(commandPlans),
	//          client.send(commandZips),
	//          client.send(commandSlcsp),
	//        ]);

	//        promiseAllReturnString(dataPlans.Body, dataZips.Body, dataSlcsp.Body);
	//      }

	//      // ------------------------------

	//      if (responseSLCSP === '') {
	//        promiseAllInitialClientSend();
	//      }

	//      if (responseSLCSP !== '') {
	//        responseSLCSP.forEach(calculateSLCSP);
	//        function calculateSLCSP(value, index, array) {

	//          // Have to find ZIP info for EACH ZIP
	//          const slcspZipInfo = responseZIPS.find(e => e.zipcode === value.zipcode);

	//          // for Each slcspZipInfo, Find any/all matching "state" & "rate_area" in "PLANS.csv"
	//          const slcspArrayOfStateRateAreas = responsePLANS.filter(calculateStateRateAreas);

	//          function calculateStateRateAreas(value, index) {
	//            return (value.state === slcspZipInfo.state) && (value.rate_area === slcspZipInfo.rate_area);
	//          }

	//          if (slcspArrayOfStateRateAreas.length > 2) {
	//            slcspArrayOfStateRateAreas.sort((a, b) => a.rate - b.rate);
	//            const jp = JSON.parse(slcspArrayOfStateRateAreas[1].rate)
	//            const tf = jp.toFixed(2);
	//            value.rate = tf;
	//          }
	//        }
	//        const calcSLCSP = papa.unparse(responseSLCSP);
	//        console.log('-------------------!')
	//        console.log(calcSLCSP);
	//        setCalculatedSLCSP(calcSLCSP);
	//      }
	//    },
	//    [responseSLCSP,]
	//  );

	useEffect(() => {
			//  below works fetching 'zips.csv' and 'plans.csv'
			//  using placeholder 'calculatedSLCSP.csv'

			//  if (responseSLCSP === '') {
			//    fetch('/plans.csv')
			//      .then(res => {
			//        return res.text()
			//      })
			//      .then(textPlans  => {
			//        papa.parse(textPlans, {
			//          delimiter: ',',
			//          header: true,
			//          complete: (res) => {
			//            const filterPlans = filterData(res.data);
			//            setResponsePLANS(filterPlans);
			//          }
			//        });
			//        return fetch('/zips.csv')
			//      })
			//      .then(res => res.text())
			//      .then(textZips  => {
			//        papa.parse(textZips, { delimiter: ',', header: true, complete: (res) => setResponseZIPS(res.data) });
			//        return fetch('/slcsp.csv')
			//      })
			//      .then(res => res.text())
			//      .then(textSlcsp  => {
			//        papa.parse(textSlcsp, { delimiter: ',', header: true, complete: (res) => setResponseSLCSP(res.data) });
			//      })
			//      .catch(error => {
			//        console.error(error)
			//      })
			//  }
			//  if (responseSLCSP !== '') {
			//    responseSLCSP.forEach(calculateSLCSP);
			//    function calculateSLCSP(value, index, array) {

			//      // Have to find ZIP info for EACH ZIP
			//      const slcspZipInfo = responseZIPS.find(e => e.zipcode === value.zipcode);

			//      // for Each slcspZipInfo, Find any/all matching "state" & "rate_area" in "PLANS.csv"
			//      const slcspArayOfStateRateAreas = responsePLANS.filter(calculateStateRateAreas);

			//      function calculateStateRateAreas(value, index) {
			//        return (value.state === slcspZipInfo.state) && (value.rate_area === slcspZipInfo.rate_area);
			//      }

			//      if (slcspArayOfStateRateAreas.length > 2) {
			//        slcspArayOfStateRateAreas.sort((a, b) => a.rate - b.rate);
			//        const jp = JSON.parse(slcspArayOfStateRateAreas[1].rate)
			//        const tf = jp.toFixed(2);
			//        value.rate = tf;
			//      }
			//    }
			//    const calcSLCSP = papa.unparse(responseSLCSP);
			//    console.log('-------------------')
			//    console.log(calcSLCSP);
			//    setCalculatedSLCSP(calcSLCSP);
			//  }

			if (responseSLCSP === '') {
				fetch('/calculatedSLCSP.csv')
					.then(res => res.text())
					.then(data  => {
						setResponseSLCSP(data)
					})
					.catch(error => {
						console.error(error)
					})
			}
		},
		[responseSLCSP,]
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
						It may not be possible to determine a SLCSP for every ZIP code given; for example, if there is only one silver plan available, there is no _second_ lowest cost plan. Where a definitive rate cannot be found, those cells are left blank in the output CSV (no quotes or zeroes or other text). For example, "40813,".
					</p>
				</div>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 text-break mb-5">

					{responseSLCSP !== '' && (
						<div>
							<div>
								{/* <pre>{calculatedSLCSP}</pre> */}
								<pre>{responseSLCSP}</pre>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default AboutCSV;
