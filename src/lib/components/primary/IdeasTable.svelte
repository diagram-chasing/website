<script>
	export let data;
	$: ideas = data.content.sort((a, b) => {
		if (a.status === 'PUBLISHED' && b.status !== 'PUBLISHED') return 1;
		if (a.status !== 'PUBLISHED' && b.status === 'PUBLISHED') return -1;
		return 0;
	});
</script>

<div class="container px-4 mx-auto font-mono">
	<h2 class="mb-4 text-2xl font-bold">Our Ideas</h2>
	<p class="mb-6 font-roboto">
		We keep our ideas and their status open source. If any of these vague descriptions interests
		you, come help us work on it if you want.
	</p>
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="bg-gray-100">
					<th class="w-24 p-2 text-left">Date</th>
					<th class="p-2 text-left w-36">Pitch</th>
					<th class="hidden w-48 p-2 text-left sm:table-cell">Originator</th>
					<th class="p-2 text-left">Description</th>
					<th class="p-2 text-left w-28">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each ideas as idea}
					<tr class="border-t border-gray-200 {idea.status === 'PUBLISHED' ? 'bg-green-100' : ''}">
						<td class="w-24 p-2 text-xs whitespace-nowrap">{idea.date}</td>
						<td class="p-2 w-36">{idea.pitch}</td>
						<td class="hidden w-48 p-2 sm:table-cell">{idea.originator}</td>
						<td class="p-2">
							{#if idea.description}
								<details>
									<summary class="text-blue-800 cursor-pointer hover:underline">View</summary>
									<p class="mt-2 text-sm font-roboto">{idea.description}</p>
								</details>
							{:else}
								<span class="text-gray-400">No description</span>
							{/if}
						</td>
						<td class="p-2 whitespace-nowrap">{idea.status || 'BACKLOG'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	:global(body) {
		background-color: #f8f8f8;
		color: #333;
	}
	table {
		font-size: 0.875rem;
	}
	@media (max-width: 640px) {
		table {
			font-size: 0.75rem;
		}
		td,
		th {
			padding: 0.5rem 0.25rem;
		}
	}
</style>
