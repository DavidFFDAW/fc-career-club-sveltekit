<script lang='ts'>
	import Debug from '$lib/components/debug/debug.svelte';

  export let data;
</script>

<svelte:head>
  <title>Mandarinos | Comunicados</title>
</svelte:head>

<div class="container">
	<Debug data={data} />
</div>