<script lang="ts">
	import Debug from '$lib/components/debug/debug.svelte';
	import SpecificMetas from '$lib/components/seo/specific-metas.svelte';

	export let data;
</script>

<svelte:head>
	<title>Mandarinos | Comunicados</title>
	<SpecificMetas 
		title={data.announcement.title} 
		description={data.announcement.excerpt as string} 
		origin={data.url.origin} 
	/>
</svelte:head>

<div class="container">
	<Debug {data} />
</div>
