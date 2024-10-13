<script>
	import '$styles/app.css';
	import logo from '$assets/dc-logo-no-text.png';
	import Separator from '$components/decorative/Separator.svelte';
	import { thumbnailImages } from '$lib/stores';
	import license from '$assets/by-sa.png';
	const images = thumbnailImages();
	$: images.set(import.meta.glob('/src/lib/assets/thumbnails/*.webp', { eager: true }));
</script>

<div class="px-2 font-mono">
	<header
		class="flex flex-col items-center justify-between w-full gap-1 pt-4 pb-0 md:pb-2 md:gap-4 sm:flex-row sm:items-end"
	>
		<div class="flex items-center gap-4 sm:items-end">
			<a href="/" class="flex-shrink-0 w-fit">
				<img
					src={logo}
					alt="Diagram Chasing"
					class="w-24 p-1 border border-gray-300 rounded-lg md:w-32"
				/>
			</a>
			<div class="flex flex-col flex-grow w-full gap-1">
				<h1 class="text-2xl font-bold md:text-4xl font-caslon">Diagram Chasing</h1>
				<p class="m-0 text-xs font-medium text-left md:text-sm max-w-72 text-md">
					A publication of data-driven works of various interests, shared once in a while
				</p>
			</div>
		</div>
		<nav
			class="flex flex-row w-32 m-0 text-sm text-right no-underline sm:flex-col sm:items-end sm:text-right focus:border-none font-roboto"
		>
			<a class="no-underline hover:underline whitespace-nowrap underline-offset-4" href="/"
				>~/home</a
			>
			<a class="no-underline hover:underline whitespace-nowrap underline-offset-4" href="/ideas"
				>~/ideas</a
			>
		</nav>
	</header>
	<Separator />
</div>

<div class="px-2 app">
	<main>
		<slot />
	</main>
</div>

<Separator />

<footer
	class="flex flex-col items-center justify-between w-full px-2 pb-4 sm:px-0 sm:flex-row sm:items-center"
>
	<p class="w-full text-xs font-caslon">
		Brought to you by <a
			href="/author/aman"
			class="underline underline-offset-4 hover:decoration-wavy">Aman</a
		>
		& <a class="underline underline-offset-4 hover:decoration-wavy" href="/author/vivek">Vivek</a>
	</p>

	<aside>
		<p class="font-mono text-[0.6rem]">⫽ Published {process.env.BUILD_TIME} ⫽</p>
	</aside>
	<a
		href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
		class="p-0 m-0 mt-2 sm:mt-0"
		target="_blank"
	>
		<img src={license} alt="Content licensed under CC" class="h-[15px] w-[85px]" />
	</a>
</footer>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
