<script>
	import IdeasTable from '../../lib/components/primary/IdeasTable.svelte';
	export let data;
	import Seo from '../../lib/components/primary/SEO.svelte';
</script>

<Seo
	title="Ideas | Diagram Chasing"
	description="Our public log of what we're working on and all our other ideas"
	keywords="data viz, india data, data storytellying, gis, data blog"
	,
	twitterHandle="@diagram_chasing"
	author="Diagram Chasing"
	ogImage="sharecard.jpg"
/>

<IdeasTable {data} />
