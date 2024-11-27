import { json } from '@sveltejs/kit';

export async function POST({ request, url }) {
	const formData = await request.json();

	try {
		const functionUrl = new URL('/.netlify/functions/google-spreadsheet-fn', url.origin).href;
		console.log('Attempting to call function at:', functionUrl);

		const response = await fetch(functionUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				number: formData.number,
				constituency: formData.constituency
			})
		});

		console.log('Response status:', response.status);
		console.log('Response headers:', Object.fromEntries(response.headers.entries()));

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Response not OK:', response.status, errorText);
			throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
		}

		const result = await response.json();
		return json(result);
	} catch (error) {
		console.error('Error:', error);
		return json({ error: 'Failed to submit data', details: error.message }, { status: 500 });
	}
}
