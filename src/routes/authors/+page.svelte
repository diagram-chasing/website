<script lang="ts">
	export let data;
	import Separator from '$components/decorative/Separator.svelte';

	import Seo from '$components/primary/SEO.svelte';

	let separatorSymbols = ['⁄', '𑗄', '‒', '⁓', '‗'];
	function hashCode(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash;
		}
		return Math.abs(hash);
	}

	function getSeparatorSymbol(author) {
		return separatorSymbols[hashCode(author.slug) % separatorSymbols.length];
	}
</script>

<Seo
	title="Authors | Diagram Chasing"
	description="Our public log of what we're working on and all our other ideas"
	keywords="data viz, india data, data storytellying, gis, data blog"
	,
	twitterHandle="@diagram_chasing"
	author="Diagram Chasing"
	ogImage="sharecard.jpg"
/>
<div class="container font-mono text-sm leading-relaxed">
	<header>
		<span class="text-xs text-gray-500">~/authors</span>
		<h1 class="mt-2 text-2xl font-bold">Authors</h1>
		<p class="mb-2 font-roboto">People who have contributed to Diagram Chasing's work.</p>
	</header>

	<p class="font-mono text-xs text-gray-500">~/authors ls</p>
	<section class="w-full space-y-4">
		{#each data.authors.sort((a, b) => b.storyCount - a.storyCount) as author, i}
			{@const last = i === data.authors.length - 1}
			<a
				href="/authors/{author.slug}"
				class="flex justify-between w-full p-1 pl-0 no-underline group {!last ? '' : 'py-3'}"
			>
				<h3 class="text-lg font-bold">{author.name}</h3>
				<p class="font-mono text-sm text-right text-gray-700 tabular-nums group-hover:no-underline">
					{author.storyCount} / {data.totalStories}
				</p>
			</a>
			{#if !last}
				<Separator symbol={getSeparatorSymbol(author)} className="m-0 p-0" padding="px-0" />
			{/if}
		{/each}
	</section>
</div>
