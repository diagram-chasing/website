<script>
	import SEO from '$components/primary/SEO.svelte';
	import stories from '$content/stories.json';
	import Listing from '$components/homepage/Listing.svelte';

	let totalStories = stories.posts.length;
	let filteredStories = stories.posts;
	let currentFilter = 'All';

	const filterStories = (type) => {
		currentFilter = type;
		filteredStories =
			type === 'All'
				? stories.posts
				: stories.posts.filter((post) => post.type.toLowerCase() === type.toLowerCase());
	};
</script>

<SEO
	title="Diagram Chasing"
	description="A publication of data-driven works of various interests, shared once in a while"
	keywords="data viz, india data, data storytellying, gis, data blog"
	,
	twitterHandle="@diagram_chasing"
	author="Diagram Chasing"
	ogImage="sharecard.jpg"
/>

<main class="relative w-full min-h-screen">
	<header class="flex items-center justify-between w-full px-0 py-0 border-b border-black">
		<nav aria-label="Story filter" class="p-0">
			<ul class="flex gap-1 px-0">
				{#each ['All'] as type}
					<li>
						<button
							class="m-0 py-1 text-black {currentFilter === type ? 'font-bold' : ''}"
							on:click={() => filterStories(type)}
							aria-current={currentFilter === type ? 'page' : undefined}
						>
							{type}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
		<p aria-live="polite" class="font-bold text-right font-roboto">
			[{filteredStories.length}/{totalStories}]
		</p>
	</header>

	<ul class="flex flex-col gap-2 px-0 z-2">
		{#each filteredStories as post}
			{#if post.published}
				<li>
					<Listing {...post} />
				</li>
			{/if}
		{/each}
	</ul>

	<p
		class="absolute z-0 w-full font-mono text-sm text-left text-gray-700 select-none bottom-12"
		aria-live="polite"
	>
		⧔ Not much else...for now ⧕
	</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
