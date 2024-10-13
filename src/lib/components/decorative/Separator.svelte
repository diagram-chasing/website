<script>
	import { clsx } from 'clsx';
	import { twMerge } from 'tailwind-merge';
	export let symbol = '❋';
	export let ariaLabel = 'Separator';
	export let className = '';
</script>

<div
	role="separator"
	aria-orientation="horizontal"
	aria-label={ariaLabel}
	class={twMerge(clsx('w-full max-w-[51.5rem] mx-auto overflow-hidden', className))}
>
	<div aria-hidden="true">
		{#each Array.from({ length: 300 }) as _, i}
			<span class="-ml-1 text-xs">{symbol}</span>
		{/each}
	</div>
</div>
