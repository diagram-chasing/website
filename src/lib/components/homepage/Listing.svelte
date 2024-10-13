<script>
	import { thumbnailImages } from '$lib/stores';
	import Separator from '../decorative/Separator.svelte';
	import { format } from 'date-fns';
	import { Github } from 'lucide-svelte';

	const images = thumbnailImages();
	let title, description, slug, published, image, date, type, tags, authors, code, base_url;
	$: ({ title, description, slug, published, image, date, type, tags, authors, code, base_url } =
		$$props);
	$: url =
		slug !== false ? 'https://diagramchasing.fun/' + format(date, 'yyyy') + '/' + slug : base_url;

	let separatorSymbols = ['⁄', '𑗄', '‒', '⁓', '‗'];
	function hashCode(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32-bit integer
		}
		return Math.abs(hash);
	}
	$: separatorSymbol = separatorSymbols[hashCode(slug) % separatorSymbols.length];
</script>

<article class="flex flex-col items-start justify-between w-full px-0 mx-0 sm:flex-row">
	<div class="flex-grow sm:pr-4 sm:max-w-[calc(100%-170px)]">
		<h2 class="text-2xl font-bold">
			<a href={url} class="p-0 m-0 text-black no-underline">
				{title}
			</a>
		</h2>
		<p class="text-sm font-roboto text-wrap">{description}</p>
		<div class="flex items-center gap-1 w-fit">
			<time datetime={format(date, 'yyyy-MM-dd')} class="font-mono text-xs whitespace-nowrap">
				{format(date, 'MMM, yyyy')}
			</time>
			<span aria-hidden="true">/</span>

			<a href={code} target="_blank" rel="noopener noreferrer" aria-label="View code on GitHub">
				<Github aria-hidden="true" class="size-6" />
			</a>
		</div>
		<ul class="flex list-none">
			{#each tags as tag, i}
				<li class="font-mono text-[0.6rem] text-gray-500 uppercase">
					{tag}{#if i !== tags.length - 1}
						<span class="pl-0 text-xs">, </span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
	<a
		href={url}
		tabindex="-1"
		class="w-full sm:w-[150px] mt-4 sm:mt-0 p-0 m-0 text-black no-underline flex-shrink-0"
		aria-label="View full article: {title}"
	>
		<img
			src={$images[`/src/lib/assets/thumbnails/${image}`]?.default}
			alt=""
			class="w-full sm:w-[150px] h-auto object-cover"
			role="presentation"
		/>
	</a>
</article>
<Separator symbol={separatorSymbol} className="m-0 p-0" padding="px-0" />
