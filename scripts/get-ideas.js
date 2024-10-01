import { writeFile } from 'fs/promises';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Papa from 'papaparse';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = process.env.IDEAS_SHEET_URL;
const outputFile = join(__dirname, '..', 'src', 'data', 'ideas.json');

async function fetchAndConvert() {
	if (!url) {
		console.error('Error: IDEAS_SHEET_URL is not defined in the environment variables');
		process.exit(1);
	}

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const text = await response.text();

		// Parse CSV using Papa Parse
		const { data, errors } = Papa.parse(text, {
			header: true,
			skipEmptyLines: true,
			trimHeaders: true,
			dynamicTyping: true
		});

		if (errors.length > 0) {
			console.warn('Parsing completed with errors:', errors);
		}

		await writeFile(outputFile, JSON.stringify(data, null, 2));
		console.log(`Data has been written to ${outputFile}`);
	} catch (error) {
		console.error('Error:', error.message);
	}
}

fetchAndConvert();
