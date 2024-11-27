const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

function formatDate(date) {
	const d = new Date(date);
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const year = String(d.getFullYear()).slice(-2);
	return `${day}/${month}/${year}`;
}

exports.handler = async (event, context) => {
	const UserIP = event.headers['x-nf-client-connection-ip'] || '6.9.6.9';

	const serviceAccountAuth = new JWT({
		email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
	const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_FROM_URL, serviceAccountAuth);

	await doc.loadInfo();
	const sheetTitle = 'Phone numbers'; // Default to 'Sheet1' if not specified
	const sheet = doc.sheetsByTitle[sheetTitle];

	if (!sheet) {
		throw new Error(`Sheet "${sheetTitle}" not found in the spreadsheet`);
	}

	// Check if header row exists and initialize if not
	await ensureHeaderRow(sheet);

	const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '');
	const segments = path.split('/').filter((e) => e);

	try {
		switch (event.httpMethod) {
			case 'GET':
				if (segments.length === 0) {
					const rows = await sheet.getRows();
					const serializedRows = rows.map(serializeRow);
					return {
						statusCode: 200,
						body: JSON.stringify(serializedRows)
					};
				}
				if (segments.length === 1) {
					const rowId = parseInt(segments[0]);
					const rows = await sheet.getRows();
					if (rowId >= 0 && rowId < rows.length) {
						const srow = serializeRow(rows[rowId]);
						return {
							statusCode: 200,
							body: JSON.stringify(srow)
						};
					} else {
						return {
							statusCode: 404,
							body: JSON.stringify({ error: 'Row not found' })
						};
					}
				}
				throw new Error('Invalid GET request');

			case 'POST':
				const data = JSON.parse(event.body);
				const newRow = {
					id: Date.now().toString(), // Generate a unique ID
					date: formatDate(new Date()),
					constituency: data.constituency || '',
					number: data.number
				};
				const addedRow = await sheet.addRow(newRow);
				return {
					statusCode: 200,
					body: JSON.stringify({
						message: `POST Success - added row ${addedRow.rowIndex - 1}`,
						rowNumber: addedRow.rowIndex - 1
					})
				};

			case 'PUT':
				if (segments.length !== 1) {
					return {
						statusCode: 422,
						body: JSON.stringify({ error: 'PUT request must have an id' })
					};
				}
				const rowId = parseInt(segments[0]);
				const rows = await sheet.getRows();
				if (rowId >= 0 && rowId < rows.length) {
					const data = JSON.parse(event.body);
					data.UserIP = UserIP;
					const selectedRow = rows[rowId];
					Object.entries(data).forEach(([k, v]) => {
						selectedRow[k] = v;
					});
					await selectedRow.save();
					return {
						statusCode: 200,
						body: JSON.stringify({ message: 'PUT is a success!' })
					};
				} else {
					return {
						statusCode: 404,
						body: JSON.stringify({ error: 'Row not found' })
					};
				}

			case 'DELETE':
				if (segments.length !== 1) {
					return {
						statusCode: 400,
						body: JSON.stringify({
							error:
								'Invalid DELETE request, must be /.netlify/functions/google-spreadsheet-fn/{rowId}'
						})
					};
				}
				const deleteRowId = parseInt(segments[0]);
				const allRows = await sheet.getRows();
				if (deleteRowId >= 1 && deleteRowId < allRows.length) {
					// Protect the first row (headers)
					await allRows[deleteRowId].delete();
					return {
						statusCode: 200,
						body: JSON.stringify({ message: 'DELETE is a success!' })
					};
				} else if (deleteRowId === 0) {
					return {
						statusCode: 400,
						body: JSON.stringify({ error: 'Cannot delete the header row' })
					};
				} else {
					return {
						statusCode: 404,
						body: JSON.stringify({ error: 'Row not found' })
					};
				}

			default:
				return {
					statusCode: 405,
					body: JSON.stringify({ error: 'Method not allowed' })
				};
		}
	} catch (err) {
		console.error('Error occurred in processing ', event);
		console.error('Error details:', err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: err.message,
				details: err.stack
			})
		};
	}

	function serializeRow(row) {
		let temp = {};
		sheet.headerValues.forEach((header) => {
			temp[header] = row.get(header);
		});
		return temp;
	}
};

async function ensureHeaderRow(sheet) {
	await sheet.loadHeaderRow();
	if (sheet.headerValues.length === 0) {
		console.log('Header row is empty. Initializing with new headers.');
		const newHeaders = ['id', 'date', 'constituency', 'number'];
		await sheet.setHeaderRow(newHeaders);
	}
}
