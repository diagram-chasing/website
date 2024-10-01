<script>
	import { afterUpdate, onMount } from 'svelte';
	import { draggable } from '@neodrag/svelte';
	export let content = '';
	export let color = '#F4C95D';
	export let originator = '';
	export let index = 0;

	let rotation = 0;

	onMount(() => {
		rotation.x = Math.ceil(Math.random() * 10);
		rotation.y = Math.ceil(Math.random() * 10);
		rotation.z = Math.ceil(Math.random() * 10);
	});
</script>

<div
	use:draggable={{
		bounds: 'parent',
		transform: ({ offsetX, offsetY, rootNode }) => {
			rootNode.style.translate = `${offsetX + 50}px ${offsetY + 20}px`;
			rootNode.style.rotate = `${rotation.x}deg ${rotation.y}deg ${rotation.z}deg`;
		},
		defaultPosition: {
			x: Math.ceil(Math.random() * 20) + (Math.random() - 2) * 5,
			y: Math.ceil(Math.random() * 20) + (Math.random() - 2) * 5
		}
	}}
>
	<div
		class="select-none post-it"
		style="--color: {color}; --rotation: var(--rotation-{(index % 5) + 1});"
	>
		<div class="font-chelsea content">{content}</div>
		{#if originator}
			<div class="signature">- {originator}</div>
		{/if}
	</div>
</div>

<style>
	.post-it {
		position: relative;
		width: 200px;
		height: 200px;
		background-color: var(--color);
		padding: 20px;
		display: flex;
		margin: auto;
		align-items: center;
		-webkit-box-shadow: 10px 11px 25px -8px rgba(0, 0, 0, 0.45);
		-moz-box-shadow: 10px 11px 25px -8px rgba(0, 0, 0, 0.45);
		box-shadow: 10px 11px 25px -8px rgba(0, 0, 0, 0.45);
		flex-direction: column;
		justify-content: space-between;
		z-index: 1 !important;
		transform: rotate(var(--rotation));
	}

	.content {
		font-size: clamp(0.4rem, 5vw, 0.8rem);
		color: #333;
		word-wrap: break-word;
		overflow: hidden;
		flex-grow: 1;
		display: flex;
		justify-content: center;
	}

	.signature {
		font-size: 0.6rem;
		color: #555;
		align-self: flex-end;
		font-style: italic;
		margin-top: -20px;
	}
</style>
