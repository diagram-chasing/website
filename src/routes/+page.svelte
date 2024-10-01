<script>
	import SEO from '$components/primary/SEO.svelte';
	import logo from '$assets/dc-logo.webp';
</script>

<SEO
	title="Diagram Chasing"
	description="A publication of data-driven works of our interest, shared once in a while"
/>

<section class="w-full max-w-sm align-center">
	<hr class="my-4" />

	<img
		src={logo}
		alt="Diagram Chasing"
		class="p-1 mx-auto border-2 border-black rounded-lg size-72"
	/>
	<p class="mx-auto text-xl font-medium text-center">
		A publication of data-driven works of our interest, shared once in a while
	</p>

	<hr class="my-4" />

	<div
		class="flex items-center justify-center px-2 mx-auto text-white bg-gray-800 rounded-md w-fit"
	>
		<div class="w-3 h-3 mr-1 bg-yellow-400 rounded-full shadow-glow"></div>
		<p class="font-mono text-sm font-bold text-center uppercase">Under construction</p>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		margin: auto;
	}

	hr {
		border-top: 1px solid #2a2a2a;
	}

	.shadow-glow {
		box-shadow: 0 0 4px 1px rgba(250, 204, 21, 0.7);
	}
</style>
