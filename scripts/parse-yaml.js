import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assuming the script is in the 'scripts' folder, we need to go up one level to reach the project root
const projectRoot = path.join(__dirname, '..');

const inputDir = path.join(projectRoot, 'site-content');
const outputDir = path.join(projectRoot, 'src', 'content');

async function convertYamlToJson() {
	try {
		// Ensure output directory exists
		await fs.mkdir(outputDir, { recursive: true });

		// Read all files in the input directory
		const files = await fs.readdir(inputDir);

		for (const file of files) {
			if (
				path.extname(file).toLowerCase() === '.yaml' ||
				path.extname(file).toLowerCase() === '.yml'
			) {
				const inputPath = path.join(inputDir, file);
				const outputPath = path.join(outputDir, `${path.parse(file).name}.json`);

				// Read YAML file
				const yamlContent = await fs.readFile(inputPath, 'utf8');

				// Parse YAML to JavaScript object
				const jsonContent = yaml.load(yamlContent);

				// Write JSON file
				await fs.writeFile(outputPath, JSON.stringify(jsonContent, null, 2));

				console.log(`Converted ${file} to JSON`);
			}
		}

		console.log('Conversion complete!');
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

convertYamlToJson();
