export const prerender = true;

export async function load() {
	const authors = import.meta.glob('/src/content/authors.json', { eager: true });
	const stories = import.meta.glob('/src/content/stories.json', { eager: true });
	const authorData = Object.values(authors)[0].default.authors;
	const storiesData = Object.values(stories)[0].default.posts;

	if (!authorData) {
		throw new Error('Authors data not found');
	}

	return {
		authors: authorData.map((author) => ({
			name: author.name,
			slug: author.slug,
			storyCount: storiesData.filter((story) => story.authors.includes(author.slug)).length
		})),
		totalStories: storiesData.length
	};
}
