<script>
	import { draggable } from '@neodrag/svelte';

	export let content = '';
	export let color = '#F4C95D';
	export let originator = '';
	export let x = 0;
	export let y = 0;
	export let zIndex = 0;
	export let rotation = 0;

	let colors = ['#5BC0EB', '#FDE74C'];
	color = colors[Math.floor(Math.random() * colors.length)];
</script>

<div
	use:draggable={{
		bounds: 'parent',
		defaultPosition: { x, y }
	}}
	class="absolute"
	style="z-index: {zIndex};"
>
	<div
		class="select-none hover:cursor-grab post-it"
		style="--color: {color}; --rotation: {rotation}deg;"
	>
		<div class="font-chelsea content">{content}</div>
		{#if originator}
			<div class="signature">- {originator}</div>
		{/if}
	</div>
</div>

<style>
	.post-it {
		width: 200px;
		height: 200px;
		background-color: var(--color);
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-shadow:
			0 4px 6px rgba(0, 0, 0, 0.1),
			0 1px 3px rgba(0, 0, 0, 0.08);
		transform: rotate(var(--rotation));
		transition:
			box-shadow 0.3s ease,
			transform 0.3s ease;
	}

	.post-it:hover {
		box-shadow:
			0 7px 14px rgba(0, 0, 0, 0.1),
			0 3px 6px rgba(0, 0, 0, 0.08);
		transform: rotate(var(--rotation)) translateY(-5px);
	}

	.content {
		font-size: clamp(0.4rem, 3vw, 0.7rem);
		color: #333;
		word-wrap: break-word;

		flex-grow: 1;
		display: flex;

		justify-content: center;
	}

	.signature {
		font-size: 0.7rem;
		color: #555;
		align-self: flex-end;
		font-style: italic;
	}
</style>
