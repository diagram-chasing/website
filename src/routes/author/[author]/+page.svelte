<script>
	import Listing from '../../../lib/components/homepage/Listing.svelte';

	export let data;
	$: ({ author, posts } = data);
</script>

<div class="container font-mono text-sm leading-relaxed">
	<header>
		<span class="text-xs text-gray-500">~/author</span>
		<h1 class="mt-2 text-2xl font-bold">{author.name}</h1>
	</header>

	<section class="mb-8">
		<p class="break-words whitespace-pre-wrap font-roboto">{author.description}</p>
		<ul class="flex flex-col gap-1 p-0 mt-4 text-xs list-none">
			{#each author.links as link}
				{#each Object.entries(link) as [name, url]}
					<li>
						{name}: <a href={url} class="underline">{url.replace(/^https?:\/\//, '')}</a>
					</li>
				{/each}
			{/each}
		</ul>
	</section>

	<section class="p-0">
		<p class="font-mono text-xs text-gray-500">~/author/{author.slug}/</p>
		<ul class="p-0 list-none">
			{#each posts.filter((post) => post.published) as post}
				<li class="mb-2">
					<Listing {...post} />
				</li>
			{/each}
		</ul>
	</section>
</div>
