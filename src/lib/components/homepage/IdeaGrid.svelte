<script>
	import ideas from '../../../data/ideas.json';
	import PostIt from './PostItNote.svelte';
</script>

<h2 class="py-2 text-2xl text-center font-phudu">Our Current Backlog of Ideas</h2>
<div
	class="flex flex-wrap md:h-full min-h-[35rem] items-center justify-center w-full gap-4 mx-auto my-12"
>
	{#each ideas as idea}
		{#if idea.show_on_page}
			<PostIt content={idea.note_text} originator={idea.originator} />
		{/if}
	{/each}
</div>
