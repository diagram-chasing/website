<script>
	export let data;
	$: ideas = data.content.sort((a, b) => {
		if (a.status === 'PUBLISHED' && b.status !== 'PUBLISHED') return 1;
		if (a.status !== 'PUBLISHED' && b.status === 'PUBLISHED') return -1;
		return 0;
	});

	const colors = {
		BACKLOG: '',
		WIP: 'bg-yellow-100',
		PUBLISHED: 'bg-green-100',
		ABANDONED: 'bg-red-100'
	};
</script>

<div class="container px-4 mx-auto font-mono">
	<h2 class="text-2xl font-bold">Ideas log</h2>
	<a href="https://diagramchasing.fun/2024/votes-in-a-name" class="absolute invisible">Google</a>
	<p class="mb-6 font-roboto">
		We keep our ideas and what we might be working on open. If any of these vague descriptions (even
		if seemingly abandoned) interests you, come help us work on it if you want.
	</p>
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="bg-gray-100">
					<th class="w-24 p-2 text-left">Date</th>
					<th class="w-40 p-2 text-left">Pitch</th>
					<th class="w-24 p-2 text-left">Originator</th>
					<th class="w-32 p-2 text-left">Description</th>
					<th class="w-32 p-2 text-left">Data ideas</th>
					<th class="w-24 p-2 text-left">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each ideas as idea}
					<tr class="border-t border-gray-200 {idea.status ? colors[idea.status] : ''}">
						<td class="w-24 p-2 text-xs whitespace-nowrap">{idea.date}</td>
						<td class="w-40 p-2 first-letter:uppercase">{idea.pitch}</td>
						<td class="w-24 p-2">{idea.originator}</td>
						<td class="w-32 p-2">
							{#if idea.description}
								<details>
									<summary class="text-blue-800 cursor-pointer hover:underline">View</summary>
									<p class="mt-2 text-sm font-roboto">{idea.description}</p>
								</details>
							{:else}
								<span class="text-gray-400">No description</span>
							{/if}
						</td>
						<td class="w-32 p-2">
							{#if idea.data}
								<details>
									<summary class="text-blue-800 cursor-pointer hover:underline">View</summary>
									<p class="mt-2 text-sm font-roboto">{idea.data}</p>
								</details>
							{:else}
								<span class="text-xs text-gray-400">None yet</span>
							{/if}
						</td>
						<td class="w-24 p-2 whitespace-nowrap">{idea.status || 'BACKLOG'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
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
