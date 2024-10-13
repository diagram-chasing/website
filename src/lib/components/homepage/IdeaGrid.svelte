<script>
	import { onMount, afterUpdate } from 'svelte';
	import ideas from '../../../data/ideas.json';
	import PostIt from './PostItNote.svelte';

	let boardWidth;
	let boardHeight;
	let notes = [];

	const updateBoardSize = () => {
		boardHeight = window.innerHeight * 0.6;
		boardWidth = window.innerWidth;
		distributeNotes();
	};

	function distributeNotes() {
		const postItSize = 150; // Assuming each post-it is roughly 150x150 pixels
		const margin = 10;
		const maxColumns = Math.floor(boardWidth / (postItSize + margin));
		const maxRows = Math.floor(boardHeight / (postItSize + margin));

		notes = ideas
			.filter((idea) => idea.show_on_page)
			.map((idea, index) => {
				const column = index % maxColumns;
				const row = Math.floor(index / maxColumns) % maxRows;

				return {
					...idea,
					x: Math.random() * (boardWidth - 5),
					y: Math.random() * (boardHeight - 50),
					zIndex: index,
					rotation: (Math.random() - 0.5) * 15 // Reduced rotation for better readability
				};
			});
	}

	onMount(() => {
		updateBoardSize();
	});

	afterUpdate(() => {
		updateBoardSize();
	});
</script>

<svelte:window on:resize={updateBoardSize} />
<h2 class="py-2 text-2xl text-center font-phudu">Our Current Backlog of Ideas</h2>
<div
	bind:clientWidth={boardWidth}
	bind:clientHeight={boardHeight}
	class="relative w-full mx-auto my-4"
	style="height: {boardHeight}px;"
>
	{#each notes as note (note.pitch)}
		<PostIt
			content={note.note_text}
			originator={note.originator}
			x={note.x}
			y={note.y}
			zIndex={note.zIndex}
			rotation={note.rotation}
		/>
	{/each}
</div>
