export const prerender = true;

// Load function to load the content
export async function load() {
	const paths = import.meta.glob('/src/data/ideas.json', { eager: true });

	const path = Object.keys(paths)[0];
	const content = paths[path];

	return {
		content: content.default
	};
}
