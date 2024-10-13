<script>
	import { thumbnailImages } from '$lib/stores';
	import Separator from '../decorative/Separator.svelte';
	import { format } from 'date-fns';
	import { Github } from 'lucide-svelte';

	const images = thumbnailImages();
	let title, description, slug, published, image, date, type, tags, authors, code;
	$: ({ title, description, slug, published, image, date, type, tags, authors, code } = $$props);
	$: url = 'https://diagramchasing.fun/' + format(date, 'yyyy') + '/' + slug;

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

<article
	class="flex flex-col items-start justify-between w-full px-0 mx-0 sm:flex-row sm:items-start"
>
	<div class="flex-grow">
		<h2 class="text-2xl font-bold">
			<a href={url} class="p-0 m-0 text-black no-underline">
				{title}
			</a>
		</h2>
		<p class="text-sm font-roboto">{description}</p>
		<div class="flex items-center gap-1 w-fit">
			<time
				datetime={format(date, 'yyyy-MM-dd')}
				class="w-full font-mono text-xs whitespace-nowrap"
			>
				{format(date, 'MMM, yyyy')}
			</time>
			<span aria-hidden="true">/</span>
			<a href={code} target="_blank" rel="noopener noreferrer" aria-label="View code on GitHub">
				<Github aria-hidden="true" class="size-6" />
			</a>
		</div>
	</div>
	<a
		href={url}
		tabindex="-1"
		class="w-full sm:w-[150px] p-0 m-0 text-black no-underline"
		aria-label="View full article: {title}"
	>
		<img src={$images[`/src/lib/assets/thumbnails/${image}`]?.default} alt="" role="presentation" />
	</a>
</article>
<Separator symbol={separatorSymbol} className="m-0 p-0" />
